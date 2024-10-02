import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { useAuth } from 'shared/lib/reactContext/Auth/useAuth';
import { SET_NEW_PASSWORD } from 'shared/query/apolloQuries';
import { FormField } from 'shared/ui/FormField';
import { Loader } from 'shared/ui/Loader';
import { RegularButton } from 'shared/ui/RegularButton';
import { passwordValidationSchema, personalDataValidationSchema } from '../lib/validationSchema';
import cls from './UserProfile.module.scss';

interface SetNewPasswordFormData {
  oldPassword?: string;
  newPassword: string;
  repeatPassword: string;
}

interface PersonalDataFormData {
  displayName: string;
  email: string;
}

const UserProfile = () => {
  // const [showPassword, setShowPassword] = useState(false);

  const { user, loading: loadingUserData } = useAuth();

  const passwordForm = useForm<SetNewPasswordFormData>({
    mode: 'onBlur',
    resolver: yupResolver(passwordValidationSchema),
    context: { isGoogleUserUserWithoutPassword: user?.isGoogleUserUserWithoutPassword },
  });

  const personalDataForm = useForm<PersonalDataFormData>({
    mode: 'onBlur',
    resolver: yupResolver(personalDataValidationSchema),
    defaultValues: {
      displayName: user?.displayName || '',
      email: user?.email || '',
    },
  });

  const {
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors, isValid: isPasswordValid },
  } = passwordForm;

  const {
    handleSubmit: handlePersonalDataSubmit,
    // formState: { errors: personalDataErrors, isValid: isPersonalDataValid },
    reset,
  } = personalDataForm;

  const [setNewPassword] = useMutation(SET_NEW_PASSWORD);

  useEffect(() => {
    if (user) {
      reset({
        displayName: user.displayName,
        email: user.email,
      });
    }
  }, [user, reset]);

  if (loadingUserData) return <Loader />;

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  const onSetNewPasswordSubmit: SubmitHandler<SetNewPasswordFormData> = async (data) => {
    try {
      const response = await setNewPassword({
        variables: {
          userId: user.id,
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        },
      });
      if (response) {
        console.log('password success');
      }
    } catch (err) {
      const errorMessage = (err as Error).message || 'Unknown error';

      console.error('Registration error:', errorMessage);
    }
  };

  const onChangePersonalDataSubmit: SubmitHandler<PersonalDataFormData> = async (data) => {
    try {
      const response = await setNewPassword({
        variables: {
          userId: user.id,
          displayName: data.displayName,
          email: data.email,
        },
      });
      if (response) {
        console.log('password success');
      }
    } catch (err) {
      const errorMessage = (err as Error).message || 'Unknown error';

      console.error('Registration error:', errorMessage);
    }
  };

  return (
    <div className="container">
      <div className={cls.settingsPictureCard}>
        <div className={cls.settingsPicture}>
          <div className={cls.profileAvatar}>
            <img src={user.avatar || './user-default-icon.svg'} alt={`${user.displayName}'s avatar`} />
          </div>
          <div className={cls.pictureRequirements}>
            <h4>Profile picture</h4>
            <p>PNG, JPEG under 15MB</p>
          </div>
          <div className={cls.pictureButtons}>
            <RegularButton>Upload new picture</RegularButton>
            <RegularButton theme="blank">Delete</RegularButton>
          </div>
        </div>
      </div>
      <div className={cls.settingsCard}>
        <h2>Personal data</h2>
        <FormProvider {...personalDataForm}>
          <form className={cls.userForm} onSubmit={handlePersonalDataSubmit(onChangePersonalDataSubmit)}>
            <FormField fieldName="displayName" type="text" labelText="Name" />
            <FormField fieldName="email" type="email" labelText="E-mail" />

            <RegularButton>Save changes</RegularButton>
          </form>
        </FormProvider>
      </div>
      <div className={cls.settingsCard}>
        <h2>Password</h2>

        <FormProvider {...passwordForm}>
          <form className={cls.userForm} onSubmit={handlePasswordSubmit(onSetNewPasswordSubmit)}>
            <input
              type="email"
              name="email"
              value={user.email}
              autoComplete="email"
              style={{ display: 'none' }}
              readOnly
            />
            {user.isGoogleUserUserWithoutPassword ? (
              <p className={cls.warn}>
                You&apos;re logged in with Google and don&apos;t have a password yet. Set one here to enable logging in
                with your email and password.
              </p>
            ) : (
              <FormField
                fieldName="oldPassword"
                type="password"
                labelText="Old Password"
                error={passwordErrors.oldPassword?.message}
                autoComplete="current-password"
              />
            )}
            <FormField
              fieldName="newPassword"
              type="password"
              labelText="New password"
              autoComplete="new-password"
              error={passwordErrors.newPassword?.message}
            />
            <FormField
              fieldName="repeatPassword"
              type="password"
              labelText="Repeat password"
              autoComplete="new-password"
              error={passwordErrors.repeatPassword?.message}
            />

            <RegularButton type="submit" disabled={!isPasswordValid}>
              Save changes
            </RegularButton>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default UserProfile;
