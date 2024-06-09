import { createContext } from 'react';

export type LocationPoint = [number, number];

export interface LocationContextProps {
  location?: LocationPoint;
  setLocation?: (location: LocationPoint) => void;
}

export const LocationContext = createContext<LocationContextProps>({});
