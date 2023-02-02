import React from "react";
import brokerHelpImage from "../../../../public/Images/broker_help.png";
import { Box, Grid } from "@mui/material";
import Image from "next/image";

function BrokerHelpContent() {
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-end"
      alignItems="flex-start"
    >
      <Image src={brokerHelpImage} alt="brokerHelp" />
    </Grid>
  );
}

export default BrokerHelpContent;
