import 'mapbox-gl/dist/mapbox-gl.css';

import { PlacesList } from 'widgets/PlacesList';

import { LoadMap } from 'features/LoadMap';

export const MainMap = () => {
  return (
    <div style={{ width: '100dvw', height: 'calc(100dvh - 50px)' }}>
      <LoadMap />
      <PlacesList />
    </div>
  );
};
