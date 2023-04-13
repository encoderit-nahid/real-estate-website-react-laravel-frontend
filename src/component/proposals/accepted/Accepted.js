import { Box, Grid, Pagination, Stack } from "@mui/material";
import React, { useEffect } from "react";
import AcceptedCard from "../acceptedCard/AcceptedCard";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { findPropertyData } from "../../../redux/property/actions";

function Accepted() {
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
        proposal_status: "accepted",
      })
    );
  }, [dispatch, query]);

  const acceptedProperty = useSelector((state) => state.property.propertyData);
  console.log({ acceptedProperty });
  const Loading = useSelector((state) => state.property.loading);

  const handlePageChange = (event, value) => {
    setPage(value);
    dispatch(
      findPropertyData({
        status: "approved",
        page: value,
        per_page: 9,
        proposal_status: "accepted",
      })
    );
    router.replace({
      pathname: "/proposals",
      query: {
        ...router.query,
        page: value,
        per_page: 9,
        proposal_status: "accepted",
      },
    });
    // setData(datas.slice(firstIndex + pageSize * (value - 1), pageSize * value));
  };
  return (
    <Box>
      <Grid container spacing={2}>
        {acceptedProperty?.data?.map((data, index) => (
          <Grid key={data?.id} item xs={12} sm={12} md={12} lg={4} xl={4}>
            <AcceptedCard propertyData={data} />
          </Grid>
        ))}
      </Grid>
      <Stack spacing={2} sx={{ marginY: 8 }}>
        <Pagination
          count={Math.ceil(acceptedProperty?.total / 9) || 1}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </Box>
  );
}

export default Accepted;
