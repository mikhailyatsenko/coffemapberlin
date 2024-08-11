import { type Position } from 'geojson';
import { useState } from 'react';
import { useDetailedCard } from 'app/providers/DetailedCardProvider';
import { useToggleFavorite } from 'shared/lib/hooks/interactions/useToggleFavorite';
import { type PlaceProperties } from 'shared/types';
import { AddToFavButton } from 'shared/ui/AddToFavButton';
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

  const { toggleFavorite } = useToggleFavorite();

  const [isFavorite, setIsFavorite] = useState(properties.isFavorite);

  const handleToggleFavorite = async () => {
    try {
      const result = await toggleFavorite(properties.id);
      if (result) {
        setIsFavorite(result.isFavorite);
        // setFavoriteCount(result.favoriteCount);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };
  return (
    <div className={cls.TooltipCardOnMap}>
      <div
        onClick={() => {
          setCurrentSelectedPlaceId(id);
        }}
        className={cls.image}
      >
        <img src={`./places-images/${image || 'default-place.jpg'}`} alt="Place image" />
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
          <div className={cls.iconsGroup}></div>
        </div>

        <div className={cls.rating}>
          <RatingWidget isClickable={false} rating={averageRating} id={id} /> {Boolean(averageRating) && averageRating}
        </div>
        <div className={cls.address}>{address}</div>
        <div className={cls.iconsGroup}>
          <div
            onClick={() => {
              setCurrentSelectedPlaceId(id);
            }}
            className={cls.moreButton}
          >
            More details
          </div>

          <a
            className={cls.iconWrapper}
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
            className={cls.iconWrapper}
            onClick={(e) => {
              e.stopPropagation();
            }}
            href={`https://www.google.com/maps/dir/?api=1&destination=${coordinates[1]},${coordinates[0]}&travelmode=walking`}
            target="_blank"
            rel="noreferrer"
          >
            <img className={cls.icon} src={routeToIcon} alt="" />
          </a>
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleToggleFavorite();
            }}
            className={cls.iconWrapper}
          >
            <AddToFavButton isFavorite={isFavorite} />
          </div>
        </div>
      </div>
    </div>
  );
};
