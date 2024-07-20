import { useMutation } from '@apollo/client';
import { GET_ALL_PLACES, RATE_PLACE, GET_PLACE_REVIEWS } from 'shared/query/places';
import { type PlaceResponse } from 'shared/types';

interface PlacesData {
  places: PlaceResponse[];
}

interface Review {
  id: string;
  userRating?: number;
  userName: string;
  userAvatar: string;
  text: string;
  userId: string;
  createdAt: string;
  isOwnReview: boolean; // Убедитесь, что это поле есть
}

interface PlaceReviewsData {
  placeReviews: Review[];
}

export function useRatePlace() {
  const [ratePlace] = useMutation(RATE_PLACE, {
    update(cache, { data: { ratePlace } }) {
      // Обновление кэша для GET_ALL_PLACES
      const cachedData = cache.readQuery<PlacesData>({ query: GET_ALL_PLACES });
      if (cachedData?.places) {
        const updatedPlaces = cachedData.places.map((place) =>
          place.properties.id === ratePlace.id
            ? { ...place, properties: { ...place.properties, ...ratePlace } }
            : place,
        );

        cache.writeQuery({
          query: GET_ALL_PLACES,
          data: { places: updatedPlaces },
        });
      }

      // Обновление кэша для GET_PLACE_REVIEWS
      const reviewsData = cache.readQuery<PlaceReviewsData>({
        query: GET_PLACE_REVIEWS,
        variables: { placeId: ratePlace.id },
      });

      if (reviewsData?.placeReviews) {
        const updatedReviews = reviewsData.placeReviews.map((review) =>
          review.isOwnReview ? { ...review, userRating: ratePlace.userRating } : review,
        );

        cache.writeQuery({
          query: GET_PLACE_REVIEWS,
          variables: { placeId: ratePlace.id },
          data: { placeReviews: updatedReviews },
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
