import React from 'react';
import styles from './DetailedPaceCard.module.scss';
import { type PlaceResponse } from 'shared/types';
import RatingWidget from 'shared/ui/RatingWidget/ui/RatingWidget';
import { ReviewForm } from 'entities/ReviewForm/ui/ReviewForm';
import { DELETE_REVIEW, GET_ALL_PLACES, GET_PLACE_REVIEWS } from 'shared/query/places';
import { useMutation, useQuery } from '@apollo/client';
import { useRatePlace } from '../api/interactions/useRatePlace';
import { Loader } from 'shared/ui/Loader';
import { ReviewCard } from 'shared/ui/ReviewCard';
import { useAddReview } from '../api/interactions/useAddReview';

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

  if (!isOpen) return null;

  const place = placesData?.places.find((p) => p.properties.id === placeId);

  if (!place?.properties) return <Loader />;

  const { averageRating, description, name } = place.properties;

  console.log('Loading reviews:', reviewsLoading);
  console.log('Error fetching reviews:', reviewsError);
  console.log('Fetched reviews:', reviewsData?.placeReviews);

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
    <div className={styles.popupContainer}>
      <div className={styles.popupContent}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <h2>{name}</h2>
        <p>{description}</p>
        <div className={styles.ratingContainer}>
          <RatingWidget id={placeId} rating={averageRating} handleRating={handleRating} />
          <span>{averageRating}</span>
        </div>
        {/* <p>Добавлено в избранное: {isFavorite ? 'да' : 'no'}</p> */}
        <h3>Add review</h3>
        <ReviewForm onSubmit={handleAddReview} placeId={placeId} />
        <h3>Reviews:</h3>
        <ul className={styles.commentsList}>
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
