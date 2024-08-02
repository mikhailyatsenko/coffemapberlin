import React, { useContext, useEffect, useState, useRef, useCallback, useLayoutEffect } from 'react';
import cls from './DetailedPaceCard.module.scss';
import RatingWidget from 'shared/ui/RatingWidget/ui/RatingWidget';
import { GET_ALL_PLACES, GET_PLACE_DETAILS } from 'shared/query/places';
import { useQuery } from '@apollo/client';
import { Loader } from 'shared/ui/Loader';
import { type PlaceDetailsData } from '../../../features/RateNow/api/interactions/useReview';
import { LocationContext } from 'app/providers/LocationProvider/lib/LocationContext';
import { type PlaceResponse } from 'shared/types';
import { PortalToBody } from 'shared/ui/Portals/PortalToBody';
import { InstagramEmbedProfile } from 'shared/ui/InstagramEmbed';
import { RateNow } from 'features/RateNow';
import { ReviewList } from 'features/ReviewList';

interface DetailedPaceCardProps {
  placeId: string;
  onClose: () => void;
}

export const DetailedPaceCard: React.FC<DetailedPaceCardProps> = ({ onClose, placeId }) => {
  const { setLocation } = useContext(LocationContext);

  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const reviewsListRef = useRef<HTMLDivElement>(null);
  const detailedCardRef = useRef<HTMLDivElement>(null);

  const { data: allPlacesData } = useQuery<{ places: PlaceResponse[] }>(GET_ALL_PLACES);
  const { data: placeDetailsData, loading } = useQuery<PlaceDetailsData>(GET_PLACE_DETAILS, {
    variables: { placeId },
  });

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

  const { averageRating, description, name, address, instagram } = place.properties;

  return (
    <PortalToBody>
      <div className={cls.backDrop}>
        <div ref={detailedCardRef} className={cls.detailsContainer}>
          <button className={cls.closeButton} onClick={onClose}></button>
          <InstagramEmbedProfile username={instagram} />
          <h2 className={cls.name}>{name}</h2>
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
          <RateNow placeId={placeId} reviews={reviews} />
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
              <ReviewList reviews={reviews} placeId={placeId} />
            </div>
          </div>
        </div>
      </div>
    </PortalToBody>
  );
};
