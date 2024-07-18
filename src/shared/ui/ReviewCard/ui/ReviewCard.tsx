import cls from './ReviewCard.module.scss';

interface ReviewCardProps {
  id: string;
  userAvatar?: string;
  userName: string;
  reviewText: string;
  rating?: number;
  isOwnReview?: boolean;
  handleDeleteReview: (id: string) => void;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  id,
  userAvatar,
  userName,
  reviewText,
  rating,
  isOwnReview,
  handleDeleteReview,
}) => {
  return (
    <div className={cls.reviewCard}>
      <div className={cls.userInfo}>
        <img src={userAvatar ?? '/default-avatar.png'} alt={userName} className={cls.avatar} />
        <span className={cls.userName}>{userName}</span>
      </div>
      <p className={cls.reviewText}>{reviewText}</p>
      {rating !== undefined && <div className={cls.rating}>Rating: {rating}</div>}
      {isOwnReview && (
        <button
          onClick={() => {
            handleDeleteReview(id);
          }}
          className={cls.deleteButton}
        >
          Delete
        </button>
      )}
    </div>
  );
};
