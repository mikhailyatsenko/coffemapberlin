import { useQuery } from '@apollo/client';
import React, { createContext, useContext, useState } from 'react';
import { GET_ALL_PLACES } from 'shared/query/places';
import { type PlaceResponse } from 'shared/types';

interface PlacesContextType {
  places: PlaceResponse[];
  filteredPlaces: PlaceResponse[];
  filterPlaces: (searchTerm: string) => void;
  loading: boolean;
}

interface PlacesData {
  places: PlaceResponse[];
}

const PlacesDataContext = createContext<PlacesContextType | undefined>(undefined);

export const PlacesDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data, loading } = useQuery<PlacesData>(GET_ALL_PLACES);
  const [searchTerm, setSearchTerm] = useState('');

  const places = data?.places ?? [];

  const filterPlaces = (term: string) => {
    setSearchTerm(term);
  };

  const filteredPlaces = places.filter((place) =>
    place.properties.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <PlacesDataContext.Provider value={{ places, filteredPlaces, filterPlaces, loading }}>
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
