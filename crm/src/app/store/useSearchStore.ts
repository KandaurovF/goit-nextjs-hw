import { create } from 'zustand';

interface SearchStore {
  companySearchTerm: string;
  promotionSearchTerm: string;
  setCompanySearchTerm: (term: string) => void;
  setPromotionSearchTerm: (term: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  companySearchTerm: '',
  promotionSearchTerm: '',
  setCompanySearchTerm: (term) => set({ companySearchTerm: term }),
  setPromotionSearchTerm: (term) => set({ promotionSearchTerm: term }),
}));
