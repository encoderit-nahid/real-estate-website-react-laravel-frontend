import { Box, Grid } from "@mui/material";
import React from "react";
import backgroundLaptop from "../../../../public/Images/laptopBackground.png";
import Laptop from "../../../../public/Images/laptop.png";
import Tree from "../../../../public/Images/tree.png";
import Image from "next/image";

function SideContent() {
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
    >
      <Box sx={{ position: "absolute" }}>
        <Image src={backgroundLaptop} alt="backgroundLaptop" />
      </Box>
      <Box sx={{ position: "relative", mt: 15 }}>
        <Image src={Laptop} alt="Laptop" />
        <Image src={Tree} alt="Tree" />
      </Box>
    </Grid>
  );
}

export default SideContent;
