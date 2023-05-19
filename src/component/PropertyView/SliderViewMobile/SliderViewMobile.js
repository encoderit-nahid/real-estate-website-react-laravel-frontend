import { Container } from "@mui/material";
import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import AutoAwesomeMotionOutlinedIcon from "@mui/icons-material/AutoAwesomeMotionOutlined";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import CabinOutlinedIcon from "@mui/icons-material/CabinOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import SignpostOutlinedIcon from "@mui/icons-material/SignpostOutlined";
import ReactPannellum, { getConfig } from "react-pannellum";
import BaseGoogleMap from "../../IAmOwner/map/BaseGoogleMap";
import { Grid } from "@mui/material";
import { _baseURL, _imageURL } from "../../../../consts";
import BaseStreetView from "../../reuseable/baseStreetView/BaseStreetView";
import PropTypes from "prop-types";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import en from "locales/en";
import pt from "locales/pt";
import Image from "next/image";

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

function SliderViewMobile({
  sideTabValue,
  setSideTabValue,
  selectImage,
  addressData,
  languageName,
}) {
  const t = languageName === "en" ? en : pt;

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

  const config = {
    autoLoad: true,
  };
  const style = {
    width: "850px",
    height: "450px",
    // background: "#000000",
  };

  const handleTabClick = (data) => {
    setSideTabValue(data);
  };

  const myLoader = ({ src }) => {
    return `${_imageURL}/${src}`;
  };
  return (
    <Container maxWidth="sm">
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="icon label tabs example"
        variant="scrollable"
      >
        <Tab
          sx={{ minWidth: "60px" }}
          onClick={() => handleTabClick("photos")}
          icon={<AutoAwesomeMotionOutlinedIcon />}
        />
        <Tab
          sx={{ minWidth: "60px" }}
          icon={<RedoOutlinedIcon />}
          onClick={() => handleTabClick("vision_360")}
        />
        <Tab
          sx={{ minWidth: "60px" }}
          icon={<CabinOutlinedIcon />}
          onClick={() => handleTabClick("condominium")}
        />
        <Tab
          sx={{ minWidth: "60px" }}
          icon={<MapOutlinedIcon />}
          onClick={() => handleTabClick("location")}
        />
        <Tab
          sx={{ minWidth: "60px" }}
          icon={<SignpostOutlinedIcon />}
          onClick={() => handleTabClick("street_view")}
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
              sx={{
                color: " #7450F0",
                fontWeight: "600",
                fontSize: "20px",
              }}
            >
              No Image Found
            </Typography>
          </Grid>
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {selectImage != null &&
        selectImage?.split(/[#?]/)[0].split(".").pop().trim() !== "webp" ? (
          <div key={selectImage}>
            {/* {`${_baseURL}/storage/${selectImage}`}
						<Image
							loader={myLoader}
							src={`${_baseURL}/storage/${selectImage}`}
							alt="home"
							width={800}
							height={400}
						/> */}
            <ReactPannellum
              id="1"
              sceneId="firstScene"
              imageSource={`${_imageURL}/${selectImage}`}
              config={config}
              // style={style}
            />
          </div>
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
              sx={{
                color: " #7450F0",
                fontWeight: "600",
                fontSize: "20px",
              }}
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
              sx={{
                color: " #7450F0",
                fontWeight: "600",
                fontSize: "20px",
              }}
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
    </Container>
  );
}

export default SliderViewMobile;
