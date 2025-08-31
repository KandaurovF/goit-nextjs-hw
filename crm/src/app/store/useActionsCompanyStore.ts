import { create } from 'zustand';
import { Company } from '@/app/lib/api';

export interface ActionsCompanyState {
  company: Company | null;
  setCompany: (company: Company) => void;
}

export const useActionsCompanyStore = create<ActionsCompanyState>((set) => ({
  company: null,
  setCompany: (company) => set({ company }),
}));
