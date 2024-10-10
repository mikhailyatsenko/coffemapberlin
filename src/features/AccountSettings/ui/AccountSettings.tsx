import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { useAuth } from 'shared/lib/reactContext/Auth/useAuth';
import { SET_NEW_PASSWORD, UPDATE_PERSONAL_DATA } from 'shared/query/apolloQueries';
import { FormField } from 'shared/ui/FormField';
import { Loader } from 'shared/ui/Loader';
import { RegularButton } from 'shared/ui/RegularButton';
import Toast from 'shared/ui/ToastMessage/Toast';
import { passwordValidationSchema, personalDataValidationSchema } from '../lib/validationSchema';
import cls from './AccountSettings.module.scss';

interface SetNewPasswordFormData {
  oldPassword?: string;
  newPassword: string;
  repeatPassword: string;
}

interface PersonalDataFormData {
  displayName: string;
  email: string;
}

export const AccountSettings = () => {
  const [toastMessage, setToastMessage] = useState<string>('');

  const { user, checkAuth, loading: loadingUserData } = useAuth();

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
    reset: resetPasswordValues,
  } = passwordForm;

  const {
    handleSubmit: handlePersonalDataSubmit,
    formState: { errors: personalDataErrors, isValid: isPersonalDataValid },
    reset: resetPersonalData,
    watch: watchPersonalData,
  } = personalDataForm;

  const [setNewPassword, { loading: loadingPassword, error: errorPassword }] = useMutation(SET_NEW_PASSWORD);
  const [updatePersonalData, { loading: loadingPersonalData, error: errorPersonalData }] =
    useMutation(UPDATE_PERSONAL_DATA);

  useEffect(() => {
    if (user) {
      resetPersonalData({
        displayName: user.displayName,
        email: user.email,
      });
    }
  }, [user, resetPersonalData]);

  if (loadingUserData || loadingPassword || loadingPersonalData) return <Loader />;

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  const isDisplayNameChanged = watchPersonalData('displayName').trim() !== user?.displayName;

  const isEmailChanged = watchPersonalData('email').trim() !== user?.email;

  const isButtonPersonalFormDisabled = !isDisplayNameChanged && !isEmailChanged;

  const onUpdatePersonalDataSubmit: SubmitHandler<PersonalDataFormData> = async (data) => {
    try {
      const response = await updatePersonalData({
        variables: {
          userId: user.id,
          displayName: data.displayName.trim(),
          email: data.email.trim(),
        },
      });
      if (response) {
        checkAuth();
        setToastMessage('Profile updated successfully');
      }
    } catch (err) {
      const errorMessage = (err as Error).message || 'Unknown error';

      console.error('Registration error:', errorMessage);
    }
  };

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
        resetPasswordValues();
        checkAuth();
        setToastMessage('Password updated successfully');
      }
    } catch (err) {
      const errorMessage = (err as Error).message || 'Unknown error';

      console.error('Registration error:', errorMessage);
    }
  };

  return (
    <div className={cls.settingsSection}>
      <div className={cls.settingsCard}>
        <h2 className={cls.settingsTitle}>Personal data</h2>
        <FormProvider {...personalDataForm}>
          <form className={cls.userForm} onSubmit={handlePersonalDataSubmit(onUpdatePersonalDataSubmit)}>
            <FormField
              fieldName="displayName"
              type="text"
              labelText="Name"
              error={personalDataErrors.displayName?.message}
            />
            <FormField fieldName="email" type="email" labelText="E-mail" error={personalDataErrors.email?.message} />

            <RegularButton className={cls.submitButton} disabled={!isPersonalDataValid || isButtonPersonalFormDisabled}>
              Save changes
            </RegularButton>
          </form>
        </FormProvider>
        <p className={cls.errorMessage}>{errorPersonalData?.message}</p>
      </div>

      <div className={cls.settingsCard}>
        <h2 className={cls.settingsTitle}>Password</h2>
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
            {!user.isGoogleUserUserWithoutPassword && (
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

            <RegularButton className={cls.submitButton} type="submit" disabled={!isPasswordValid}>
              Save changes
            </RegularButton>
          </form>

          {user.isGoogleUserUserWithoutPassword && (
            <div className={cls.noPasswordInfo}>
              You&apos;re logged in with Google and don&apos;t have a password yet. Set one here to enable logging in
              with your email and password.
            </div>
          )}
        </FormProvider>
        <p className={cls.errorMessage}>{errorPassword?.message}</p>
      </div>
      <Toast message={toastMessage} theme="green" />
    </div>
  );
};
