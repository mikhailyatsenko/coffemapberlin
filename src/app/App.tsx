import { useLocation } from 'react-router-dom';
import { Footer } from 'widgets/Footer';
import { Navbar } from 'widgets/Navbar';
import { SwowFavoritePlaces } from 'features/SwowFavoritePlaces';
import { useAuth } from 'shared/lib/reactContext/Auth/useAuth';
import { AuthModalContent } from 'shared/ui/authModalContent/ui/AuthModalContent';
import { Modal } from 'shared/ui/Modal';
import { PortalToBody } from 'shared/ui/Portals/PortalToBody';
import { AppRouter } from './providers/router';

const App = () => {
  const location = useLocation();
  const { isAuthPopup, setIsAuthPopup } = useAuth();
  return (
    <>
      <Navbar />
      <main>
        <AppRouter />
      </main>

      {location.pathname !== '/' && <Footer />}
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

        {location.pathname === '/' && <SwowFavoritePlaces />}
      </PortalToBody>
    </>
  );
};

export default App;
