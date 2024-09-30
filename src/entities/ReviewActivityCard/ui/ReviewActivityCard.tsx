import { formatDistanceToNow } from 'date-fns';
import { createSearchParams, NavLink } from 'react-router-dom';
// import RatingWidget from 'shared/ui/RatingWidget/ui/RatingWidget';
import { RegularButton } from 'shared/ui/RegularButton';
import cls from './ReviewActivityCard.module.scss';

interface ReviewActivityCardProps {
  averageRating: number | null;
  review: string | null;
  placeName: string;
  userRating: number | null;
  createdAt: string;
  placeId: string;
}
export const ReviewActivityCard = ({
  // averageRating,
  placeName,
  review,
  userRating,
  createdAt,
  placeId,
}: ReviewActivityCardProps) => {
  return (
    <div className={cls.ReviewActivityCard}>
      <p className={cls.createdAt}>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</p>
      <h3 className={cls.name}>{placeName}</h3>
      {/* <div className={cls.ratingContainer}>
        {averageRating ? (
          <>
            <h4>Average Rating</h4>
            <div className={`${cls.ratingNumber} ${averageRating === 0 && cls.notActiveRating}`}>
              {averageRating}
              <span>/5</span>
            </div>
          </>
        ) : (
          <p className={cls.noRatingText}>Place has not been rated yet</p>
        )}
        <RatingWidget isClickable={false} rating={averageRating} />
      </div> */}

      {userRating && (
        <div className={cls.rate}>
          <h4>My rating: {userRating}</h4>
        </div>
      )}

      {review && (
        <div className={cls.review}>
          <h4>My review:</h4>
          <p className={cls.reviewText}>&quot;{review.trim()}&quot;</p>
        </div>
      )}

      <NavLink to={{ pathname: '/details', search: createSearchParams({ id: placeId }).toString() }}>
        <RegularButton>Open place&apos;s page</RegularButton>
      </NavLink>
    </div>
  );
};
