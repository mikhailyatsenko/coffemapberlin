import { type Position } from 'geojson';
import { useContext, useState } from 'react';
import { useDetailedCard } from 'app/providers/DetailedCardProvider';
import { LocationContext } from 'app/providers/LocationProvider/lib/LocationContext';
import { useToggleFavorite } from 'shared/lib/hooks/interactions/useToggleFavorite';
import LazyImage from 'shared/lib/LazyImage/LazyImage';
import { type PlaceProperties } from 'shared/types';
import { AddToFavButton } from 'shared/ui/AddToFavButton';
import RatingWidget from 'shared/ui/RatingWidget/ui/RatingWidget';
import instagram from '../../../shared/assets/instagram.svg';
import roteToImage from '../../../shared/assets/route-to.svg';
import showPlacePointOnMap from '../../../shared/assets/show-on-map.svg';
import cls from './PlaceCard.module.scss';

interface PlaceCardProps {
  properties: PlaceProperties;
  coordinates: Position;
}

export const PlaceCard = ({ properties, coordinates }: PlaceCardProps) => {
  const { setLocation } = useContext(LocationContext);
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
    <>
      <div
        onClick={() => {
          setCurrentSelectedPlaceId(properties.id);
        }}
        className={`${cls.placeCard} `}
      >
        <div className={cls.image}>
          <LazyImage src={`./places-images/${properties.image || 'default-place.jpg'}`} alt="Place image" />
        </div>
        <div className={cls.content}>
          <div className={cls.cardHeader}>
            <h4
              onClick={() => {
                setCurrentSelectedPlaceId(properties.id);
              }}
              className={cls.name}
            >
              {properties.name}
            </h4>
            <div className={cls.iconsGroup}>
              <a
                className={cls.iconWrapper}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                href={'https://www.instagram.com/' + properties.instagram}
                target="_blank"
                rel="noreferrer"
              >
                <img className={cls.icon} src={instagram} alt="" />
              </a>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className={cls.iconWrapper}
              >
                <AddToFavButton handleFavoriteToggle={handleToggleFavorite} isFavorite={isFavorite} />
              </div>
            </div>
          </div>
          <div className={cls.rating}>
            <RatingWidget isClickable={false} rating={properties.averageRating} id={properties.id} />{' '}
            {Boolean(properties.averageRating) && properties.averageRating}
          </div>
          <div className={cls.description}>{properties.description}</div>
          <div className={cls.address}>
            <p>{properties.address}</p>
            <div className={cls.iconsGroup}>
              <a
                onClick={(e) => {
                  e.stopPropagation();
                }}
                href={`https://www.google.com/maps/dir/?api=1&destination=${coordinates[1]},${coordinates[0]}&travelmode=walking`}
                target="_blank"
                rel="noreferrer"
                className={cls.iconWrapper}
              >
                <img className={cls.icon} src={roteToImage} alt="" />
              </a>
              <a
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if (coordinates && setLocation) {
                    setLocation(coordinates);
                  }
                }}
                rel="noreferrer"
                className={cls.iconWrapper}
              >
                <img className={cls.icon} src={showPlacePointOnMap} alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
