import { buildUrl, sendRequest } from '../helpers';

export interface SummaryStats {
  promotions: number;
  categories: number;
  newCompanies: number;
  activeCompanies: number;
}

export const getSummaryStats = async (init?: RequestInit) => {
  try {
    const data = await sendRequest<SummaryStats>(
      buildUrl('summary-stats'),
      init,
    );
    // console.log('SummaryStats data: ', data);
    return data;
  } catch (error) {
    console.error(`Error fetching SummaryStats: ${error}`);
    throw error;
  }
};
