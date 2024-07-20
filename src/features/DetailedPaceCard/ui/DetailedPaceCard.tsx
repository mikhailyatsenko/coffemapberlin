import React, { useContext, useEffect, useState } from 'react';
import cls from './DetailedPaceCard.module.scss';
import { type PlaceResponse } from 'shared/types';
import RatingWidget from 'shared/ui/RatingWidget/ui/RatingWidget';
import { ReviewForm } from 'entities/ReviewForm/ui/ReviewForm';
import { DELETE_REVIEW, GET_ALL_PLACES, GET_PLACE_REVIEWS } from 'shared/query/places';
import { useMutation, useQuery } from '@apollo/client';
import { useRatePlace } from '../api/interactions/useRatePlace';
import { Loader } from 'shared/ui/Loader';
import { ReviewCard } from 'shared/ui/ReviewCard';
import { useAddReview } from '../api/interactions/useAddReview';
import { LocationContext } from 'app/providers/LocationProvider/lib/LocationContext';

interface DetailedPaceCardProps {
  placeId: string;
  isOpen: boolean;
  onClose: () => void;
}

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

interface PlacesData {
  places: PlaceResponse[];
}

export const DetailedPaceCard: React.FC<DetailedPaceCardProps> = ({ isOpen, onClose, placeId }) => {
  const { setLocation } = useContext(LocationContext);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { handleAddReview, loading: addReviewLoading, error: addRevewError } = useAddReview(placeId);

  const { data: placesData } = useQuery<PlacesData>(GET_ALL_PLACES);
  const {
    data: reviewsData,
    loading: reviewsLoading,
    error: reviewsError,
  } = useQuery<PlaceReviewsData>(GET_PLACE_REVIEWS, {
    variables: { placeId },
  });

  const { handleRating } = useRatePlace();

  const [deleteReview] = useMutation(DELETE_REVIEW, {
    refetchQueries: [{ query: GET_PLACE_REVIEWS, variables: { placeId } }],
  });

  const place = placesData?.places.find((p) => p.properties.id === placeId);
  useEffect(() => {
    if (place?.geometry.coordinates && setLocation) {
      setLocation(place.geometry.coordinates);
    }
  }, [place?.geometry.coordinates, setLocation]);

  if (!place?.properties) return <Loader />;
  if (!isOpen) return null;

  const { averageRating, description, name } = place.properties;

  // console.log('Loading reviews:', reviewsLoading);
  // console.log('Error fetching reviews:', reviewsError);
  // console.log('Fetched reviews:', reviewsData?.placeReviews);

  const reviews = reviewsData?.placeReviews ?? [];

  if (!isOpen) return null;

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
      <div className={cls.detailsHeader}>
        <h2>{name}</h2>
        <div className={cls.descriptionAndRating}>
          <div className={cls.ratingContainer}>
            <h4>Average Rating</h4>
            <div className={cls.ratingNumber}>
              {averageRating}
              <span>/5</span>
            </div>
            <RatingWidget isClickable={false} id={placeId} rating={averageRating} handleRating={handleRating} />
          </div>
          <div>{description}</div>
        </div>
        <div className={cls.rateNowContainer}>
          <h3>Have you visited this place?</h3>
          <h3>Rate now</h3>
          <RatingWidget isClickable={true} id={placeId} rating={averageRating} handleRating={handleRating} />

          <button
            onClick={() => {
              setShowReviewForm((prew) => !prew);
            }}
          >
            Add review
          </button>
        </div>

        <ReviewForm onSubmit={handleAddReview} isVisible={showReviewForm} />
        <h3>Reviews:</h3>
      </div>
      <div className={cls.reviewsContainer}>
        <ul className={cls.reviewsList}>
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
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
