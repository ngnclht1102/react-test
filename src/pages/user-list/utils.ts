import { useCallback, useEffect, useState } from 'react';
import { GOOGLE_MAP_URL } from './constants';

export function useQuery<T>(promise: () => Promise<Array<T>>) {
  const [isIdle, setIsIdle] = useState<boolean>(true);
  const [isWorking, setIsWorking] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | undefined>();
  const [data, setData] = useState<Array<T>>([]);
  const [needRefreshAt, markAsNeedRefreshAt] = useState<number>();

  useEffect(() => {
    (async () => {
      setIsWorking(true);
      setIsError(false);
      setErrorMsg(undefined);
      try {
        const res = await promise();
        setData(res);
      } catch (error) {
        setIsError(true);
        setErrorMsg(error.message);
        setData([]);
      }
      setIsIdle(false);
      setIsWorking(false);
    })();
  }, [needRefreshAt, promise]);

  const refresh = useCallback(() => {
    setIsIdle(true);
    setData([]);
    markAsNeedRefreshAt(new Date().getMilliseconds());
  }, []);

  return {
    isIdle,
    isWorking,
    isError,
    errorMsg,
    data,
    refresh,
    needRefreshAt,
  };
}

export function getGoogleMapUrlByLatLng(lat: string, lng: string) {
  return `${GOOGLE_MAP_URL}${lat},${lng}`;
}
