import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Button from '@/app/components/common/Buttons/Button';
import InputField from '@/app/components/common/InputField';
import LogoUploader from '@/app/components/common/LogoUploader';
import { CompanyStatus, createCompany, updateCompany } from '@/app/lib/api';
import StatusLabel from '../StatusLabel';
import FormValidationError from '@/app/components/common/ErrorHandlers/FormValidationError';
import { useActionsCompanyStore } from '@/app/store/useActionsCompanyStore';
import toast from 'react-hot-toast';

export type CompanyFieldValues = {
  title: string;
  description: string;
  status: CompanyStatus;
  joinedDate: string;
  categoryTitle: string;
  countryTitle: string;
  cityTitle: string;
  avatar?: string;
};

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  joinedDate: Yup.date().required('Joined Date is required'),
  categoryTitle: Yup.string().required('Category is required'),
  countryTitle: Yup.string().required('Country is required'),
  cityTitle: Yup.string().required('City is required'),
  avatar: Yup.mixed().nullable(),
});

export interface CompanyFormProps {
  onSubmit?: (values: CompanyFieldValues) => void | Promise<void>;
  isEditMode?: boolean;
}

export default function CompanyForm({
  onSubmit,
  isEditMode = false,
}: CompanyFormProps) {
  const queryClient = useQueryClient();

  const company = useActionsCompanyStore((state) => state.company);

  const initialValues: CompanyFieldValues =
    isEditMode && company
      ? {
          title: company.title,
          description: company.description,
          status: company.status,
          joinedDate: company.joinedDate.split('T')[0],
          categoryTitle: company.categoryTitle,
          countryTitle: company.countryTitle,
          cityTitle: company.cityTitle,
          avatar: company.avatar,
        }
      : {
          title: '',
          description: '',
          status: CompanyStatus.Pending,
          joinedDate: '',
          categoryTitle: '',
          countryTitle: '',
          cityTitle: '',
          avatar: '',
        };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: isEditMode ? updateCompany : createCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['companies'],
      });

      toast.success(
        isEditMode
          ? 'Company updated successfully!'
          : 'Company created successfully!',
      );
    },

    onError: () => {
      toast.error(
        isEditMode ? 'Failed to update company' : 'Failed to create company',
      );
    },
  });

  const handleSubmit = async (values: CompanyFieldValues) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      const value = values[key as keyof CompanyFieldValues];
      if (value !== undefined && value !== null) {
        formData.append(key, value as string | Blob);
      }
    });

    if (isEditMode && company?._id) {
      formData.append('_id', company._id);
    }

    await mutateAsync(formData);

    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form className="flex flex-col gap-10">
          {isEditMode && !company ? (
            <p>Loading company data...</p>
          ) : (
            <>
              <div className="flex gap-10">
                <div className="flex flex-col flex-1 gap-5">
                  <p className="text-xl font-bold">
                    {isEditMode ? 'Edit company' : 'Add new company'}
                  </p>
                  <LogoUploader
                    label="Logo"
                    placeholder="Upload image"
                    id="avatar"
                    onFileChange={(file) => {
                      setFieldValue('avatar', file);
                    }}
                    existingAvatar={initialValues.avatar}
                  />
                  <FormValidationError
                    error={errors.avatar}
                    touched={touched.avatar}
                  />

                  <InputField
                    label="Status"
                    placeholder="Status"
                    name="status"
                    as="select"
                  >
                    {(Object.values(CompanyStatus) as CompanyStatus[]).map(
                      (status) => (
                        <option key={status} value={status}>
                          <StatusLabel status={status} styled={false} />
                        </option>
                      ),
                    )}
                  </InputField>

                  <InputField
                    label="Country"
                    placeholder="Country"
                    name="countryTitle"
                  />
                  <FormValidationError
                    error={errors.countryTitle}
                    touched={touched.countryTitle}
                  />
                </div>
                <div className="flex flex-col flex-1 gap-5 pt-1">
                  <InputField label="Title" placeholder="Title" name="title" />
                  <FormValidationError
                    error={errors.title}
                    touched={touched.title}
                  />

                  <InputField
                    label="Category"
                    placeholder="Category"
                    name="categoryTitle"
                  />
                  <FormValidationError
                    error={errors.categoryTitle}
                    touched={touched.categoryTitle}
                  />

                  <InputField
                    label="Joined date"
                    type="date"
                    name="joinedDate"
                  />
                  <FormValidationError
                    error={errors.joinedDate}
                    touched={touched.joinedDate}
                  />

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
                    label="City"
                    placeholder="City"
                    name="cityTitle"
                  />
                  <FormValidationError
                    error={errors.cityTitle}
                    touched={touched.cityTitle}
                  />
                </div>
              </div>
              <Button type="submit" disabled={isPending}>
                {isEditMode ? 'Update company' : 'Add company'}
              </Button>
            </>
          )}
        </Form>
      )}
    </Formik>
  );
}
