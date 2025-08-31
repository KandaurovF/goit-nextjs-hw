'use client';

import React, { useState } from 'react';
import Button from './common/Buttons/Button';
import { AuthModalState, useAuthStateStore } from '@/app/store/AuthState';
import AuthModal from './Authorization/AuthModal/AuthModal';

function SignInButton() {
  const { setAuthModalState } = useAuthStateStore();
  const [show, setShow] = useState(false);

  const handleSwitch = () => {
    setAuthModalState(AuthModalState.SignIn);
    setShow(true);
  };

  return (
    <>
      <Button type="button" onClick={handleSwitch}>
        SignIn
      </Button>
      <AuthModal show={show} onClose={() => setShow(false)} />
    </>
  );
}

export default SignInButton;
