import { type Review } from 'shared/types';
import { sortReviews } from '../lib/sortReviews';
import { ReviewCard } from 'shared/ui/ReviewCard';
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW, GET_PLACE_DETAILS } from 'shared/query/places';
import { useCallback, useEffect, useRef } from 'react';
import cls from './ReviewList.module.scss';

interface ReviewListProps {
  reviews: Review[];
  placeId: string;
  isCompactView: boolean;
  setCompactView: (isCompact: boolean) => void;
}

export const ReviewList = ({ reviews, placeId, isCompactView, setCompactView }: ReviewListProps) => {
  const [deleteReview] = useMutation(DELETE_REVIEW, {
    refetchQueries: [{ query: GET_PLACE_DETAILS, variables: { placeId } }],
  });

  const reviewsListRef = useRef<HTMLDivElement>(null);

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

  const handleScrollReviewsDown = useCallback(() => {
    if (reviewsListRef.current && isCompactView) {
      const scrollTop = reviewsListRef.current.scrollTop;
      setCompactView(scrollTop < 100);
    }
  }, [isCompactView, setCompactView]);

  const handleScrollUpAttempt = useCallback(
    (e: WheelEvent | TouchEvent) => {
      if (reviewsListRef.current && reviewsListRef.current.scrollTop === 0 && !isCompactView) {
        if ('deltaY' in e && e.deltaY < 0) {
          setCompactView(true);
          e.preventDefault();
        } else if ('touches' in e) {
          const touch = e.touches[0];
          const startY = touch.pageY;

          const handleTouchEnd = (endEvent: TouchEvent) => {
            const endY = endEvent.changedTouches[0].pageY;
            if (endY > startY) {
              setCompactView(true);
              e.preventDefault();
            }
            reviewsListRef.current?.removeEventListener('touchend', handleTouchEnd);
          };

          reviewsListRef.current.addEventListener('touchend', handleTouchEnd);
        }
      }
    },
    [isCompactView, setCompactView],
  );

  useEffect(() => {
    const reviewsList = reviewsListRef.current;
    if (reviewsList) {
      reviewsList.addEventListener('scroll', handleScrollReviewsDown);
      reviewsList.addEventListener('wheel', handleScrollUpAttempt, { passive: false });
      reviewsList.addEventListener('touchmove', handleScrollUpAttempt, { passive: false });
      return () => {
        reviewsList.removeEventListener('scroll', handleScrollReviewsDown);
        reviewsList.removeEventListener('wheel', handleScrollUpAttempt);
        reviewsList.removeEventListener('touchmove', handleScrollUpAttempt);
      };
    }
  }, [handleScrollReviewsDown, handleScrollUpAttempt]);

  useEffect(() => {
    let reviewsListContainer: HTMLDivElement | null = null;

    const observer = new MutationObserver(() => {
      reviewsListContainer = reviewsListRef.current;
      if (reviewsListContainer) {
        reviewsListContainer.addEventListener('scroll', handleScrollReviewsDown);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      if (reviewsListContainer) {
        reviewsListContainer.removeEventListener('scroll', handleScrollReviewsDown);
      }
    };
  }, [handleScrollReviewsDown]);

  if (reviews.length === 0) return null;

  return (
    <div className={cls.reviewsContainer}>
      <h4
        onClick={() => {
          setCompactView(!isCompactView);
        }}
        className={cls.reviewsTitel}
      >
        Reviews ({reviews.length})
      </h4>
      <div ref={reviewsListRef} className={cls.reviewsList}>
        {sortReviews(reviews).map((review) => (
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
        ))}
      </div>
    </div>
  );
};
