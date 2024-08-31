import { useQuery } from '@apollo/client';
import React, { createContext, useContext, useState } from 'react';
import { GET_ALL_PLACES } from 'shared/query/places';
import { type PlaceResponse } from 'shared/types';

interface PlacesContextType {
  places?: PlaceResponse[];
  filterablePlaces: PlaceResponse[];
  favoritePlaces: PlaceResponse[] | null;
  setSearchTerm: (term: string) => void;
  setMinRating: (rating: number) => void;
  setShowFavorite: React.Dispatch<React.SetStateAction<boolean>>;
  searchTerm: string;
  minRating: number;
  loading: boolean;
  showFavorites: boolean;
}

interface PlacesData {
  places: PlaceResponse[];
}

const PlacesDataContext = createContext<PlacesContextType | undefined>(undefined);

export const PlacesDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data, loading } = useQuery<PlacesData>(GET_ALL_PLACES);
  const [searchTerm, setSearchTerm] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [showFavorites, setShowFavorite] = useState<boolean>(false);

  const places = data?.places ?? [];

  const filterablePlaces = places.filter(
    (place) =>
      place.properties.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) &&
      (place.properties.averageRating || 0) >= minRating,
  );

  const favoritePlaces = places.filter((place) => place.properties.isFavorite);

  return (
    <PlacesDataContext.Provider
      value={{
        filterablePlaces,
        setMinRating,
        setSearchTerm,
        searchTerm,
        favoritePlaces,
        setShowFavorite,
        showFavorites,
        minRating,
        loading,
      }}
    >
      {children}
    </PlacesDataContext.Provider>
  );
};

export const usePlaces = () => {
  const context = useContext(PlacesDataContext);
  if (context === undefined) {
    throw new Error('usePlaces must be used within a PlacesProvider');
  }
  return context;
};
