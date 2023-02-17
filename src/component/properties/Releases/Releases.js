import { Box, Button, Grid } from "@mui/material";
import React from "react";
import ReleaseCard from "../ReleaseCard/ReleaseCard";
import useMediaQuery from "@mui/material/useMediaQuery";

function Releases() {
  return (
    <Box>
      <Grid container spacing={2}>
        {[0, 1, 2].map((data, index) => (
          <Grid key={index} item xs={12} sm={12} md={12} lg={4} xl={4}>
            <ReleaseCard />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Releases;
