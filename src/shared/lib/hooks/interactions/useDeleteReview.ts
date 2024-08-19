import { type ApolloCache, useMutation } from '@apollo/client';
import { useAuth } from 'app/providers/AuthProvider';
import { GET_PLACE_DETAILS, DELETE_REVIEW } from 'shared/query/places';
import { type Review } from 'shared/types';

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
    success: boolean;
    message: string;
  };
}

export function useDeleteReview(placeId: string) {
  const { user, showLoginPopup } = useAuth();

  const [deleteReview, { loading: deleteReviewLoading, error: deleteReviewError }] = useMutation<DeleteReviewResponce>(
    DELETE_REVIEW,
    {
      update(cache, { data }) {
        if (data && data.deleteReview.success && data.deleteReview.reviewId) {
          updatePlaceDetailsCacheAfterDelete(cache, data.deleteReview.reviewId);
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

  const handleDeleteReview = async (reviewId: string): Promise<void> => {
    if (!user) {
      showLoginPopup();
      return;
    }
    try {
      const { data } = await deleteReview({ variables: { reviewId } });
      if (!data?.deleteReview.success) {
        throw new Error(data?.deleteReview.message);
      }
    } catch (err) {
      console.error('Error deleting review:', err);
      throw err;
    }
  };

  return {
    handleDeleteReview,
    loading: deleteReviewLoading,
    error: deleteReviewError,
    // placeData: allPlacesData?.places.find((place) => place.properties.id === placeId),
  };
}
