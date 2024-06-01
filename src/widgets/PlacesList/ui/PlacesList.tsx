import cls from './Places.module.scss';
import places from '../../../../places.json';

export function PlacesList() {
  return (
    <div className={cls.Places}>
      {places.features.map((place, index) => (
        <div
          className={cls.placeCard}
          key={index}
          style={{
            backgroundImage: `url("${place.properties.image}")`,
            // background: '#000',
          }}
        >
          {/* <img className={cls.image} src={place.properties.image} alt="Place image" /> */}
          <div className={cls.name}>{place.properties.name}</div>
          <div className={cls.instagram}>{place.properties.instagram}</div>
          <div className={cls.description}>{place.properties.description}</div>
          <div className={cls.adress}>{place.properties.adress}</div>
        </div>
      ))}
    </div>
  );
}
