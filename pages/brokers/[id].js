import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import EmailIcon from "@mui/icons-material/Email";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { Avatar, Grid, ListItemText, Rating, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { _baseURL } from "../../consts";
import { useDispatch, useSelector } from "react-redux";
import { GetAllNotification } from "@/redux/all-notification/actions";
import { findNotificationCountData } from "@/redux/notificationCount/actions";
import { userDetailsApi } from "@/api";
import pt from "locales/pt";
import { findPropertyCountData } from "@/redux/propertyCount/actions";
import StarIcon from "@mui/icons-material/Star";
import BaseLinearRating from "@/component/reuseable/baseLinearRating/BaseLinearRating";
import { useGetPropertyCountQuery } from "@/queries/useGetPropertyCountQuery";
import BaseWhatsappButton from "@/component/reuseable/baseWhatsappButton/BaseWhatsappButton";
const BaseShareButton = dynamic(
  () => import("@/component/reuseable/baseShareButton/BaseShareButton"),
  { ssr: false }
);
const BaseFavoriteButton = dynamic(
  () => import("@/component/reuseable/baseFavoriteButton/BaseFavoriteButton"),
  { ssr: false }
);

// import { useRouter } from "next/router";

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

export default function BrokerDetails({ handleLoginOpen, language }) {
  const router = useRouter();
  const { query } = router;
  console.log("🟥 ~ BrokerDetails ~ query:", query);
  const [value, setValue] = useState(0);

  const [showPass, setShowPass] = useState(false);
  const handleClickShowPassword = () => {
    setShowPass(!showPass);
  };
  useEffect(() => {
    userDetailsApi();
  }, []);

  const [myValue, setMyValue] = useState(language || "pt");
  const t = myValue === "en" ? en : pt;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findNotificationCountData());
    dispatch(GetAllNotification());
    dispatch(findPropertyCountData());
  }, [dispatch]);

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <Box
      sx={{
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
            {t["Broker"]}
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
                      (32 {t["reviews"]})
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
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Stack direction={"column"} spacing={2}>
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
                    <BaseWhatsappButton />
                  </Stack>
                  <Stack direction="row" alignItems={"center"} spacing={1}>
                    <BaseShareButton
                      base_url={`https://www.lokkan.site/brokers/${query.id}`}
                    />

                    <BaseFavoriteButton
                      handleLoginOpen={handleLoginOpen}
                      itemID={query.id}
                      type="broker"
                    />
                  </Stack>
                </Stack>
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
                label={t["Properties"]}
                sx={{
                  fontWeight: "600",
                  textTransform: "uppercase",
                }}
                {...a11yProps(0)}
                color="primary"
              />
              <Tab
                label={t["assessments"]}
                sx={{
                  fontWeight: "600",
                  textTransform: "uppercase",
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
