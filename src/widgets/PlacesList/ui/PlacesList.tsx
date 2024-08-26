import { useDetailedCard } from 'app/providers/DetailedCardProvider';
import { usePlaces } from 'app/providers/PlacesDataProvider/ui/PlacesDataProvider';
import { PlaceCard } from 'features/PlaceCard';
import cls from './PlacesList.module.scss';

export function PlacesList() {
  const { filteredPlaces } = usePlaces();
  const { currentSelectedPlaceId } = useDetailedCard();
  const { searchTerm } = usePlaces();

  if (!filteredPlaces.length) return null;

  const sortedPlaces = [...filteredPlaces].sort((a, b) => {
    if (a.properties.isFavorite) return -1;
    if (b.properties.isFavorite) return 1;
    return 0;
  });

  return (
    !searchTerm && (
      <div className={`${cls.placesData}`}>
        <div className={`${cls.PlacesList} ${currentSelectedPlaceId ? cls.detailsOpen : ''}`}>
          {sortedPlaces?.map((place) => (
            <PlaceCard
              properties={place.properties}
              coordinates={place.geometry.coordinates}
              key={place.properties.id}
            />
          ))}
        </div>
      </div>
    )
  );
}
