import React, { useState } from 'react';
import { Field, useField } from 'formik';
import TogglePasswordButton from '@/app/components/common/Buttons/TogglePasswordButton';
import generateUniqueId from '@/app/lib/utils/generateUniqueId';
import RequiredMark from '@/app/components/common/RequiredMark';
import clsx from 'clsx';
// import * as Yup from 'yup';

export interface InputFieldProps {
  label?: string;
  id?: string;
  name: string;
  type?: string;
  placeholder?: string;
  as?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  isRequired?: boolean;
}

export default function InputField({
  label,
  id,
  name,
  type = 'text',
  placeholder,
  as = 'input',
  disabled = false,
  children,
  isRequired = false,
}: InputFieldProps) {
  const inputId = id || generateUniqueId(name);
  const [showPassword, setShowPassword] = useState(false);
  const [, meta] = useField(name);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={inputId} className="mb-2 text-base text-gray-900">
          {label} {isRequired && <RequiredMark />}
        </label>
      )}

      <div className="relative">
        <Field
          id={inputId}
          name={name}
          type={inputType}
          placeholder={placeholder}
          as={as}
          disabled={disabled}
          className={clsx(
            'w-full p-3 h-11 text-sm rounded border border-gray-300 shadow',
            meta.error &&
              meta.touched &&
              'bg-red-50 shadow-custom shadow-red-400',
          )}
        >
          {children}
        </Field>
        {type === 'password' && (
          <TogglePasswordButton
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          />
        )}
      </div>
    </div>
  );
}
