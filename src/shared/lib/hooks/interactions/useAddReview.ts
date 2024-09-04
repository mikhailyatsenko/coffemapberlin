import { type ApolloCache, useMutation } from '@apollo/client';
import { useAuth } from 'app/providers/AuthProvider';
import { ADD_REVIEW, GET_PLACE_DETAILS, GET_ALL_PLACES } from 'shared/query/places';
import { type PlaceResponse, type Review } from 'shared/types';

export interface PlaceDetailsData {
  placeDetails: {
    id: string;
    reviews: Review[];
  };
}

interface AddReviewResponse {
  addReview: {
    review: Review;
    averageRating: number;
    ratingCount: number;
  };
}

export function useAddReview(placeId: string) {
  const { user, showLoginPopup } = useAuth();

  const [addReview, { loading: addReviewLoading, error: addReviewError }] = useMutation<AddReviewResponse>(ADD_REVIEW, {
    update(cache, { data }) {
      if (data) {
        console.log(data);
        updateAllPlacesCache(cache, data.addReview);
        updatePlaceDetailsCache(cache, data.addReview);
      }
    },
  });

  const updateAllPlacesCache = (cache: ApolloCache<unknown>, newData: AddReviewResponse['addReview']) => {
    const existingData = cache.readQuery<{ places: PlaceResponse[] }>({ query: GET_ALL_PLACES });

    if (existingData?.places) {
      const updatedPlaces = existingData.places.map((place) => {
        if (place.properties.id === newData.review.placeId) {
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

  const updatePlaceDetailsCache = (cache: ApolloCache<unknown>, newData: AddReviewResponse['addReview']) => {
    const existingData = cache.readQuery<PlaceDetailsData>({
      query: GET_PLACE_DETAILS,
      variables: { placeId: newData.review.placeId },
    });

    if (existingData?.placeDetails) {
      let updatedReviews = [...existingData.placeDetails.reviews];

      const existingReviewIndex = updatedReviews.findIndex((review) => review.id === newData.review.id);
      if (existingReviewIndex !== -1) {
        updatedReviews[existingReviewIndex] = newData.review;
      } else {
        updatedReviews = [newData.review, ...updatedReviews];
      }

      cache.writeQuery<PlaceDetailsData>({
        query: GET_PLACE_DETAILS,
        variables: { placeId: newData.review.placeId },
        data: {
          placeDetails: {
            id: newData.review.id,
            reviews: updatedReviews,
          },
        },
      });
    }
  };

  const handleAddReview = async (text?: string, rating?: number): Promise<Review | undefined> => {
    if (!user) {
      showLoginPopup();
      return;
    }
    try {
      const variables: { placeId: string; text?: string; rating?: number } = { placeId };
      if (text !== undefined) variables.text = text;
      if (rating !== undefined) variables.rating = rating;

      await addReview({ variables });
    } catch (err) {
      console.error('Error adding or updating review:', err);
      throw err;
    }
  };

  return {
    handleAddReview,
    loading: addReviewLoading,
    error: addReviewError,
    // placeData: allPlacesData?.places.find((place) => place.properties.id === placeId),
  };
}
