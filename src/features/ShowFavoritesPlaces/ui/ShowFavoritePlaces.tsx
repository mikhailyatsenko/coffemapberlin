import { useState } from 'react';
import { useAuth } from 'app/providers/AuthProvider';
import { usePlaces } from 'app/providers/PlacesDataProvider/ui/PlacesDataProvider';
import { FavoritesIndicator } from 'entities/FavoritesIndicator';
import { FavoritesList } from 'entities/FavoritesList';

export const ShowFavoritePlaces = () => {
  const { user } = useAuth();
  const { setShowFavorite, favoritePlaces } = usePlaces();

  // const [isShowFavoriteList, setIsShowFavoriteList] = useState(false);

  if (!user) return null;

  // const favoritePlaces = filterablePlaces.filter((place) => {
  //   return place.properties.isFavorite;
  // });

  if (favoritePlaces === null) return null;

  const onClickHandler = () => {
    setShowFavorite((prev) => !prev);
  };

  return (
    <>
      {favoritePlaces.length && (
        <FavoritesIndicator favoritesQuantity={favoritePlaces.length} onClickHandler={onClickHandler} />
      )}
      {/* {isShowFavoriteList && <FavoritesList favoritesPlacesList={favoritePlaces} />} */}
    </>
  );
};
