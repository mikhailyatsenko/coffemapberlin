import { useMutation } from '@apollo/client';
import { RATE_PLACE, GET_PLACE_DETAILS } from 'shared/query/places';
import { type PlaceDetailsData } from './useReview';

export function useRatePlace() {
  const [ratePlace] = useMutation(RATE_PLACE, {
    update(cache, { data: { ratePlace } }) {
      const existingData = cache.readQuery<PlaceDetailsData>({
        query: GET_PLACE_DETAILS,
        variables: { placeId: ratePlace.id },
      });

      if (existingData?.placeDetails) {
        const updatedReviews = existingData.placeDetails.reviews.map((review) =>
          review.userId === ratePlace.userId ? { ...review, userRating: ratePlace.userRating } : review,
        );

        cache.writeQuery({
          query: GET_PLACE_DETAILS,
          variables: { placeId: ratePlace.id },
          data: {
            placeDetails: {
              ...existingData.placeDetails,
              place: {
                ...existingData.placeDetails.place,
                averageRating: ratePlace.averageRating,
                ratingCount: ratePlace.ratingCount,
              },
              reviews: updatedReviews,
            },
          },
        });
      }
    },
  });

  const handleRating = async (newRating: number, id: string) => {
    try {
      const { data } = await ratePlace({
        variables: { placeId: id, rating: newRating },
      });
      console.log('Place rated:', data?.ratePlace);
    } catch (error) {
      console.error('Error rating place:', error);
    }
  };

  return { handleRating };
}
