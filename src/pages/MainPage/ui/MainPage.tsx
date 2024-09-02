import { Outlet } from 'react-router-dom';
import { useAuth } from 'app/providers/AuthProvider';

import { MainMap } from 'widgets/Map';
import { PlacesList } from 'widgets/PlacesList';
import { LoginModal } from 'shared/ui/LoginPopup';

export const MainPage = () => {
  const { isLoginPopup, closeLoginPopup, login } = useAuth();
  return (
    <>
      <MainMap />
      <PlacesList />
      {isLoginPopup && <LoginModal onClose={closeLoginPopup} handleLogin={login} />}
      <Outlet />
    </>
  );
};
