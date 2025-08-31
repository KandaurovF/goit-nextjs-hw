'use client';

import React from 'react';
import { useAuthStateStore } from '@/app/store/AuthState';
import Modal, { ModalProps } from '@/app/components/common/Modal';
import { SignInForm } from './SignInFormModal';
import { SignUpForm } from './SignUpModal';
import { ForgotPasswordForm } from './ForgotPasswordModal/ForgotPassword';
import RestorePasswordForm from './RestorePassword/RestorePasswordForm';
import Image from 'next/image';
import ResetPasswordForm from './ResetPassword/ResetPasswordForm';

function AuthModal({ onClose, ...rest }: ModalProps) {
  const { authModalState } = useAuthStateStore();

  return (
    <Modal {...rest} onClose={onClose}>
      <div className="bg-gray-900 rounded">
        <Image
          src="/icons/logo.svg"
          alt="logo"
          width={122}
          height={24}
          className="py-8 mb-11 mx-auto"
        />
      </div>

      {authModalState === 'SignIn' && <SignInForm onSubmit={() => onClose()} />}
      {authModalState === 'SignUp' && <SignUpForm onSubmit={() => onClose()} />}
      {authModalState === 'ForgotPassword' && (
        <ForgotPasswordForm onSubmit={() => onClose()} />
      )}
      {authModalState === 'RestorePassword' && (
        <RestorePasswordForm onSubmit={() => onClose()} />
      )}
      {authModalState === 'ResetPassword' && (
        <ResetPasswordForm onSubmit={() => onClose()} />
      )}
    </Modal>
  );
}

export default AuthModal;
