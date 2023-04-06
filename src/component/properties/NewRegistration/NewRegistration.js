import { Box, Grid, Pagination, Skeleton, Stack } from "@mui/material";
import React from "react";
import NewRegistrationCard from "../NewRegistrationCard/NewRegistrationCard";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { findPropertyData } from "../../../redux/property/actions";
import { useEffect } from "react";

function NewRegistration() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = router;
  console.log({ query });
  const [page, setPage] = React.useState(+query?.page || 1);

  useEffect(() => {
    dispatch(findPropertyData(query));
  }, [dispatch, query]);

  const newProperty = useSelector((state) => state.property.propertyData);

  const Loading = useSelector((state) => state.property.loading);

  const handlePageChange = (event, value) => {
    setPage(value);
    dispatch(findPropertyData({ status: "new", page: value, per_page: 5 }));
    router.replace({
      pathname: "/my_properties",
      query: { ...router.query, page: value, per_page: 9 },
    });
    // setData(datas.slice(firstIndex + pageSize * (value - 1), pageSize * value));
  };
  if (Loading) {
    return (
      <Grid container spacing={4}>
        {[0, 1, 2, 3].map((data, index) => (
          <Grid key={index} item xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
            <Skeleton
              variant="rect"
              height={220}
              sx={{ mx: 2, my: 2, borderRadius: "8px" }}
            />
          </Grid>
        ))}
      </Grid>
    );
  }
  return (
    <Box>
      <Grid container spacing={4}>
        {newProperty?.data?.map((data, index) => (
          <Grid key={index} item xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
            <NewRegistrationCard
              propertyData={data}
              newProperty={newProperty}
            />
          </Grid>
        ))}
      </Grid>
      <Stack spacing={2} sx={{ marginY: 8 }}>
        <Pagination
          count={Math.ceil(newProperty?.total / 9) || 1}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </Box>
  );
}

export default NewRegistration;
