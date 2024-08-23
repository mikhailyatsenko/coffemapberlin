import 'mapbox-gl/dist/mapbox-gl.css';
import { usePlaces } from 'app/providers/PlacesDataProvider/ui/PlacesDataProvider';
import { LoadMap } from 'features/LoadMap';
import { type PlaceProperties, type PlaceResponse } from 'shared/types';
import { Loader } from 'shared/ui/Loader';

export interface PlacesDataWithGeo extends GeoJSON.FeatureCollection<GeoJSON.Geometry, PlaceProperties> {
  features: PlaceResponse[];
}

export const MainMap = () => {
  const { filteredPlaces, loading } = usePlaces();
  // const { data, loading, error } = useQuery<PlacesData>(GET_ALL_PLACES);

  if (loading) {
    return <Loader />;
  }

  if (!filteredPlaces) return null;

  const placesGeo: PlacesDataWithGeo =
    {
      type: 'FeatureCollection',
      features: filteredPlaces,
    } || [];

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <div style={{ width: '100dvw', height: 'calc(100dvh - 60px)' }}>
      {placesGeo && <LoadMap placesGeo={placesGeo} />}
    </div>
  );
};
