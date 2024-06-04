import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { _baseURL, _imageURL } from "../../consts";
import { userDetailsApi } from "@/api";
import en from "locales/en";
import pt from "locales/pt";
import StarIcon from "@mui/icons-material/Star";
import BaseLinearRating from "@/component/reuseable/baseLinearRating/BaseLinearRating";
import PropertyList from "@/component/IAmOwner/propertyList/PropertyList";
import BaseButton from "@/component/reuseable/button/BaseButton";
import { useSession } from "next-auth/react";
import Head from "next/head";

const BrokerInformation = dynamic(
  () => import("@/component/brokers/Information/BrokerInformation"),
  { ssr: false }
);
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
  const { params } = query;
  const [id] = params || [];

  const [value, setValue] = useState(0);

  const { data: session } = useSession();

  useEffect(() => {
    userDetailsApi();
  }, []);

  const [myValue, setMyValue] = useState(language || "pt");
  const t = myValue === "en" ? en : pt;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Head>
        <title>{`${singleBrokerData.broker.name} - Lokkan`}</title>
        <meta name="description" content={`I am a broker`} />
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:url"
          content={`https://www.lokkan.site/broker-details-view/${id}`}
        />
        <meta property="og:title" content={`${singleBrokerData.broker.name}`} />
        <meta property="og:description" content={`I am a broker`} />
        <meta
          property="og:image"
          content={`${_imageURL}/${singleBrokerData.broker?.attachments[0]?.file_path}`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <main className="section">
        <Box
          sx={{
            flexGrow: 1,
            background: "#F2F5F6",
            minHeight: "100vh",
            // paddingTop: { xs: 6, sm: 6, md: 6, lg: 3, xl: 3 },
          }}
        >
          <Box
            sx={{
              paddingLeft: { xs: 4, sm: 4, md: 6, lg: 6, xl: 6 },
              paddingRight: { xs: 2, sm: 2, md: 4, lg: 4, xl: 4 },
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
              <BaseButton
                custom_sx={{
                  background: "#ffffff",
                  px: 2,
                  py: 1,
                  color: "#4B4B66",
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "22px",
                  textTransform: "none",
                }}
                name={t["Come back"]}
                handleFunction={() =>
                  session ? router.replace("/brokers") : router.replace("/")
                }
              />
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
      </main>
    </div>
  );
}
export async function getServerSideProps(context) {
  const { params } = context.query;
  const [id] = params || [];
  const base_url = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${base_url}/api/broker/details/${id}`);
  const singleBrokerData = await res.json();

  const cookies = context.req.cookies["language"];

  console.log("single", singleBrokerData);
  return {
    props: {
      singleBrokerData: singleBrokerData,
    },
  };
}
