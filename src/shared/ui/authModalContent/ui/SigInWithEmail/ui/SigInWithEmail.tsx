import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
// import ReCAPTCHA from 'react-google-recaptcha';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import { useAuth } from 'shared/lib/reactContext/Auth/useAuth';
import { SIGN_IN_WITH_EMAIL } from 'shared/query/apolloQuries';
import { RegularButton } from 'shared/ui/RegularButton';
import { FormField } from '../../../../FormField';
import { GoogleLoginButton } from '../../../../GoogleLoginButton';

import { validationSchema } from '../lib/validationSchema';
import cls from './SigInWithEmail.module.scss';

interface SignInWithEmailProps {
  onSwitchToSignUp: () => void;
}

interface SigInWithEmailData {
  email: string;
  password: string;
}

export const SignInWithEmail = ({ onSwitchToSignUp }: SignInWithEmailProps) => {
  const [
    signInWithEmail,
    {
      // loading,
      error,
    },
  ] = useMutation(SIGN_IN_WITH_EMAIL);
  const { checkAuth, setIsLoginPopup } = useAuth();
  const form = useForm<SigInWithEmailData>({ mode: 'onBlur', resolver: yupResolver(validationSchema) });

  const {
    handleSubmit,
    // setValue,
    // trigger,
    formState: { errors, isValid },
  } = form;

  // const handleCaptchaChange = (value: string | null) => {
  //   setValue('recaptcha', value || '');
  //   trigger('recaptcha');
  // };

  const onSubmit: SubmitHandler<SigInWithEmailData> = async (data) => {
    try {
      const response = await signInWithEmail({
        variables: {
          email: data.email,
          password: data.password,
        },
      });
      if (response) {
        checkAuth();
        setIsLoginPopup(false);
      }
    } catch (err) {
      const errorMessage = (err as Error).message || 'Unknown error';
      console.error('Registration error:', errorMessage);
    }
  };

  return (
    <div className={cls.content}>
      <h1>Sing in</h1>
      <div className={cls.withGoogle}>
        <GoogleLoginButton textButton="Continue with Google" />
      </div>
      <div className={cls.or}>or</div>

      <FormProvider {...form}>
        <form className={cls.registerWithEmail} onSubmit={handleSubmit(onSubmit)}>
          <FormField fieldName="email" type="email" labelText="E-mail" error={errors.email?.message} />
          <FormField fieldName="password" type="password" labelText="Password" error={errors.password?.message} />
          {/* <div className={cls.recaptcha}>
            <ReCAPTCHA
              sitekey={
                process.env.VITE_ENV === 'development'
                  ? process.env.RE_CAPTCHA_KEY_DEV!
                  : process.env.RE_CAPTCHA_KEY_PROD!
              }
              onChange={handleCaptchaChange}
            />
            {errors.recaptcha && <p>Please complete the reCAPTCHA</p>}
          </div>
          <FormField fieldName="recaptcha" type="hidden" error={errors.recaptcha?.message} value={''} /> */}
          <RegularButton disabled={!isValid}>Sign up</RegularButton>
        </form>
      </FormProvider>
      {error?.message}
      <div className={cls.signUp}>
        No account? <span onClick={onSwitchToSignUp}>Create one</span>
      </div>
    </div>
  );
};
