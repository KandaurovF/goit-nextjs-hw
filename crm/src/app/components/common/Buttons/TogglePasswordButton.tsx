import React from 'react';
import ShowPasswordIcon from '/public/icons/outline_eye-slash.svg';
import HidePasswordIcon from '/public/icons/outline_eye.svg';

export interface TogglePasswordButtonProps {
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  className?: string;
}

export default function TogglePasswordButton({
  showPassword,
  togglePasswordVisibility,
  className,
}: TogglePasswordButtonProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={togglePasswordVisibility}
    >
      {showPassword ? <ShowPasswordIcon /> : <HidePasswordIcon />}
    </button>
  );
}
