import dynamic from "next/dynamic";
const ResponsiveDrawer = dynamic(() =>
  import("@/component/sharedProposal/ResponsiveDrawer/ResponsiveDrawer")
);
import Head from "next/head";
import Image from "next/image";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useState } from "react";
import notifyImage from "../../public/Images/notify.png";
const TabRegistered = dynamic(() =>
  import("@/component/brokers/TabRegistered/TabRegistered")
);
const TabPendant = dynamic(() =>
  import("@/component/brokers/TabPendant/TabPendant")
);
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { findBrokerCountData } from "@/redux/brokerCount/actions";
import { getSession, useSession } from "next-auth/react";
import SearchIcon from "@mui/icons-material/Search";
import pt from "locales/pt";
import en from "locales/en";

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

export default function Brokers({ language }) {
  const [myValue, setMyValue] = useState(language || "pt");

  const t = myValue === "en" ? en : pt;
  const { data: session } = useSession();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findBrokerCountData());
  }, [dispatch]);
  const brokerCountData = useSelector(
    (state) => state?.brokerCount?.brokerCountData
  );

  const brokerLoading = useSelector((state) => state?.brokerCount?.loading);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
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
          {t["Brokers"]}
        </Typography>
        <Image src={notifyImage} alt="notify" />
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
                  brokerLoading
                    ? t["Registered"]
                    : `${t["Registered"]}(${brokerCountData?.register || 0})`
                }
                {...a11yProps(0)}
              />
              {session?.user?.role === "admin" && (
                <Tab
                  sx={{ fontWeight: "600", textTransform: "none" }}
                  label={
                    brokerLoading
                      ? t["Pending"]
                      : `${t["Pending"]}(${brokerCountData?.pending || 0})`
                  }
                  {...a11yProps(1)}
                />
              )}
            </Tabs>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <TextField
                  variant="outlined"
                  placeholder="Search by business name or address..."
                  size="small"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          aria-label="Search by business name or address..."
                        >
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                    lineHeight: "22px",
                    color: "#002152",
                    textTransform: "none",
                    borderColor: "#002152",
                    px: 2,
                    py: 1,
                    "&:hover": {
                      color: "#002152",
                      borderColor: "#002152",
                    },
                  }}
                >
                  Filter
                </Button>
              </Grid>
            </Grid>
          </Box>

          <TabPanel value={value} index={0}>
            {/* <Pendants /> */}
            <TabRegistered languageName={myValue.toString()} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            {/* <Accepted /> */}
            <TabPendant languageName={myValue.toString()} />
          </TabPanel>
        </Box>
      </Container>
    </Box>
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
