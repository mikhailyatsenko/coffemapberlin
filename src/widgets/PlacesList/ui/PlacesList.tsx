import { useQuery } from '@apollo/client';
import cls from './PlacesList.module.scss';
import { PlaceCard } from 'features/PlaceCard';
import { GET_ALL_PLACES } from 'shared/query/places';
import { type PlaceResponse } from 'shared/types';
import { useDetailedCard } from 'app/providers/DetailedCardProvider';

interface PlacesData {
  places: PlaceResponse[];
}

export function PlacesList() {
  const { data } = useQuery<PlacesData>(GET_ALL_PLACES);
  const { currentSelectedPlaceId } = useDetailedCard();

  return (
    <div className={`${cls.placesData}`}>
      <div className={`${cls.PlacesList} ${currentSelectedPlaceId ? cls.detailsOpen : ''}`}>
        {data?.places.map((place) => (
          <PlaceCard properties={place.properties} coordinates={place.geometry.coordinates} key={place.properties.id} />
        ))}
      </div>
    </div>
  );
}
