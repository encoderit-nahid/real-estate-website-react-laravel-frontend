import { Grid, Skeleton } from "@mui/material";
import React from "react";
import TabRegisteredCard from "../TabRegisteredCard/TabRegisteredCard";
import { useDispatch, useSelector } from "react-redux";
import { findBrokerData } from "../../../redux/broker/actions";
import { useEffect } from "react";
import { useGetBrokerDataQuery } from "@/queries/useGetBrokerDataQuery";

import LinearProgress from "@mui/material/LinearProgress";
import { Box } from "@mui/material";

function TabRegistered({ languageName }) {
  //   const dispatch = useDispatch();
  //   useEffect(() => {
  //     dispatch(findBrokerData({ user_type: "broker", status: "active" }));
  //   }, [dispatch]);
  //   const brokerData = useSelector((state) => state?.broker?.brokerData);

  //   const Loading = useSelector((state) => state?.broker?.loading);

  const {
    data: brokerUserData,
    isLoading: brokerLoading,
    isFetched,
    isFetching,
  } = useGetBrokerDataQuery({
    user_type: "broker",
    status: "active",
  });
  //   console.log({ brokerUserData });

  if (brokerLoading) {
    return (
      <Grid container spacing={1}>
        {[0, 1, 2, 3, 4, 5].map((data, index) => (
          <Grid key={index} item xs={12} sm={12} md={12} lg={4} xl={3} xxl={3}>
            <Skeleton
              variant="rect"
              height={260}
              sx={{ mx: 2, my: 2, borderRadius: "8px" }}
            />
          </Grid>
        ))}
      </Grid>
    );
  }
  if (isFetched && isFetching) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }
  return (
    <Grid container spacing={2}>
      {brokerUserData?.data?.users?.data?.map((data, index) => (
        <Grid key={index} item xs={12} sm={12} md={12} lg={4} xl={3}>
          <TabRegisteredCard brokerInfo={data} languageName={languageName} />
        </Grid>
      ))}
    </Grid>
  );
}

export default TabRegistered;
