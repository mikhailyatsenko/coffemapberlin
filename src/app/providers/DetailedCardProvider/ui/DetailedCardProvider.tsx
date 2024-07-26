import { type PropsWithChildren, useState, type FC, useMemo } from 'react';
import { DetailedCardContext } from '../lib/DetailedCardContext';

export const DetailedCardProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentSelectedPlaceId, setCurrentSelectedPlaceId] = useState<string | null>(null);

  const value = useMemo(
    () => ({
      currentSelectedPlaceId,
      setCurrentSelectedPlaceId,
    }),
    [currentSelectedPlaceId],
  );

  return <DetailedCardContext.Provider value={value}>{children}</DetailedCardContext.Provider>;
};
