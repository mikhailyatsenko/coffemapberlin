import { useQuery } from '@apollo/client';
import cls from './PlacesList.module.scss';
import { PlaceCard } from 'features/PlaceCard';
import { GET_ALL_PLACES } from 'shared/query/places';
import { type PlaceResponse } from 'shared/types';
import { DetailedPaceCard } from 'features/DetailedPaceCard';
import { useState } from 'react';

interface PlacesData {
  places: PlaceResponse[];
}

export function PlacesList() {
  const { data } = useQuery<PlacesData>(GET_ALL_PLACES);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  const handleCardClick = (placeId: string) => {
    setSelectedPlaceId(placeId);
  };

  return (
    <>
      <div className={cls.Places}>
        {data?.places.map((place, index) => (
          <PlaceCard
            properties={place.properties}
            coordinates={place.geometry.coordinates}
            key={place.properties.id}
            isPopup={false}
            handleCardClick={handleCardClick}
          />
        ))}
      </div>
      {selectedPlaceId && (
        <DetailedPaceCard
          placeId={selectedPlaceId}
          isOpen={!!selectedPlaceId}
          onClose={() => {
            setSelectedPlaceId(null);
          }}
        />
      )}
    </>
  );
}
