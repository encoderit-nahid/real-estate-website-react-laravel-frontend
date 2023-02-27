import { Box, Grid } from "@mui/material";
import React from "react";
import AcceptedCard from "../acceptedCard/AcceptedCard";

function Accepted() {
  return (
    <Box>
      <Grid container spacing={2}>
        {[0, 1].map((data, index) => (
          <Grid key={index} item xs={12} sm={12} md={12} lg={4} xl={4}>
            <AcceptedCard />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Accepted;
