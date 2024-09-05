import { type ApolloCache, useMutation } from '@apollo/client';
import { useAuth } from 'app/providers/AuthProvider';
import { GET_PLACE_DETAILS, DELETE_REVIEW, GET_ALL_PLACES } from 'shared/query/places';
import { type PlaceResponse, type Review } from 'shared/types';

export interface PlaceDetailsData {
  placeDetails: {
    id: string;
    reviews: Review[];
    favoriteCount: number;
    isFavorite: boolean;
  };
}

interface DeleteReviewResponce {
  deleteReview: {
    reviewId: string;
    averageRating: number;
    ratingCount: number;
  };
}

export function useDeleteReview(placeId: string) {
  const { user, showLoginPopup } = useAuth();

  const [deleteReview, { loading: deleteReviewLoading, error: deleteReviewError }] = useMutation<DeleteReviewResponce>(
    DELETE_REVIEW,
    {
      update(cache, { data }) {
        if (data) {
          updatePlaceDetailsCacheAfterDelete(cache, data.deleteReview.reviewId);
          updateAllPlacesCache(cache, data.deleteReview);
        }
      },
    },
  );

  const updatePlaceDetailsCacheAfterDelete = (cache: ApolloCache<unknown>, reviewId: string) => {
    const existingData = cache.readQuery<PlaceDetailsData>({
      query: GET_PLACE_DETAILS,
      variables: { placeId },
    });

    if (existingData?.placeDetails) {
      const updatedReviews = existingData.placeDetails.reviews.filter((review) => review.id !== reviewId);

      cache.writeQuery<PlaceDetailsData>({
        query: GET_PLACE_DETAILS,
        variables: { placeId },
        data: {
          placeDetails: {
            // ...existingData.placeDetails,
            id: existingData.placeDetails.id,
            isFavorite: existingData.placeDetails.isFavorite,
            favoriteCount: existingData.placeDetails.favoriteCount,
            reviews: updatedReviews,
          },
        },
      });
    }
  };

  const updateAllPlacesCache = (cache: ApolloCache<unknown>, newData: DeleteReviewResponce['deleteReview']) => {
    const existingData = cache.readQuery<{ places: PlaceResponse[] }>({ query: GET_ALL_PLACES });

    if (existingData?.places) {
      const updatedPlaces = existingData.places.map((place) => {
        if (place.properties.id === placeId) {
          return {
            ...place,
            properties: {
              ...place.properties,
              averageRating: newData.averageRating,
              ratingCount: newData.ratingCount,
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

  const handleDeleteReview = async (reviewId: string): Promise<void> => {
    if (!user) {
      showLoginPopup();
      return;
    }
    try {
      await deleteReview({ variables: { reviewId } });
    } catch (err) {
      console.error('Error deleting review:', err);
      throw err;
    }
  };

  return {
    handleDeleteReview,
    loading: deleteReviewLoading,
    error: deleteReviewError,
  };
}
