import RatingWidget from 'shared/ui/RatingWidget/ui/RatingWidget';
import cls from './HeaderDetailedPlacCard.module.scss';

interface HeaderDetailedPlacCardProps {
  isHeaderVisible: boolean;
  placeId: string;
  description: string;
  averageRating: number;
}

export const HeaderDetailedPlacCard = ({
  isHeaderVisible,
  averageRating,
  description,
  placeId,
}: HeaderDetailedPlacCardProps) => {
  return (
    <div className={`${cls.detailsHeader} ${!isHeaderVisible && cls.hideDetailsHeader}`}>
      <div className={cls.descriptionAndRating}>
        <div className={cls.ratingContainer}>
          <h4>Average Rating</h4>
          <div className={cls.ratingNumber}>
            {averageRating}
            <span>/5</span>
          </div>
          <RatingWidget isClickable={false} id={placeId} rating={averageRating} />
        </div>
        <div className={cls.description}>{description}</div>
      </div>
    </div>
  );
};
