import { PlacesList } from 'widgets/PlacesList';
import { MainMap } from 'widgets/Map';
import { useDetailedCard } from 'app/providers/DetailedCardProvider';
import { DetailedPaceCard } from 'features/DetailedPaceCard';
import { PortalToBody } from 'shared/ui/Portals/PortalToBody';

export const MainPage = () => {
  const { currentSelectedPlaceId, setCurrentSelectedPlaceId } = useDetailedCard();

  return (
    <>
      <MainMap />
      <PlacesList />
      {currentSelectedPlaceId && (
        <PortalToBody>
          <DetailedPaceCard
            placeId={currentSelectedPlaceId}
            onClose={() => {
              setCurrentSelectedPlaceId(null);
            }}
          />
        </PortalToBody>
      )}
    </>
  );
};
