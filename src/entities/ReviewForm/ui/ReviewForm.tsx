import React from 'react';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { FormField } from 'shared/ui/FormField';
import { Loader } from 'shared/ui/Loader';
import { RegularButton } from 'shared/ui/RegularButton';
import cls from './ReviewForm.module.scss';

interface ReviewFormProps {
  onSubmit: (text: string) => void;
  onBack: () => void;
  isLoading: boolean;
}

const MAX_REVIEW_LENGTH = 1000; // Максимальная длина отзыва

interface ReviewFormData {
  review: string;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit, isLoading, onBack }) => {
  const form = useForm<ReviewFormData>({ mode: 'onChange' });

  const {
    handleSubmit,
    formState: { errors, isValid },
    // reset,
  } = form;

  const handleFormSubmit: SubmitHandler<ReviewFormData> = (data) => {
    if (data.review.trim()) {
      onSubmit(data.review);
      // reset();
    }
  };

  if (isLoading) return <Loader />;

  return (
    <FormProvider {...form}>
      <form className={`${cls.reviewForm}`} onSubmit={handleSubmit(handleFormSubmit)}>
        <FormField fieldName="review" type="textarea" maxLength={MAX_REVIEW_LENGTH} labelText="Review" />
        {errors.review && <p className={cls.formError}>{errors.review.message}</p>}
        <div className={cls.buttons}>
          <RegularButton theme="blank" type="button" clickHandler={onBack}>
            &#8612; Back
          </RegularButton>
          <RegularButton type="submit" disabled={!isValid}>
            Submit Review
          </RegularButton>
        </div>
      </form>
    </FormProvider>
  );
};
