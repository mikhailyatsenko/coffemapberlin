import { useContext } from 'react';
import { DetailedCardContext } from './DetailedCardContext';

export const useDetailedCard = () => {
  const context = useContext(DetailedCardContext);
  if (!context) {
    throw new Error('useDetailedCard must be used within a DetailedCardProvider');
  }
  return context;
};
