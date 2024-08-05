import cls from './TooltipCardOnMap.module.scss';
import instagramIcon from '../../../shared/assets/instagram.svg';
import { useDetailedCard } from 'app/providers/DetailedCardProvider';
import RatingWidget from 'shared/ui/RatingWidget/ui/RatingWidget';
import { type PlaceProperties } from 'shared/types';

interface TooltipCardOnMapProps {
  properties: PlaceProperties;
}

export const TooltipCardOnMap = ({ properties }: TooltipCardOnMapProps) => {
  const { id, averageRating, name, address, instagram, image } = properties;
  const { setCurrentSelectedPlaceId } = useDetailedCard();
  return (
    <div className={cls.TooltipCardOnMap}>
      <div
        className={cls.image}
        style={{
          backgroundImage: `url('./places-images/${image || 'default-place.jpg'}')`,
        }}
      ></div>
      <div className={cls.content}>
        <div className={cls.header}>
          <h4
            onClick={() => {
              setCurrentSelectedPlaceId(id);
            }}
            className={cls.name}
          >
            {name}
          </h4>
          <a
            onClick={(e) => {
              e.stopPropagation();
            }}
            href={'https://www.instagram.com/' + instagram}
            target="_blank"
            rel="noreferrer"
          >
            <img className={cls.instagram} src={instagramIcon} alt="" />
          </a>
        </div>

        <div className={cls.rating}>
          <RatingWidget isClickable={false} rating={averageRating} id={id} /> {averageRating}
        </div>
        <div className={cls.address}>{address}</div>
        <div
          onClick={() => {
            setCurrentSelectedPlaceId(id);
          }}
          className={cls.moreButton}
        >
          More details...
        </div>
      </div>
    </div>
  );
};
