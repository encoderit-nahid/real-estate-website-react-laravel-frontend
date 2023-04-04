import { Box, Button, Grid, Pagination, Stack } from "@mui/material";
import React from "react";
import ReleaseCard from "../ReleaseCard/ReleaseCard";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findProjectsData } from "../../../redux/projects/actions";
import { useRouter } from "next/router";

function Releases({ queryData }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [pageSize, setPageSize] = React.useState(3);
  const [page, setPage] = React.useState(1);
  useEffect(() => {
    dispatch(findProjectsData(queryData));
  }, [dispatch, queryData]);

  const AllProjects = useSelector((state) => state.project.projectData);
  console.log({ AllProjects });
  const Loading = useSelector((state) => state.project.loading);

  const handlePageChange = (event, value) => {
    setPage(value);
    dispatch(findProjectsData({ page: value, per_page: 5 }));
    router.replace({
      pathname: "/my_properties",
      query: { ...router.query, page: value },
    });
    // setData(datas.slice(firstIndex + pageSize * (value - 1), pageSize * value));
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {AllProjects?.data?.map((data, index) => (
          <Grid key={index} item xs={12} sm={12} md={12} lg={4} xl={4}>
            <ReleaseCard projectData={data} />
          </Grid>
        ))}
      </Grid>
      <Stack spacing={2} sx={{ marginY: 8 }}>
        <Pagination
          count={Math.ceil(AllProjects?.total / 9) || 1}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </Box>
  );
}

export default Releases;
