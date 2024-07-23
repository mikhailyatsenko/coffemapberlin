import React, { useContext, useEffect, useState, useRef, useCallback, useLayoutEffect } from 'react';
import cls from './DetailedPaceCard.module.scss';
import RatingWidget from 'shared/ui/RatingWidget/ui/RatingWidget';
import { ReviewForm } from 'entities/ReviewForm/ui/ReviewForm';
import { DELETE_REVIEW, GET_PLACE_DETAILS } from 'shared/query/places';
import { useMutation, useQuery } from '@apollo/client';
import { Loader } from 'shared/ui/Loader';
import { ReviewCard } from 'shared/ui/ReviewCard';
import { type PlaceDetailsData, useReview } from '../api/interactions/useReview';
import { LocationContext } from 'app/providers/LocationProvider/lib/LocationContext';

interface DetailedPaceCardProps {
  placeId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const DetailedPaceCard: React.FC<DetailedPaceCardProps> = ({ isOpen, onClose, placeId }) => {
  const { setLocation } = useContext(LocationContext);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const reviewsContainerRef = useRef<HTMLDivElement>(null);
  const { handleAddReview, handleRating, loading: reviewLoading, error: reviewError } = useReview(placeId);

  const { data, loading, error } = useQuery<PlaceDetailsData>(GET_PLACE_DETAILS, {
    variables: { placeId },
  });

  const [deleteReview] = useMutation(DELETE_REVIEW, {
    refetchQueries: [{ query: GET_PLACE_DETAILS, variables: { placeId } }],
  });

  const place = data?.placeDetails.place;
  const reviews = data?.placeDetails.reviews ?? [];

  const handleScrollReviewsDown = useCallback(() => {
    if (reviewsContainerRef.current && isHeaderVisible) {
      const scrollTop = reviewsContainerRef.current.scrollTop;
      setIsHeaderVisible(scrollTop < 100);
    }
  }, [isHeaderVisible]);

  const handleScrollUpAttempt = useCallback(
    (e: WheelEvent | TouchEvent) => {
      if (reviewsContainerRef.current && reviewsContainerRef.current.scrollTop === 0 && !isHeaderVisible) {
        if ('deltaY' in e && e.deltaY < 0) {
          // console.log('attemp scrollup');
          setIsHeaderVisible(true);
          e.preventDefault();
        } else if ('touches' in e) {
          const touch = e.touches[0];
          const startY = touch.pageY;

          const handleTouchEnd = (endEvent: TouchEvent) => {
            const endY = endEvent.changedTouches[0].pageY;
            if (endY > startY) {
              console.log('Попытка прокрутить вверх на сенсорном устройстве');
              // Здесь можно выполнить нужное действие
            }
            reviewsContainerRef.current?.removeEventListener('touchend', handleTouchEnd);
          };

          reviewsContainerRef.current.addEventListener('touchend', handleTouchEnd);
        }
      }
    },
    [isHeaderVisible],
  );

  useLayoutEffect(() => {
    const reviewsContainer = reviewsContainerRef.current;
    if (reviewsContainer) {
      reviewsContainer.addEventListener('scroll', handleScrollReviewsDown);
      reviewsContainer.addEventListener('wheel', handleScrollUpAttempt, { passive: false });
      reviewsContainer.addEventListener('touchmove', handleScrollUpAttempt, { passive: false });
      return () => {
        reviewsContainer.removeEventListener('scroll', handleScrollReviewsDown);
        reviewsContainer.removeEventListener('wheel', handleScrollUpAttempt);
        reviewsContainer.removeEventListener('touchmove', handleScrollUpAttempt);
      };
    }
  }, [handleScrollReviewsDown, handleScrollUpAttempt]);

  useEffect(() => {
    let currentContainer: HTMLDivElement | null = null;

    const observer = new MutationObserver(() => {
      currentContainer = reviewsContainerRef.current;
      if (currentContainer) {
        currentContainer.addEventListener('scroll', handleScrollReviewsDown);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      if (currentContainer) {
        currentContainer.removeEventListener('scroll', handleScrollReviewsDown);
      }
    };
  }, [handleScrollReviewsDown]);

  useEffect(() => {
    if (place?.geometry.coordinates && setLocation) {
      setLocation(place.geometry.coordinates);
    }
  }, [place?.geometry.coordinates, setLocation]);

  if (!place?.properties) return <Loader />;
  if (!isOpen) return null;

  const { averageRating, description, name } = place.properties;

  const onSubmitReview = (reviewText: string) => {
    handleAddReview(reviewText);
    setShowReviewForm(false);
  };

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

  return (
    <div className={cls.detailsContainer}>
      <button className={cls.closeButton} onClick={onClose}>
        X
      </button>
      <h2>{name}</h2>
      <div className={`${cls.detailsHeader} ${!isHeaderVisible && cls.hideDetailsHeader}`}>
        <div className={cls.descriptionAndRating}>
          <div className={cls.ratingContainer}>
            <h4>Average Rating</h4>
            <div className={cls.ratingNumber}>
              {averageRating}
              <span>/5</span>
            </div>
            <RatingWidget isClickable={false} id={placeId} rating={averageRating} handleRating={handleRating} />
          </div>
          <div className={cls.description}>{description}</div>
        </div>
      </div>
      {(() => {
        const hasRating = !!place.properties.userRating;
        const hasReviewWithText = reviews.some((review) => review.isOwnReview && review.text.trim() !== '');

        if (!hasRating || !hasReviewWithText) {
          return (
            <div className={cls.rateNowContainer}>
              <h3>Have you visited this place?</h3>

              {!hasRating && (
                <>
                  <h3>Rate now</h3>
                  <RatingWidget
                    userRating={place.properties.userRating}
                    isClickable={true}
                    id={placeId}
                    rating={averageRating}
                    handleRating={handleRating}
                  />
                </>
              )}

              {!hasReviewWithText && (
                <button
                  onClick={() => {
                    setShowReviewForm((prev) => !prev);
                  }}
                >
                  Add review
                </button>
              )}
              <ReviewForm onSubmit={onSubmitReview} isVisible={showReviewForm} />
            </div>
          );
        }

        return null;
      })()}
      <h4>Reviews ({reviews.length})</h4>
      <div className={cls.reviewsContainer} ref={reviewsContainerRef}>
        <ul className={cls.reviewsList}>
          {reviews.map((review) => (
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
        </ul>
      </div>
    </div>
  );
};
