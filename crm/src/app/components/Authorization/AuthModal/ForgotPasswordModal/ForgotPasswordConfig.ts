import * as Yup from 'yup';

export const INITIAL_VALUES = { email: '' };

export const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
});
