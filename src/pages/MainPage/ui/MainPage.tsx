import { Outlet } from 'react-router-dom';
import { MainMap } from 'widgets/Map';
import { PlacesList } from 'widgets/PlacesList';
import { useAuth } from 'shared/lib/reactContext/Auth/useAuth';
import { AuthModalContent } from 'shared/ui/authModalContent/ui/AuthModalContent';
import { Modal } from 'shared/ui/Modal';

export const MainPage = () => {
  const { isLoginPopup, setIsLoginPopup } = useAuth();
  return (
    <>
      <MainMap />
      <PlacesList />
      {isLoginPopup && (
        <Modal
          onClose={() => {
            setIsLoginPopup(false);
          }}
        >
          <AuthModalContent initialContent="LoginRequired" />
        </Modal>
      )}
      <Outlet />
    </>
  );
};
