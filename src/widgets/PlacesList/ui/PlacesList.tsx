import { useDetailedCard } from 'app/providers/DetailedCardProvider';
import { usePlaces } from 'app/providers/PlacesDataProvider/ui/PlacesDataProvider';
import { PlaceCard } from 'features/PlaceCard';
import cls from './PlacesList.module.scss';

export function PlacesList() {
  const { filterablePlaces, favoritePlaces, showFavorites } = usePlaces();
  const { currentSelectedPlaceId } = useDetailedCard();
  const { searchTerm, setShowFavorite } = usePlaces();

  if (!filterablePlaces.length) return null;

  return (
    !searchTerm && (
      <>
        <div
          className={`${cls.placesData} ${showFavorites && favoritePlaces?.length && !currentSelectedPlaceId ? cls.showFavorites : ''}`}
        >
          <div className={`${cls.PlacesList} ${currentSelectedPlaceId ? cls.detailsOpen : ''}`}>
            {(showFavorites && favoritePlaces?.length ? favoritePlaces : filterablePlaces).map((place) => (
              <PlaceCard
                properties={place.properties}
                coordinates={place.geometry.coordinates}
                key={place.properties.id}
              />
            ))}
          </div>
        </div>
        <div className={cls.backdrop}>
          <div
            onClick={() => {
              setShowFavorite(false);
            }}
            className={cls.closeButton}
          ></div>
        </div>
      </>
    )
  );
}
