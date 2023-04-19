import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Image from "next/image";
import home from "../../../../public/Images/Rectangle 1814.svg";
import photos from "../../../../public/Images/photos.svg";
import AutoAwesomeMotionOutlinedIcon from "@mui/icons-material/AutoAwesomeMotionOutlined";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import CabinOutlinedIcon from "@mui/icons-material/CabinOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import SignpostOutlinedIcon from "@mui/icons-material/SignpostOutlined";
import ReactPannellum, { getConfig } from "react-pannellum";
import BaseGoogleMap from "../../IAmOwner/map/BaseGoogleMap";
import { Grid } from "@mui/material";
import { _baseURL } from "../../../../consts";
import BaseStreetView from "../../reuseable/baseStreetView/BaseStreetView";
import { useEffect } from "react";
import { useState } from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography component={"span"} variant={"body2"}>
            {children}
          </Typography>
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function SliderView({
  sideTabValue,
  setSideTabValue,
  selectImage,
  addressData,
}) {
  const [value, setValue] = React.useState(0);

  //   function get_url_extension( selectImage ) {
  //     return selectImage.split(/[#?]/)[0].split('.').pop().trim();
  // }

  const handleChange = (event, newValue) => {
    setValue(+newValue);
  };

  const markersData = {
    properties: {
      data: [
        {
          id: 1,
          address: {
            latitude: +addressData?.latitude,
            longitude: addressData?.longitude,
          },
        },
      ],
    },
  };

  console.log({ markersData });

  const config = {
    autoLoad: true,
  };
  const style = {
    width: "850px",
    height: "450px",
    // background: "#000000",
  };

  const handleTabClick = (data) => {
    console.log(data);
    setSideTabValue(data);
  };

  const myLoader = ({ src }) => {
    return `${_baseURL}/storage/${src}`;
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        // height: 224,
      }}
    >
      <Tabs
        className="slider-tab"
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ width: { md: "35%", lg: "25%", xl: "20%", xxl: "15%" } }}
        // sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab
          label="Photos"
          sx={{
            fontSize: "14px",
            color: "#4B4B66",
            fontWeight: "400",
            px: 3,
            py: 2,
            textTransform: "none",
            width: `${value === 2 ? "20vh" : "20vh"}`,
            boxShadow: `${
              value === 0 ? "0px 4px 24px rgba(69, 38, 177, 0.13)" : ""
            }`,
            borderLeft: `${value === 0 ? "2px solid #0E97F7" : ""}`,
            clipPath: `${
              value === 0
                ? "polygon(0% 0%, 90% 0, 100% 50%, 91% 100%, 0% 100%)"
                : ""
            }`,
            borderRight: `${value === 0 ? "2px solid #F9F9FB" : ""}`,
            borderBottom: `${value === 0 ? "2px solid #F9F9FB" : ""}`,
            borderTop: `${value === 0 ? "2px solid #F9F9FB" : ""}`,
          }}
          icon={
            <AutoAwesomeMotionOutlinedIcon
              sx={{ color: `${value === 0 ? "#0E97F7" : ""}` }}
            />
          }
          // icon={<Image src={photos} alt="photos" />}
          onClick={() => handleTabClick("photos")}
          iconPosition="start"
          {...a11yProps(0)}
        />
        <Tab
          sx={{
            fontSize: "14px",
            color: "#4B4B66",
            fontWeight: "400",
            px: 3,
            py: 2,
            textTransform: "none",
            width: `${value === 2 ? "20vh" : "20vh"}`,
            boxShadow: `${
              value === 1 ? "0px 4px 24px rgba(69, 38, 177, 0.13)" : ""
            }`,
            borderLeft: `${value === 1 ? "2px solid #0E97F7" : ""}`,
            clipPath: `${
              value === 1
                ? "polygon(0% 0%, 90% 0, 100% 50%, 91% 100%, 0% 100%)"
                : ""
            }`,
            borderRight: `${value === 1 ? "2px solid #F9F9FB" : ""}`,
            borderBottom: `${value === 1 ? "2px solid #F9F9FB" : ""}`,
            borderTop: `${value === 1 ? "2px solid #F9F9FB" : ""}`,
          }}
          label="360 vision"
          onClick={() => handleTabClick("vision_360")}
          icon={
            <RedoOutlinedIcon
              sx={{ color: `${value === 1 ? "#0E97F7" : ""}` }}
            />
          }
          iconPosition="start"
          {...a11yProps(1)}
        />
        <Tab
          sx={{
            fontSize: "14px",
            color: "#4B4B66",
            fontWeight: "400",
            px: 3,
            py: 2,
            textTransform: "none",
            width: `${value === 2 ? "20vh" : "20vh"}`,
            boxShadow: `${
              value === 2 ? "0px 4px 24px rgba(69, 38, 177, 0.13)" : ""
            }`,
            borderLeft: `${value === 2 ? "2px solid #0E97F7" : ""}`,
            clipPath: `${
              value === 2
                ? "polygon(0% 0%, 90% 0, 100% 50%, 91% 100%, 0% 100%)"
                : ""
            }`,
            borderRight: `${value === 2 ? "2px solid #F9F9FB" : ""}`,
            borderBottom: `${value === 2 ? "2px solid #F9F9FB" : ""}`,
            borderTop: `${value === 2 ? "2px solid #F9F9FB" : ""}`,
          }}
          icon={
            <CabinOutlinedIcon
              sx={{ color: `${value === 2 ? "#0E97F7" : ""}` }}
            />
          }
          iconPosition="start"
          onClick={() => handleTabClick("condominium")}
          label="Condominium"
          {...a11yProps(2)}
        />
        <Tab
          sx={{
            fontSize: "14px",
            color: "#4B4B66",
            fontWeight: "400",
            px: 3,
            py: 2,
            textTransform: "none",
            width: `${value === 3 ? "20vh" : "20vh"}`,
            boxShadow: `${
              value === 3 ? "0px 4px 24px rgba(69, 38, 177, 0.13)" : ""
            }`,
            borderLeft: `${value === 3 ? "2px solid #0E97F7" : ""}`,
            clipPath: `${
              value === 3
                ? "polygon(0% 0%, 90% 0, 100% 50%, 91% 100%, 0% 100%)"
                : ""
            }`,
            borderRight: `${value === 3 ? "2px solid #F9F9FB" : ""}`,
            borderBottom: `${value === 3 ? "2px solid #F9F9FB" : ""}`,
            borderTop: `${value === 3 ? "2px solid #F9F9FB" : ""}`,
          }}
          label="Location"
          icon={
            <MapOutlinedIcon
              sx={{ color: `${value === 3 ? "#0E97F7" : ""}` }}
            />
          }
          onClick={() => handleTabClick("location")}
          iconPosition="start"
          {...a11yProps(3)}
        />
        <Tab
          sx={{
            fontSize: "14px",
            color: "#4B4B66",
            fontWeight: "400",
            px: 3,
            py: 2,
            textTransform: "none",
            width: `${value === 4 ? "20vh" : "20vh"}`,
            boxShadow: `${
              value === 4 ? "0px 4px 24px rgba(69, 38, 177, 0.13)" : ""
            }`,
            borderLeft: `${value === 4 ? "2px solid #0E97F7" : ""}`,
            clipPath: `${
              value === 4
                ? "polygon(0% 0%, 90% 0, 100% 50%, 91% 100%, 0% 100%)"
                : ""
            }`,
            borderRight: `${value === 4 ? "2px solid #F9F9FB" : ""}`,
            borderBottom: `${value === 4 ? "2px solid #F9F9FB" : ""}`,
            borderTop: `${value === 4 ? "2px solid #F9F9FB" : ""}`,
          }}
          icon={
            <SignpostOutlinedIcon
              sx={{ color: `${value === 4 ? "#0E97F7" : ""}` }}
            />
          }
          iconPosition="start"
          label="Street view"
          onClick={() => handleTabClick("street_view")}
          {...a11yProps(4)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        {selectImage != null ? (
          <Image
            loader={myLoader}
            src={`${selectImage}`}
            alt="home"
            width={800}
            height={400}
          />
        ) : (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ height: "30vh", paddingLeft: "25vh" }}
          >
            <Typography
              variant="p"
              sx={{ color: " #7450F0", fontWeight: "600", fontSize: "20px" }}
            >
              No Image Found
            </Typography>
          </Grid>
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {selectImage != null &&
        selectImage?.split(/[#?]/)[0].split(".").pop().trim() !== "webp" ? (
          <ReactPannellum
            id="1"
            sceneId="firstScene"
            imageSource={`${_baseURL}/storage/${selectImage}`}
            config={config}
            // style={style}
          />
        ) : (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ height: "30vh", paddingLeft: "25vh" }}
          >
            <Typography
              variant="p"
              sx={{ color: " #7450F0", fontWeight: "600", fontSize: "20px" }}
            >
              No Image Found
            </Typography>
          </Grid>
        )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {selectImage != null ? (
          <Image
            loader={myLoader}
            src={`${selectImage}`}
            alt="home"
            width={800}
            height={400}
          />
        ) : (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ height: "30vh", paddingLeft: "25vh" }}
          >
            <Typography
              variant="p"
              sx={{ color: " #7450F0", fontWeight: "600", fontSize: "20px" }}
            >
              No Image Found
            </Typography>
          </Grid>
        )}
      </TabPanel>
      <TabPanel value={value} index={3}>
        <BaseGoogleMap
          height={"59vh"}
          width={"55vw"}
          markersData={markersData}
        />
      </TabPanel>
      <TabPanel value={value} index={4}>
        {/* <Typography variant="p" sx={{ visibility: "hidden", width: "100%" }}>
          dfsfffffffffffffffffffffffdsfffffffffffffffffffffffffffffffffffdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsfsdfsdfsd
        </Typography> */}
        <BaseStreetView addressData={addressData} />
      </TabPanel>
    </Box>
  );
}

export default SliderView;
