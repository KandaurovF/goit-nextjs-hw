export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const buildUrl = (...paths: string[]) =>
  `${BASE_URL}/${paths.join('/')}`;

export const stringifyQueryParams = (params: Record<string, string>) =>
  new URLSearchParams(params).toString();

export const sendRequest = async <T>(url: string, init?: RequestInit) => {
  try {
    console.log(`Sending request to URL: ${url}`);
    console.log('Request Init: ', init);
    const res = await fetch(url, init);
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Request failed with status ${res.status}: ${errorText}`);

      const error = new Error(errorText);
      (error as any).status = res.status;

      throw error;
    }

    const data = (await res.json()) as T;
    console.log(`Response data:`, data);
    return data;
  } catch (error) {
    console.error(`Error in sendRequest: ${error}`);
    throw error;
  }
};
