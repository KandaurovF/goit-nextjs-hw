import { buildUrl, sendRequest } from '../helpers';

export interface Category {
  categoryId: string;
  categoryTitle: string;
  companyCount: number;
}

export const getCategories = async (init?: RequestInit) => {
  try {
    const data = await sendRequest<Category[]>(buildUrl('categories'), init);
    // console.log(`Categories data: ${data}`);
    return data;
  } catch (error) {
    console.error(`Error fetching Categories: ${error}`);
    throw error;
  }
};
