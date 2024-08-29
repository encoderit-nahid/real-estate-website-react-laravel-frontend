import {
  Box,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  Pagination,
  Skeleton,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";
import { useGetPropertyQuery } from "@/queries/useGetPropertyQuery";
import RentCard from "@/component/reuseable/rentCard/RentCard";
import SearchIcon from "@mui/icons-material/Search"; // Import the search icon
import { debounce } from "@/utils/debounce";

const drawerWidth = 240;

function ViewProperty() {
  const router = useRouter();
  const { query } = router;

  const [page, setPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = useState(query?.all || "");

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
    all: searchTerm,
  });

  const handlePageChange = (event, value) => {
    setPage(value);
    router.replace({
      query: { ...router.query, page: value },
    });
  };

  useEffect(() => {
    refetch();
  }, [page, searchTerm, refetch]);

  const handleSearchChange = (event) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
    router.replace({
      query: { ...router.query, all: event.target.value, page: 1 }, // Update the query with 'all' key and reset page
    });
  };

  const debounceSearchChange = debounce(handleSearchChange);

  if (Loading) {
    return (
      <Container maxWidth="xl" sx={{ mt: 5 }}>
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
      <Container maxWidth="md" sx={{ px: 2, py: 0 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100vh" }}
        >
          <CircularProgress size="8rem" />
        </Grid>
      </Container>
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
      <Container maxWidth="xl" sx={{ mt: 5 }}>
        <TextField
          variant="outlined"
          // placeholder={t["Search by broker name"]}
          size="small"
          onChange={debounceSearchChange}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" aria-label="Search by broker name">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
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
