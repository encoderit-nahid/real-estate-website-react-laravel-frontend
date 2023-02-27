import { Box, Grid } from "@mui/material";
import React from "react";
import CompletedCard from "../completedCard/CompletedCard";

function Completed() {
  return (
    <Box>
      <Grid container spacing={2}>
        {[0, 1].map((data, index) => (
          <Grid key={index} item xs={12} sm={12} md={12} lg={4} xl={4}>
            <CompletedCard />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Completed;
