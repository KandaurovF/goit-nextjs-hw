import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

export interface ILogoUploaderProps {
  square?: boolean;
  label?: string;
  placeholder?: string;
  id: string;
  onFileChange: (file: File | null) => void;
  existingAvatar?: string;
}

const LogoUploader: React.FC<ILogoUploaderProps> = ({
  square = false,
  label,
  placeholder,
  id,
  onFileChange,
  existingAvatar,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (existingAvatar) {
      setPreview(existingAvatar);
    }
  }, [existingAvatar]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setPreview(URL.createObjectURL(file));
      onFileChange(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onFileChange(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col">
      {label && (
        <p className="items-start text-base color-gray-900 mb-2">{label}</p>
      )}
      <div className={clsx('relative', !square && 'mx-auto')}>
        <label
          htmlFor={id}
          className={clsx(
            'flex flex-col items-center justify-center h-48 bg-white border border-slate-900 border-dashed cursor-pointer overflow-hidden',
            !square && 'w-48 rounded-full',
            square && 'w-full',
          )}
        >
          {preview ? (
            <Image
              className="object-contain w-full h-full"
              width={192}
              height={192}
              src={preview}
              alt="avatar preview"
            />
          ) : (
            <>
              <Image
                className="mb-1"
                width={48}
                height={48}
                src="/icons/upload.svg"
                alt="upload"
              />
              {placeholder && (
                <p className="text-base text-gray-500">{placeholder}</p>
              )}
            </>
          )}
          <input
            id={id}
            type="file"
            ref={inputRef}
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />
        </label>
        {preview && (
          <button
            type="button"
            className="absolute top-1 right-0 flex items-center justify-center w-6 h-6 border-gray-300 shadow rounded-full "
            onClick={handleRemove}
          >
            <Image
              width={18}
              height={18}
              src="/icons/x-mark.svg"
              alt="close icon"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default LogoUploader;
