import { create } from 'zustand';

export enum AuthModalState {
  SignIn = 'SignIn',
  SignUp = 'SignUp',
  ForgotPassword = 'ForgotPassword',
  RestorePassword = 'RestorePassword',
  ResetPassword = 'ResetPassword',
}

interface AuthState {
  authModalState: AuthModalState;
  setAuthModalState: (state: AuthModalState) => void;
}

export const useAuthStateStore = create<AuthState>((set) => ({
  authModalState: AuthModalState.SignIn,
  setAuthModalState: (state) => set({ authModalState: state }),
}));
