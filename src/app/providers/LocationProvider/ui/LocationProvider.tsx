import { type Position } from 'geojson';
import { LocationContext } from '../lib/LocationContext';

import { type PropsWithChildren, useState, type FC } from 'react';

export const LocationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [location, setLocation] = useState<Position>();

  return <LocationContext.Provider value={{ location, setLocation }}>{children}</LocationContext.Provider>;
};
