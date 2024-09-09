import { Outlet } from 'react-router-dom';
import { MainMap } from 'widgets/Map';
import { PlacesList } from 'widgets/PlacesList';
import { useAuth } from 'shared/lib/reactContext/Auth/useAuth';
import { LoginModal } from 'shared/ui/LoginPopup';

export const MainPage = () => {
  const { isLoginPopup, closeLoginPopup, continueWithGoogle } = useAuth();
  return (
    <>
      <MainMap />
      <PlacesList />
      {isLoginPopup && <LoginModal onClose={closeLoginPopup} handleLogin={continueWithGoogle} />}
      <Outlet />
    </>
  );
};
