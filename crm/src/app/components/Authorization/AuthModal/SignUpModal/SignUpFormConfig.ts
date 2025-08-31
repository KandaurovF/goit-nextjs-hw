import * as Yup from 'yup';

export const INITIAL_VALUES = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const signUpValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(7, 'Password must be at least 7 characters long')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Please confirm your password'),
});
