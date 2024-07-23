import { useQuery } from '@apollo/client';
import cls from './PlacesList.module.scss';
import { PlaceCard } from 'features/PlaceCard';
import { GET_ALL_PLACES } from 'shared/query/places';
import { type PlaceResponse } from 'shared/types';
import { DetailedPaceCard } from 'features/DetailedPaceCard';
import { useEffect, useRef, useState } from 'react';

interface PlacesData {
  places: PlaceResponse[];
}

export function PlacesList() {
  const { data } = useQuery<PlacesData>(GET_ALL_PLACES);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const detailedCardRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (placeId: string) => {
    setSelectedPlaceId(placeId);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (detailedCardRef.current && !detailedCardRef.current.contains(event.target as Node)) {
        setSelectedPlaceId(null);
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedPlaceId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  return (
    <div className={`${cls.placesData}`}>
      <div className={`${cls.PlacesList} ${selectedPlaceId ? cls.detailsOpen : ''}`}>
        {data?.places.map((place) => (
          <PlaceCard
            properties={place.properties}
            coordinates={place.geometry.coordinates}
            key={place.properties.id}
            isPopup={false}
            handleCardClick={handleCardClick}
          />
        ))}
      </div>
      <div ref={detailedCardRef}>
        {selectedPlaceId && (
          <DetailedPaceCard
            placeId={selectedPlaceId}
            isOpen={!!selectedPlaceId}
            onClose={() => {
              setSelectedPlaceId(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
