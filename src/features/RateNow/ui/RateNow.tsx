import RatingWidget from 'shared/ui/RatingWidget/ui/RatingWidget';
import cls from './RateNow.module.scss';
import { useReview } from '../api/interactions/useReview';
import { type Review } from 'shared/types';
import { RegularButton } from 'shared/ui/RegularButton';
import { useState } from 'react';
import { ReviewForm } from 'entities/ReviewForm';

interface RateNowProps {
  reviews: Review[];
  placeId: string;
}

export const RateNow = ({ reviews, placeId }: RateNowProps) => {
  const { handleAddReview, loading: reviewLoading } = useReview(placeId);

  const [showReviewForm, setShowReviewForm] = useState(false);

  const hasRating = reviews.some((review) => review.isOwnReview && review.userRating !== null);
  const hasReviewWithText = reviews.some((review) => review.isOwnReview && review.text.trim() !== '');

  const onSubmitTextReview = (reviewText: string) => {
    handleAddReview(reviewText);
    setShowReviewForm(false);
  };

  if (!hasRating || !hasReviewWithText) {
    return (
      <div className={cls.rateNowContainer}>
        <h4>Have you visited this place?</h4>

        {!hasRating && (
          <>
            <h4>Rate now</h4>
            <RatingWidget isClickable={true} id={placeId} handleRating={handleAddReview} />
          </>
        )}

        {!hasReviewWithText && !showReviewForm && (
          <RegularButton
            clickHandler={() => {
              setShowReviewForm((prev) => !prev);
            }}
          >
            Add review
          </RegularButton>
        )}
        {showReviewForm && (
          <RegularButton
            theme="blank"
            clickHandler={() => {
              setShowReviewForm((prev) => !prev);
            }}
          >
            ← Back
          </RegularButton>
        )}
        <ReviewForm isLoading={reviewLoading} onSubmit={onSubmitTextReview} isVisible={showReviewForm} />
      </div>
    );
  }

  return null;
};
