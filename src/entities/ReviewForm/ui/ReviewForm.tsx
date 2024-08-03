import React, { useState } from 'react';
import cls from './ReviewForm.module.scss';
import { RegularButton } from 'shared/ui/RegularButton';
import { Loader } from 'shared/ui/Loader';

interface ReviewFormProps {
  onSubmit: (text: string) => void;
  onBack: () => void;
  isLoading: boolean;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit, isLoading, onBack }) => {
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
    <form className={`${cls.reviewForm}`} onSubmit={handleSubmit}>
      <textarea
        className={cls.reviewInput}
        value={reviewText}
        onChange={(e) => {
          setReviewText(e.target.value);
        }}
        placeholder="Write your review here..."
        rows={4}
      />
      <div className={cls.buttons}>
        <RegularButton theme="blank" type="button" clickHandler={onBack}>
          &#8612; Back
        </RegularButton>
        <RegularButton type="submit" disabled={!reviewText.trim()}>
          Submit Review
        </RegularButton>
      </div>
    </form>
  );
};
