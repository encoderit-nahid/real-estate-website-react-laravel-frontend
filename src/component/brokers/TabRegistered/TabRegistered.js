import { Grid } from "@mui/material";
import React from "react";
import TabRegisteredCard from "../TabRegisteredCard/TabRegisteredCard";

function TabRegistered() {
  return (
    <Grid container spacing={2}>
      {[0, 1, 2].map((data, index) => (
        <Grid key={index} item xs={12} sm={12} md={12} lg={4} xl={3}>
          <TabRegisteredCard />
        </Grid>
      ))}
    </Grid>
  );
}

export default TabRegistered;
