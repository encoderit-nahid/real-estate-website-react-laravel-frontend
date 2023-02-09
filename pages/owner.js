import Navbar from "../src/component/shared/Navbar/Navbar";
import Footer from "../src/component/shared/Footer/Footer";
import shapeIcon from "../public/Images/eclipseShape.png";
import Head from "next/head";
import {
  Box,
  Grid,
  Typography,
  Container,
  ImageList,
  ImageListItem,
  Divider,
  Button,
} from "@mui/material";
import FulfillDream from "../src/component/home/fullfill/FulfillDream";
import SideContent from "../src/component/home/FullfillSideContent/SideContent";
import SellSideContent from "../src/component/home/wantToSellSideContent/SellSideContent";
import mobileGray from "../public/Images/mobileGray.png";
import mobileBlue from "../public/Images/mobileBlue.png";
import WantSellSvgBackground from "../src/component/svg/WantSellSvgBackground";
import { renderToStaticMarkup } from "react-dom/server";
import WantToSell from "../src/component/home/wantToSell/WantToSell";
import BrokerRegisterContent from "../src/component/home/whoIsBroker/brokerRegister/BrokerRegisterContent";
import BrokerImageContent from "../src/component/home/whoIsBroker/brokerContent/BrokerImageContent";
import BestDealSvgBackground from "../src/component/svg/BestDealSvgBackground";
import HouseCard from "../src/component/reuseable/HouseCard/HouseCard";
import MobileSideContent from "../src/component/home/FullfillSideContent/mobileSideContent";
import BrokerImageContentMobile from "../src/component/home/whoIsBroker/brokerContent/BrokerImageContentMobile";
import BrokerHelp from "../src/component/IAmBroker/BrokerHelp/BrokerHelp";
import BrokerHelpContent from "../src/component/IAmBroker/BrokerHelp/BrokerHelpContent";
import BecomeBrokerContent from "../src/component/IAmBroker/BecomeBroker/BecomeBrokerContent";
import BecomeBroker from "../src/component/IAmBroker/BecomeBroker/BecomeBroker";
import CalulateComission from "../src/component/IAmBroker/MaxmizeResult/CalulateComission";
import ComissionResult from "../src/component/IAmBroker/MaxmizeResult/ComissionResult";
import BrokerFacilities from "../src/component/IAmBroker/BrokerFacilities/BrokerFacilities";
import advertiseImage from "../public/Images/advertise.png";
import wantImageMobile from "../public/Images/mobileWant.png";
import trackImage from "../public/Images/track.png";
import digitalImage from "../public/Images/digital.png";
import fastImage from "../public/Images/fast.png";
import PropertyList from "../src/component/IAmOwner/propertyList/PropertyList";
import dynamic from "next/dynamic";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import SearchComponent from "../src/component/reuseable/SearchComponent/SearchComponent";

import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const BaseGoogleMap = dynamic(
  () => import("../src/component/IAmOwner/map/BaseGoogleMap"),
  {
    ssr: false,
  }
);

const advertiseData = [
  {
    name: "Practicality",
    info: "Advertise your property and find out about everything that happens through the application.",
  },
  {
    name: "100% digital",
    info: "100% digital buying and selling process (scheduling visits, proposals, contracts, certificates, public deed)",
  },
  {
    name: "Documentation and digital signature",
    info: "Contract, registrations, certificates, consultations (SERASA, SPC - seller) with a click. Elaboration and signature of the deed digitally (without having to go to the notary).",
  },
  {
    name: "Fast selling process",
    info: "Receive the down payment right after the analysis of the documents. Fastest sales process on the market.",
  },
];

const PracticalData = [
  {
    name: "track everything online",
    info: "Announcements, schedules of visits and proposals all in the palm of your hands",
    imageSrc: trackImage,
  },
  {
    name: "100% digital processes",
    info: "Signing of contracts, issuance of certificates, documents and even public deed of purchase and sale, all digitally, without leaving home",
    imageSrc: digitalImage,
  },
  {
    name: "Fast sale!",
    info: "Fastest sales process on the market",
    imageSrc: fastImage,
  },
];

export default function Advertise(props) {
  const svgString = encodeURIComponent(
    renderToStaticMarkup(<WantSellSvgBackground />)
  );
  return (
    <div>
      <Head>
        <title>Real Estate App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="section">
        <Navbar shape={false} paddingY={"1vh"} />
        <Grid
          container
          spacing={2}
          sx={{ px: 3, pb: 2, background: "#F9F9FB" }}
        >
          <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
            <SearchComponent marginY="6vh" />
            <Divider
              sx={{
                background: "#F9F9FB",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            />
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              sx={{ marginY: 2 }}
            >
              <Typography
                variant="p"
                sx={{ fontSize: "24px", fontWeight: "600", color: "#1A1859" }}
              >
                Property for sale in Sao Paulo, SP
              </Typography>
              <Typography
                variant="p"
                sx={{ fontSize: "16px", fontWeight: "400", color: "#4B4B66" }}
              >
                1,431 properties found
              </Typography>
            </Grid>
            <Box sx={{ borderBottom: "1px dashed #D3D3DF" }}></Box>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ marginTop: 2 }}
            >
              <Button
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  textTransform: "none",
                  lineHeight: "17px",
                  background: "#0E97F7",
                  boxShadow: "0px 4px 24px rgba(26, 85, 181, 0.3)",
                  borderRadius: "4px",
                  color: "#ffffff",
                  display: "flex",
                }}
              >
                <FilterAltOutlinedIcon />
                <Typography variant="p">filter</Typography>
              </Button>

              <Autocomplete
                disablePortal
                sx={{
                  width: {
                    xs: "50%",
                    sm: "50%",
                    md: "50%",
                    lg: "25%",
                    xl: "20%",
                  },
                }}
                size="small"
                id="combo-box-demo"
                options={top100Films}
                renderInput={(params) => (
                  <TextField {...params} label="Most Relevant" />
                )}
              />
            </Grid>
            <PropertyList />
            <Stack spacing={2} sx={{ marginY: 8 }}>
              <Pagination count={5} variant="outlined" shape="rounded" />
            </Stack>
          </Grid>
          <Grid
            item
            className="base-map"
            xl={4}
            lg={4}
            sx={{
              display: {
                xs: "none",
                sm: "none",
                md: "none",
                lg: "inline",
                xl: "inline",
              },
            }}
          >
            <BaseGoogleMap />
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
];
