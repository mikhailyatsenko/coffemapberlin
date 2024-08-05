/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useContext, useEffect, useRef, useState } from 'react';
import { Map, Source, Layer, Popup, GeolocateControl, NavigationControl } from 'react-map-gl';
import { clusterLayer, clusterCountLayer, unclusteredPointLayer, namesLayer } from '../model/layers/layers';
import type { MapRef, GeoJSONSource, MapLayerMouseEvent, LngLatLike, MapboxGeoJSONFeature } from 'react-map-gl';
import { LocationContext } from 'app/providers/LocationProvider/lib/LocationContext';
import { type PlacesDataWithGeo } from 'widgets/Map/ui/MainMap';
import { type PlaceResponse, type PlaceProperties } from 'shared/types';
import { type Position } from 'geojson';
import { TooltipCardOnMap } from 'features/TooltipCardOnMap';

const MAPBOX_TOKEN = process.env.MAPBOX_API;

interface LoadMapProps {
  placesGeo: PlacesDataWithGeo;
}

export const LoadMap = ({ placesGeo }: LoadMapProps) => {
  const mapRef = useRef<MapRef>(null);

  const { location } = useContext(LocationContext);

  type MyMapboxGeoJSONFeature = MapboxGeoJSONFeature & PlaceResponse;

  const [popupData, setPopupData] = useState<PlaceProperties | null>(null);
  const [selectedPacePosition, setSelectedPacePosition] = useState<Position | null>(null);

  useEffect(() => {
    if (location) {
      mapRef?.current?.easeTo({
        center: location as LngLatLike,
        zoom: 15,
        duration: 500,
        offset: [300, 0],
      });
    }
  }, [location]);

  const onClick = (event: MapLayerMouseEvent) => {
    event.originalEvent.stopPropagation();

    const feature = event.features?.[0] as MyMapboxGeoJSONFeature;

    if (!feature) {
      setPopupData(null);
      return;
    }

    const {
      properties,
      geometry: { coordinates },
    } = feature;

    switch (feature?.layer?.id) {
      case 'clusters': {
        const clusterId: number = feature.properties?.cluster_id;

        const mapboxSource = mapRef.current!.getSource('places') as GeoJSONSource;

        mapboxSource.getClusterExpansionZoom(clusterId, (err: Error | null, zoom) => {
          if (!err) {
            mapRef?.current?.easeTo({
              center: feature.geometry.coordinates as LngLatLike,
              zoom,
              duration: 500,
            });
          }
        });
        setPopupData(null);
        break;
      }
      case 'unclustered-point':
        if (feature.geometry.type === 'Point') {
          setPopupData(null);
        }
        break;
      case 'place_title':
        if (feature.geometry.type === 'Point') {
          setPopupData(properties);
          setSelectedPacePosition(coordinates);
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
        mapStyle="mapbox://styles/mapbox/streets-v12"
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
        <Source id="places" type="geojson" data={placesGeo} cluster={true} clusterMaxZoom={12} clusterRadius={30}>
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
          <Layer {...namesLayer} />
        </Source>
        {popupData && selectedPacePosition && (
          <Popup
            closeButton={false}
            closeOnClick={false}
            anchor="top"
            longitude={Number(selectedPacePosition[0])}
            latitude={Number(selectedPacePosition[1])}
            onClose={() => {
              setPopupData(null);
            }}
          >
            <TooltipCardOnMap properties={popupData} />
          </Popup>
        )}
        <NavigationControl position="bottom-right" />
        <GeolocateControl position="bottom-right" />
      </Map>
    </>
  );
};
