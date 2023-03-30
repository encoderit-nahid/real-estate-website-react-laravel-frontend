import React, { useEffect, useMemo } from "react";

import { useState, useCallback } from "react";
import mapIcon from "../../../../public/Images/mapIcon.png";

import {
  GoogleMap,
  MarkerF,
  MarkerClustererF,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Box } from "@mui/material";

const GoogleMapOptions = {
  tilt: 0,
  zoomControl: false,
  streetViewControl: false,
  disableDefaultUI: true,
  gestureHandling: "greedy",
};

const BaseMap = ({ height, width, markersData }) => {
  const [map, setMap] = React.useState(null);
  const [isInteracted, setIsInteracted] = React.useState(false);
  const [defaultZoom] = useState(12);
  const [mapZoom, setMapZoom] = useState(map?.getZoom());
  const [geocoder, setGeocoder] = useState(null);

  // const handleOnLoad = (map) => {
  //   const geocoder = new window.google.maps.Geocoder();
  //   const bounds = new google.maps.LatLngBounds();
  //   markers.forEach(({ position }) => bounds.extend(position));
  //   map.fitBounds(bounds);
  //   setMap(map);
  //   setGeocoder(geocoder);
  // };

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

  const [activeMarker, setActiveMarker] = React.useState(null);

  const [center, setCenter] = useState(() => {
    // if (innerValue?.geometry?.location) return innerValue?.geometry?.location;
    return {
      lat: +markersData.properties.data[0].address.latitude,
      lng: +markersData.properties.data[0].address.longitude,
    };
  });

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  console.log("markers", markersData.properties.data[0].address);

  console.log("map", mapIcon);
  return (
    <GoogleMap
      onLoad={onLoad}
      mapContainerStyle={{ height: height, width: width }}
      options={GoogleMapOptions}
      defaultCenter={center}
      center={center}
      onZoomChanged={() => {
        setMapZoom(() => map?.getZoom() || defaultZoom);
      }}
      onResize={onInterract}
      onDragStart={onInterract}
    >
      {/* <MarkerF position={{ lat: 53, lng: 9 }} />
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
      </MarkerClustererF> */}
      {markersData?.properties?.data?.map(({ address, id }) => (
        <MarkerF
          key={id}
          position={{ lat: +address?.latitude, lng: +address?.longitude }}
          onClick={() => handleActiveMarker(id)}
          icon={"/Images/mapIcon.png"}
          // icon={{
          //   // path: google.maps.SymbolPath.CIRCLE,
          //   url: require("../../../../public/Images/mapIcon.svg"),
          //   fillColor: "#EB00FF",
          //   scale: 7,
          // }}
        >
          {/* {activeMarker === id ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <Box sx={{ mx: 2, my: 1 }}>{name}</Box>
            </InfoWindow>
          ) : null} */}
        </MarkerF>
      ))}
    </GoogleMap>
  );
};

const Map = React.memo(BaseMap);

const BaseGoogleMap = ({ height, width, markersData }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCs3QGIJDm6opgMqe6AWhBOs6I_APA7xN8",
  });

  return isLoaded ? (
    <Map height={height} width={width} markersData={markersData} />
  ) : null;
};

export default BaseGoogleMap;

const markers = [
  {
    id: 1,
    name: "Chicago, Illinois",
    position: { lat: 41.881832, lng: -87.623177 },
  },
  {
    id: 2,
    name: "Denver, Colorado",
    position: { lat: 39.739235, lng: -104.99025 },
  },
  {
    id: 3,
    name: "Los Angeles, California",
    position: { lat: 34.052235, lng: -118.243683 },
  },
  {
    id: 4,
    name: "New York, New York",
    position: { lat: 40.712776, lng: -74.005974 },
  },

  {
    id: 5,
    name: "New York, New York",
    position: { lat: 41.712776, lng: -74.005999 },
  },
  {
    id: 6,
    name: "New York, New York",
    position: { lat: 42.712776, lng: -74.0055543 },
  },
];
