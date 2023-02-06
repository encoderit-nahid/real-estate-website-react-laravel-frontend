import { Box, Grid, ImageList, ImageListItem } from "@mui/material";
import React from "react";
import HouseCard from "../../reuseable/HouseCard/HouseCard";

function PropertyList() {
  return (
    <Box>
      <Grid container spacing={1}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((data, index) => (
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4} key={index}>
            <HouseCard
              shadow={"0px 4px 18px rgba(0, 0, 0, 0.1)"}
              marginTop={"4vh"}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default PropertyList;
