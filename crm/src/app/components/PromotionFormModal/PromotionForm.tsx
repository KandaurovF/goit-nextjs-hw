'use client';

import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPromotion } from '@/app/lib/api';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormValidationError from '@/app/components/common/ErrorHandlers/FormValidationError';
import InputField from '@/app/components/common/InputField';
import LogoUploader from '@/app/components/common/LogoUploader';
import Button from '@/app/components/common/Buttons/Button';

export type PromotionFieldValues = {
  title: string;
  description: string;
  discount: string | number;
  companyId: string;
  avatar?: File | null;
};

const initialValues = (companyId: string): PromotionFieldValues => ({
  title: '',
  description: '',
  discount: '',
  avatar: null,
  companyId,
});

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  discount: Yup.number().required('Discount is required'),
  companyId: Yup.string().required('Company ID is required'),
  avatar: Yup.mixed().nullable(),
});

export interface PromotionFormProps {
  companyId: string;
  onSubmit?: (values: PromotionFieldValues) => void | Promise<void>;
}

export default function PromotionForm({
  companyId,
  onSubmit,
}: PromotionFormProps) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createPromotion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['promotions', companyId],
      });

      queryClient.invalidateQueries({
        queryKey: ['promotions'],
        exact: true,
      });
    },
  });

  const handleSubmit = async (values: PromotionFieldValues) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      const value = values[key as keyof PromotionFieldValues];
      if (value !== undefined && value !== null) {
        formData.append(key, value as string | Blob);
      }
    });

    await mutateAsync(formData);

    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <Formik
      initialValues={initialValues(companyId)}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form className="flex flex-col gap-10">
          <p className="mb-0.5 text-xl">Add new promotion</p>
          <div className="flex flex-col gap-5">
            <InputField label="Title" placeholder="Title" name="title" />
            <FormValidationError error={errors.title} touched={touched.title} />

            <InputField
              label="Description"
              placeholder="Description"
              name="description"
            />
            <FormValidationError
              error={errors.description}
              touched={touched.description}
            />

            <InputField
              type="number"
              label="Discount"
              placeholder="Discount"
              name="discount"
            />
            <FormValidationError
              error={errors.discount}
              touched={touched.discount}
            />

            <LogoUploader
              square
              id="avatar"
              label="Image"
              placeholder="Uplod image"
              onFileChange={(file) => {
                setFieldValue('avatar', file);
              }}
            />
            <FormValidationError
              error={errors.avatar}
              touched={touched.avatar}
            />
          </div>

          <Button type="submit" disabled={isPending}>
            Add promotion
          </Button>
        </Form>
      )}
    </Formik>
  );
}
