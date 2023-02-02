import { Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import timeColor from "../../../../public/Images/time_color.png";

function BrokerFacilities({ text }) {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Image height={40} width={43} src={timeColor} alt="timeColor" />
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          variant="p"
          sx={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#1A1859",
          }}
        >
          Flexibility
        </Typography>
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          variant="p"
          sx={{
            fontSize: "18px",
            fontWeight: "400",
            color: "#7C7C99",
            textAlign: "center",
            lineHeight: "22px",
          }}
        >
          {text}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default BrokerFacilities;
