import * as Yup from 'yup';

export const passwordValidationSchema = Yup.object().shape({
  oldPassword: Yup.string().when('$isGoogleUserUserWithoutPassword', {
    is: (isGoogleUserUserWithoutPassword: boolean) => !isGoogleUserUserWithoutPassword,
    then: () => Yup.string().required('Old password is required'),
    otherwise: () => Yup.string().notRequired(),
  }),
  newPassword: Yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Password repeat is required'),
});

export const personalDataValidationSchema = Yup.object().shape({
  displayName: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('E-mail is required'),
});
