import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import { INITIAL_VALUES, signInValidationSchema } from './SignInFormConfig';
import InputField from '@/app/components/common/InputField';
import FormValidationError from '@/app/components/common/ErrorHandlers/FormValidationError';
import Button from '@/app/components/common/Buttons/Button';
import TextButton from '@/app/components/common/Buttons/TextButton';
import { AuthModalState, useAuthStateStore } from '@/app/store/AuthState';
import FormErrorMessage from '@/app/components/common/ErrorHandlers/FormErrorMessage';

export type SignInFieldValues = {
  email: string;
  password: string;
};

export interface SignInProps {
  onSubmit: () => void | Promise<void>;
}

function SignInForm({ onSubmit }: SignInProps) {
  const Router = useRouter();
  const { setAuthModalState } = useAuthStateStore();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  //Temporaly API
  const SignIn = async (values: SignInFieldValues) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (values.email === 'error@example.com') {
          // Создание кастомной ошибки с полем status
          const error = new Error('User not found') as Error & {
            status?: number;
          };
          error.status = 404; // Присвоение статуса ошибки
          reject(error);
        } else {
          resolve('Success');
        }
      }, 1000);
    });
  };

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: SignIn,
    onSuccess: () => {
      setErrorMessage(null);
      onSubmit();

      Router.push('/dashboard');
    },
    onError: (error: any) => {
      if (error.status === 404) {
        setErrorMessage(
          'Login not found. Please check your credentials or register.',
        );
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    },
  });

  const handleSubmit = async (values: SignInFieldValues) => {
    console.log('SignInValues: ', values);
    await mutateAsync(values);
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={signInValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col gap-10">
          <h2 className="text-xl font-semibold">Sign In</h2>

          <div className="flex flex-col gap-5">
            <InputField
              label="Email"
              placeholder="email@exmple.com"
              name="email"
              isRequired={true}
              disabled={isPending}
            />
            <FormValidationError error={errors.email} touched={touched.email} />

            <InputField
              label="Enter password"
              placeholder="Enter password"
              name="password"
              type="password"
              isRequired={true}
              disabled={isPending}
            />
            <FormValidationError
              error={errors.password}
              touched={touched.password}
            />

            <p
              className="mt-3 text-sm text-blue-600 hover:underline cursor-pointer"
              onClick={() => setAuthModalState(AuthModalState.ForgotPassword)}
            >
              Forgot password?
            </p>
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? 'Signing in ...' : 'Sign In'}
          </Button>

          {isError && error && (
            <FormErrorMessage
              errorMessage={errorMessage}
              errorDetail={error?.message}
            />
          )}

          <div className="flex gap-1">
            <p>Don`t have an account? Register here</p>
            <TextButton
              type="button"
              onClick={() => setAuthModalState(AuthModalState.SignUp)}
            >
              Sign Up
            </TextButton>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default SignInForm;
