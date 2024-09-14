import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import { useAuth } from 'shared/lib/reactContext/Auth/useAuth';
import { SIGN_IN_WITH_EMAIL } from 'shared/query/apolloQuries';
import { RegularButton } from 'shared/ui/RegularButton';
import { FormField } from '../../../../FormField';
import { GoogleLoginButton } from '../../../../GoogleLoginButton';

import { validationSchema } from '../lib/validationSchema';
import cls from './SignInWithEmail.module.scss';

interface SignInWithEmailProps {
  onSwitchToSignUp: () => void;
}

interface SignInWithEmailFormData {
  email: string;
  password: string;
}

export const SignInWithEmail = ({ onSwitchToSignUp }: SignInWithEmailProps) => {
  const [signInWithEmail, { error }] = useMutation(SIGN_IN_WITH_EMAIL);
  const { checkAuth, setIsAuthPopup } = useAuth();
  const form = useForm<SignInWithEmailFormData>({ mode: 'onBlur', resolver: yupResolver(validationSchema) });

  const {
    handleSubmit,

    formState: { errors, isValid },
  } = form;

  const onSubmit: SubmitHandler<SignInWithEmailFormData> = async (data) => {
    try {
      const response = await signInWithEmail({
        variables: {
          email: data.email,
          password: data.password,
        },
      });
      if (response) {
        checkAuth();
        setIsAuthPopup(null);
      }
    } catch (err) {
      const errorMessage = (err as Error).message || 'Unknown error';
      console.warn('Registration error:', errorMessage);
    }
  };

  return (
    <div className={cls.content}>
      <h2>Sign in</h2>
      <div className={cls.withGoogle}>
        <GoogleLoginButton textButton="Continue with Google" />
      </div>
      <div className={cls.or}>or</div>

      <FormProvider {...form}>
        <form className={cls.registerWithEmail} onSubmit={handleSubmit(onSubmit)}>
          <FormField fieldName="email" type="email" labelText="E-mail" error={errors.email?.message} />
          <FormField fieldName="password" type="password" labelText="Password" error={errors.password?.message} />

          <RegularButton disabled={!isValid}>Sign up</RegularButton>
        </form>
      </FormProvider>
      <p className={cls.errorMessage}>{error?.message}</p>
      <div className={cls.noAccount}>
        No account? <span onClick={onSwitchToSignUp}>Create one</span>
      </div>
    </div>
  );
};
