import React from "react";
import brokerHelpImage from "../../../../public/Images/broker_help.png";
import { Box, Grid } from "@mui/material";
import Image from "next/image";

function BrokerHelpContent({ imageSrc }) {
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-end"
      alignItems="flex-start"
    >
      <Image src={imageSrc} alt="brokerHelp" />
    </Grid>
  );
}

export default BrokerHelpContent;
