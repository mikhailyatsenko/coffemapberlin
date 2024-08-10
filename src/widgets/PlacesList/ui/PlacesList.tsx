import { useQuery } from '@apollo/client';
import { useDetailedCard } from 'app/providers/DetailedCardProvider';
import { PlaceCard } from 'features/PlaceCard';
import { GET_ALL_PLACES } from 'shared/query/places';
import { type PlaceResponse } from 'shared/types';
import cls from './PlacesList.module.scss';

interface PlacesData {
  places: PlaceResponse[];
}

export function PlacesList() {
  const { data } = useQuery<PlacesData>(GET_ALL_PLACES);
  const { currentSelectedPlaceId } = useDetailedCard();

  if (!data?.places.length) return null;

  const sortedPlaces = [...data.places].sort((a, b) => {
    // Сначала показываем избранные места
    if (a.properties.isFavorite) return -1; // a перед b
    if (b.properties.isFavorite) return 1; // b перед a
    return 0; // Если оба или ни одно не избранное, сохраняем порядок
  });

  return (
    <div className={`${cls.placesData}`}>
      <div className={`${cls.PlacesList} ${currentSelectedPlaceId ? cls.detailsOpen : ''}`}>
        {sortedPlaces?.map((place) => (
          <PlaceCard properties={place.properties} coordinates={place.geometry.coordinates} key={place.properties.id} />
        ))}
      </div>
    </div>
  );
}
