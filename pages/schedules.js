import dynamic from "next/dynamic";
const ResponsiveDrawer = dynamic(() =>
  import("@/component/sharedProposal/ResponsiveDrawer/ResponsiveDrawer")
);
import Head from "next/head";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Container, Grid, Skeleton } from "@mui/material";
import notifyImage from "../public/Images/notify.png";
import { getSession } from "next-auth/react";
import ScheduleCard from "../src/component/schedule/ScheduleCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findScheduleData } from "../src/redux/schedules/actions";
import en from "locales/en";
import pt from "locales/pt";
import { useState } from "react";

const drawerWidth = 240;

export default function Schedules({ language }) {
  const [myValue, setMyValue] = useState(language || "en");

  const t = myValue === "en" ? en : pt;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findScheduleData());
  }, [dispatch]);

  const scheduleData = useSelector((state) => state?.schedule?.scheduleData);

  const Loading = useSelector((state) => state?.schedule?.loading);

  // if (Loading) {
  //   return (
  //     <Box>
  //       {[0, 1, 2, 3].map((data, index) => (
  //        <Container  maxWidth="xl" sx={{ marginTop: 5 }} key={index}>
  //           <Skeleton
  //             variant="rect"
  //             height={200}
  //             sx={{ mx: 2, my: 2, borderRadius: "8px" }}
  //           />
  //           <Box sx={{ mx: 2, my: 1 }}>
  //             <Skeleton width="100%" />
  //             <Skeleton width="100%" />
  //             <Skeleton width="100%" />
  //             <Skeleton />
  //           </Box>
  //         </Container>
  //       ))}
  //     </Box>
  //   );
  // }

  return (
    <>
      {!Loading ? (
        <Box
          sx={{
            //   backgroundColor: "#f6f8fc",
            flexGrow: 1,
            background: "#F2F5F6",
            minHeight: "100vh",
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            paddingX: { xs: 0, sm: 0, md: 6, lg: 1, xl: 6 },
            paddingTop: { xs: 6, sm: 6, md: 6, lg: 8, xl: 3 },
            paddingBottom: { xs: 3, sm: 3, md: 3, lg: 4, xl: 3 },
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Typography
              variant="p"
              sx={{
                color: "#002152",
                fontSize: "24px",
                fontWeight: "700",
                lineHeight: "32px",
                ml: { xs: 4, sm: 4, md: 0, lg: 0, xl: 0 },
                mt: { xs: 1, sm: 1, md: 0, lg: 0, xl: 0 },
              }}
            >
              {t["Schedules"]}
            </Typography>
            <Image src={notifyImage} alt="notify" />
          </Grid>
          {scheduleData?.data?.map((data, index) => (
            <ScheduleCard
              data={data}
              key={index}
              languageName={myValue.toString()}
            />
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            //   backgroundColor: "#f6f8fc",
            flexGrow: 1,
            background: "#F2F5F6",
            minHeight: "100vh",
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            paddingX: { xs: 0, sm: 0, md: 6, lg: 1, xl: 6 },
            paddingTop: { xs: 6, sm: 6, md: 6, lg: 8, xl: 3 },
            paddingBottom: { xs: 3, sm: 3, md: 3, lg: 4, xl: 3 },
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Typography
              variant="p"
              sx={{
                color: "#002152",
                fontSize: "24px",
                fontWeight: "700",
                lineHeight: "32px",
                ml: { xs: 4, sm: 4, md: 0, lg: 0, xl: 0 },
                mt: { xs: 1, sm: 1, md: 0, lg: 0, xl: 0 },
              }}
            >
              {t["Schedules"]}
            </Typography>
            <Image src={notifyImage} alt="notify" />
          </Grid>
          {[0, 1, 2, 3].map((data, index) => (
            <Container maxWidth="xl" sx={{ marginTop: 5 }} key={index}>
              <Skeleton
                variant="rect"
                height={200}
                sx={{ mx: 2, my: 2, borderRadius: "8px" }}
              />
            </Container>
          ))}
        </Box>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  //* Session for SSG
  const session = await getSession(context);
  //? If Not Logged In
  if (!session) {
    return {
      redirect: {
        destination: "/",
      },
      props: {
        session: null,
      },
    };
  }

  const cookies = context.req.cookies["language"] || "pt";

  return {
    props: {
      session: session,
      language: cookies,
    },
  };
}
