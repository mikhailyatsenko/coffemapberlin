import { gql, useMutation } from '@apollo/client';
import { useAuth } from 'app/providers/AuthProvider';
import { TOGGLE_FAVORITE } from 'shared/query/places';

interface ToggleFavoriteResponse {
  toggleFavorite: {
    id: string;
    isFavorite: boolean;
    favoriteCount: number;
  };
}

export const useToggleFavorite = () => {
  const { user, showLoginPopup } = useAuth();

  const [toggleFavoriteMutation] = useMutation<ToggleFavoriteResponse>(TOGGLE_FAVORITE, {
    update: (cache, { data }) => {
      if (data?.toggleFavorite) {
        cache.writeFragment({
          id: `Place:${data.toggleFavorite.id}`,
          fragment: gql`
            fragment FavoriteData on Place {
              isFavorite
              favoriteCount
            }
          `,
          data: {
            isFavorite: data.toggleFavorite.isFavorite,
            favoriteCount: data.toggleFavorite.favoriteCount,
          },
        });
      }
    },
  });

  const toggleFavorite = async (placeId: string) => {
    if (!user) {
      showLoginPopup();
      return;
    }
    try {
      const { data } = await toggleFavoriteMutation({
        variables: { placeId },
      });
      return data?.toggleFavorite;
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  };

  return { toggleFavorite };
};
