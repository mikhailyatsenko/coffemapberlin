import { type Position } from 'geojson';
import { useDetailedCard } from 'app/providers/DetailedCardProvider';
import LazyImage from 'shared/lib/LazyImage/LazyImage';
import { type PlaceProperties } from 'shared/types';
import RatingWidget from 'shared/ui/RatingWidget/ui/RatingWidget';
import instagramIcon from '../../../shared/assets/instagram.svg';
import routeToIcon from '../../../shared/assets/route-to.svg';
import cls from './TooltipCardOnMap.module.scss';

interface TooltipCardOnMapProps {
  properties: PlaceProperties;
  coordinates: Position;
}

export const TooltipCardOnMap = ({ properties, coordinates }: TooltipCardOnMapProps) => {
  const { id, averageRating, name, address, instagram, image } = properties;
  const { setCurrentSelectedPlaceId } = useDetailedCard();
  return (
    <div className={cls.TooltipCardOnMap}>
      <div
        onClick={() => {
          setCurrentSelectedPlaceId(id);
        }}
        className={cls.image}
      >
        <LazyImage src={`./places-images/${image || 'default-place.jpg'}`} alt="Place image" />
      </div>
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
          <div className={cls.iconsGroup}>
            <a
              onClick={(e) => {
                e.stopPropagation();
              }}
              href={'https://www.instagram.com/' + instagram}
              target="_blank"
              rel="noreferrer"
            >
              <img className={cls.icon} src={instagramIcon} alt="" />
            </a>
            <a
              onClick={(e) => {
                e.stopPropagation();
              }}
              href={`https://www.google.com/maps/dir/?api=1&destination=${coordinates[1]},${coordinates[0]}&travelmode=walking`}
              target="_blank"
              rel="noreferrer"
            >
              <img className={cls.icon} src={routeToIcon} alt="" />
            </a>
          </div>
        </div>

        <div className={cls.rating}>
          <RatingWidget isClickable={false} rating={averageRating} id={id} /> {Boolean(averageRating) && averageRating}
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
