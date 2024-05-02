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
import { _baseURL, _imageURL } from "../../../../consts";
import BaseStreetView from "../../reuseable/baseStreetView/BaseStreetView";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import { useEffect } from "react";
import { useState } from "react";
import en from "locales/en";
import pt from "locales/pt";
import VideoCarousel from "../VideoCarousel/VideoCarousel";
import { getVideoIdFromLink } from "@/utils/getVideoIdFromLink";
import ImageCarousel from "../ImageCarousel/ImageCarousel";
import useWindowDimensions from "@/hooks/useCurrentDisplaySize";

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
  languageName,
  videos,
  images,
  others,
}) {
  const t = languageName === "en" ? en : pt;

  const [value, setValue] = React.useState(0);
  const { width, height } = useWindowDimensions();

  //   function get_url_extension( selectImage ) {
  //     return selectImage.split(/[#?]/)[0].split('.').pop().trim();
  // }

  const videoIds = videos?.map((data) => {
    console.log({ data });
    const videoId = getVideoIdFromLink(data?.file_path);
    return videoId;
  });

  const imageUrls = images?.map((data) => {
    return data?.file_path;
  });
  console.log({ imageUrls });
  // console.log({ videoIds });
  // const videoLinks = ["P5VnLiGUmtY", "6MrCy95f93M", "5zWTInJqD5k"];

  console.log({ addressData });

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
    width: "100ppx",
    height: "800px",
    background: "#000000",
  };

  const handleTabClick = (data) => {
    setSideTabValue(data);
  };

  const myLoader = ({ src }) => {
    return `${_imageURL}/${src}`;
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        // height: 224,
        width: "100%",
      }}
    >
      <Tabs
        className="slider-tab"
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ width: "220px" }}
        // sx={{ width: { md: "35%", lg: "25%", xl: "20%", xxl: "15%" } }}
        // sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab
          label={t["Photos"]}
          sx={{
            fontSize: "14px",
            color: "#4B4B66",
            fontWeight: "400",
            px: 3,
            py: 2,
            textTransform: "none",
            width: `${value === 0 ? "20vh" : "20vh"}`,
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
            width: `${value === 1 ? "20vh" : "20vh"}`,
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
          label={t["360 vision"]}
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
          label={t["Condominium"]}
          {...a11yProps(2)}
        />
        {others === true && (
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
            label={t["Location"]}
            icon={
              <MapOutlinedIcon
                sx={{ color: `${value === 3 ? "#0E97F7" : ""}` }}
              />
            }
            onClick={() => handleTabClick("location")}
            iconPosition="start"
            {...a11yProps(3)}
          />
        )}
        {others === true && (
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
            label={t["Street view"]}
            onClick={() => handleTabClick("street_view")}
            {...a11yProps(4)}
          />
        )}

        <Tab
          label={"Video"}
          sx={{
            fontSize: "14px",
            color: "#4B4B66",
            fontWeight: "400",
            px: 3,
            py: 2,
            textTransform: "none",
            width: `${value === 5 ? "20vh" : "20vh"}`,
            boxShadow: `${
              value === 5 ? "0px 4px 24px rgba(69, 38, 177, 0.13)" : ""
            }`,
            borderLeft: `${value === 5 ? "2px solid #0E97F7" : ""}`,
            clipPath: `${
              value === 5
                ? "polygon(0% 0%, 90% 0, 100% 50%, 91% 100%, 0% 100%)"
                : ""
            }`,
            borderRight: `${value === 5 ? "2px solid #F9F9FB" : ""}`,
            borderBottom: `${value === 5 ? "2px solid #F9F9FB" : ""}`,
            borderTop: `${value === 5 ? "2px solid #F9F9FB" : ""}`,
          }}
          icon={
            <OndemandVideoOutlinedIcon
              sx={{ color: `${value === 5 ? "#0E97F7" : ""}` }}
            />
          }
          // icon={<Image src={photos} alt="photos" />}
          onClick={() => handleTabClick("videos")}
          iconPosition="start"
          {...a11yProps(5)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        {selectImage != null ? (
          // <Image
          //   loader={myLoader}
          //   src={`${selectImage}`}
          //   alt="home"
          //   width={800}
          //   height={400}
          // />
          <ImageCarousel imageUrls={imageUrls} imagesPerSlide={3} />
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
              nenhuma imagem encontrada
            </Typography>
          </Grid>
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {selectImage != null &&
        selectImage?.split(/[#?]/)[0].split(".").pop().trim() !== "webp" ? (
          <div key={selectImage} style={{ width: "100%" }}>
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
              nenhuma imagem encontrada
            </Typography>
          </Grid>
        )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {selectImage != null ? (
          <ImageCarousel imageUrls={imageUrls} imagesPerSlide={3} />
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
              nenhuma imagem encontrada
            </Typography>
          </Grid>
        )}
      </TabPanel>
      <TabPanel value={value} index={3}>
        <BaseGoogleMap
          height={"70vh"}
          width={"80vw"}
          markersData={markersData}
        />
      </TabPanel>
      <TabPanel value={value} index={4}>
        {/* <Typography variant="p" sx={{ visibility: "hidden", width: "100%" }}>
          dfsfffffffffffffffffffffffdsfffffffffffffffffffffffffffffffffffdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsfsdfsdfsd
        </Typography> */}
        <BaseStreetView addressData={addressData} />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <VideoCarousel videoLinks={videoIds} />
      </TabPanel>
    </Box>
  );
}

export default SliderView;
