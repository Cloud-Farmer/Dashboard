import { useCallback, useState } from 'react';
import { getCookie, setCookie } from '../util/cookie';

const useKitId = (): any => {
  const [data, setData] = useState(1);

  const getKitIdCookie =
    getCookie('kitId') === undefined ? '1' : getCookie('kitId');

  if (getKitIdCookie !== data) setData(getKitIdCookie);
  
  const handler = useCallback(
    (kitId?: number) => {
      if (kitId !== undefined) {
        setData(kitId);
        kitId && setCookie('kitId', String(kitId));
      } else {
        setData(1);
      }
    },
    [data],
  );
  return [data, handler];
};

export default useKitId;
