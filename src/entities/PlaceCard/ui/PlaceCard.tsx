import cls from './PlaceCard.module.scss';
import instagram from '../../../shared/assets/instagram.svg';
import { type Place } from 'shared/types';

interface PlaceCardProps {
  place: Place;
  isPopup?: boolean;
}

export const PlaceCard = ({ place, isPopup = false }: PlaceCardProps) => {
  return (
    <div className={cls.placeCard}>
      <div
        className={cls.image}
        style={{
          backgroundImage: `url("${'./places-images/' + place.image}")`,
        }}
      ></div>
      <div className={cls.content}>
        <a className={cls.header} href={place.instagram}>
          <h3 className={cls.name}>{place.name}</h3>
          <img className={cls.instagram} src={instagram} alt="" />
        </a>

        <div className={cls.description}>{place.description}</div>

        <div className={cls.adress}>{place.adress}</div>
      </div>
    </div>
  );
};
