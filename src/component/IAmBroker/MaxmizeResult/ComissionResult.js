import { Grid, Typography } from "@mui/material";
import React from "react";

function ComissionResult() {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "50vh" }}
    >
      <Typography
        variant="p"
        sx={{ fontSize: "48px", fontWeight: "800", color: "#7450F0" }}
      >
        BRL 30,000
      </Typography>
      <Typography
        variant="p"
        sx={{ fontSize: "20px", fontWeight: "400", color: "#4B4B66" }}
      >
        full commission
      </Typography>
      <Typography
        variant="p"
        sx={{ fontSize: "48px", fontWeight: "800", color: "#1A1859" }}
      >
        BRL 21,000
      </Typography>
      <Typography
        variant="p"
        sx={{ fontSize: "20px", fontWeight: "400", color: "#4B4B66" }}
      >
        your commission (capture and sale)
      </Typography>
    </Grid>
  );
}

export default ComissionResult;
