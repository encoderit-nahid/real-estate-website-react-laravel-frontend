import React from "react";
import WantImage from "../../../../public/Images/Want.png";
import { Grid } from "@mui/material";
import Image from "next/image";

function SellSideContent() {
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Image src={WantImage} alt="WantImage" />
    </Grid>
  );
}

export default SellSideContent;
