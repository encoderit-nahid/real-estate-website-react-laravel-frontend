import React from "react";
import { _baseMAP } from "../../../../consts";
import ReactStreetview from "react-streetview";
import { Box } from "@mui/material";

function BaseStreetView({ addressData }) {
  const googleMapsApiKey = _baseMAP;

  const streetViewPanoramaOptions = {
    position: { lat: +addressData?.latitude, lng: +addressData?.longitude },
    pov: { heading: 100, pitch: 0 },
    zoom: 1,
    addressControl: false,
    showRoadLabels: false,
    zoomControl: false,
  };

  return (
    <Box
      sx={{
        width: "80vw",
        height: "70vh",
        backgroundColor: "#eeeeee",
      }}
    >
      <ReactStreetview
        apiKey={googleMapsApiKey}
        streetViewPanoramaOptions={streetViewPanoramaOptions}
      />
    </Box>
  );
}

export default BaseStreetView;
