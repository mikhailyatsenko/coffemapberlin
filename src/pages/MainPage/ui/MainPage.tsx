import { Outlet } from 'react-router-dom';
import { MainMap } from 'widgets/Map';
import { PlacesList } from 'widgets/PlacesList';
import { SwitchFavoritePlaces } from 'features/SwitchFavoritePlaces';

import { PortalToBody } from 'shared/ui/Portals/PortalToBody';

export const MainPage = () => {
  return (
    <>
      <MainMap />
      <PlacesList />
      <PortalToBody>
        <SwitchFavoritePlaces />
      </PortalToBody>

      <Outlet />
    </>
  );
};
