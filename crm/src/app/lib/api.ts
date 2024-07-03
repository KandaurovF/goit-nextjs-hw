export interface SummaryStats {
  promotions: number;
  categories: number;
  newCompanies: number;
  activeCompanies: number;
}

export interface SummarySales {
  id: string;
  companyId: string;
  companyTitle: string;
  totalSold: number;
  totalIncome: number;
}

export interface Country {
  countryId: string;
  countryTitle: string;
  companyCount: number;
}

export interface Category {
  categoryId: string;
  categoryTitle: string;
  companyCount: number;
}

export enum CompanyStatus {
  Active = 'active',
  NotActive = 'notActive',
  Pending = 'pending',
  Suspended = 'suspended',
}

export interface Company {
  id: string;
  title: string;
  description: string;
  status: CompanyStatus;
  joinedDate: string;
  hasPromotions: boolean;
  categoryId: string;
  categoryTitle: string;
  countryId: string;
  countryTitle: string;
  avatar?: string;
}

export interface Promotion {
  _id: string;
  title: string;
  description: string;
  discount: number;
  companyId: string;
  companyTitle: string;
  avatar?: string;
}

const BASE_URL = 'http://localhost:4000/api';

const buildUrl = (...paths: string[]) => `${BASE_URL}/${paths.join('/')}`;

const stringifyQueryParams = (params: Record<string, string>) =>
  new URLSearchParams(params).toString();

const sendRequest = async <T>(url: string, init?: RequestInit) => {
  try {
    console.log(`Sending request to URL: ${url}`);
    const res = await fetch(url, init);
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Request failed with status ${res.status}: ${errorText}`);
      throw new Error(errorText);
    }

    const data = await res.json() as T;
    console.log(`Response data:`, data);
    return data;

  } catch (error) {
    console.error(`Error in sendRequest: ${error}`);
    throw error;
  }
};

export const getSummaryStats = async (init?: RequestInit) => {
  try {
    const data = await sendRequest<SummaryStats>(buildUrl('summary-stats'), init);
    // console.log('SummaryStats data: ', data);
    return data
  } catch (error) {
    // console.error(`Error fatching SummaryStats: ${error}`);
    throw error;
  }
};

export const getSummarySales = async (init?: RequestInit) => {
  try {
    const data = await sendRequest<SummarySales[]>(buildUrl('sales', 'summary'), init);
    // console.log(`SummarySales data: `, data);
    return data;
  } catch (error) {
    // console.error(`Error fatching SummarySales: ${error}`);
    throw error;
  }
 };

export const getCountries = async(init?: RequestInit) => {
try {
  const data = await sendRequest<Country[]>(buildUrl('countries'), init);
  // console.log(`Countries data: ${data}`);
  return data;
} catch (error) {
  // console.error(`Error fatching Countries: ${error}`);
  throw error;
}
  };

export const getCategories = async (init?: RequestInit) => {
  try {
    const data = await sendRequest<Category[]>(buildUrl('categories'), init);
    // console.log(`Categories data: ${data}`);
    return data;
  } catch (error) {
    // console.error(`Error fatching Categories: ${error}`);
    throw error;
  }
};

export const getCompanies = async (init?: RequestInit) => {
  try {
    const data = await sendRequest<Company[]>(buildUrl('companies'), init);
    // console.log('Companies Data:', data)
    return data;
  
  } catch (error) {
    // console.error("Error fatching companies: ", error);
    throw error;
  }
 
};

export const getCompany = (id: string, init?: RequestInit) => {
  // return sendRequest<Company>(buildUrl('companies', id), init);
  return {};
};

export const getPromotions = async (
  params: Record<string, string> = {},
  init?: RequestInit,
) => {
  try {
    const data = await sendRequest<Promotion[]>(
    `${buildUrl('promotions')}?${stringifyQueryParams(params)}`,
    init,
    );
    console.log(`Promotions data: ${data}`);
    return data;
  } catch (error) {
    console.error(`Error fatching Promotions: ${error}`);
    throw error;
  }
};

