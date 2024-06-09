import { LocationContext, type LocationPoint } from '../lib/ThemeContext';

import { type PropsWithChildren, useState, type FC } from 'react';

const LocationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [location, setLocation] = useState<LocationPoint>();

  return <LocationContext.Provider value={{ location, setLocation }}>{children}</LocationContext.Provider>;
};

export default LocationProvider;
