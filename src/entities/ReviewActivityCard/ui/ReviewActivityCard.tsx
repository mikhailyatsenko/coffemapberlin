import { formatDistanceToNow } from 'date-fns';
import RatingWidget from 'shared/ui/RatingWidget/ui/RatingWidget';
import cls from './ReviewActivityCard.module.scss';

interface ReviewActivityCardProps {
  averageRating: number | null;
  review: string | null;
  placeName: string;
  userRating: number | null;
  createdAt: string;
}
export const ReviewActivityCard = ({
  averageRating,
  placeName,
  review,
  userRating,
  createdAt,
}: ReviewActivityCardProps) => {
  return (
    <div className={cls.ReviewActivityCard}>
      {averageRating && (
        <>
          <h3>{placeName}</h3>
          <div className={cls.ratingContainer}>
            {averageRating ? (
              <h4>Average Rating</h4>
            ) : (
              <p className={cls.noRatingText}>This place has not been rated yet</p>
            )}
            <div className={`${cls.ratingNumber} ${averageRating === 0 && cls.notActiveRating}`}>
              {averageRating}
              <span>/5</span>
            </div>
            <RatingWidget isClickable={false} rating={averageRating} />
          </div>

          <p>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</p>
        </>
      )}

      {userRating && <p>{userRating}</p>}
      {review && <p>{review}</p>}
    </div>
  );
};
