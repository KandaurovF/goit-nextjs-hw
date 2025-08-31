import { buildUrl, sendRequest } from '../helpers';

export interface Country {
  countryId: string;
  countryTitle: string;
  companyCount: number;
}

export const getCountries = async (init?: RequestInit) => {
  try {
    const data = await sendRequest<Country[]>(buildUrl('countries'), init);
    // console.log(`Countries data: ${data}`);
    return data;
  } catch (error) {
    console.error(`Error fetching Countries: ${error}`);
    throw error;
  }
};
