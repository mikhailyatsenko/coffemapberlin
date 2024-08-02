import { PlacesList } from 'widgets/PlacesList';
import { MainMap } from 'widgets/Map';
import { useDetailedCard } from 'app/providers/DetailedCardProvider';
import { DetailedPaceCard } from 'widgets/DetailedPaceCard';
import { LoginModal } from 'shared/ui/LoginPopup';
import { useAuth } from 'app/providers/AuthProvider';

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
