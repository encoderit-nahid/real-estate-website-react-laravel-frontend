import { Box, Grid } from "@mui/material";
import React from "react";
import RentCard from "../../reuseable/rentCard/RentCard";

function ThirdTab() {
  return (
    <Box>
      <Grid container spacing={4}>
        {[0, 1, 2].map((data, index) => (
          <Grid key={index} item xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
            <RentCard />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ThirdTab;
