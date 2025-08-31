import React from 'react';
import { Form, Formik } from 'formik';
import { INITIAL_VALUES, validationSchema } from './ResetPasswordConfig';
import InputField from '@/app/components/common/InputField';
import FormValidationError from '@/app/components/common/ErrorHandlers/FormValidationError';
import Button from '@/app/components/common/Buttons/Button';

export type ResetPasswordValues = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword?: string;
};

export interface ResetPasswordProps {
  onSubmit?: () => void | Promise<void>;
}

export default function ResetPasswordForm({ onSubmit }: ResetPasswordProps) {
  const handleSubmit = (values: ResetPasswordValues) => {
    const { confirmNewPassword, ...dataToSend } = values;

    console.log('ResorePassword values: ', dataToSend);

    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col gap-10">
          <h2 className="text-xl font-semibold">Reset Password</h2>

          <div className="flex flex-col gap-5">
            <InputField
              label="Current password"
              placeholder="Enter your current password"
              name="currentPassword"
              type="password"
              isRequired={true}
            />
            <FormValidationError
              error={errors.currentPassword}
              touched={touched.currentPassword}
            />

            <InputField
              label="New password"
              placeholder="Enter new password"
              name="newPassword"
              type="password"
              isRequired={true}
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
            />
            <FormValidationError
              error={errors.confirmNewPassword}
              touched={touched.confirmNewPassword}
            />
          </div>

          <Button type="submit">Confirm</Button>
        </Form>
      )}
    </Formik>
  );
}
