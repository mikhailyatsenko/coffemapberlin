import cls from './Places.module.scss';
import places from '../../../../places.json';
import { PlaceCard } from 'entities/PlaceCard';

export function PlacesList() {
  return (
    <div className={cls.Places}>
      {places.features.map((feature, index) => (
        <PlaceCard place={feature.properties} key={index} />
      ))}
    </div>
  );
}
