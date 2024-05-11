import { useState, useMemo } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker, Popup, GeolocateControl } from 'react-map-gl';

import { Places } from 'widgets/Places';
import { Pin } from 'shared/ui/Pin/Pin';

import CITIES from '../../../../places.json';
import { LoadMap } from 'features/LoadMap';

const TOKEN = 'pk.eyJ1IjoibWlraGFpbHlhdHNlbmtvIiwiYSI6ImNsdnFwZ3F5MDBlejMybG52cW54eXZhcmYifQ.K0kaDuoAqNrXBbe2Sc1pzw';

export const MainMap = () => {
  const [popupInfo, setPopupInfo] = useState(null);

  const pins = useMemo(
    () =>
      CITIES.map((city, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={city.location[1]}
          latitude={city.location[0]}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(city);
          }}
        >
          <Pin />
        </Marker>
      )),
    [],
  );

  return (
    <div style={{ width: '100dvw', height: '100dvh' }}>
      <LoadMap />
      <Places />
    </div>
  );
};
