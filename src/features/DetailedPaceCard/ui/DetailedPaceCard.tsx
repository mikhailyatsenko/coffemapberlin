import React from 'react';
import styles from './DetailedPaceCard.module.scss';
import { type PlaceProperties } from 'shared/types';
import RatingWidget from 'shared/ui/RatingWidget/ui/RatingWidget';
import { AddReview } from 'entities/ReviewForm/ui/ReviewForm';
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
  placeId: string;
  createdAt: string;
  isOwnReview: boolean;
}
interface PlaceReviewsData {
  placeReviews: Review[];
}

export const DetailedPaceCard: React.FC<CoffeeShopPopupProps> = ({ isOpen, onClose, properties }) => {
  if (!isOpen) return null;

  const { data, loading, error } = useQuery<PlaceReviewsData>(GET_PLACE_REVIEWS, {
    variables: { placeId: properties.id },
  });
  const reviews = data?.placeReviews ?? [];

  const [deleteReview] = useMutation(DELETE_REVIEW, {
    refetchQueries: [{ query: GET_PLACE_REVIEWS, variables: { placeId: properties.id } }],
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
        <AddReview placeId={properties.id} />
        <h3>Reviews:</h3>
        <ul className={styles.commentsList}>
          {reviews.map((revew, index) => (
            <li key={index}>
              <strong>{revew.userName}:</strong> {revew.text}
              {revew.isOwnReview ? (
                <div
                  onClick={async () => {
                    await handleDeleteReview(revew.id);
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
