import Head from "next/head";
import Image from "next/image";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ResponsiveDrawer from "../../../src/component/sharedProposal/ResponsiveDrawer/ResponsiveDrawer";
import {
  Button,
  Container,
  Divider,
  Grid,
  InputBase,
  Paper,
  Slider,
  SwipeableDrawer,
} from "@mui/material";
import { useState } from "react";
import Releases from "../../../src/component/properties/Releases/Releases";
import ThirdTab from "../../../src/component/properties/Third/ThirdTab";
import NewRegistration from "../../../src/component/properties/NewRegistration/NewRegistration";
import notifyImage from "../../../public/Images/notify.png";
import BasicBreadcrumbs from "../../../src/component/reuseable/baseBreadCrumb/BaseBreadCrumb";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import Link from "next/link";
import searchIcon from "../../../public/Images/SearchBlack.png";
import RentCard from "../../../src/component/reuseable/rentCard/RentCard";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import BaseOutlinedCurrencyInput from "../../../src/component/reuseable/baseOutlinedCurrencyInput/BaseOutlinedCurrencyInput";
import CloseIcon from "@mui/icons-material/Close";
import { getSession } from "next-auth/react";

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

const drawerWidth = 240;

const BreadCrumbsData = [
  { stage: "Start", route: "" },
  { stage: "My properties", route: "" },
];

const style = {
  ml: { xs: 4, sm: 4, md: 0, lg: 0, xl: 0 },
  mt: { xs: 1, sm: 1, md: 0, lg: 0, xl: 0 },
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

export default function ViewProperties(props) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [slidervalue, setSliderValue] = useState([15, 300]);

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  const [sliderAreaValue, setSliderAreaValue] = useState([15, 300]);

  const handleSliderAreaChange = (event, newValue) => {
    setSliderAreaValue(newValue);
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
              value={slidervalue}
              size="small"
              max={1000}
              onChange={handleSliderChange}
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
              value={sliderAreaValue}
              size="small"
              max={1000}
              sx={{ color: "#7450F0" }}
              onChange={handleSliderAreaChange}
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

      <main>
        <Box sx={{ display: "flex" }}>
          <ResponsiveDrawer />
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
              <BasicBreadcrumbs
                BreadcrumbsData={BreadCrumbsData}
                lastStageData={"aston"}
                style={style}
              />
              <Image src={notifyImage} alt="notify" />
            </Grid>

            <Grid
              container
              spacing={1}
              //   direction="row"
              //   justifyContent="space-between"
              //   alignItems="flex-start"
              sx={{ mt: 1 }}
            >
              <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>
                <Link href="/my_properties">
                  <a
                    style={{
                      textDecoration: "none",
                      listStyle: "none",
                      width: "100%",
                    }}
                  >
                    <Button sx={{ textTransform: "none" }}>
                      <ArrowBackIosNewOutlinedIcon sx={{ color: "#7450F0" }} />
                      <Typography
                        variant="p"
                        sx={{
                          color: "#7450F0",
                          fontSize: "14px",
                          fontWeight: "600",
                          lineHeight: "17px",
                        }}
                      >
                        come back
                      </Typography>
                    </Button>
                  </a>
                </Link>
              </Grid>
              <Grid item xs={0} sm={0} md={0} lg={0} xl={2}></Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={4}
                xl={4}
                sx={{ mx: { xs: 2, sm: 2, md: 0 } }}
              >
                <Paper
                  component="form"
                  sx={{
                    // p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    // border: "1px solid red",
                    boxShadow: "none",
                    border: "1px solid #D3D3DF",
                    borderRadius: "4px",

                    width: {
                      xs: "100%",
                      sm: "100%",
                      md: "100%",
                      xl: "100%",
                      lg: "100%",
                    },
                  }}
                >
                  <Grid sx={{ paddingRight: 2, width: "100%" }}>
                    {/* <IconButton sx={{ p: "10px" }} aria-label="menu">
          <MenuIcon />
        </IconButton> */}
                    <InputBase
                      fullWidth
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="search.."
                      inputProps={{
                        "aria-label": "search google maps",
                        style: {
                          color: "#9F9FA9",
                          fontSize: "20px",
                        },
                      }}
                    />
                  </Grid>
                  <Box
                    sx={{
                      padding: "1vh",
                    }}
                  >
                    <Image src={searchIcon} alt="search" />
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>
                <Button
                  onClick={toggleDrawer("left", true)}
                  fullWidth
                  variant="outlined"
                  sx={{
                    borderColor: "#002152",
                    borderRadius: "4px",
                    color: "#002152",
                    fontSize: "16px",
                    fontWeight: "600",

                    textTransform: "none",
                    "&:hover": {
                      borderColor: "#002152",
                      borderRadius: "4px",
                      color: "#002152",
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
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={2}
                xl={2}
                sx={{ mx: { xs: 2, sm: 2, md: 0 } }}
              >
                <Button
                  sx={{
                    textTransform: "none",
                    background: "#0362F0",
                    borderRadius: "4px",
                    color: "#ffffff",
                    fontSize: "16px",
                    fontWeight: "600",

                    width: {
                      xs: "100%",
                      sm: "100%",
                      md: "100%",
                      lg: "100%",
                      xl: "100%",
                    },
                  }}
                >
                  New property
                </Button>
              </Grid>
            </Grid>
            <Box sx={{ mt: 4, mx: { xs: 2, sm: 2, md: 0 } }}>
              <Grid container spacing={4}>
                {[0, 1, 2].map((data, index) => (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={6}
                    xl={6}
                    xxl={6}
                  >
                    <RentCard />
                  </Grid>
                ))}
              </Grid>
            </Box>
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

  return {
    props: {
      session: session,
    },
  };
}
