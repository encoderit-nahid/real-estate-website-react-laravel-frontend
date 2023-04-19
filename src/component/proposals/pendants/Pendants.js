import { Box, Button, Grid, Pagination, Skeleton, Stack } from "@mui/material";
import React, { useEffect } from "react";
import PendantsCard from "../pendantsCard/PendantsCard";
import { useDispatch, useSelector } from "react-redux";
import { findPropertyData } from "../../../redux/property/actions";
import { useRouter } from "next/router";

function Pendants() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = router;
  console.log({ query });
  const [page, setPage] = React.useState(+query?.page || 1);

  useEffect(() => {
    dispatch(
      findPropertyData({
        ...query,
        status: "approved",
        page: query?.page ? query?.page : 1,
        per_page: 9,
        proposal_status: "pending",
      })
    );
  }, [dispatch, query]);

  const pendingProperty = useSelector((state) => state.property.propertyData);
  console.log({ pendingProperty });
  const Loading = useSelector((state) => state.property.loading);

  const handlePageChange = (event, value) => {
    setPage(value);
    dispatch(
      findPropertyData({
        status: "approved",
        page: value,
        per_page: 9,
        proposal_status: "pending",
      })
    );
    router.replace({
      pathname: "/proposals",
      query: { ...router.query, page: value, per_page: 9 },
    });
    // setData(datas.slice(firstIndex + pageSize * (value - 1), pageSize * value));
  };

  if (Loading) {
    return (
      <Grid container spacing={1}>
        {[0, 1, 2].map((data, index) => (
          <Grid key={index} item xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
            <Skeleton
              variant="rect"
              height={500}
              sx={{ mx: 2, my: 2, borderRadius: "8px" }}
            />
      
          </Grid>
        ))}
      </Grid>
    );
  }
  return (
    <Box>
      <Grid container spacing={2}>
        {pendingProperty?.data?.map((data, index) => (
          <Grid key={index} item xs={12} sm={12} md={12} lg={4} xl={4}>
            <PendantsCard propertyData={data} />
          </Grid>
        ))}
      </Grid>
      <Stack spacing={2} sx={{ marginY: 8 }}>
        <Pagination
          count={Math.ceil(pendingProperty?.total / 9) || 1}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </Box>
  );
}

export default Pendants;
