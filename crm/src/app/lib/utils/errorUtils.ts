export function isFetchError(error: any): boolean {
  return error.message === 'Failed to fetch';
}
