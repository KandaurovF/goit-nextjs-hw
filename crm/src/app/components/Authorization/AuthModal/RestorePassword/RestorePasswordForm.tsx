import React from 'react';
import { useRouter } from 'next/navigation';
import { Form, Formik } from 'formik';
import { INITIAL_VALUES, validationSchema } from './RestorePasswordFormConfig';
import InputField from '@/app/components/common/InputField';
import FormValidationError from '@/app/components/common/ErrorHandlers/FormValidationError';
import Button from '@/app/components/common/Buttons/Button';
import { useMutation } from '@tanstack/react-query';
import FormErrorMessage from '@/app/components/common/ErrorHandlers/FormErrorMessage';

export type RestorePasswordValues = {
  newPassword: string;
  confirmNewPassword?: string;
};

export interface RestorePasswordProps {
  onSubmit?: () => void | Promise<void>;
}

function RestorePasswordForm({ onSubmit }: RestorePasswordProps) {
  const Router = useRouter();

  const restorePassword = async (values: RestorePasswordValues) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1000);
    });
  };

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: restorePassword,
    onSuccess: () => {
      if (onSubmit) {
        onSubmit();
      }

      Router.push('/dashboard');
    },
    onError: (err) => {
      console.error('Restore password error: ', err);
    },
  });
  const handleSubmit = async (values: RestorePasswordValues) => {
    const { confirmNewPassword, ...dataToSend } = values;

    console.log('ResorePassword values: ', dataToSend);
    await mutateAsync(dataToSend);
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col gap-10">
          <h2 className="text-xl font-semibold">Restore password</h2>

          <div className="flex flex-col gap-5">
            <InputField
              label="Enter new password"
              placeholder="Enter new password"
              name="newPassword"
              type="password"
              isRequired={true}
              disabled={isPending}
            />
            <FormValidationError
              error={errors.newPassword}
              touched={touched.newPassword}
            />

            <InputField
              label="Confirm new password"
              placeholder="Confirm new password"
              name="confirmNewPassword"
              type="password"
              isRequired={true}
              disabled={isPending}
            />
            <FormValidationError
              error={errors.confirmNewPassword}
              touched={touched.confirmNewPassword}
            />
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? 'Sending data...' : 'Confirm'}
          </Button>

          {isError && error && (
            <FormErrorMessage errorDetail={error?.message} />
          )}
        </Form>
      )}
    </Formik>
  );
}

export default RestorePasswordForm;
