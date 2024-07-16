import React from 'react';
import styles from './DetailedPaceCard.module.scss';
import { type PlaceProperties } from 'shared/types';
import RatingWidget from 'shared/ui/RatingWidget/ui/RatingWidget';
import { ReviewForm } from 'entities/ReviewForm/ui/ReviewForm';
import { DELETE_REVIEW, GET_PLACE_REVIEWS } from 'shared/query/places';
import { useMutation, useQuery } from '@apollo/client';

interface CoffeeShopPopupProps {
  isOpen: boolean;
  onClose: () => void;
  properties: PlaceProperties;
}

interface Review {
  id: string;
  text: string;
  userId: string;
  userName: string;
  userAvatar: string;
  placeId: string;
  createdAt: string;
  isOwnReview: boolean;
}
interface PlaceReviewsData {
  placeReviews: Review[];
}

export const DetailedPaceCard: React.FC<CoffeeShopPopupProps> = ({ isOpen, onClose, properties }) => {
  const { data, loading, error } = useQuery<PlaceReviewsData>(GET_PLACE_REVIEWS, {
    variables: { placeId: properties.id },
  });

  console.log('Loading reviews:', loading);
  console.log('Error fetching reviews:', error);
  console.log('Fetched reviews:', data?.placeReviews);
  const reviews = data?.placeReviews ?? [];
  console.log(reviews);

  const [deleteReview] = useMutation(DELETE_REVIEW, {
    refetchQueries: [{ query: GET_PLACE_REVIEWS, variables: { placeId: properties.id } }],
  });

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
        <h2>{properties.name}</h2>
        <p>{properties.description}</p>
        <div className={styles.ratingContainer}>
          <RatingWidget id={properties?.id} rating={properties?.averageRating} />
          <span>{properties.averageRating}</span>
        </div>
        <p>Добавлено в избранное: {properties?.isFavorite}</p>
        <h3>Add review</h3>
        <ReviewForm placeId={properties.id} />
        <h3>Reviews:</h3>
        <ul className={styles.commentsList}>
          {reviews.map((review, index) => (
            <li key={index}>
              <img src={review?.userAvatar ?? '/default-avatar.png'} alt="User avatar" referrerPolicy="no-referrer" />
              <strong>{review.userName}:</strong> {review.text}
              {review.isOwnReview ? (
                <div
                  onClick={async () => {
                    await handleDeleteReview(review.id);
                  }}
                >
                  remove my review
                </div>
              ) : (
                ''
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
