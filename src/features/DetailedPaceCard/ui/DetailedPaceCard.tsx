import React, { useContext, useEffect, useState, useRef, useCallback, useLayoutEffect } from 'react';
import cls from './DetailedPaceCard.module.scss';
import RatingWidget from 'shared/ui/RatingWidget/ui/RatingWidget';
import { ReviewForm } from 'entities/ReviewForm/ui/ReviewForm';
import { DELETE_REVIEW, GET_ALL_PLACES, GET_PLACE_DETAILS } from 'shared/query/places';
import { useMutation, useQuery } from '@apollo/client';
import { Loader } from 'shared/ui/Loader';
import { ReviewCard } from 'shared/ui/ReviewCard';
import { type PlaceDetailsData, useReview } from '../api/interactions/useReview';
import { LocationContext } from 'app/providers/LocationProvider/lib/LocationContext';
import { RegularButton } from 'shared/ui/RegularButton';
import { type PlaceResponse } from 'shared/types';
import { PortalToBody } from 'shared/ui/Portals/PortalToBody';

interface DetailedPaceCardProps {
  placeId: string;
  onClose: () => void;
}

export const DetailedPaceCard: React.FC<DetailedPaceCardProps> = ({ onClose, placeId }) => {
  const { setLocation } = useContext(LocationContext);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const reviewsListRef = useRef<HTMLDivElement>(null);
  const detailedCardRef = useRef<HTMLDivElement>(null);

  const { handleAddReview, loading: reviewLoading } = useReview(placeId);

  const [deleteReview] = useMutation(DELETE_REVIEW, {
    refetchQueries: [{ query: GET_PLACE_DETAILS, variables: { placeId } }],
  });

  const { data: allPlacesData } = useQuery<{ places: PlaceResponse[] }>(GET_ALL_PLACES);
  const {
    data: placeDetailsData,
    loading,
    // error,
  } = useQuery<PlaceDetailsData>(GET_PLACE_DETAILS, {
    variables: { placeId },
  });
  console.log(placeDetailsData);

  const place = allPlacesData?.places.find((p) => p.properties.id === placeId);
  const reviews = placeDetailsData?.placeDetails.reviews ?? [];

  const handleScrollReviewsDown = useCallback(() => {
    if (reviewsListRef.current && isHeaderVisible) {
      const scrollTop = reviewsListRef.current.scrollTop;
      setIsHeaderVisible(scrollTop < 100);
    }
  }, [isHeaderVisible]);

  const handleScrollUpAttempt = useCallback(
    (e: WheelEvent | TouchEvent) => {
      if (reviewsListRef.current && reviewsListRef.current.scrollTop === 0 && !isHeaderVisible) {
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
              setIsHeaderVisible(true);
              e.preventDefault();
            }
            reviewsListRef.current?.removeEventListener('touchend', handleTouchEnd);
          };

          reviewsListRef.current.addEventListener('touchend', handleTouchEnd);
        }
      }
    },
    [isHeaderVisible],
  );

  useLayoutEffect(() => {
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

  useEffect(() => {
    if (place?.geometry.coordinates && setLocation) {
      setLocation(place.geometry.coordinates);
    }
  }, [place?.geometry.coordinates, setLocation]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (detailedCardRef.current && !detailedCardRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  if (!place?.properties || loading) return <Loader />;

  const { averageRating, description, name, address } = place.properties;

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
    <PortalToBody>
      <div className={cls.backDrop}>
        <div ref={detailedCardRef} className={cls.detailsContainer}>
          <button className={cls.closeButton} onClick={onClose}></button>
          <h2>{name}</h2>
          <p className={cls.address}>{address}</p>
          <div className={`${cls.detailsHeader} ${!isHeaderVisible && cls.hideDetailsHeader}`}>
            <div className={cls.descriptionAndRating}>
              <div className={cls.ratingContainer}>
                <h4>Average Rating</h4>
                <div className={cls.ratingNumber}>
                  {averageRating}
                  <span>/5</span>
                </div>
                <RatingWidget isClickable={false} id={placeId} rating={averageRating} />
              </div>
              <div className={cls.description}>{description}</div>
            </div>
          </div>
          {(() => {
            const hasRating = reviews.some((review) => review.isOwnReview && review.userRating !== null);
            console.log('has rating?:', hasRating);
            const hasReviewWithText = reviews.some((review) => review.isOwnReview && review.text.trim() !== '');

            if (!hasRating || !hasReviewWithText) {
              return (
                <div className={cls.rateNowContainer}>
                  <h3>Have you visited this place?</h3>

                  {!hasRating && (
                    <>
                      <h4>Rate now</h4>
                      <RatingWidget
                        userRating={place.properties.userRating}
                        isClickable={true}
                        id={placeId}
                        rating={averageRating}
                        handleRating={handleAddReview}
                      />
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
                  <ReviewForm isLoading={reviewLoading} onSubmit={onSubmitReview} isVisible={showReviewForm} />
                </div>
              );
            }

            return null;
          })()}

          {!showReviewForm && (
            <div className={cls.reviewsContainer}>
              <h4
                onClick={() => {
                  setIsHeaderVisible((prew) => !prew);
                }}
                className={cls.reviewsTitel}
              >
                Reviews ({reviews.length})
              </h4>
              <div ref={reviewsListRef} className={cls.reviewsList}>
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
              </div>
            </div>
          )}
        </div>
      </div>
    </PortalToBody>
  );
};
