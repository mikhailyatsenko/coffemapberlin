import { useState } from 'react';
import cls from './RatingWidget.module.scss';
import BeanIcon from './BeanIcon';

interface RatingProps {
  rating: number;
  id: string;
  handleRating?: (rating: number, id: string) => void;
  isClickable: boolean;
  userRating?: number;
}

const RatingWidget: React.FC<RatingProps> = ({ rating, handleRating, id, isClickable, userRating = 0 }) => {
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleMouseEnter = (index: number) => {
    setHoverRating(index + 1);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (index: number) => {
    if (handleRating) {
      handleRating(index + 1, id);
    }
  };

  return (
    <div className={cls.rating}>
      {[...Array(5)].map((_, index) => {
        const fillValue = isClickable ? hoverRating || userRating : hoverRating || rating;
        const filled = index < Math.floor(fillValue);
        const halfFilled = !filled && index < fillValue;

        return (
          <span
            key={index}
            className={cls.starWrapper}
            {...(isClickable && {
              onMouseEnter: () => {
                handleMouseEnter(index);
              },
              onMouseLeave: handleMouseLeave,
              onClick: () => {
                handleClick(index);
              },
              style: { cursor: 'pointer' },
            })}
          >
            <BeanIcon clickable={isClickable} filled={filled} />
            {halfFilled && (
              <div className={cls.halfStar}>
                <BeanIcon clickable={isClickable} filled={true} />
              </div>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default RatingWidget;
