import { useMutation, type ApolloCache } from '@apollo/client';
import { ADD_REVIEW, RATE_PLACE, GET_PLACE_DETAILS } from 'shared/query/places';
import { type PlaceResponse, type PlaceProperties } from 'shared/types';

export interface Review {
  id: string;
  text: string;
  userId: string;
  userRating?: number;
  userName: string;
  userAvatar: string;
  placeId: string;
  createdAt: string;
  isOwnReview: boolean;
}

interface PlaceDetails {
  place: PlaceResponse;
  reviews: Review[];
}

export interface PlaceDetailsData {
  placeDetails: PlaceDetails;
}

interface AddReviewResponse {
  addReview: Review;
}

interface RatePlaceResponse {
  ratePlace: {
    id: string;
    averageRating: number;
    ratingCount: number;
    userRating: number;
    userId: string;
  };
}

export function useReview(placeId: string) {
  const [addReview, { loading: addReviewLoading, error: addReviewError }] = useMutation<AddReviewResponse>(ADD_REVIEW, {
    update(cache, { data }) {
      if (data) {
        updateCache(cache, data.addReview, placeId);
      }
    },
    refetchQueries: [{ query: GET_PLACE_DETAILS, variables: { placeId } }],
  });

  const [ratePlace, { loading: ratePlaceLoading, error: ratePlaceError }] = useMutation<RatePlaceResponse>(RATE_PLACE, {
    update(cache, { data }) {
      if (data) {
        updateCache(cache, data.ratePlace, placeId);
      }
    },
  });

  const updateCache = (
    cache: ApolloCache<unknown>,
    newData: Partial<Review> & Partial<RatePlaceResponse['ratePlace']>,
    placeId: string,
  ) => {
    const existingData = cache.readQuery<PlaceDetailsData>({
      query: GET_PLACE_DETAILS,
      variables: { placeId },
    });

    if (existingData?.placeDetails) {
      const updatedReviews = existingData.placeDetails.reviews.map((review: Review) =>
        review.userId === newData.userId ? { ...review, ...newData } : review,
      );

      if ('id' in newData && !updatedReviews.some((review) => review.id === newData.id)) {
        updatedReviews.unshift(newData as Review);
      }

      const updatedProperties: PlaceProperties = {
        ...existingData.placeDetails.place.properties,
        averageRating: newData.averageRating ?? existingData.placeDetails.place.properties.averageRating,
        ratingCount: newData.ratingCount ?? existingData.placeDetails.place.properties.ratingCount,
      };

      cache.writeQuery<PlaceDetailsData>({
        query: GET_PLACE_DETAILS,
        variables: { placeId },
        data: {
          placeDetails: {
            ...existingData.placeDetails,
            place: {
              ...existingData.placeDetails.place,
              properties: updatedProperties,
            },
            reviews: updatedReviews,
          },
        },
      });
    }
  };

  const handleAddReview = async (text: string): Promise<Review | undefined> => {
    try {
      const { data } = await addReview({
        variables: { placeId, text },
      });
      console.log('Review added:', data?.addReview);
      return data?.addReview;
    } catch (err) {
      console.error('Error adding review:', err);
      throw err;
    }
  };

  const handleRating = async (newRating: number): Promise<RatePlaceResponse['ratePlace'] | undefined> => {
    try {
      const { data } = await ratePlace({
        variables: { placeId, rating: newRating },
      });
      console.log('Place rated:', data?.ratePlace);
      return data?.ratePlace;
    } catch (error) {
      console.error('Error rating place:', error);
      throw error;
    }
  };

  return {
    handleAddReview,
    handleRating,
    loading: addReviewLoading || ratePlaceLoading,
    error: addReviewError ?? ratePlaceError,
  };
}
