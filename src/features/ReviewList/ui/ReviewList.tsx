import { type Review } from 'shared/types';
import { sortReviews } from '../lib/sortReviews';
import { ReviewCard } from 'shared/ui/ReviewCard';
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW, GET_PLACE_DETAILS } from 'shared/query/places';

interface ReviewListProps {
  reviews: Review[];
  placeId: string;
}

export const ReviewList = ({ reviews, placeId }: ReviewListProps) => {
  const [deleteReview] = useMutation(DELETE_REVIEW, {
    refetchQueries: [{ query: GET_PLACE_DETAILS, variables: { placeId } }],
  });

  const handleDeleteReview = async (reviewId: string) => {
    try {
      const { data } = await deleteReview({ variables: { reviewId } });
      if (data.deleteReview.success) {
        console.log(data.deleteReview.message);
      } else {
        console.error(data.deleteReview.message);
      }
    } catch (err) {
      console.error('Error deleting review:', err);
    }
  };
  return sortReviews(reviews).map((review) => (
    <ReviewCard
      key={`${review.id}-${review.createdAt}`}
      id={review.id}
      rating={review.userRating}
      reviewText={review.text}
      userName={review.userName}
      isOwnReview={review.isOwnReview}
      userAvatar={review.userAvatar}
      handleDeleteReview={handleDeleteReview}
    />
  ));
};
