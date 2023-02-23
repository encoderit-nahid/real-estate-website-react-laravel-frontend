import React, { useEffect, useMemo } from "react";

import { useState, useCallback } from "react";

import {
  GoogleMap,
  MarkerF,
  MarkerClustererF,
  useLoadScript,
} from "@react-google-maps/api";

const GoogleMapOptions = {
  tilt: 0,
  zoomControl: false,
  streetViewControl: false,
  disableDefaultUI: true,
  gestureHandling: "greedy",
};

const BaseMap = ({ height, width }) => {
  const handleOnLoad = (map) => {
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  return (
    <GoogleMap
      onLoad={handleOnLoad}
      mapContainerStyle={{ height: height, width: width }}
      options={GoogleMapOptions}
    >
      <MarkerF position={{ lat: 53, lng: 9 }} />
      <MarkerClustererF>
        {(clusterer) => (
          <>
            {markers.map((marker) => (
              <MarkerF
                key={marker.id}
                position={marker.position}
                clusterer={clusterer}
              />
            ))}
          </>
        )}
      </MarkerClustererF>
    </GoogleMap>
  );
};

const Map = React.memo(BaseMap);

const BaseGoogleMap = ({ height, width }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBCjayEj5DRcHr0fSxVadApgBG3nE7jgyg",
  });

  return isLoaded ? <Map height={height} width={width} /> : null;
};

export default BaseGoogleMap;

const markers = [
  {
    id: 1,
    position: { lat: 53, lng: 9 },
  },
  {
    id: 2,
    position: { lat: 53.1, lng: 9.1 },
  },
  {
    id: 3,
    position: { lat: 53.2, lng: 9.2 },
  },
  {
    id: 4,
    position: { lat: 53.4, lng: 9.3 },
  },
  {
    id: 5,
    position: { lat: 53.6, lng: 9.25 },
  },
  {
    id: 6,
    position: { lat: 53.4, lng: 9.6 },
  },
  {
    id: 7,
    position: { lat: 53.4, lng: 9.4 },
  },
  {
    id: 8,
    position: { lat: 53.9, lng: 9.3 },
  },
  {
    id: 9,
    position: { lat: 53.876, lng: 9.17 },
  },
  {
    id: 10,
    position: { lat: 53.345, lng: 9.23 },
  },
  {
    id: 11,
    position: { lat: 53.276, lng: 9.34 },
  },
];
