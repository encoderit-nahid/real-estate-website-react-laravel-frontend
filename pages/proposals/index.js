import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
const ResponsiveDrawer = dynamic(() =>
  import("@/component/sharedProposal/ResponsiveDrawer/ResponsiveDrawer")
);
import {
  Badge,
  Button,
  Container,
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
} from "@mui/material";
import { useState } from "react";
import notifyImage from "../../public/Images/notify.png";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
const Pendants = dynamic(() =>
  import("@/component/proposals/pendants/Pendants")
);
const Accepted = dynamic(() =>
  import("@/component/proposals/accepted/Accepted")
);
const Completed = dynamic(() =>
  import("@/component/proposals/completed/Completed")
);
import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findProposalCountData } from "../../src/redux/proposalCount/actions";
import en from "locales/en";
import pt from "locales/pt";
import { GetAllNotification } from "@/redux/all-notification/actions";
import { findNotificationCountData } from "@/redux/notificationCount/actions";
import useChannel from "@/hooks/useChannel";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { useRouter } from "next/router";

const drawerWidth = 240;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Proposals({ language }) {
  const router = useRouter();
  const { query } = router;
  const { data: session } = useSession();

  const [myValue, setMyValue] = useState(language || "en");

  const t = myValue === "en" ? en : pt;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findNotificationCountData());
    dispatch(GetAllNotification());
    dispatch(findProposalCountData());
  }, [dispatch]);

  const notificationCountData = useSelector(
    (state) => state?.notificationCount?.notificationCountData
  );

  const notificationData = useSelector(
    (state) => state?.notification?.notificationData
  );

  useChannel("notification-broadcast." + session.user.userId, (channel) => {
    // console.log('useChannel', channel)
    channel
      // .here((...args) => {
      // 	console.log('notification-broadcast:here', ...args)
      // })
      // .joining((...args) => {
      // 	console.log('notification-broadcast:joining', ...args)
      // })
      // .leaving((...args) => {
      // 	console.log('notification-broadcast:leaving', ...args)
      // })
      .listen(".OnCreateNewSchedule", (event) => {
        console.log("notification-broadcast:NotificationEvent", event);
        dispatch(notificationAddPusherItem(event.notification));
        dispatch(notificationAddCount(1));
      });
    // .listenForWhisper('ping', (event) => {
    // 	console.log('notification-broadcast:ping', event)
    // })
  });

  const handleReadNotification = async (data) => {
    const [error, response] = await NotificationReadApi(data?.id);
    if (!error) {
      dispatch(notificationRemove(data?.id));
      dispatch(notificationAddCount(-1));
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const proposalCountData = useSelector((state) => state?.count?.countData);

  const countLoading = useSelector((state) => state?.count?.loading);

  const [proposalCount, setProposalCount] = useState("");

  const [value, setValue] = useState(+query?.value || 0);
  const [adType, setAdType] = useState("allkinds");
  const [relevantFilter, setReleventFilter] = useState("");

  const handleAdTypeFilter = (data) => {
    setAdType(data);
    router.replace({
      pathname: "/proposals",
      query: {
        ...router.query,
        ad_type: data,
      },
    });
  };

  const handleRelevantFilter = (data) => {
    // setReleventFilter(data);
    router.replace({
      pathname: "/proposals",
      query: {
        ...router.query,
        relevant_filter: data?.slug,
      },
    });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    newValue === 1
      ? router.push({
          pathname: "/proposals",
          query: {
            proposal_status: "accepted",
            page: 1,
            per_page: 9,
            status: "approved",
            value: newValue,
          },
        })
      : newValue === 2
      ? router.push({
          pathname: "/proposals",
          query: {
            proposal_status: "completed",
            status: "approved",
            page: 1,
            per_page: 9,
            value: newValue,
          },
        })
      : router.push({
          pathname: "/proposals",
          query: {
            page: 1,
            per_page: 9,
            value: newValue,
            status: "approved",
            proposal_status: "pending",
          },
        });
  };
  return (
    <div>
      <Head>
        <title>Lokkan - A imobiliária digital</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/negotiate.png" />
      </Head>

      <main>
        <Box sx={{ display: "flex" }}>
          <ResponsiveDrawer languageName={myValue.toString()} />
          <Box
            sx={{
              //   backgroundColor: "#f6f8fc",
              flexGrow: 1,
              background: "#F2F5F6",
              minHeight: "100vh",
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              paddingX: { xs: 0, sm: 0, md: 6, lg: 6, xl: 6 },
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
                {t["Proposals"]}
              </Typography>

              <Button
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
                sx={{
                  p: 0,
                  background: "transparent",
                  boxShadow: "none",
                  "&:hover": {
                    boxShadow: "none",
                    background: "transparent",
                  },
                }}
              >
                <Badge
                  badgeContent={notificationCountData?.count}
                  color="primary"
                >
                  <Image src={notifyImage} alt="notify" />
                </Badge>
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: 350,
                    maxWidth: 360,
                    minWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  {/* <FixedSizeList
										height={400}
										width={360}
										itemSize={46}
										itemCount={200}
										overscanCount={10}
									>
										{renderRow}
									</FixedSizeList> */}
                  {notificationData?.map((data, index) => (
                    <ListItem
                      // style={style}
                      key={index}
                      component="div"
                      disablePadding
                      sx={{ width: 360 }}
                    >
                      <ListItemButton
                        onClick={() => handleReadNotification(data)}
                      >
                        <ListItemIcon>
                          <NotificationsNoneOutlinedIcon
                            sx={{ color: "#7dd3fc" }}
                          />
                        </ListItemIcon>
                        <ListItemText primary={data?.data} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </Box>
              </Popover>
            </Grid>
            <Container maxWidth="xl">
              <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    variant="scrollable"
                  >
                    <Tab
                      sx={{ fontWeight: "600", textTransform: "none" }}
                      label={
                        countLoading
                          ? t["Pending"]
                          : `${t["Pending"]}(${
                              proposalCountData?.pending || 0
                            })`
                      }
                      {...a11yProps(0)}
                    />
                    <Tab
                      sx={{ fontWeight: "600", textTransform: "none" }}
                      label={
                        countLoading
                          ? t["Accepted"]
                          : `${t["Accepted"]}(${
                              proposalCountData?.accepted || 0
                            })`
                      }
                      {...a11yProps(1)}
                    />
                    <Tab
                      sx={{ fontWeight: "600", textTransform: "none" }}
                      label={
                        countLoading
                          ? t["Completed"]
                          : `${t["Completed"]}(${
                              proposalCountData?.completed || 0
                            })`
                      }
                      {...a11yProps(2)}
                    />
                  </Tabs>
                </Box>
                <Container maxWidth="xl" sx={{ mt: 2 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={5} xl={4}>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                      >
                        {[
                          { name: "allkinds", slug: t["allKinds"] },
                          { name: "rent", slug: t["rent"] },
                          { name: "sale", slug: t["sale"] },
                        ]?.map((data, index) => (
                          <Button
                            key={index}
                            onClick={() => handleAdTypeFilter(data?.name)}
                            sx={{
                              textTransform: "none",
                              padding: "3px 6px",
                              backgroundColor:
                                adType === data?.name ? "#7450F0" : "#DBE1E5",
                              color:
                                adType === data?.name ? "#ffffff" : "#002152",
                              borderRadius: "56px",
                              ml: index > 0 ? 1 : 0,
                              "&:hover": {
                                backgroundColor: "#7450F0",
                                color: "#ffffff",
                              },
                            }}
                          >
                            {data?.slug}
                          </Button>
                        ))}
                        {/* <Button
                          sx={{
                            textTransform: "none",
                            padding: "3px 6px",
                            backgroundColor: "#DBE1E5",
                            color: "#002152",
                            borderRadius: "56px",
                            ml: 1,
                          }}
                        >
                          rent
                        </Button>
                        <Button
                          sx={{
                            textTransform: "none",
                            padding: "3px 6px",
                            backgroundColor: "#DBE1E5",
                            color: "#002152",
                            borderRadius: "56px",
                            ml: 1,
                          }}
                        >
                          sell
                        </Button> */}
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={5} xl={4}>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                      >
                        {[
                          {
                            name: t["lower value"],
                            slug: "cheapest",
                          },
                          {
                            name: t["higher value"],
                            slug: "most_expensive",
                          },
                        ]?.map((data, index) => (
                          <Button
                            onClick={() => handleRelevantFilter(data)}
                            key={index}
                            sx={{
                              display: "flex",
                              textTransform: "none",
                              padding: "3px 6px",
                              backgroundColor: "transparent",
                              color: "#9FAAB1",
                              borderRadius: "56px",
                              ml: 1,
                            }}
                          >
                            <KeyboardDoubleArrowDownIcon />
                            <Typography variant="p">{data?.name}</Typography>
                          </Button>
                        ))}

                        {/* <Button
                          sx={{
                            textTransform: "none",
                            padding: "3px 6px",
                            backgroundColor: "transparent",
                            color: "#9FAAB1",
                            borderRadius: "56px",
                            ml: 1,
                          }}
                        >
                          <KeyboardDoubleArrowUpIcon />
                          <Typography variant="p">higher value</Typography>
                        </Button> */}
                      </Grid>
                    </Grid>
                  </Grid>
                </Container>
                <TabPanel value={value} index={0}>
                  <Pendants languageName={myValue.toString()} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Accepted languageName={myValue.toString()} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <Completed languageName={myValue.toString()} />
                </TabPanel>
              </Box>
            </Container>
          </Box>
        </Box>
      </main>
    </div>
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
