import { buildUrl, sendRequest, stringifyQueryParams } from '../helpers';

export interface Promotion {
  _id: string;
  title: string;
  description: string;
  discount: number;
  companyId: string;
  companyTitle: string;
  avatar?: string;
}

export const getCompanyPromotions = async (
  companyId: string,
  params: Record<string, string> = {},
  init?: RequestInit,
) => {
  try {
    const data = await sendRequest<Promotion[]>(
      `${buildUrl('promotions/company', companyId)}?${stringifyQueryParams(params)}`,
      init,
    );
    // console.log('Company promotions data: ', JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error(`Error fetching company promotions: ${error}`);
    throw error;
  }
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
    // console.log("Promotions data:", JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error(`Error fetching Promotions: ${error}`);
    throw error;
  }
};

export const createPromotion = async (data: FormData, init?: RequestInit) => {
  const promotionData = await sendRequest<Promotion>(buildUrl('promotions'), {
    method: 'POST',
    body: data,
    headers: {
      ...(init && init.headers),
      // 'content-type': 'multipart/form-data',
    },
  });

  return promotionData;
};

export const removePromotion = async (id: string) => {
  try {
    const init: RequestInit = {
      method: 'DELETE',
    };

    const data = await sendRequest<Promotion>(buildUrl('promotions', id), init);
    return data;
  } catch (error) {
    console.error(`RemovePromotion error: ${error}`);
    throw error;
  }
};
