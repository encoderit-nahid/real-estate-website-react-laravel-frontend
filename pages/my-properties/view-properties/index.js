import {
  Box,
  Container,
  Grid,
  LinearProgress,
  Pagination,
  Skeleton,
  Stack,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";
import { useGetPropertyQuery } from "@/queries/useGetPropertyQuery";
import RentCard from "@/component/reuseable/rentCard/RentCard";

const drawerWidth = 240;

function ViewProperty() {
  const router = useRouter();
  const { query } = router;

  const [page, setPage] = React.useState(1);

  useEffect(() => {
    setPage(+query?.page);
  }, [query]);

  const {
    data: thirdProperty,
    isLoading: Loading,
    refetch,
    isFetched,
    isFetching,
  } = useGetPropertyQuery({
    project_id: query?.project_id,
    page: page,
    per_page: 9,
  });

  const handlePageChange = (event, value) => {
    setPage(value);
    router.replace({
      query: { ...router.query, page: value },
    });
  };

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  if (Loading) {
    return (
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {[0, 1, 2, 3].map((data, index) => (
            <Grid
              key={index}
              item
              xs={12}
              sm={12}
              md={12}
              lg={6}
              xl={6}
              xxl={6}
            >
              <Skeleton
                variant="rect"
                height={220}
                sx={{ mx: 2, my: 2, borderRadius: "8px" }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
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
    <Box
      sx={{
        flexGrow: 1,
        background: "#F2F5F6",
        minHeight: "100vh",
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        paddingX: { xs: 0, sm: 0, md: 6, lg: 6, xl: 6 },
        paddingTop: { xs: 6, sm: 6, md: 6, lg: 8, xl: 3 },
        paddingBottom: { xs: 3, sm: 3, md: 3, lg: 4, xl: 3 },
      }}
    >
      <Container maxWidth="xl">
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
              <Link
                href={`/visualizacao-da-propriedade/${data?.id}/${data?.property_title}`}
                as={`/visualizacao-da-propriedade/${data.id}/${data?.property_title}`}
              >
                <a
                  style={{
                    textDecoration: "none",
                    listStyle: "none",
                    width: "100%",
                  }}
                >
                  <RentCard
                    propertyData={data}
                    languageName={"pt"}
                    page={page}
                  />
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
      </Container>
    </Box>
  );
}

export default ViewProperty;
