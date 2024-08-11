import { useEffect, useState } from 'react';
import cls from './AddToFavButton.module.scss';

interface AddToFavButtonProps {
  handleFavoriteToggle?: () => void;
  isFavorite: boolean;
}

export const AddToFavButton = ({ handleFavoriteToggle, isFavorite }: AddToFavButtonProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    if (handleFavoriteToggle) handleFavoriteToggle();
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 760);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isAnimating]);

  return (
    <div
      className={`${cls.AddToFavButton} ${isFavorite ? `${cls.filled}` : ''} ${isAnimating ? cls.animate : ''}`}
      onClick={handleClick}
    ></div>
  );
};
