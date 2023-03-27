import { Box, Grid, ImageList, ImageListItem } from "@mui/material";
import React from "react";
import HouseCard from "../../reuseable/HouseCard/HouseCard";
import Link from "next/link";

function PropertyList({ propertyData }) {
  return (
    <Box>
      <Grid container spacing={1}>
        {propertyData?.properties?.data?.map((data, index) => (
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4} key={index}>
            <Link href="/property_view">
              <a
                style={{
                  textDecoration: "none",
                  listStyle: "none",
                  width: "100%",
                }}
              >
                <HouseCard
                  shadow={"0px 4px 18px rgba(0, 0, 0, 0.1)"}
                  marginTop={"4vh"}
                />
              </a>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default PropertyList;
