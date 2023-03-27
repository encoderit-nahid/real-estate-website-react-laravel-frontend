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
  SwipeableDrawer,
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
import Router, { useRouter } from 'next/router'
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import BaseOutlinedCurrencyInput from "../src/component/reuseable/baseOutlinedCurrencyInput/BaseOutlinedCurrencyInput";

const BaseGoogleMap = dynamic(
  () => import("../src/component/IAmOwner/map/BaseGoogleMap"),
  {
    ssr: false,
  }
);

import Slider from "@mui/material/Slider";

function valuetext(value) {
  return `${value}°C`;
}

const PropertyType = [
  {
    name: "Apartment",
  },
  {
    name: "Condominium house",
  },
  {
    name: "Home",
  },
  {
    name: "Kitnet/Studio",
  },
];

const CondominiumType = [
  {
    name: "Academy",
  },
  {
    name: "Playground",
  },
  {
    name: "Grren Area",
  },
  {
    name: "24h concierge",
  },
  {
    name: "Toy library",
  },
  {
    name: "Sports court",
  },
  {
    name: "Grill",
  },
  {
    name: "Party room",
  },
];

export default function SearchRealEstate({
  loginOpen,
  setLoginOpen,
  handleLoginOpen,
  handleLoginClose,
}) {

  const router = useRouter()
  const [pageSize, setPageSize] = React.useState(3);
  const [page, setPage] = React.useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
    router.replace({
      pathname: '/search_real_estate',
      query: {...router.query, page: value },
  })
    // setData(datas.slice(firstIndex + pageSize * (value - 1), pageSize * value));
  };

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 450 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 2, px: 2 }}
      >
        <Typography
          variant="p"
          sx={{
            color: "#1A1859",
            fontSize: "24px",
            lineHeight: "32px",
            fontWeight: "700",
          }}
        >
          Filters
        </Typography>
        <CloseIcon onClick={toggleDrawer(anchor, false)} />
      </Grid>
      {/* <Box
        sx={{
          background: "#ffffff",
          boxShadow: "0px 4px 8px rgba(0, 33, 82, 0.08)",
          border: "1px solid #DBE1E5",
          borderRadius: { xs: 0, sm: 0, md: 0, lg: "8px", xl: "8px" },
          mt: 2,
          mx: 2,
        }}
      ></Box> */}
      <Box sx={{ mx: 2, mt: 3 }}>
        <Box>
          <Typography
            variant="p"
            sx={{
              color: "#4B4B66",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "19px",
            }}
          >
            Property Type
          </Typography>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            gap={1}
            sx={{ mt: 2 }}
          >
            {PropertyType.map((data, index) => (
              // <Grid xs={6} sm={6} md={6} lg={3} xl={3} key={index}>
              <Button
                key={index}
                sx={{
                  background: `${index === 0 ? "#7450F0" : "transparent"}`,
                  borderRadius: "56px",
                  // width: "100%",
                  color: `${index === 0 ? "#ffffff" : "#32414C"}`,
                  border: `${index === 0 ? "" : "1px solid #9FAAB1"}`,
                  fontSize: {
                    xs: "12px",
                    sm: "13px",
                    md: "14px",
                    lg: "13px",
                    xl: "14px",
                  },
                  fontWeight: "400",
                  lineHeight: "17px",
                  textTransform: "none",
                  px: { xs: 0, sm: 1, md: 1, lg: 1, xl: 1 },
                  py: 1,
                  "&:hover": {
                    background: "#7450F0",
                    borderRadius: "56px",
                    color: "#ffffff",
                  },
                }}
              >
                {data.name}
              </Button>
              // </Grid>
            ))}
          </Grid>
        </Box>
        <Divider sx={{ mt: 1, mb: 1 }} />
        <Box>
          <Typography
            variant="p"
            sx={{
              color: "#4B4B66",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "19px",
            }}
          >
            Value
          </Typography>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <BaseOutlinedCurrencyInput
                size={"medium"}
                placeholder={"Minimum"}
                label={"Minimum"}
                borderColor={"#7450F0"}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <BaseOutlinedCurrencyInput
                size={"medium"}
                placeholder={"Maximum"}
                label={"Maximum"}
                borderColor={"#7450F0"}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 1 }}>
            <Slider
              getAriaLabel={() => "Temperature range"}
              value={value}
              size="small"
              max={1000}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              sx={{ color: "#7450F0" }}
            />
          </Box>
        </Box>
        <Divider sx={{ mt: 1, mb: 1 }} />
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
              <Typography
                variant="p"
                sx={{
                  color: "#4B4B66",
                  fontSize: "16px",
                  fontWeight: "400",
                  lineHeight: "19px",
                }}
              >
                Bedrooms
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
              {[0, 1, 2, 3].map((data, index) => (
                // <Grid xs={6} sm={6} md={6} lg={3} xl={3} key={index}>
                <Button
                  key={index}
                  sx={{
                    background: `${index === 0 ? "#7450F0" : "transparent"}`,
                    borderRadius: "56px",
                    // width: "100%",
                    color: `${index === 0 ? "#ffffff" : "#32414C"}`,
                    border: `${index === 0 ? "" : "1px solid #9FAAB1"}`,
                    ml: 0.5,
                    fontSize: {
                      xs: "12px",
                      sm: "13px",
                      md: "14px",
                      lg: "13px",
                      xl: "14px",
                    },
                    fontWeight: "400",
                    lineHeight: "17px",
                    textTransform: "none",
                    px: { xs: 0, sm: 1, md: 1, lg: 1, xl: 1 },
                    py: 1,
                    "&:hover": {
                      background: "#7450F0",
                      borderRadius: "56px",
                      color: "#ffffff",
                    },
                  }}
                >
                  {`${index + 1}+`}
                </Button>
                // </Grid>
              ))}
            </Grid>
          </Grid>
        </Box>
        <Divider sx={{ mt: 1, mb: 1 }} />
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
              <Typography
                variant="p"
                sx={{
                  color: "#4B4B66",
                  fontSize: "16px",
                  fontWeight: "400",
                  lineHeight: "19px",
                }}
              >
                Bathrooms
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
              {[0, 1, 2, 3].map((data, index) => (
                // <Grid xs={6} sm={6} md={6} lg={3} xl={3} key={index}>
                <Button
                  key={index}
                  sx={{
                    background: `${index === 0 ? "#7450F0" : "transparent"}`,
                    borderRadius: "56px",
                    // width: "100%",
                    color: `${index === 0 ? "#ffffff" : "#32414C"}`,
                    border: `${index === 0 ? "" : "1px solid #9FAAB1"}`,
                    ml: 0.5,
                    fontSize: {
                      xs: "12px",
                      sm: "13px",
                      md: "14px",
                      lg: "13px",
                      xl: "14px",
                    },
                    fontWeight: "400",
                    lineHeight: "17px",
                    textTransform: "none",
                    px: { xs: 0, sm: 1, md: 1, lg: 1, xl: 1 },
                    py: 1,
                    "&:hover": {
                      background: "#7450F0",
                      borderRadius: "56px",
                      color: "#ffffff",
                    },
                  }}
                >
                  {`${index + 1}+`}
                </Button>
                // </Grid>
              ))}
            </Grid>
          </Grid>
        </Box>
        <Divider sx={{ mt: 1, mb: 1 }} />
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
              <Typography
                variant="p"
                sx={{
                  color: "#4B4B66",
                  fontSize: "16px",
                  fontWeight: "400",
                  lineHeight: "19px",
                }}
              >
                Furnished
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
              {["Yes", "No", "Whatever"].map((data, index) => (
                // <Grid xs={6} sm={6} md={6} lg={3} xl={3} key={index}>
                <Button
                  key={index}
                  sx={{
                    background: `${index === 0 ? "#7450F0" : "transparent"}`,
                    borderRadius: "56px",
                    // width: "100%",
                    color: `${index === 0 ? "#ffffff" : "#32414C"}`,
                    border: `${index === 0 ? "" : "1px solid #9FAAB1"}`,
                    ml: 0.5,
                    fontSize: {
                      xs: "12px",
                      sm: "13px",
                      md: "14px",
                      lg: "13px",
                      xl: "14px",
                    },
                    fontWeight: "400",
                    lineHeight: "17px",
                    textTransform: "none",
                    px: { xs: 0, sm: 1, md: 1, lg: 1, xl: 1 },
                    py: 1,
                    "&:hover": {
                      background: "#7450F0",
                      borderRadius: "56px",
                      color: "#ffffff",
                    },
                  }}
                >
                  {data}
                </Button>
                // </Grid>
              ))}
            </Grid>
          </Grid>
        </Box>
        <Divider sx={{ mt: 1, mb: 1 }} />
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
              <Typography
                variant="p"
                sx={{
                  color: "#4B4B66",
                  fontSize: "16px",
                  fontWeight: "400",
                  lineHeight: "19px",
                }}
              >
                Do you accept pets?
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
              {["Yes", "No", "Whatever"].map((data, index) => (
                // <Grid xs={6} sm={6} md={6} lg={3} xl={3} key={index}>
                <Button
                  key={index}
                  sx={{
                    background: `${index === 0 ? "#7450F0" : "transparent"}`,
                    borderRadius: "56px",
                    // width: "100%",
                    color: `${index === 0 ? "#ffffff" : "#32414C"}`,
                    border: `${index === 0 ? "" : "1px solid #9FAAB1"}`,
                    ml: 0.5,
                    fontSize: {
                      xs: "12px",
                      sm: "13px",
                      md: "14px",
                      lg: "13px",
                      xl: "14px",
                    },
                    fontWeight: "400",
                    lineHeight: "17px",
                    textTransform: "none",
                    px: { xs: 0, sm: 1, md: 1, lg: 1, xl: 1 },
                    py: 1,
                    "&:hover": {
                      background: "#7450F0",
                      borderRadius: "56px",
                      color: "#ffffff",
                    },
                  }}
                >
                  {data}
                </Button>
                // </Grid>
              ))}
            </Grid>
          </Grid>
        </Box>
        <Divider sx={{ mt: 1, mb: 1 }} />
        <Box>
          <Typography
            variant="p"
            sx={{
              color: "#4B4B66",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "19px",
            }}
          >
            Area (m²)
          </Typography>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <BaseOutlinedCurrencyInput
                size={"medium"}
                placeholder={"Minimum"}
                label={"Minimum"}
                borderColor={"#7450F0"}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <BaseOutlinedCurrencyInput
                size={"medium"}
                placeholder={"Maximum"}
                label={"Maximum"}
                borderColor={"#7450F0"}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 1 }}>
            <Slider
              getAriaLabel={() => "Temperature range"}
              value={value}
              size="small"
              max={1000}
              sx={{ color: "#7450F0" }}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
            />
          </Box>
        </Box>
        <Divider sx={{ mt: 1, mb: 1 }} />
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
              <Typography
                variant="p"
                sx={{
                  color: "#4B4B66",
                  fontSize: "16px",
                  fontWeight: "400",
                  lineHeight: "19px",
                }}
              >
                Close to the metro?
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
              {["Yes", "No", "Whatever"].map((data, index) => (
                // <Grid xs={6} sm={6} md={6} lg={3} xl={3} key={index}>
                <Button
                  key={index}
                  sx={{
                    background: `${index === 0 ? "#7450F0" : "transparent"}`,
                    borderRadius: "56px",
                    // width: "100%",
                    color: `${index === 0 ? "#ffffff" : "#32414C"}`,
                    border: `${index === 0 ? "" : "1px solid #9FAAB1"}`,
                    ml: 0.5,
                    fontSize: {
                      xs: "12px",
                      sm: "13px",
                      md: "14px",
                      lg: "13px",
                      xl: "14px",
                    },
                    fontWeight: "400",
                    lineHeight: "17px",
                    textTransform: "none",
                    px: { xs: 0, sm: 1, md: 1, lg: 1, xl: 1 },
                    py: 1,
                    "&:hover": {
                      background: "#7450F0",
                      borderRadius: "56px",
                      color: "#ffffff",
                    },
                  }}
                >
                  {data}
                </Button>
                // </Grid>
              ))}
            </Grid>
          </Grid>
        </Box>
        <Divider sx={{ mt: 1, mb: 1 }} />
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
              <Typography
                variant="p"
                sx={{
                  color: "#4B4B66",
                  fontSize: "16px",
                  fontWeight: "400",
                  lineHeight: "19px",
                }}
              >
                Availability
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
              {["Immediate", "Shortly", "Whatever"].map((data, index) => (
                // <Grid xs={6} sm={6} md={6} lg={3} xl={3} key={index}>
                <Button
                  key={index}
                  sx={{
                    background: `${index === 0 ? "#7450F0" : "transparent"}`,
                    borderRadius: "56px",
                    // width: "100%",
                    color: `${index === 0 ? "#ffffff" : "#32414C"}`,
                    border: `${index === 0 ? "" : "1px solid #9FAAB1"}`,
                    ml: 0.5,
                    fontSize: {
                      xs: "12px",
                      sm: "13px",
                      md: "14px",
                      lg: "13px",
                      xl: "14px",
                    },
                    fontWeight: "400",
                    lineHeight: "17px",
                    textTransform: "none",
                    px: { xs: 0, sm: 1, md: 1, lg: 1, xl: 1 },
                    py: 1,
                    "&:hover": {
                      background: "#7450F0",
                      borderRadius: "56px",
                      color: "#ffffff",
                    },
                  }}
                >
                  {data}
                </Button>
                // </Grid>
              ))}
            </Grid>
          </Grid>
        </Box>
        <Divider sx={{ mt: 1, mb: 1 }} />
        <Box>
          <Typography
            variant="p"
            sx={{
              color: "#4B4B66",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "19px",
            }}
          >
            Condominium
          </Typography>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            gap={1}
            sx={{ mt: 2 }}
          >
            {CondominiumType.map((data, index) => (
              // <Grid xs={6} sm={6} md={6} lg={3} xl={3} key={index}>
              <Button
                key={index}
                sx={{
                  background: `${index === 0 ? "#7450F0" : "transparent"}`,
                  borderRadius: "56px",
                  // width: "100%",
                  color: `${index === 0 ? "#ffffff" : "#32414C"}`,
                  border: `${index === 0 ? "" : "1px solid #9FAAB1"}`,
                  fontSize: {
                    xs: "12px",
                    sm: "13px",
                    md: "14px",
                    lg: "13px",
                    xl: "14px",
                  },
                  fontWeight: "400",
                  lineHeight: "17px",
                  textTransform: "none",
                  px: { xs: 0, sm: 1, md: 1, lg: 1, xl: 1 },
                  py: 1,
                  "&:hover": {
                    background: "#7450F0",
                    borderRadius: "56px",
                    color: "#ffffff",
                  },
                }}
              >
                {data.name}
              </Button>
              // </Grid>
            ))}
          </Grid>
        </Box>
        <Divider sx={{ mt: 1, mb: 1 }} />
        <Box>
          <Typography
            variant="p"
            sx={{
              color: "#4B4B66",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "19px",
            }}
          >
            Amenities
          </Typography>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            gap={1}
            sx={{ mt: 2 }}
          >
            {CondominiumType.map((data, index) => (
              // <Grid xs={6} sm={6} md={6} lg={3} xl={3} key={index}>
              <Button
                key={index}
                sx={{
                  background: `${index === 0 ? "#7450F0" : "transparent"}`,
                  borderRadius: "56px",
                  // width: "100%",
                  color: `${index === 0 ? "#ffffff" : "#32414C"}`,
                  border: `${index === 0 ? "" : "1px solid #9FAAB1"}`,
                  fontSize: {
                    xs: "12px",
                    sm: "13px",
                    md: "14px",
                    lg: "13px",
                    xl: "14px",
                  },
                  fontWeight: "400",
                  lineHeight: "17px",
                  textTransform: "none",
                  px: { xs: 0, sm: 1, md: 1, lg: 1, xl: 1 },
                  py: 1,
                  "&:hover": {
                    background: "#7450F0",
                    borderRadius: "56px",
                    color: "#ffffff",
                  },
                }}
              >
                {data.name}
              </Button>
              // </Grid>
            ))}
          </Grid>
        </Box>
        <Divider sx={{ mt: 1, mb: 1 }} />
        <Box>
          <Typography
            variant="p"
            sx={{
              color: "#4B4B66",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "19px",
            }}
          >
            Well-being
          </Typography>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            gap={1}
            sx={{ mt: 2 }}
          >
            {CondominiumType.map((data, index) => (
              // <Grid xs={6} sm={6} md={6} lg={3} xl={3} key={index}>
              <Button
                key={index}
                sx={{
                  background: `${index === 0 ? "#7450F0" : "transparent"}`,
                  borderRadius: "56px",
                  // width: "100%",
                  color: `${index === 0 ? "#ffffff" : "#32414C"}`,
                  border: `${index === 0 ? "" : "1px solid #9FAAB1"}`,
                  fontSize: {
                    xs: "12px",
                    sm: "13px",
                    md: "14px",
                    lg: "13px",
                    xl: "14px",
                  },
                  fontWeight: "400",
                  lineHeight: "17px",
                  textTransform: "none",
                  px: { xs: 0, sm: 1, md: 1, lg: 1, xl: 1 },
                  py: 1,
                  "&:hover": {
                    background: "#7450F0",
                    borderRadius: "56px",
                    color: "#ffffff",
                  },
                }}
              >
                {data.name}
              </Button>
              // </Grid>
            ))}
          </Grid>
        </Box>
        <Divider sx={{ mt: 1, mb: 1 }} />
        <Box>
          <Typography
            variant="p"
            sx={{
              color: "#4B4B66",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "19px",
            }}
          >
            Home appliances
          </Typography>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            gap={1}
            sx={{ mt: 2 }}
          >
            {CondominiumType.map((data, index) => (
              // <Grid xs={6} sm={6} md={6} lg={3} xl={3} key={index}>
              <Button
                key={index}
                sx={{
                  background: `${index === 0 ? "#7450F0" : "transparent"}`,
                  borderRadius: "56px",
                  // width: "100%",
                  color: `${index === 0 ? "#ffffff" : "#32414C"}`,
                  border: `${index === 0 ? "" : "1px solid #9FAAB1"}`,
                  fontSize: {
                    xs: "12px",
                    sm: "13px",
                    md: "14px",
                    lg: "13px",
                    xl: "14px",
                  },
                  fontWeight: "400",
                  lineHeight: "17px",
                  textTransform: "none",
                  px: { xs: 0, sm: 1, md: 1, lg: 1, xl: 1 },
                  py: 1,
                  "&:hover": {
                    background: "#7450F0",
                    borderRadius: "56px",
                    color: "#ffffff",
                  },
                }}
              >
                {data.name}
              </Button>
              // </Grid>
            ))}
          </Grid>
        </Box>
        <Divider sx={{ mt: 1, mb: 1 }} />
        <Box>
          <Typography
            variant="p"
            sx={{
              color: "#4B4B66",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "19px",
            }}
          >
            Rooms
          </Typography>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            gap={1}
            sx={{ mt: 2 }}
          >
            {CondominiumType.map((data, index) => (
              // <Grid xs={6} sm={6} md={6} lg={3} xl={3} key={index}>
              <Button
                key={index}
                sx={{
                  background: `${index === 0 ? "#7450F0" : "transparent"}`,
                  borderRadius: "56px",
                  // width: "100%",
                  color: `${index === 0 ? "#ffffff" : "#32414C"}`,
                  border: `${index === 0 ? "" : "1px solid #9FAAB1"}`,
                  fontSize: {
                    xs: "12px",
                    sm: "13px",
                    md: "14px",
                    lg: "13px",
                    xl: "14px",
                  },
                  fontWeight: "400",
                  lineHeight: "17px",
                  textTransform: "none",
                  px: { xs: 0, sm: 1, md: 1, lg: 1, xl: 1 },
                  py: 1,
                  "&:hover": {
                    background: "#7450F0",
                    borderRadius: "56px",
                    color: "#ffffff",
                  },
                }}
              >
                {data.name}
              </Button>
              // </Grid>
            ))}
          </Grid>
        </Box>
        <Divider sx={{ mt: 1, mb: 1 }} />
        <Box>
          <Typography
            variant="p"
            sx={{
              color: "#4B4B66",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "19px",
            }}
          >
            Accessibility
          </Typography>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            gap={1}
            sx={{ mt: 2 }}
          >
            {CondominiumType.map((data, index) => (
              // <Grid xs={6} sm={6} md={6} lg={3} xl={3} key={index}>
              <Button
                key={index}
                sx={{
                  background: `${index === 0 ? "#7450F0" : "transparent"}`,
                  borderRadius: "56px",
                  // width: "100%",
                  color: `${index === 0 ? "#ffffff" : "#32414C"}`,
                  border: `${index === 0 ? "" : "1px solid #9FAAB1"}`,
                  fontSize: {
                    xs: "12px",
                    sm: "13px",
                    md: "14px",
                    lg: "13px",
                    xl: "14px",
                  },
                  fontWeight: "400",
                  lineHeight: "17px",
                  textTransform: "none",
                  px: { xs: 0, sm: 1, md: 1, lg: 1, xl: 1 },
                  py: 1,
                  "&:hover": {
                    background: "#7450F0",
                    borderRadius: "56px",
                    color: "#ffffff",
                  },
                }}
              >
                {data.name}
              </Button>
              // </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Divider sx={{ mt: 2, mb: 1 }} />
      <Box
        sx={{
          // mx: 2,
          // my: 2,

          position: "sticky",
          bottom: 0,
          width: "100%",
          background: "#ffffff",
          px: 2,
          py: 2,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Button
              onClick={toggleDrawer(anchor, false)}
              fullWidth
              variant="outlined"
              sx={{
                borderColor: "#002152",
                borderRadius: "4px",
                color: "#002152",
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "22px",
                textTransform: "none",
                "&:hover": {
                  borderColor: "#002152",
                  borderRadius: "4px",
                  color: "#002152",
                },
              }}
            >
              Cancel filter
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                background: " #7450F0",
                borderRadius: "4px",
                color: "#ffffff",
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "22px",
                textTransform: "none",
                "&:hover": {
                  background: " #7450F0",
                  borderRadius: "4px",
                  color: "#ffffff",
                },
              }}
            >
              Apply filter
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );

  return (
    <div>
      <Head>
        <title>Lokkan</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/negotiate.png" />
      </Head>

      <main className="section">
        <Navbar
          shape={false}
          paddingY={"1vh"}
          loginOpen={loginOpen}
          setLoginOpen={setLoginOpen}
          handleLoginClose={handleLoginClose}
          handleLoginOpen={handleLoginOpen}
        />
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
                onClick={toggleDrawer("left", true)}
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
                  "&:hover": {
                    fontSize: "14px",
                    fontWeight: 600,
                    background: "#0E97F7",
                  },
                }}
              >
                <FilterAltOutlinedIcon />
                <Typography variant="p">filter</Typography>
              </Button>
              <SwipeableDrawer
                anchor={"left"}
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
                onOpen={toggleDrawer("left", true)}
              >
                {list("left")}
              </SwipeableDrawer>

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
              <Pagination count={5} page={page} onChange={handlePageChange} variant="outlined" shape="rounded" />
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
            <BaseGoogleMap height={"245vh"} />
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

export async function getServerSideProps(context) {
  const location = context?.query?.location 
  const value = context?.query?.value
  const page = context?.query?.page
  // Default value = "1"
  
  console.log("Location is: ", location);
  console.log("value is: ", value);
  console.log("page is: ", page)

  return {
    props: {
      data : "saad"
    }
  }
}