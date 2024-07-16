import { useQuery } from '@apollo/client';
import cls from './Places.module.scss';
import { PlaceCard } from 'features/PlaceCard';
import { GET_ALL_PLACES } from 'shared/query/places';
import { type PlaceProperties, type PlaceResponse } from 'shared/types';
import { DetailedPaceCard } from 'features/DetailedPaceCard';
import { useState } from 'react';

interface PlacesData {
  places: PlaceResponse[];
}

export function PlacesList() {
  const { data } = useQuery<PlacesData>(GET_ALL_PLACES);
  const [detaisPopupData, setDetaisPopupData] = useState<PlaceProperties | null>(null);

  const handleCardClick = (properties: PlaceProperties) => {
    setDetaisPopupData(properties);
  };

  return (
    <>
      <div className={cls.Places}>
        {data?.places.map((place, index) => (
          <PlaceCard
            properties={place.properties}
            coordinates={place.geometry.coordinates}
            key={index}
            isPopup={false}
            handleCardClick={handleCardClick}
          />
        ))}
      </div>
      {detaisPopupData && (
        <DetailedPaceCard
          properties={detaisPopupData}
          isOpen={!!detaisPopupData}
          onClose={() => {
            setDetaisPopupData(null);
          }}
        />
      )}
    </>
  );
}
