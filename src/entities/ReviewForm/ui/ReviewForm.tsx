import React, { useState } from 'react';
import cls from './ReviewForm.module.scss';

interface ReviewFormProps {
  placeId: string;
  onSubmit: (text: string) => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewText.trim()) {
      onSubmit(reviewText);
      setReviewText('');
    }
  };

  return (
    <form className={cls.reviewForm} onSubmit={handleSubmit}>
      <textarea
        className={cls.reviewInput}
        value={reviewText}
        onChange={(e) => {
          setReviewText(e.target.value);
        }}
        placeholder="Write your review here..."
        rows={4}
      />
      <button type="submit" className={cls.submitButton} disabled={!reviewText.trim()}>
        Submit Review
      </button>
    </form>
  );
};
