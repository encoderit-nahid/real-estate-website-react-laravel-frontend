import { Box, Button, Grid } from "@mui/material";
import React from "react";
import PendantsCard from "../pendantsCard/PendantsCard";

function Pendants() {
  return (
    <Box>
      <Grid container spacing={2}>
        {[0, 1, 2].map((data, index) => (
          <Grid key={index} item xs={12} sm={12} md={12} lg={4} xl={4}>
            <PendantsCard />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}


export default Pendants;