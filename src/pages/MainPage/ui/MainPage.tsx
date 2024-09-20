import { Outlet } from 'react-router-dom';
import { MainMap } from 'widgets/Map';
import { PlacesList } from 'widgets/PlacesList';
import { SwitchFavoritePlaces } from 'features/SwitchFavoritePlaces';
import { useAuth } from 'shared/lib/reactContext/Auth/useAuth';
import { AuthModalContent } from 'shared/ui/authModalContent/ui/AuthModalContent';
import { Modal } from 'shared/ui/Modal';
import { PortalToBody } from 'shared/ui/Portals/PortalToBody';

export const MainPage = () => {
  const { isAuthPopup, setIsAuthPopup } = useAuth();
  return (
    <>
      <MainMap />
      <PlacesList />
      <PortalToBody>
        {isAuthPopup && (
          <Modal
            onClose={() => {
              setIsAuthPopup(null);
            }}
          >
            <AuthModalContent initialContent={isAuthPopup} />
          </Modal>
        )}
        <SwitchFavoritePlaces />
      </PortalToBody>

      <Outlet />
    </>
  );
};
