import React from 'react';
import SignInButton from './components/SignInButton';
import SignUpButton from './components/SignUpButton';

export default function Home() {
  return (
    <main>
      <h1 className="text-xl">Wellcome</h1>
      <SignInButton />
      <SignUpButton />
    </main>
  );
}
