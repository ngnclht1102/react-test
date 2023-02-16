export function fetchMock<T>(url: string, data: Array<T>, shouldReject?: boolean): Promise<Array<T>> {
  const timeout = 20;
  return new Promise((resolve, reject) => {
    return setTimeout(() => {
      shouldReject ? reject(new Error('Error')) : resolve(data);
    }, timeout);
  });
}
