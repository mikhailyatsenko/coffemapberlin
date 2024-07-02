import { useContext, useEffect, useRef, useState } from 'react';
import { Map, Source, Layer, Popup, GeolocateControl, NavigationControl } from 'react-map-gl';
import { PlaceCard } from 'entities/PlaceCard';
import { clusterLayer, clusterCountLayer, unclusteredPointLayer, namesLayer } from '../model/layers/layers';
import type { MapRef, GeoJSONSource, MapLayerMouseEvent, LngLatLike } from 'react-map-gl';
import { type PlaceProperties } from 'shared/types';
import cls from './LoadMap.module.scss';
import { LocationContext } from 'app/providers/LocationProvider/lib/ThemeContext';

const MAPBOX_TOKEN = 'pk.eyJ1IjoicGV0cmFrb3YiLCJhIjoiY2tuMGRxZXNqMG1xZzJ0cGZvb2h0emN1ayJ9.CsROju7EJW9j76c6bEsyYw';
// 'pk.eyJ1IjoibWlraGFpbHlhdHNlbmtvIiwiYSI6ImNsdnFwZ3F5MDBlejMybG52cW54eXZhcmYifQ.K0kaDuoAqNrXBbe2Sc1pzw';

interface LoadMapProps {
  places: undefined | GeoJSON.FeatureCollection<GeoJSON.Geometry>;
}

export const LoadMap = ({ places }: LoadMapProps) => {
  const mapRef = useRef<MapRef>(null);

  const { location } = useContext(LocationContext);

  const [popupInfo, setPopupInfo] = useState<GeoJSON.Feature | null>(null);

  useEffect(() => {
    if (location) {
      mapRef?.current?.easeTo({
        center: location as LngLatLike,
        zoom: 15,
        duration: 500,
      });
    }
  }, [location]);

  const onClick = (event: MapLayerMouseEvent) => {
    event.originalEvent.stopPropagation();

    const feature = event.features?.[0];

    if (!feature) {
      setPopupInfo(null);
      return;
    }

    switch (feature.layer.id) {
      case 'clusters': {
        const clusterId: number = feature.properties?.cluster_id;

        const mapboxSource = mapRef.current!.getSource('places') as GeoJSONSource;

        mapboxSource.getClusterExpansionZoom(clusterId, (err: Error | null, zoom) => {
          if (!err) {
            mapRef?.current?.easeTo({
              center: (feature.geometry as GeoJSON.Point).coordinates as LngLatLike,
              zoom,
              duration: 500,
            });
          }
        });
        setPopupInfo(null);
        break;
      }
      case 'unclustered-point':
        if (feature.geometry.type === 'Point') {
          setPopupInfo(feature);
        }
        break;
      case 'place_title':
        if (feature.geometry.type === 'Point') {
          setPopupInfo(feature);
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Map
        initialViewState={{
          latitude: 52.5182315090094,
          longitude: 13.397000808436752,
          zoom: 12,
        }}
        mapStyle="mapbox://styles/mapbox/light-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={[unclusteredPointLayer.id!, clusterLayer.id!, namesLayer.id!]}
        onClick={onClick}
        ref={mapRef}
        onMouseEnter={() => {
          const canvas = mapRef.current?.getCanvas();
          if (canvas) {
            canvas.style.cursor = 'pointer';
          }
        }}
        onMouseLeave={() => {
          const canvas = mapRef.current?.getCanvas();
          if (canvas) {
            canvas.style.cursor = '';
          }
        }}
      >
        <Source id="places" type="geojson" data={places} cluster={true} clusterMaxZoom={14} clusterRadius={50}>
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
          <Layer {...namesLayer} />
        </Source>
        {popupInfo?.properties && (
          <Popup
            className={cls.popup}
            closeButton={false}
            closeOnClick={false}
            anchor="top"
            longitude={Number((popupInfo.geometry as GeoJSON.Point).coordinates[0])}
            latitude={Number((popupInfo.geometry as GeoJSON.Point).coordinates[1])}
            onClose={() => {
              setPopupInfo(null);
            }}
          >
            <PlaceCard placeProperties={popupInfo.properties as PlaceProperties} isPopup={true} />
          </Popup>
        )}
        <NavigationControl position="bottom-right" />
        <GeolocateControl position="bottom-right" />
      </Map>
    </>
  );
};
