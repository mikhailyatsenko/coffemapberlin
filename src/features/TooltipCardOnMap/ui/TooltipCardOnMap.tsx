import cls from './TooltipCardOnMap.module.scss';
import instagramIcon from '../../../shared/assets/instagram.svg';
// import { useContext } from 'react';
import RatingWidget from 'shared/ui/RatingWidget/ui/RatingWidget';
import { type PlaceProperties } from 'shared/types';

interface TooltipCardOnMapProps {
  properties: PlaceProperties;
}

export const TooltipCardOnMap = ({ properties }: TooltipCardOnMapProps) => {
  const { id, averageRating, name, address, instagram } = properties;
  return (
    <div className={cls.TooltipCardOnMap}>
      <div className={cls.content}>
        <a className={cls.header} href={instagram} target="_blank" rel="noreferrer">
          <h4 className={cls.name}>{name}</h4>
          <img className={cls.instagram} src={instagramIcon} alt="" />
        </a>
        <div className={cls.rating}>
          <RatingWidget isClickable={false} rating={averageRating} id={id} /> {averageRating}
        </div>
        <div className={cls.address}>{address}</div>
        <div className={cls.moreButton}>More details...</div>
      </div>
    </div>
  );
};
