import { useState } from 'react';
import cls from './RatingWidget.module.scss';
import BeanIcon from './BeanIcon';

interface RatingProps {
  rating: number;
  handleRating?: (rating: number) => void;
}

const RatingWidget: React.FC<RatingProps> = ({ rating, handleRating }) => {
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleMouseEnter = (index: number) => {
    setHoverRating(index + 1);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (index: number) => {
    if (handleRating) {
      handleRating(index + 1);
    }
  };

  return (
    <div className={cls.rating}>
      {[...Array(5)].map((_, index) => {
        const fillValue = hoverRating || rating;
        const filled = index < Math.floor(fillValue);
        const halfFilled = !filled && index < fillValue;

        return (
          <span
            key={index}
            className={cls.starWrapper}
            onMouseEnter={() => {
              handleMouseEnter(index);
            }}
            onMouseLeave={handleMouseLeave}
            onClick={() => {
              handleClick(index);
            }}
          >
            <BeanIcon filled={filled} />
            {halfFilled && (
              <div className={cls.halfStar}>
                <BeanIcon filled={true} />
              </div>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default RatingWidget;
