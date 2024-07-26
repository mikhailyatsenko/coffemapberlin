import { createContext } from 'react';

interface DetailedCardContextType {
  currentSelectedPlaceId: string | null;
  setCurrentSelectedPlaceId: (placeId: string | null) => void;
}

export const DetailedCardContext = createContext<DetailedCardContextType | undefined>(undefined);
