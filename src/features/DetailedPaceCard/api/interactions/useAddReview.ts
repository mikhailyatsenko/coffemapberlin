import { useMutation } from '@apollo/client';
import { GET_PLACE_REVIEWS, ADD_REVIEW } from 'shared/query/places';

interface Review {
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
interface PlaceReviewsData {
  placeReviews: Review[];
}

export function useAddReview(placeId: string) {
  const [addReview, { loading, error }] = useMutation(ADD_REVIEW, {
    update(cache, { data: { addReview } }) {
      const existingReviews = cache.readQuery<PlaceReviewsData>({
        query: GET_PLACE_REVIEWS,
        variables: { placeId },
      });

      if (existingReviews?.placeReviews) {
        cache.writeQuery({
          query: GET_PLACE_REVIEWS,
          variables: { placeId },
          data: {
            placeReviews: [addReview, ...existingReviews.placeReviews],
          },
        });
      }
    },
    refetchQueries: [{ query: GET_PLACE_REVIEWS, variables: { placeId } }],
  });

  const handleAddReview = async (text: string) => {
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

  return { handleAddReview, loading, error };
}
