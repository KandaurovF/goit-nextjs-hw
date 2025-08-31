'use client';

import React, { useState } from 'react';
import { AuthModalState, useAuthStateStore } from '@/app/store/AuthState';
import { useMutation } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import { INITIAL_VALUES, validationSchema } from './ForgotPasswordConfig';
import InputField from '@/app/components/common/InputField';
import FormValidationError from '@/app/components/common/ErrorHandlers/FormValidationError';
import Button from '@/app/components/common/Buttons/Button';
import TextButton from '@/app/components/common/Buttons/TextButton';
import FormErrorMessage from '@/app/components/common/ErrorHandlers/FormErrorMessage';

export type ForgotPasswordValues = {
  email: string;
};

export interface ForgotPasswordProps {
  onSubmit: () => void | Promise<void>;
}

export const ForgotPasswordForm = ({ onSubmit }: ForgotPasswordProps) => {
  const { setAuthModalState } = useAuthStateStore();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  //Temporaly API
  const ForgotPassword = async (values: ForgotPasswordValues) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (values.email === 'error@example.com') {
          const error = new Error('User not found') as Error & {
            status?: number;
          };
          error.status = 404;
          console.error('Restore password error: ', error);

          reject(error);
        } else {
          console.log('Resolve success');
          resolve('Success');
        }
      }, 1000);
    });
  };

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: ForgotPassword,
    onSuccess: () => {
      setErrorMessage(null);

      setAuthModalState(AuthModalState.RestorePassword);
    },
    onError: (error: any) => {
      if (error.status === 404) {
        setErrorMessage(
          'Login not found. Please check your credentials or register.',
        );
      } else {
        setErrorMessage('An unexpected error occured. Please try again.');
      }
    },
  });

  const handleSubmit = async (values: ForgotPasswordValues) => {
    await mutateAsync(values);
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col gap-10">
          <h2 className="text-xl font-semibold">Forgot password</h2>
          <p>
            In order to access your account, please enter the email you provided
            during the registration process.
          </p>
          <div className="flex flex-col gap-2">
            <InputField
              label="Your Email"
              placeholder="email@exmple.com"
              name="email"
              isRequired={true}
              disabled={isPending}
            />
            <FormValidationError error={errors.email} touched={touched.email} />
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? 'Sending reset link...' : 'Send Reset Link'}
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
            <TextButton
              type="button"
              onClick={() => setAuthModalState(AuthModalState.ResetPassword)}
            >
              resetPass
            </TextButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};
