import { Box, Grid, ImageList, ImageListItem } from "@mui/material";
import React from "react";
import HouseCard from "../../reuseable/HouseCard/HouseCard";

function PropertyList() {
  return (
    <Box>
      <Grid container spacing={1}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((data, index) => (
          <Grid item xs={4} key={index}>
            <HouseCard />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default PropertyList;
