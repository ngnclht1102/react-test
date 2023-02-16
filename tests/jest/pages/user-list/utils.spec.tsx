import { renderHook, act } from '@testing-library/react-hooks';
import { getGoogleMapUrlByLatLng, useQuery } from '../../../../src/pages/user-list/utils';
import { testUser } from './user-item.spec';
import { BASE_URL, GOOGLE_MAP_URL } from '../../../../src/pages/user-list/constants';
import { fetchMock } from '../../../../utils/fetch-mock';

test('useQuery should return correct initial state', () => {
  const fetcher = () => fetchMock(BASE_URL, [testUser, testUser]);
  const { result } = renderHook(() => useQuery(fetcher));
  expect(result.current.isIdle).toBe(true);
  expect(result.current.isError).toBe(false);
  expect(result.current.isWorking).toBe(true);
  expect(result.current.data).toStrictEqual([]);
  expect(result.current.errorMsg).toBe(undefined);
});

test('useQuery should return correct state in case API call success', async () => {
  const fetcher = () => fetchMock(BASE_URL, [testUser, testUser]);
  const { result, waitFor } = renderHook(() => useQuery(fetcher));
  await waitFor(() => result.current.isWorking === false);
  expect(result.current.isIdle).toBe(false);
  expect(result.current.isWorking).toBe(false);
  expect(result.current.data).toStrictEqual([testUser, testUser]);
  expect(result.current.isError).toBe(false);
  expect(result.current.errorMsg).toBe(undefined);
});

test('useQuery should return correct state in case API call error', async () => {
  const fetcher = () => fetchMock(BASE_URL, [], true);
  const { result, waitFor } = renderHook(() => useQuery(fetcher));

  await waitFor(() => result.current.isWorking === false);
  expect(result.current.isIdle).toBe(false);
  expect(result.current.isWorking).toBe(false);
  expect(result.current.data).toStrictEqual([]);
  expect(result.current.isError).toBe(true);
  expect(result.current.errorMsg).toBeDefined();
});

test('useQuery should reset data, recall the api on refresh', async () => {
  const fetcher = () => fetchMock(BASE_URL, [testUser, testUser]);
  const { result, waitFor } = renderHook(() => useQuery(fetcher));
  await waitFor(() => result.current.isWorking === false);
  expect(result.current.data).toStrictEqual([testUser, testUser]);
  expect(result.current.needRefreshAt).toBeUndefined();
  act(() => {
    result.current.refresh();
  });
  expect(result.current.needRefreshAt).toBeDefined();
  expect(result.current.data).toStrictEqual([]);
  expect(result.current.isWorking).toBe(true);
  await waitFor(() => result.current.isWorking === false);
  expect(result.current.data).toStrictEqual([testUser, testUser]);
});

test('getGoogleMapUrlByLatLng should render correct url', () => {
  const lat = '10,222',
    lng = '102,222';
  const renderedUrl = getGoogleMapUrlByLatLng(lat, lng);
  expect(renderedUrl).toStrictEqual(`${GOOGLE_MAP_URL}${lat},${lng}`);
});
