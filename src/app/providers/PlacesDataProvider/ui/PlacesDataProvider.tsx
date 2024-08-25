import { useQuery } from '@apollo/client';
import React, { createContext, useContext, useState } from 'react';
import { GET_ALL_PLACES } from 'shared/query/places';
import { type PlaceResponse } from 'shared/types';

interface PlacesContextType {
  places?: PlaceResponse[];
  filteredPlaces: PlaceResponse[];
  setSearchTerm: (term: string) => void;
  setMinRating: (rating: number) => void;
  searchTerm: string;
  minRating: number;
  loading: boolean;
}

interface PlacesData {
  places: PlaceResponse[];
}

const PlacesDataContext = createContext<PlacesContextType | undefined>(undefined);

export const PlacesDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data, loading } = useQuery<PlacesData>(GET_ALL_PLACES);
  const [searchTerm, setSearchTerm] = useState('');
  const [minRating, setMinRating] = useState(0);

  const places = data?.places ?? [];

  const filterPlaces = (term: string = '', rating: number = 0) => {
    setSearchTerm(term);
    setMinRating(rating);
  };

  const filteredPlaces = places.filter(
    (place) =>
      place.properties.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (place.properties.averageRating || 0) >= minRating,
  );

  return (
    <PlacesDataContext.Provider value={{ filteredPlaces, setMinRating, setSearchTerm, searchTerm, minRating, loading }}>
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
