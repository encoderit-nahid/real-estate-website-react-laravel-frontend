import { Grid, Typography } from "@mui/material";
import React from "react";
import BaseButton from "../../reuseable/button/BaseButton";

function BrokerHelp() {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="flex-start"
      sx={{ ml: 3 }}
    >
      <Typography
        variant="p"
        sx={{
          fontSize: {
            sm: "48px",
            xs: "48px",
            md: "48px",
            lg: "50px",
            xl: "50px",
          },
          lineHeight: "55px",
          fontWeight: "800",
          color: "#1A1859",
        }}
      >
        Help revolutionize the real estate market
      </Typography>
      {/* <Typography
        variant="p"
        sx={{
          fontSize: {
            sm: "48px",
            xs: "48px",
            md: "48px",
            lg: "50px",
            xl: "50px",
          },
          fontWeight: "800",
          color: "#1A1859",
        }}
      >
        real estate market
      </Typography> */}
      <Typography
        variant="p"
        sx={{
          paddingTop: 3,
          fontSize: "20px",
          fontWeight: "400",
          color: "#1A1859",
        }}
      >
        By connecting to the network, you will have the most modern and
        technological real estate platform in Brazil. The only platform that
        offers the 100% digital buying and selling process, from scheduling a
        visit, proposal to the public deed, without leaving home. Eliminating
        bureaucracy and providing more time so you can dedicate yourself to what
        matters, the customer!
      </Typography>
      <BaseButton
        name="Be a Partner"
        width={"100%"}
        fontSize={"24px"}
        margin={"4vh 0 0 0"}
      />
    </Grid>
  );
}

export default BrokerHelp;
