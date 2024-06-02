import { Container, Stack } from "@mui/material";
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
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import en from "locales/en";
import pt from "locales/pt";
import Image from "next/image";
import VideoCarousel from "../VideoCarousel/VideoCarousel";
import { getVideoIdFromLink } from "@/utils/getVideoIdFromLink";
import Slider from "react-slick";
const BaseShareButton = dynamic(
  () => import("@/component/reuseable/baseShareButton/BaseShareButton"),
  {
    ssr: false,
  }
);
import BaseFavoriteButton from "@/component/reuseable/baseFavoriteButton/BaseFavoriteButton";

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
  videos,
  languageName,
  images,
  singlePropertyData,
}) {
  const imageUrls = images?.map((data) => {
    return data?.file_path;
  });
  const t = languageName === "en" ? en : pt;

  const [value, setValue] = React.useState(0);

  const videoIds = videos?.map((data) => {
    console.log({ data });
    const videoId = getVideoIdFromLink(data?.file_path);
    return videoId;
  });

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
  const sliderSettings = {
    dots: false,
    lazyLoad: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
  };
  return (
    <Container maxWidth="sm" sx={{ p: 0, position: "relative" }}>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          display: {
            xs: "flex",
            md: "none",
          },
          position: "absolute",
          top: 60,
          right: "20px",
          zIndex: 2,
        }}
      >
        <BaseShareButton
          bg
          base_url={`https://www.lokkan.site/property-view/${singlePropertyData?.property?.id}`}
        />
        <BaseFavoriteButton
          // handleLoginOpen={handleLoginOpen}
          bg
          itemID={singlePropertyData?.property?.id}
        />
      </Stack>
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
        <Tab
          sx={{ minWidth: "60px" }}
          icon={<OndemandVideoOutlinedIcon />}
          onClick={() => handleTabClick("videos")}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        {selectImage != null ? (
          <Box sx={{ aspectRatio: "2 / 1" }}>
            <Slider {...sliderSettings}>
              {imageUrls.map((image, index) => (
                <Image
                  key={index}
                  loader={myLoader}
                  src={image}
                  alt="home"
                  width={800}
                  height={700}
                  objectFit="cover"
                  objectPosition={"center"}
                />
              ))}
            </Slider>
          </Box>
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
        {selectImage != null ? (
          <Box sx={{ aspectRatio: "2 / 1" }}>
            <Image
              loader={myLoader}
              src={`${selectImage}`}
              alt="home"
              width={800}
              height={400}
              objectFit="cover"
            />
          </Box>
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
        <Box sx={{ aspectRatio: "2 / 1" }}>
          <BaseGoogleMap markersData={markersData} />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Box sx={{ aspectRatio: "2 / 1" }}>
          <BaseStreetView addressData={addressData} widthDevice={"mobile"} />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <VideoCarousel videoLinks={videoIds} widthDevice={"mobile"} />
      </TabPanel>
    </Container>
  );
}

export default SliderViewMobile;
