import {
  Box,
  Grid,
  LinearProgress,
  Pagination,
  Skeleton,
  Stack,
} from "@mui/material";
import React from "react";
import RentCard from "../../reuseable/rentCard/RentCard";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { findPropertyData } from "../../../redux/property/actions";
import Link from "next/link";
import { useGetPropertyQuery } from "@/queries/useGetPropertyQuery";

function ThirdTab({ languageName }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = router;

  const [page, setPage] = React.useState(+query?.page || 1);

  const {
    data: thirdProperty,
    isLoading: Loading,
    refetch,
    isFetched,
    isFetching,
  } = useGetPropertyQuery({ status: "third", page: page, per_page: 9 });

  const handlePageChange = (event, value) => {
    setPage(value);
    router.replace({
      pathname: "/my_properties",
      query: { status: "third", page: value, per_page: 9 },
    });
  };

  useEffect(() => {
    refetch();
  }, [page, refetch]);

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

  if (isFetched && isFetching) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Grid container spacing={4}>
        {thirdProperty?.data?.map((data, index) => (
          <Grid
            key={index}
            item
            xs={12}
            sm={12}
            md={12}
            lg={6}
            xl={6}
            xxl={6}
            sx={{ cursor: "pointer" }}
          >
            <Link href={`/property_view/${data?.id}`}>
              <a
                style={{
                  textDecoration: "none",
                  listStyle: "none",
                  width: "100%",
                }}
              >
                <RentCard propertyData={data} languageName={languageName} />
              </a>
            </Link>
          </Grid>
        ))}
      </Grid>
      <Stack spacing={2} sx={{ marginY: 8 }}>
        <Pagination
          count={Math.ceil(thirdProperty?.total / 9) || 1}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </Box>
  );
}

export default ThirdTab;
