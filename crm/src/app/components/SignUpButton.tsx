'use client';

import React, { useState } from 'react';
import Button from './common/Buttons/Button';
import { AuthModalState, useAuthStateStore } from '@/app/store/AuthState';
import AuthModal from './Authorization/AuthModal/AuthModal';

function SignUpButton() {
  const { setAuthModalState } = useAuthStateStore();
  const [show, setShow] = useState(false);

  const handleSwitch = () => {
    setAuthModalState(AuthModalState.SignUp);
    setShow(true);
  };

  return (
    <>
      <Button type="button" onClick={handleSwitch}>
        SignUp
      </Button>

      <AuthModal show={show} onClose={() => setShow(false)} />
    </>
  );
}

export default SignUpButton;
