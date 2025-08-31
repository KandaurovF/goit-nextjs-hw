import * as Yup from 'yup';

export const INITIAL_VALUES = {
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

export const validationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(7, 'Password must be at least 7 characters long')
    .required('Password is required'),
  newPassword: Yup.string()
    .min(7, 'Password must be at least 7 characters long')
    .required('New password is required')
    .test(
      'not-same',
      'New password must be different from the current password',
      function (value) {
        return value !== this.parent.currentPassword;
      },
    ),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), undefined], 'Passwords must match')
    .required('Please confirm your password'),
});
