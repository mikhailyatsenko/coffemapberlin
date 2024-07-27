import React, { useState } from 'react';
import cls from './ReviewForm.module.scss';
import { RegularButton } from 'shared/ui/RegularButton';
import { Loader } from 'shared/ui/Loader';

interface ReviewFormProps {
  // placeId: string;
  onSubmit: (text: string) => void;
  isVisible: boolean;
  isLoading: boolean;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit, isVisible, isLoading }) => {
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewText.trim()) {
      onSubmit(reviewText);
      setReviewText('');
    }
  };

  if (isLoading) return <Loader />;

  return (
    <form className={`${cls.reviewForm} ${isVisible ? cls.displayForm : ''}`} onSubmit={handleSubmit}>
      <textarea
        className={cls.reviewInput}
        value={reviewText}
        onChange={(e) => {
          setReviewText(e.target.value);
        }}
        placeholder="Write your review here..."
        rows={4}
      />
      <RegularButton type="submit" disabled={!reviewText.trim()}>
        Submit Review
      </RegularButton>
    </form>
  );
};
