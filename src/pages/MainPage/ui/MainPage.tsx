import { useAuth } from 'app/providers/AuthProvider';
import { useDetailedCard } from 'app/providers/DetailedCardProvider';
import { DetailedPaceCard } from 'widgets/DetailedPaceCard';
import { MainMap } from 'widgets/Map';
import { PlacesList } from 'widgets/PlacesList';
import { LoginModal } from 'shared/ui/LoginPopup';

export const MainPage = () => {
  const { currentSelectedPlaceId, setCurrentSelectedPlaceId } = useDetailedCard();
  const { isLoginPopup, closeLoginPopup, login } = useAuth();
  return (
    <>
      <MainMap />
      <PlacesList />
      {currentSelectedPlaceId && (
        <DetailedPaceCard
          placeId={currentSelectedPlaceId}
          onClose={() => {
            setCurrentSelectedPlaceId(null);
          }}
        />
      )}
      {isLoginPopup && <LoginModal onClose={closeLoginPopup} handleLogin={login} />}
    </>
  );
};
