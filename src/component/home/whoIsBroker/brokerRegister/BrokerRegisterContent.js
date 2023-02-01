import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import technologyImage from "../../../../../public/Images/technology.png";
import clientsImage from "../../../../../public/Images/clients.png";
import earnImage from "../../../../../public/Images/earn.png";
import Image from "next/image";
import BaseButton from "../../../reuseable/button/BaseButton";

function BrokerRegisterContent() {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ marginTop: 1 }}
    >
      <Grid
        container
        spacing={1}
        sx={{
          backgroundColor: "#F9F9FB",
          borderRadius: "6px",
          paddingX: 4,
          paddingY: 2.5,
        }}
      >
        <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
          <Image src={technologyImage} alt="track" />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={9} xl={9}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Typography
              variant="p"
              sx={{ fontSize: "24px", fontWeight: "700", color: "#1A1859" }}
            >
              track everything online
            </Typography>
            <Typography
              variant="p"
              sx={{ fontSize: "18px", fontWeight: "400", color: "#7C7C99" }}
            >
              We offer the best technologies, the most complete and agile advice
              on the market and the highest commission, the broker gets up to
              70% of the total commission.
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={1}
        sx={{
          backgroundColor: "#F9F9FB",
          borderRadius: "6px",
          paddingX: 4,
          paddingY: 2.5,
          marginTop: 3,
        }}
      >
        <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
          <Image src={clientsImage} alt="track" />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={9} xl={9}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Typography
              variant="p"
              sx={{ fontSize: "24px", fontWeight: "700", color: "#1A1859" }}
            >
              track everything online
            </Typography>
            <Typography
              variant="p"
              sx={{ fontSize: "18px", fontWeight: "400", color: "#7C7C99" }}
            >
              We offer the best technologies, the most complete and agile advice
              on the market and the highest commission, the broker gets up to
              70% of the total commission.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={1}
        sx={{
          backgroundColor: "#F9F9FB",
          borderRadius: "6px",
          paddingX: 4,
          paddingY: 2.5,
          marginTop: 3,
        }}
      >
        <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
          <Image src={earnImage} alt="track" />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={9} xl={9}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Typography
              variant="p"
              sx={{ fontSize: "24px", fontWeight: "700", color: "#1A1859" }}
            >
              track everything online
            </Typography>
            <Typography
              variant="p"
              sx={{ fontSize: "18px", fontWeight: "400", color: "#7C7C99" }}
            >
              We offer the best technologies, the most complete and agile advice
              on the market and the highest commission, the broker gets up to
              70% of the total commission.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <BaseButton
        name={"Register"}
        width={"100%"}
        fontSize={"24px"}
        margin={"4vh 0 0 0"}
      />
    </Grid>
  );
}

export default BrokerRegisterContent;
