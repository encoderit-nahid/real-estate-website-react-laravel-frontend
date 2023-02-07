import React from "react";
import {
  Box,
  Grid,
  Typography,
  Container,
  ImageList,
  ImageListItem,
  Button,
} from "@mui/material";
import Image from "next/image";
import smallHome from "../../../../public/Images/Rectangle 1815.png";

function SlideImage() {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box sx={{ mb: 2 }}>
        <Image src={smallHome} alt="home" />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Image src={smallHome} alt="home" />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Image src={smallHome} alt="home" />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Image src={smallHome} alt="home" />
      </Box>
    </Grid>
  );
}

export default SlideImage;
