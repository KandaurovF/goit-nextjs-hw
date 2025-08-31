import React from 'react';
import { Form, Formik } from 'formik';
import { INITIAL_VALUES, validationSchema } from './UserProfileConfig';
import InputField from '@/app/components/common/InputField';
import FormValidationError from '@/app/components/common/ErrorHandlers/FormValidationError';
import Button from '@/app/components/common/Buttons/Button';
import FormErrorMessage from '@/app/components/common/ErrorHandlers/FormErrorMessage';

export type UserProfileFieldValues = {
  name: string;
  email: string;
  contact: string;
  birthday: string;
  about: string;
};

function UserProfileForm() {
  const handleSubmit = async (values: UserProfileFieldValues) => {
    console.log('UserProfileValues', values);
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <InputField
            label="Name"
            placeholder="Name"
            name="name"
            isRequired={true}
          />
          <FormValidationError error={errors.name} touched={touched.name} />

          <InputField
            label="Email"
            placeholder="Email@example.com"
            name="email"
            isRequired={true}
          />
          <FormValidationError error={errors.email} touched={touched.email} />

          <InputField label="Contact" placeholder="Contact" name="contact" />
          <FormValidationError
            error={errors.contact}
            touched={touched.contact}
          />

          <InputField
            label="Birthday"
            placeholder="Birthday date"
            name="birthday"
          />
          <FormValidationError
            error={errors.birthday}
            touched={touched.birthday}
          />

          <InputField label="About" placeholder="About" name="about" />
          <FormValidationError error={errors.about} touched={touched.about} />

          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  );
}

export default UserProfileForm;
