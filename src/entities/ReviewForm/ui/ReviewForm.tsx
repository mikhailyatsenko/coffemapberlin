import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { ADD_REVIEW } from 'shared/query/places';

interface AddReviewProps {
  placeId: string;
}

export const AddReview: React.FC<AddReviewProps> = ({ placeId }) => {
  const [review, setReview] = useState('');
  const [addReview, { data, loading, error }] = useMutation(ADD_REVIEW);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addReview({
        variables: { placeId, text: review },
        update: (cache, { data: { addReview } }) => {
          // Обновляем кэш Apollo Client после добавления отзыва
          const existingPlace = cache.readFragment({
            id: `Place:${placeId}`,
            fragment: gql`
              fragment PlaceReviews on Place {
                id
                reviews {
                  id
                  text
                  userId
                  createdAt
                }
              }
            `,
          });

          if (existingPlace) {
            cache.writeFragment({
              id: `Place:${placeId}`,
              fragment: gql`
                fragment UpdatePlaceReviews on Place {
                  reviews
                }
              `,
              data: {
                reviews: [...existingPlace.reviews, addReview],
              },
            });
          }
        },
      });
      setReview('');
    } catch (err) {
      console.error('Error adding review:', err);
    }
  };

  if (loading) return <p>Submitting...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={review}
        onChange={(e) => {
          setReview(e.target.value);
        }}
        placeholder="Add your review..."
      />
      <button type="submit">Submit Review</button>
    </form>
  );
};
