import React, { useEffect, useMemo } from "react";

import { useState, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

function BaseGoogleMap() {
  const [innerValue, setInnerValue] = useState(5);
  const [center, setCenter] = useState(() => {
    // if (innerValue?.geometry?.location) return innerValue?.geometry?.location;
    return { lat: 23.7724, lng: 90.4225 };
  });

  const [markers, setMarkers] = useState([]);
  const [geocoder, setGeocoder] = useState(null);

  const [map, setMap] = React.useState(null);
  const [isInteracted, setIsInteracted] = React.useState(false);
  const [defaultZoom] = useState(15);
  const [mapZoom, setMapZoom] = useState(map?.getZoom());

  //google_map_load
  const onLoad = useCallback(
    (map) => {
      const geocoder = new window.google.maps.Geocoder();
      const bounds = new window.google.maps.LatLngBounds(center);

      map.fitBounds(bounds);

      setMap(map);
      setGeocoder(geocoder);
    },
    [center]
  );

  //for_zoom
  const onInterract = useCallback(() => {
    if (!isInteracted) {
      setIsInteracted(true);
    }
  }, [isInteracted]);

  useEffect(() => {
    if (!isInteracted && mapZoom) {
      map?.setZoom(defaultZoom);
    }
  }, [isInteracted, defaultZoom, map, mapZoom]);

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBCjayEj5DRcHr0fSxVadApgBG3nE7jgyg",
  });

  //pick_google_map_location
  const onPickLocation = () => {
    onChange(innerValue);
  };

  const pickupMaker = useCallback(
    (event) => {
      onInterract();
      setMarkers([]);
      geocoder.geocode({ latLng: event.latLng }, (results, status) => {
        if (status === window?.google.maps.GeocoderStatus.OK) {
          const address = results[0];
          const position = {
            lat: address?.geometry?.location?.lat(),
            lng: address?.geometry?.location?.lng(),
          };
          setCenter(position);
          setMarkers((m) => [...m, { position }]);
          setInnerValue(address);
        }
      });
    },
    [geocoder, onInterract]
  );
  return (
    <GoogleMap
      id="searchbox-example"
      mapContainerStyle={{
        height: "500px",
        width: "100%",
      }}
      defaultCenter={center}
      center={center}
      //   onClick={pickupMaker}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onZoomChanged={() => {
        setMapZoom(() => map?.getZoom() || defaultZoom);
      }}
      onResize={onInterract}
      onDragStart={onInterract}
      onTilesLoaded={() => {
        setMarkers((m) => [...m, { position: currentPosition }]);
        onInterract();
      }}
    >
      {markers.map((marker, index) => (
        <Marker
          draggable
          clickable
          key={index}
          position={marker.position}
          onDragEnd={pickupMaker}
        />
      ))}
    </GoogleMap>
  );
}

export default BaseGoogleMap;
