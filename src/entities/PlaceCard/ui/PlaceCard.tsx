import cls from './PlaceCard.module.scss';
import instagram from '../../../shared/assets/instagram.svg';
import { type PlaceProperties } from 'shared/types';
import { useContext } from 'react';
import { LocationContext } from 'app/providers/LocationProvider/lib/LocationContext';
import { type Position } from 'geojson';

interface PlaceCardProps {
  placeProperties: PlaceProperties;
  coordinates?: Position;
  isPopup?: boolean;
}

export const PlaceCard = ({ placeProperties, coordinates, isPopup = false }: PlaceCardProps) => {
  const { setLocation } = useContext(LocationContext);
  const handleClick = () => {
    if (coordinates && setLocation) {
      setLocation(coordinates);
    }
  };
  return (
    <div onClick={handleClick} className={`${cls.placeCard} ${isPopup ? cls.popupCard : ''}`}>
      <div
        className={cls.image}
        style={{
          backgroundImage: `url("${'./places-images/' + placeProperties.image}")`,
        }}
      ></div>
      <div className={cls.content}>
        <a className={cls.header} href={placeProperties.instagram} target="_blank" rel="noreferrer">
          <h4 className={cls.name}>{placeProperties.name}</h4>
          <img className={cls.instagram} src={instagram} alt="" />
        </a>

        <div className={cls.description}>{placeProperties.description}</div>

        <div className={cls.adress}>{placeProperties.address}</div>
      </div>
    </div>
  );
};
