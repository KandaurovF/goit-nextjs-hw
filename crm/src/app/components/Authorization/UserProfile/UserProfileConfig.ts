import * as Yup from 'yup';

export const INITIAL_VALUES = {
  name: '',
  email: '',
  contact: '',
  birthday: '',
  about: '',
};

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  contact: Yup.string(),
  birthday: Yup.string(),
  about: Yup.string(),
});
