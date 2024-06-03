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
import { _baseURL, _imageURL } from "../../consts";
import { useDispatch, useSelector } from "react-redux";
import { GetAllNotification } from "@/redux/all-notification/actions";
import { findNotificationCountData } from "@/redux/notificationCount/actions";
import { userDetailsApi } from "@/api";
import en from "locales/en";
import pt from "locales/pt";
import { findPropertyCountData } from "@/redux/propertyCount/actions";
import StarIcon from "@mui/icons-material/Star";
import BaseLinearRating from "@/component/reuseable/baseLinearRating/BaseLinearRating";
import { useGetPropertyCountQuery } from "@/queries/useGetPropertyCountQuery";
import BaseWhatsappButton from "@/component/reuseable/baseWhatsappButton/BaseWhatsappButton";
import PropertyList from "@/component/IAmOwner/propertyList/PropertyList";
import Image from "next/image";

const BrokerInformation = dynamic(
  () => import("@/component/brokers/Information/BrokerInformation"),
  { ssr: false }
);
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
const myLoader = ({ src }) => {
  return `${_imageURL}/${src}`;
};
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

export default function BrokerDetails({
  handleLoginOpen,
  language,
  singleBrokerData,
}) {
  const ratingCount = () => {
    let total = 0;
    singleBrokerData.broker.broker_ratings.forEach((item) => {
      total = total + item.count;
    });
    return total;
  };
  const rating = () => {
    let total = 0;
    singleBrokerData.broker.broker_ratings.forEach((item) => {
      total = total + item.rating;
    });
    return total;
  };
  const totalRating = rating();
  const totalRatingCount = ratingCount();
  const avgRating = (count = 0) => {
    return (count / totalRatingCount) * 100;
  };
  console.log("🟥 ~ BrokerDetails ~ singleBrokerData:", singleBrokerData);
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

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(findNotificationCountData());
  //   dispatch(GetAllNotification());
  //   dispatch(findPropertyCountData());
  // }, [dispatch]);

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
          <BrokerInformation
            t={t}
            query={query}
            handleLoginOpen={handleLoginOpen}
            singleBrokerData={singleBrokerData}
            totalRatingCount={totalRatingCount}
            avgRating={(totalRating / totalRatingCount).toFixed(2)}
          />
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
          <PropertyList
            propertyData={{
              ...singleBrokerData.broker,
              properties: {
                data: singleBrokerData.broker.properties,
              },
              imageSize: { width: 600, height: 400 },
            }}
            handleLoginOpen={handleLoginOpen}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Stack
            direction={{ xs: "column", lg: "row" }}
            alignItems="center"
            justifyContent={"center"}
          >
            <Stack
              direction={"row"}
              alignItems="center"
              justifyContent={"center"}
              spacing={3}
              sx={{ width: "100%" }}
            >
              <Typography
                variant="h1"
                style={{ fontStyle: "italic", fontWeight: "bolder" }}
              >
                {(totalRating / totalRatingCount).toFixed(2)}
              </Typography>
              <StarIcon sx={{ fontSize: 50, color: "#FFAB00" }} />
            </Stack>
            <Stack direction="column" spacing={1} sx={{ width: "100%" }}>
              {singleBrokerData.broker.broker_ratings.map(
                (broker_rating, i) => (
                  <BaseLinearRating
                    key={i}
                    count={broker_rating.rating}
                    percentage={avgRating(broker_rating.count)}
                  />
                )
              )}
            </Stack>
          </Stack>
        </TabPanel>
      </Box>
    </Box>
  );
}
export async function getServerSideProps(context) {
  const { id } = context.query;
  const base_url = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${base_url}/api/broker/details/${id}`);
  const singleBrokerData = await res.json();

  const cookies = context.req.cookies["language"];

  console.log("single", singleBrokerData);
  return {
    props: {
      singleBrokerData: singleBrokerData,
      // propertyDescription: stripHtmlTags(
      //   singleBrokerData?.property?.property_description
      // ),
    },
  };
}
