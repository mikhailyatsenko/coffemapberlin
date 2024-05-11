import { useState, useMemo } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker, Popup, GeolocateControl } from 'react-map-gl';

// import { Places } from 'widgets/Places';
import { Pin } from 'shared/ui/Pin/Pin';
import PLACES from '../../../../places.json';

const TOKEN = 'pk.eyJ1IjoibWlraGFpbHlhdHNlbmtvIiwiYSI6ImNsdnFwZ3F5MDBlejMybG52cW54eXZhcmYifQ.K0kaDuoAqNrXBbe2Sc1pzw';

export const LoadMap = () => {
  const [popupInfo, setPopupInfo] = useState(null);
  const pins = useMemo(
    () =>
      PLACES.map((place, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={place.location[1]}
          latitude={place.location[0]}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(place);
          }}
        >
          <Pin />
        </Marker>
      )),
    [],
  );
  return (
    <Map
      id="map"
      initialViewState={{
        latitude: 40,
        longitude: -100,
        zoom: 4,
        bearing: 0,
        pitch: 0,
      }}
      mapStyle="mapbox://styles/mapbox/light-v9"
      mapboxAccessToken={TOKEN}
    >
      <GeolocateControl position="top-right" />
      {pins}
      {popupInfo && (
        <Popup
          anchor="top"
          longitude={Number(popupInfo.location[1])}
          latitude={Number(popupInfo.location[0])}
          onClose={() => {
            setPopupInfo(null);
          }}
        >
          <div>
            {popupInfo.name},{popupInfo.description} |{' '}
            <a
              target="_new"
              href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}
            >
              Wikipedia
            </a>
          </div>
          <img width="100%" src={popupInfo.image} alt="" />
        </Popup>
      )}
    </Map>
  );
};
