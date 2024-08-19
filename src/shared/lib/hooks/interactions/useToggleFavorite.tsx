import { type ApolloCache, useMutation } from '@apollo/client';
import { useAuth } from 'app/providers/AuthProvider';
import { TOGGLE_FAVORITE, GET_ALL_PLACES } from 'shared/query/places';
import { type PlaceResponse } from 'shared/types';

interface PlacesData {
  places: PlaceResponse[];
}

export const useToggleFavorite = (placeId: string) => {
  const { user, showLoginPopup } = useAuth();

  const [toggleFavoriteMutation] = useMutation<{ toggleFavorite: boolean }>(TOGGLE_FAVORITE, {
    update(cache, { data }) {
      if (data?.toggleFavorite) {
        updateAllPlacesCache(cache);
      }
    },
  });

  const updateAllPlacesCache = (cache: ApolloCache<unknown>) => {
    const existingData = cache.readQuery<PlacesData>({ query: GET_ALL_PLACES });

    if (existingData?.places) {
      const updatedPlaces = existingData.places.map((place) => {
        if (place.properties.id === placeId) {
          return {
            ...place,
            properties: {
              ...place.properties,
              isFavorite: !place.properties.isFavorite,
            },
          };
        }
        return place;
      });

      cache.writeQuery({
        query: GET_ALL_PLACES,
        data: { places: updatedPlaces },
      });
    }
  };

  const toggleFavorite = async () => {
    if (!user) {
      showLoginPopup();
      return;
    }
    try {
      await toggleFavoriteMutation({
        variables: { placeId },
      });
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  };

  return { toggleFavorite };
};
