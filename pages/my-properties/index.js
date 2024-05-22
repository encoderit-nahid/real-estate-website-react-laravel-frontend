import dynamic from "next/dynamic";
import Head from "next/head";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
const ResponsiveDrawer = dynamic(() =>
  import("@/component/sharedProposal/ResponsiveDrawer/ResponsiveDrawer")
);
import {
  Button,
  Container,
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
const Releases = dynamic(() =>
  import("@/component/properties/Releases/Releases")
);
const ThirdTab = dynamic(() => import("@/component/properties/Third/ThirdTab"));
const NewRegistration = dynamic(() =>
  import("@/component/properties/NewRegistration/NewRegistration")
);
import Link from "next/link";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { _baseURL } from "../../consts";
import { useDispatch } from "react-redux";

import { omitEmpties, userDetailsApi } from "@/api";
import en from "locales/en";
import pt from "locales/pt";
import { findPropertyCountData } from "@/redux/propertyCount/actions";
import WishProperty from "@/component/properties/WishProperty/WishProperty";
import { useGetPropertyCountQuery } from "@/queries/useGetPropertyCountQuery";
import useParams from "@/hooks/useParams";
const NotificationContent = dynamic(() =>
  import("@/component/notificationContent/NotificationContent")
);

const drawerWidth = 240;

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

export default function MyProperties({ language }) {
  const router = useRouter();
  const { query } = router;
  const { data: session } = useSession();

  const { setParams } = useParams();

  useEffect(() => {
    userDetailsApi();
  }, []);

  const [myValue, setMyValue] = useState(language || "pt");

  const t = myValue === "en" ? en : pt;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findPropertyCountData());
  }, [dispatch]);

  const {
    data,
    isLoading: countLoading,
    refetch: loadingRefetch,
  } = useGetPropertyCountQuery();
  const propertyCountData = data?.data;

  const [value, setValue] = useState(+query?.value || 0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setParams(
      omitEmpties({
        status:
          newValue === 1
            ? "wishlist"
            : newValue === 3
            ? "third"
            : newValue === 4
            ? "new"
            : null,
        page: 1,
        per_page: 9,
      })
    );
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
      <NotificationContent
        pageName={"My Properties"}
        session={session}
        language={"pt"}
      />
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
                    ? `${"Meus imóveis"}(${
                        propertyCountData?.wish_property || 0
                      })`
                    : `${"Meus imóveis"}(${
                        propertyCountData?.wish_property || 0
                      })`
                }
                {...a11yProps(0)}
              />
              <Tab
                sx={{ fontWeight: "600", textTransform: "none" }}
                label={
                  countLoading
                    ? t["Releases"]
                    : `${t["Releases"]}(${propertyCountData?.project || 0})`
                }
                {...a11yProps(1)}
              />
              <Tab
                sx={{ fontWeight: "600", textTransform: "none" }}
                label={
                  countLoading
                    ? t["Third"]
                    : `${t["Third"]}(${propertyCountData?.third || 0})`
                }
                {...a11yProps(2)}
              />
              {session?.user?.role === "admin" && (
                <Tab
                  sx={{
                    fontWeight: "600",
                    textTransform: "none",
                    textWrap: "nowrap",
                  }}
                  label={
                    countLoading
                      ? t["New Registration"]
                      : `${t["New Registration"]}(${
                          propertyCountData?.register_property || 0
                        })`
                  }
                  {...a11yProps(3)}
                />
              )}
            </Tabs>
          </Box>
          <Container maxWidth="xl">
            <Grid
              container
              direction="row"
              justifyContent={{
                xs: "flex-start",
                sm: "flex-start",
                md: "flex-start",
                lg: "flex-end",
              }}
              alignItems="center"
              gap={2}
              sx={{ mt: 3 }}
            >
              {session?.user?.role !== "buyer" && (
                <Link href="/my-properties/new-property">
                  <Button
                    sx={{
                      textTransform: "none",
                      background: "#0362F0",
                      borderRadius: "4px",
                      color: "#ffffff",
                      fontSize: "16px",
                      fontWeight: "600",
                      px: 4,
                      py: 1,
                      width: {
                        xs: "100%",
                        sm: "100%",
                        md: "30%",
                        lg: "30%",
                        xl: "20%",
                      },
                      "&:hover": {
                        background: "#0362F0",
                        borderRadius: "4px",
                        color: "#ffffff",
                      },
                    }}
                  >
                    {t["New property"]}
                  </Button>
                </Link>
              )}

              {session?.user?.role === "admin" && (
                <Link href="/my-properties/new-venture">
                  <Button
                    sx={{
                      textTransform: "none",
                      border: "1px solid #002152",
                      borderRadius: "4px",
                      color: "#002152",
                      fontSize: "16px",
                      fontWeight: "600",
                      px: 4,
                      py: 1,
                      width: {
                        xs: "100%",
                        sm: "100%",
                        md: "30%",
                        lg: "30%",
                        xl: "20%",
                      },
                    }}
                  >
                    {t["New venture"]}
                  </Button>
                </Link>
              )}
            </Grid>
          </Container>
          <TabPanel value={value} index={0}>
            <WishProperty
              languageName={myValue.toString()}
              loadingRefetch={loadingRefetch}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Releases queryData={query} languageName={myValue.toString()} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ThirdTab languageName={myValue.toString()} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <NewRegistration
              languageName={myValue.toString()}
              loadingRefetch={loadingRefetch}
            />
          </TabPanel>
        </Box>
      </Container>
    </Box>
  );
}
