import { buildUrl, sendRequest } from '../helpers';

export interface SignUpValues {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export const signUp = async (values: SignUpValues, init?: RequestInit) => {
  const data = await sendRequest<SignUpValues>(buildUrl('auth/signup'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
    ...init,
  });

  console.log('SignUp data', data);
  return data;
};
