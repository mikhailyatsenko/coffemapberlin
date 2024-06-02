import cls from './Places.module.scss';
import places from '../../../../places.json';
import instagram from '../../../shared/assets/instagram.svg';

export function PlacesList() {
  return (
    <div className={cls.Places}>
      {places.features.map((place, index) => (
        <div className={cls.placeCard} key={index}>
          <div
            className={cls.image}
            style={{
              backgroundImage: `url("${place.properties.image}")`,
            }}
          ></div>
          <div className={cls.content}>
            <a className={cls.header} href={place.properties.instagram}>
              <h3 className={cls.name}>{place.properties.name}</h3>
              <img className={cls.instagram} src={instagram} alt="" />
            </a>

            <div className={cls.description}>{place.properties.description}</div>

            <div className={cls.adress}>{place.properties.adress}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
