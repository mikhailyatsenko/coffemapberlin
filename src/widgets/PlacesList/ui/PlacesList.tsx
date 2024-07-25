import { useQuery } from '@apollo/client';
import cls from './PlacesList.module.scss';
import { PlaceCard } from 'features/PlaceCard';
import { GET_ALL_PLACES } from 'shared/query/places';
import { type PlaceResponse } from 'shared/types';
import { DetailedPaceCard } from 'features/DetailedPaceCard';
import { useEffect, useRef, useState } from 'react';
import { PortalToBody } from 'shared/ui/Portals/PortalToBody';

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
    <div className={`${cls.placesData}`}>
      <div className={`${cls.PlacesList} ${selectedPlaceId ? cls.detailsOpen : ''}`}>
        {data?.places.map((place) => (
          <PlaceCard
            properties={place.properties}
            coordinates={place.geometry.coordinates}
            key={place.properties.id}
            handleCardClick={handleCardClick}
          />
        ))}
      </div>
      {selectedPlaceId && (
        <PortalToBody>
          <DetailedPaceCard
            placeId={selectedPlaceId}
            isOpen={!!selectedPlaceId}
            onClose={() => {
              setSelectedPlaceId(null);
            }}
          />
        </PortalToBody>
      )}
    </div>
  );
}
