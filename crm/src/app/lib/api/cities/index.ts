import { buildUrl, sendRequest } from '../helpers';

export interface City {
  _id: string;
  title: string;
  countryTitle: string;
  companyTitles: string[];
}

export const getCities = async (init?: RequestInit) => {
  try {
    const data = await sendRequest<City[]>(buildUrl('cities'), init);
    // console.log(`Cities data: ${data}`);
    return data;
  } catch (error) {
    console.error('Error fetching cities: ', error);
    throw error;
  }
};
