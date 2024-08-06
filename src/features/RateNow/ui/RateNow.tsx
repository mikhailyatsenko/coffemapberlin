import RatingWidget from 'shared/ui/RatingWidget/ui/RatingWidget';
import cls from './RateNow.module.scss';
import { useReview } from '../api/interactions/useReview';
import { type Review } from 'shared/types';
// import { RegularButton } from 'shared/ui/RegularButton';
import { useState } from 'react';
import { ReviewForm } from 'entities/ReviewForm';
import { RegularButton } from 'shared/ui/RegularButton';

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

  if (hasRating && hasReviewWithText) return null;

  return (
    <>
      {!showReviewForm && (
        <div className={cls.rateNowContainer}>
          <h4 className={cls.question}>
            Have you visited this place?{' '}
            <span
              onClick={() => {
                setShowReviewForm(true);
              }}
            >
              Rate it now
            </span>
          </h4>
        </div>
      )}

      {showReviewForm && (
        <div className={cls.addReviewCard}>
          {!hasRating && (
            <>
              <div className={cls.rateWidget}>
                <h3>Rate this place:</h3>
                <RatingWidget isClickable={true} id={placeId} handleRating={handleAddReview} />
              </div>
              {hasReviewWithText && (
                <div className={cls.itemFullWidth}>
                  <RegularButton
                    theme="blank"
                    type="button"
                    clickHandler={() => {
                      setShowReviewForm(false);
                    }}
                  >
                    &#8612; Back
                  </RegularButton>
                </div>
              )}
            </>
          )}
          {/* <h4>Add text review</h4> */}
          {!hasReviewWithText && (
            <ReviewForm
              isLoading={reviewLoading}
              onSubmit={onSubmitTextReview}
              onBack={() => {
                setShowReviewForm(false);
              }}
            />
          )}
        </div>
      )}

      {reviews.length === 0 && !showReviewForm && (
        <div className={cls.noReviews}>
          <p>There are no reviews yet.</p>
          <p>
            Be first to{' '}
            <span
              onClick={() => {
                setShowReviewForm(true);
              }}
            >
              write one
            </span>
          </p>
        </div>
      )}
    </>
  );
};
