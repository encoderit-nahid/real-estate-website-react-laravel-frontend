import { Box, Button, Grid } from "@mui/material";
import React from "react";
import ReleaseCard from "../ReleaseCard/ReleaseCard";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findProjectsData } from "../../../redux/projects/actions";
import { useRouter } from "next/router";

function Releases({ queryData }) {
  console.log("releases");
  console.log({ queryData });
  const dispatch = useDispatch();
  const router = useRouter();

  const [page, setPage] = React.useState(+queryData?.page || 1);
  // useEffect(() => {
  //   dispatch(findProjectsData(queryData));
  // }, [dispatch, queryData]);

  const AllProjects = useSelector((state) => state.project.projectData);
  console.log({ AllProjects });
  const Loading = useSelector((state) => state.project.loading);

  const handlePageChange = (event, value) => {
    setPage(value);
    dispatch(findProjectsData({ page: value, per_page: 5 }));
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
          <Grid key={index} item xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
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
        ))}
      </Grid>
    );
  }

function Releases() {
  return (
    <Box>
      <Grid container spacing={2}>
        {[0, 1, 2].map((data, index) => (
          <Grid key={index} item xs={12} sm={12} md={12} lg={4} xl={4}>
            <ReleaseCard />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Releases;
