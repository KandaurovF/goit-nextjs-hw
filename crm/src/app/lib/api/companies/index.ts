import { buildUrl, sendRequest, stringifyQueryParams } from '../helpers';

export enum CompanyStatus {
  Active = 'active',
  NotActive = 'notActive',
  Pending = 'pending',
  Suspended = 'suspended',
}

export interface Company {
  _id: string;
  title: string;
  description: string;
  status: CompanyStatus;
  joinedDate: string;
  hasPromotions: boolean;
  categoryId: string;
  categoryTitle: string;
  countryId: string;
  countryTitle: string;
  cityId: string;
  cityTitle: string;
  avatar?: string;
}

export const getCompanies = async (
  params: Record<string, string> = {},
  init?: RequestInit,
) => {
  try {
    const data = await sendRequest<Company[]>(
      `${buildUrl('companies')}?${stringifyQueryParams(params)}`,
      init,
    );
    // console.log('Companies data: ', JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.log(`Error fatching Companies: ${error}`);
    throw error;
  }
};

export const getCompany = async (id: string, init?: RequestInit) => {
  try {
    const data = sendRequest<Company>(buildUrl('companies', id), init);
    // console.log('Company data: ', data);
    return data;
  } catch (error) {
    console.error(`Error fetching Company: ${error}`);
    throw error;
  }
};

export const createCompany = async (data: FormData, init?: RequestInit) => {
  const companyData = await sendRequest<Company>(buildUrl('companies'), {
    method: 'POST',
    body: data,
    // headers: {
    //   ...(init && init.headers),
    // },
  });
  return companyData;
};

export const updateCompany = async (data: FormData) => {
  try {
    const id = data.get('_id') as string;

    if (!id) {
      throw new Error('Company ID is missing in FormData');
    }

    data.delete('_id');

    const init: RequestInit = {
      method: 'PUT',
      body: data,
    };

    if (!(data instanceof FormData)) {
      throw new Error('Data is not a FormData instance');
    }

    const formDataEntries = Array.from(data.entries());
    console.log('PreSending data:', formDataEntries);

    const updatedData = await sendRequest<Company>(
      buildUrl('companies', id),
      init,
    );

    console.log('Sending data:', formDataEntries);
    return updatedData;
  } catch (error) {
    console.log(`Company update error: ${error}`);
    throw error;
  }
};

export const removeCompany = async (id: string) => {
  try {
    const init: RequestInit = {
      method: 'DELETE',
    };
    const data = await sendRequest<Company>(buildUrl('companies', id), init);
    return data;
  } catch (error) {
    console.error(`Company remove error: ${error}`);
    throw error;
  }
};
