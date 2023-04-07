import Navbar from "../../src/component/shared/Navbar/Navbar";
import Head from "next/head";
import {
  Box,
  Grid,
  Typography,
  Container,
  ImageList,
  ImageListItem,
  Button,
  Tooltip,
} from "@mui/material";
import orionImage from "../../public/Images/orion_view.svg";
import Image from "next/image";
import TabView from "../../src/component/PropertyView/tab/TabView";
import AmountView from "../../src/component/PropertyView/amount/AmountView";
import Features from "../../src/component/PropertyView/feature/Features";
import AboutProperty from "../../src/component/PropertyView/AboutProperty/AboutProperty";
import Negotiate from "../../src/component/PropertyView/Negotiate/Negotiate";
import HouseCard from "../../src/component/reuseable/HouseCard/HouseCard";
import Footer from "../../src/component/shared/Footer/Footer";
import SliderView from "../../src/component/PropertyView/slider/SliderView";
import SlideImage from "../../src/component/PropertyView/slideImage/SlideImage";
import SliderViewMobile from "../../src/component/PropertyView/SliderViewMobile/SliderViewMobile";
import sliderView from "../../public/Images/sliderView.png";
import sliderViewSmall from "../../public/Images/sliderViewSmall.png";
import BaseModal from "../../src/component/reuseable/baseModal/BaseModal";
import ProposalModal from "../../src/component/PropertyView/ProposalStepperComponent/ProposalModal";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import Link from "next/link";

const aboutProperty = [
  "Heater",
  "Dependency",
  "Balcony",
  "Service area",
  "Air conditioner",
  "Source",
  "Coif",
  "Cabinets",
  "Wardrobe",
  "Stove",
];

const aboutCondo = [
  "sports court",
  "playground",
  "Electric fence",
  "Internal TV circuit",
  "Ordinance",
  "individual gas",
  "service entrance",
  "Service elevator",
  "Employee locker room",
  "Academy",
  "heated pool",
  "Party room",
];

const surroundings = [
  "hospitals",
  "pharmacies",
  "Markets",
  "Laundries",
  "Museum",
];

export default function PropertyView({
  loginOpen,
  setLoginOpen,
  handleLoginOpen,
  handleLoginClose,
  singlePropertyData,
  tabArrayData,
}) {
  console.log({ singlePropertyData });
  console.log({ tabArrayData });
  //add_proposal_modal
  const [proposalOpen, setProposalOpen] = useState(false);
  const handleProposalOpen = () => setProposalOpen(true);
  const handleProposalClose = () => setProposalOpen(false);

  const [negotiate, setNegotiate] = useState(true);
  const [schedule, setSchedule] = useState(false);

  const [upperTabValue, setUpperTabValue] = useState(tabArrayData[0].slug);
  console.log({ upperTabValue });
  const [sideTabValue, setSideTabValue] = useState("photos");

  const Images = useMemo(() => {
    return singlePropertyData?.property?.attachments?.filter((data) => {
      return sideTabValue === "vision_360"
        ? data.title.includes(`${upperTabValue}_${sideTabValue}`)
        : sideTabValue === "photos"
        ? data.title === upperTabValue
        : sideTabValue === "condominium"
        ? data.title === sideTabValue
        : null;
    });
  }, [singlePropertyData, upperTabValue, sideTabValue]);

  console.log({ Images });

  const [selectImage, setSelectImage] = useState(() => Images[0]?.file_path);

  useEffect(() => {
    if (Images.length > 0) {
      setSelectImage(Images[0]?.file_path);
    } else {
      setSelectImage(Images[0]?.lofi);
    }
  }, [Images]);

  // useEffect(() => {
  //   let showData = [];

  //   if (sideTabValue === "photos") {
  //     showData = singlePropertyData?.property?.attachments?.filter(
  //       (data) => data.title === upperTabValue
  //     );
  //   }
  //   if (sideTabValue === "vision_360") {
  //     showData = singlePropertyData?.property?.attachments?.filter((data) =>
  //       data.title.includes(`${upperTabValue}_${sideTabValue}`)
  //     );
  //   }
  //   setImages(showData);
  //   console.log({ showData });
  // }, [singlePropertyData, upperTabValue, sideTabValue]);

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
        <Box sx={{ ml: 3 }}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Button
              sx={{
                display: {
                  xs: "grid",
                  sm: "grid",
                  md: "flex",
                  lg: "flex",
                  xl: "flex",
                },
                color: "#1A1859",
              }}
            >
              <Image src={orionImage} alt="orionImage" />

              <Typography
                variant="p"
                sx={{ fontSize: "24px", fontWeight: 700, color: "#1A1859" }}
              >
                {`${singlePropertyData?.property?.address?.address} | ${singlePropertyData?.property?.address?.city}`}
              </Typography>
            </Button>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ marginTop: 1 }}
          >
            <TabView
              tabArray={tabArrayData}
              upperTabValue={upperTabValue}
              setUpperTabValue={setUpperTabValue}
            />
          </Grid>
        </Box>
        <Box
          sx={{
            ml: { xs: 1, sm: 3, md: 3, lg: 3, xl: 3 },
            mr: { xs: 1, sm: 3, md: 3, lg: 3, xl: 3 },
            my: 4,
          }}
        >
          <Grid
            container
            sx={{
              display: {
                xs: "inline",
                sm: "inline",
                md: "none",
                lg: "none",
                xl: "none",
              },
            }}
          >
            <Grid item xs={12}>
              <SliderViewMobile />
            </Grid>
            <Grid item xs={12} sx={{ mb: 1 }}>
              <Image src={sliderView} layout="responsive" alt="sliderView" />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            {[0, 1, 2, 3].map((data, index) => (
              <Grid
                item
                key={index}
                xs={3}
                sx={{
                  display: {
                    xs: "inline",
                    sm: "inline",
                    md: "none",
                    lg: "none",
                    xl: "none",
                  },
                }}
              >
                <Image src={sliderViewSmall} alt="sliderView" />
              </Grid>
            ))}
          </Grid>
          <Grid
            container
            spacing={2}
            // sx={{
            //   display: {
            //     xs: "none",
            //     sm: "none",
            //     md: "inline",
            //     lg: "inline",
            //     xl: "inline",
            //   },
            // }}
          >
            <Grid
              item
              xs={10}
              sx={{
                display: {
                  xs: "none",
                  sm: "none",
                  md: "inline",
                  lg: "inline",
                  xl: "inline",
                },
              }}
            >
              <SliderView
                sideTabValue={sideTabValue}
                setSideTabValue={setSideTabValue}
                selectImage={selectImage}
                addressData={singlePropertyData?.property?.address}
              />
            </Grid>
            <Grid
              item
              xs={2}
              sx={{
                display: {
                  xs: "none",
                  sm: "none",
                  md: "inline",
                  lg: "inline",
                  xl: "inline",
                },
              }}
            >
              <SlideImage Images={Images} setSelectImage={setSelectImage} />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mx: { xs: 1, sm: 3, md: 3, lg: 3, xl: 3 } }}>
          <Grid
            container
            direction="row"
            alignItems="center"
            sx={{
              height: {
                xs: "60vh",
                sm: "60vh",
                md: "60vh",
                lg: "40vh",
                xl: "40vh",
              },
              background: "#0E97F7",

              px: { xs: 2, sm: 2, md: 2, lg: 2, xl: 20 },
              pt: { xs: 2, sm: 2, md: 2, lg: 0, xl: 0 },
              // pb: { xs: 0.5, sm: 0.5, md: 0, lg: 0, xl: 0 },
              mt: 1,
            }}
          >
            <AmountView
              negotiate={negotiate}
              setNegotiate={setNegotiate}
              schedule={schedule}
              setSchedule={setSchedule}
              singlePropertyData={singlePropertyData}
            />
          </Grid>
        </Box>
        <Box sx={{ mx: 3, mt: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
              <Features singlePropertyData={singlePropertyData} />

              {Object.keys(singlePropertyData?.propertyFeature).map(
                (key, index) => (
                  <AboutProperty
                    key={index}
                    name={key}
                    array={singlePropertyData?.propertyFeature[key]}
                  />
                )
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
              <Negotiate
                negotiate={negotiate}
                setNegotiate={setNegotiate}
                schedule={schedule}
                setSchedule={setSchedule}
                handleProposalOpen={handleProposalOpen}
                singlePropertyData={singlePropertyData}
                handleLoginOpen={handleLoginOpen}
                singlePropertyId={singlePropertyData?.property?.id}
              />
            </Grid>
          </Grid>
        </Box>
        <Box>
          <ImageList
            // container
            // spacing={3}
            cols={5}
            sx={{
              gridAutoFlow: "column",
              gridTemplateColumns:
                "repeat(auto-fill,minmax(140px,1fr)) !important",
              gridAutoColumns: "minmax(140px, 1fr)",
              pl: 3,
              pb: 4,
            }}
          >
            {singlePropertyData?.similarProperties?.map((stateInfo, index) => (
              <Link
                key={stateInfo.id}
                href={`/property_view/${stateInfo.id}`}
                as={`/property_view/${stateInfo.id}`}
              >
                <ImageListItem
                  key={index}
                  cols={2}
                  sx={{
                    width: {
                      xl: "100%",
                      lg: "90%",
                      md: "70%",
                      sm: "90%",
                      xs: "90%",
                    },
                  }}
                >
                  <HouseCard
                    shadow={"0px 4px 18px rgba(0, 0, 0, 0.1)"}
                    propertyInfo={stateInfo}
                  />
                </ImageListItem>
              </Link>
            ))}
          </ImageList>
        </Box>
        <Footer />

        <BaseModal isShowing={proposalOpen} isClose={handleProposalClose}>
          <Tooltip title="Something">
            <>
              <ProposalModal
                handleProposalClose={handleProposalClose}
                singlePropertyId={singlePropertyData?.property?.id}
              />
            </>
          </Tooltip>
        </BaseModal>
      </main>
    </div>
  );
}
49;

export async function getServerSideProps(context) {
  const { id } = context.query;
  const base_url = process.env.NEXT_PUBLIC_API_URL;
  // console.log("paramId", id);
  const res = await fetch(`${base_url}/api/property/show/${id}`);
  const singlePropertyData = await res.json();

  // console.log("single", singlePropertyData);
  return {
    props: {
      singlePropertyData: singlePropertyData,
      tabArrayData:
        singlePropertyData?.property?.property_detail?.photo_types?.filter(
          (data) => data.slug.substr(data.slug.length - 3) !== "360"
        ),
    },
  };
}
