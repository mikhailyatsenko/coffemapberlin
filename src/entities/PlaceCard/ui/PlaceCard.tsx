import cls from './PlaceCard.module.scss';
import instagram from '../../../shared/assets/instagram.svg';
import { type Place } from 'shared/types';
import { useContext } from 'react';
import { LocationContext, type LocationPoint } from 'app/providers/LocationProvider/lib/ThemeContext';

interface PlaceCardProps {
  place: Place;
  coordinates?: LocationPoint;
  isPopup?: boolean;
}

export const PlaceCard = ({ place, coordinates, isPopup = false }: PlaceCardProps) => {
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
          backgroundImage: `url("${'./places-images/' + place.image}")`,
        }}
      ></div>
      <div className={cls.content}>
        <a className={cls.header} href={place.instagram} target="_blank" rel="noreferrer">
          <h3 className={cls.name}>{place.name}</h3>
          <img className={cls.instagram} src={instagram} alt="" />
        </a>

        <div className={cls.description}>{place.description}</div>

        <div className={cls.adress}>{place.adress}</div>
      </div>
    </div>
  );
};
