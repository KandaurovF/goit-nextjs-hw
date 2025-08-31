import { buildUrl, sendRequest } from '../helpers';

export interface SummarySales {
  id: string;
  companyId: string;
  companyTitle: string;
  totalSold: number;
  totalIncome: number;
}

export const getSummarySales = async (init?: RequestInit) => {
  try {
    const data = await sendRequest<SummarySales[]>(
      buildUrl('sales', 'summary'),
      init,
    );
    // console.log(`SummarySales data: `, data);
    return data;
  } catch (error) {
    console.error(`Error fetching SummarySales: ${error}`);
    throw error;
  }
};
