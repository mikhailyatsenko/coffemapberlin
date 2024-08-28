import { useAuth } from 'app/providers/AuthProvider';
import { usePlaces } from 'app/providers/PlacesDataProvider/ui/PlacesDataProvider';
import { FavoritesIndicator } from 'entities/FavoritesIndicator';

export const ShowFavoritesPlaces = () => {
  const { user } = useAuth();
  const { filteredPlaces } = usePlaces();

  if (!user) return null;

  const favoritePlaces = filteredPlaces.filter((place) => {
    return place.properties.isFavorite;
  });

  if (favoritePlaces.length === 0) return null;

  const onClickHandler = () => {};
  return <FavoritesIndicator favoritesQuantity={favoritePlaces.length} onClickHandler={onClickHandler} />;
};
