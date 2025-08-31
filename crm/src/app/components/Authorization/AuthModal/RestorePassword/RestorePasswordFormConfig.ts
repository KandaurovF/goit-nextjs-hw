import * as Yup from 'yup';

export const INITIAL_VALUES = {
  newPassword: '',
  confirmNewPassword: '',
};

export const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(7, 'Password must be at least 7 characters long')
    .required('Password is required'),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), undefined], 'Passwords must match')
    .required('Please confirm your password'),
});
