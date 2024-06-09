import cls from './Places.module.scss';
import places from '../../../../places.json';
import { PlaceCard } from 'entities/PlaceCard';
import { type LocationPoint } from 'app/providers/LocationProvider/lib/ThemeContext';

export function PlacesList() {
  return (
    <div className={cls.Places}>
      {places.features.map((feature, index) => (
        <PlaceCard place={feature.properties} coordinates={feature.geometry.coordinates as LocationPoint} key={index} />
      ))}
    </div>
  );
}
