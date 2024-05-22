import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import logo from "../../public/Images/logo.png";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import NoEncryptionOutlinedIcon from "@mui/icons-material/NoEncryptionOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
const ResponsiveDrawer = dynamic(() =>
  import("@/component/sharedProposal/ResponsiveDrawer/ResponsiveDrawer")
);
import {
  Avatar,
  Badge,
  Button,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  LinearProgress,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Rating,
  Stack,
} from "@mui/material";

import { useEffect, useState } from "react";
const Releases = dynamic(() =>
  import("@/component/properties/Releases/Releases")
);
const ThirdTab = dynamic(() => import("@/component/properties/Third/ThirdTab"));
const NewRegistration = dynamic(() =>
  import("@/component/properties/NewRegistration/NewRegistration")
);
import notifyImage from "../../public/Images/notify.png";
import Link from "next/link";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { _baseURL } from "../../consts";
import useChannel from "@/hooks/useChannel";
import Popover from "@mui/material/Popover";
import { useDispatch, useSelector } from "react-redux";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import {
  GetAllNotification,
  notificationAddPusherItem,
  notificationRemove,
} from "@/redux/all-notification/actions";
import {
  findNotificationCountData,
  notificationAddCount,
} from "@/redux/notificationCount/actions";
import { NOTIFICATION_ADD_COUNT } from "@/redux/notificationCount/types";
import { NotificationReadApi, omitEmpties, userDetailsApi } from "@/api";
import en from "locales/en";
import pt from "locales/pt";
import { findPropertyCountData } from "@/redux/propertyCount/actions";
import WishProperty from "@/component/properties/WishProperty/WishProperty";
import { useGetPropertyCountQuery } from "@/queries/useGetPropertyCountQuery";
import useParams from "@/hooks/useParams";
import { Controller, useForm } from "react-hook-form";
import BaseTextField from "@/component/reuseable/baseTextField/BaseTextField";
import BaseAutocomplete from "@/component/reuseable/baseAutocomplete/BaseAutocomplete";
import BaseOutlinedZipInput from "@/component/reuseable/baseOutlinedZipInput/BaseOutlinedZipInput";
import PropertyList from "@/component/IAmOwner/propertyList/PropertyList";
import StarIcon from "@mui/icons-material/Star";
import BaseLinearRating from "@/component/reuseable/baseLinearRating/BaseLinearRating";
import Footer from "@/component/shared/Footer/Footer";

const drawerWidth = 240;

function onSubmit(data) {
  console.log("🟥 ~ onSubmit ~ onSubmit:", data);
}
function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}

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

export default function BrokerDetails({ handleLoginOpen, language }) {
  const router = useRouter();
  const { query } = router;
  const { data: session } = useSession();
  const { setParams } = useParams();
  const [value, setValue] = useState(0);

  const {
    register,
    watch,
    control,
    handleSubmit,

    formState: { errors },
    setError,
  } = useForm();
  const [showPass, setShowPass] = useState(false);
  const handleClickShowPassword = () => {
    setShowPass(!showPass);
  };
  useEffect(() => {
    userDetailsApi();
  }, []);
  const allStateData = useSelector((state) => state.state.stateData);

  const [myValue, setMyValue] = useState(language || "pt");

  const t = myValue === "en" ? en : pt;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findNotificationCountData());
    dispatch(GetAllNotification());
    dispatch(findPropertyCountData());
  }, [dispatch]);
  const notificationCountData = useSelector(
    (state) => state?.notificationCount?.notificationCountData
  );

  const notificationData = useSelector(
    (state) => state?.notification?.notificationData
  );

  // useChannel("notification-broadcast." + session.user.userId, (channel) => {
  //   // console.log('useChannel', channel)
  //   channel
  //     // .here((...args) => {
  //     // 	console.log('notification-broadcast:here', ...args)
  //     // })
  //     // .joining((...args) => {
  //     // 	console.log('notification-broadcast:joining', ...args)
  //     // })
  //     // .leaving((...args) => {
  //     // 	console.log('notification-broadcast:leaving', ...args)
  //     // })
  //     .listen(".OnCreateNewSchedule", (event) => {
  //       console.log("notification-broadcast:NotificationEvent", event);
  //       dispatch(notificationAddPusherItem(event.notification));
  //       dispatch(notificationAddCount(1));
  //     });
  //   // .listenForWhisper('ping', (event) => {
  //   // 	console.log('notification-broadcast:ping', event)
  //   // })
  // });

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

  const {
    data,
    isLoading: countLoading,
    refetch: loadingRefetch,
  } = useGetPropertyCountQuery();
  const propertyCountData = data?.data;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <Box
      sx={{
        //   backgroundColor: "#f6f8fc",
        flexGrow: 1,
        background: "#F2F5F6",
        minHeight: "100vh",
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        paddingTop: { xs: 6, sm: 6, md: 6, lg: 8, xl: 3 },
      }}
    >
      <Box
        sx={{
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
            Broker
          </Typography>
        </Grid>

        <Grid
          container
          spacing={2}
          sx={{
            backgroundColor: "white",
            borderRadius: "8px 8px 0 0",
            padding: "32px 24px 0 24px",
            mt: 1,
          }}
        >
          <Grid item xs={2}>
            <Stack direction="column" alignItems="center" justifyItems="center">
              <Avatar sx={{ width: 70, height: 70 }} />

              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "16px",
                      fontWeight: 700,
                      lineHeight: "22px",
                      color: "#6C7A84",
                    }}
                  >
                    4.5{" "}
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "18px",
                        color: "#6C7A84",
                      }}
                    >
                      (32 reviews)
                    </span>
                  </Typography>
                }
              />
              <Rating name="size-large" defaultValue={4} readOnly />
            </Stack>
          </Grid>
          <Grid item xs={10}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#002152",
                    fontWeight: "700",
                    fontSize: "16px",
                    lineHeight: "22px",
                  }}
                >
                  John Doe da silva
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="p"
                  sx={{
                    color: "#002152",
                    fontWeight: "400",
                    fontSize: "16px",
                    lineHeight: "22px",
                    letterSpacing: "0.5px",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur. Cursus amet mi
                  vestibulum nunc urna. Posuere congue sit urna in mattis sem.
                  Pregnant nibh turpis in tincidunt enim. Condimentum amet proin
                  commodo interdum. Magnis quam congue sed.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={4}>
                    <Stack direction="row" spacing={1}>
                      <EmailIcon color="primary" />
                      <Typography
                        variant="p"
                        sx={{
                          color: "#002152",
                          fontWeight: "400",
                          fontSize: "16px",
                          lineHeight: "22px",
                          letterSpacing: "0.5px",
                        }}
                      >
                        demo@gmail.com
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={4}>
                    <Stack direction="row" spacing={1}>
                      <PhoneEnabledIcon color="primary" />
                      <Typography
                        variant="p"
                        sx={{
                          color: "#002152",
                          fontWeight: "400",
                          fontSize: "16px",
                          lineHeight: "22px",
                          letterSpacing: "0.5px",
                        }}
                      >
                        (11) 9000-0000
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={4}>
                    <Stack direction="row" spacing={1}>
                      <TextSnippetIcon color="primary" />
                      <Typography
                        variant="p"
                        sx={{
                          color: "#002152",
                          fontWeight: "400",
                          fontSize: "16px",
                          lineHeight: "22px",
                          letterSpacing: "0.5px",
                        }}
                      >
                        CRECI 95496840
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab
                label="properties"
                sx={{
                  fontWeight: "600",
                  textTransform: "uppercase",
                  // color: "#0362F0",
                }}
                {...a11yProps(0)}
                color="primary"
              />
              <Tab
                label="assessments"
                sx={{
                  fontWeight: "600",
                  textTransform: "uppercase",
                  // color: "#0362F0",
                }}
                color="primary"
                {...a11yProps(1)}
              />
            </Tabs>
          </Grid>
        </Grid>
        <TabPanel value={value} index={0}>
          {/* <PropertyList
                  propertyData={propertyData}
                  isLoading={isLoading}
                  handleLoginOpen={handleLoginOpen}
                /> */}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Stack direction="row" alignItems="flex-start" spacing={3}>
            <Stack direction="row" alignItems="center" spacing={3}>
              <Typography
                variant="h1"
                style={{ fontStyle: "italic", fontWeight: "bolder" }}
              >
                4.5
              </Typography>
              <StarIcon sx={{ fontSize: 50, color: "#FFAB00" }} />
            </Stack>
            <Stack direction="column" spacing={1}>
              <BaseLinearRating count={5} percentage={66.7} />
              <BaseLinearRating count={4} percentage={18.7} />
              <BaseLinearRating count={3} percentage={16.7} />
              <BaseLinearRating count={2} percentage={1.0} />
              <BaseLinearRating count={1} percentage={1.0} />
            </Stack>
          </Stack>
        </TabPanel>
      </Box>
    </Box>
  );
}
