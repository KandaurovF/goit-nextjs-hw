'use client';

import React, { useState } from 'react';
import { AuthModalState, useAuthStateStore } from '@/app/store/AuthState';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import { INITIAL_VALUES, signUpValidationSchema } from './SignUpFormConfig';
import InputField from '@/app/components/common/InputField';
import FormValidationError from '@/app/components/common/ErrorHandlers/FormValidationError';
import Button from '@/app/components/common/Buttons/Button';
import TextButton from '@/app/components/common/Buttons/TextButton';
import FormErrorMessage from '@/app/components/common/ErrorHandlers/FormErrorMessage';
import { signUp, SignUpValues } from '@/app/lib/api/auth';

export interface SignUpProps {
  onSubmit?: () => void | Promise<void>;
}

function SignUpForm({ onSubmit }: SignUpProps) {
  const Router = useRouter();
  const { setAuthModalState } = useAuthStateStore();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  //Temporaly API
  // const signUp = async (values: SignUpFieldValues) => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (values.email === 'test@example.com') {
  //         reject(new Error('This email is already in use'));
  //       }
  //       resolve({ success: true });
  //     }, 1000);
  //   });
  // };

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      if (onSubmit) {
        onSubmit();
      }

      Router.push('/profile');
    },
    onError: (err) => {
      setErrorMessage('Sign up failed. Please try again');
      console.error('SignUp error: ', err);
    },
  });

  const handleSubmit = async (values: SignUpValues) => {
    const { confirmPassword, ...dataToSend } = values;

    console.log('SignUpForm values: ', dataToSend);
    await mutateAsync(dataToSend);
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={signUpValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col gap-10">
          <h2 className="font-semibold text-xl">Create an account</h2>

          <div className="flex flex-col gap-5">
            <InputField
              label="Name"
              placeholder="Name"
              name="name"
              isRequired={true}
              disabled={isPending}
            />
            <FormValidationError error={errors.name} touched={touched.name} />

            <InputField
              label="Email"
              placeholder="Email@example.com"
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

            <InputField
              label="Confirm password"
              placeholder="Re-enter password"
              type="password"
              name="confirmPassword"
              isRequired={true}
              disabled={isPending}
            />
            <FormValidationError
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
            />
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? 'Signing Up...' : 'SignUp'}
          </Button>

          {isError && error && (
            <FormErrorMessage
              errorMessage={errorMessage}
              errorDetail={error?.message}
            />
          )}

          <div className="flex gap-1">
            <p>Already have an account? Back to</p>
            <TextButton
              type="button"
              onClick={() => setAuthModalState(AuthModalState.SignIn)}
            >
              Sign In
            </TextButton>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default SignUpForm;
