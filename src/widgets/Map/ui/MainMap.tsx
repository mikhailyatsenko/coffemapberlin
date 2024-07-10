import 'mapbox-gl/dist/mapbox-gl.css';
import { PlacesList } from 'widgets/PlacesList';
import { LoadMap } from 'features/LoadMap';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_ALL_PLACES } from 'shared/query/places';
import { Loader } from 'shared/ui/Loader';
import { type Feature } from 'shared/types';

export interface PlacesData {
  places: Feature[];
}

export const MainMap = () => {
  const { data, loading, error } = useQuery<PlacesData>(GET_ALL_PLACES);

  const [placesGeo, setPlacesGeo] = useState<undefined | GeoJSON.FeatureCollection<GeoJSON.Geometry>>(undefined);

  useEffect(() => {
    if (data && !loading) {
      setPlacesGeo({
        type: 'FeatureCollection',
        features: data.places,
      });
    }
  }, [data, loading]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div style={{ width: '100dvw', height: 'calc(100dvh - 60px)' }}>
      <LoadMap places={placesGeo} />
      {data?.places && <PlacesList places={data.places} />}
    </div>
  );
};
