import { Box, Grid, ImageList, ImageListItem, Skeleton } from "@mui/material";
import React from "react";
import HouseCard from "../../reuseable/HouseCard/HouseCard";
import Link from "next/link";

function PropertyList({ propertyData, isLoading }) {
  return (
    <Box>
      <Grid container spacing={1}>
        {isLoading
          ? [0, 1, 2, 3].map((data, index) => (
              <Grid
                key={index}
                item
                xs={12}
                sm={12}
                md={12}
                lg={4}
                xl={4}
                xxl={4}
              >
                <Skeleton
                  variant="rect"
                  height={220}
                  sx={{ mx: 2, my: 2, borderRadius: "8px" }}
                />
                <Box sx={{ mx: 2, my: 1 }}>
                  <Skeleton width="60%" />
                  <Skeleton width="60%" />
                  <Skeleton width="60%" />
                  <Skeleton />
                </Box>
              </Grid>
            ))
          : propertyData?.properties?.data?.map((data, index) => (
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4} key={index}>
                <Link
                  href={`/property-view/${data.id}`}
                  as={`/property-view/${data.id}`}
                >
                  <a
                    style={{
                      textDecoration: "none",
                      listStyle: "none",
                      width: "100%",
                      cursor: "pointer",
                    }}
                  >
                    <HouseCard
                      shadow={"0px 4px 18px rgba(0, 0, 0, 0.1)"}
                      marginTop={"4vh"}
                      propertyInfo={data}
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
