import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { GET_PLACE_REVIEWS } from 'shared/query/places';

const ADD_REVIEW = gql`
  mutation AddReview($placeId: ID!, $text: String!) {
    addReview(placeId: $placeId, text: $text) {
      id
      text
      userId
      placeId
      createdAt
    }
  }
`;

interface AddReviewProps {
  placeId: string;
}

export const ReviewForm: React.FC<AddReviewProps> = ({ placeId }) => {
  const [review, setReview] = useState('');
  const [addReview, { loading, error }] = useMutation(ADD_REVIEW, {
    refetchQueries: [{ query: GET_PLACE_REVIEWS, variables: { placeId } }, 'GetPlaceReviews'],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addReview({
        variables: { placeId, text: review },
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
