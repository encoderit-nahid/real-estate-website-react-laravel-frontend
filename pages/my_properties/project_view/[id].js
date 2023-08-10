import Navbar from "../../../src/component/shared/Navbar/Navbar";
import Head from "next/head";
import {
  Box,
  Grid,
  Typography,
  Container,
  ImageList,
  ImageListItem,
  Button,
} from "@mui/material";
import orionImage from "../../../public/Images/orion_view.svg";
import Image from "next/image";
import TabView from "../../../src/component/PropertyView/tab/TabView";
import AmountView from "../../../src/component/PropertyView/amount/AmountView";
import Features from "../../../src/component/PropertyView/feature/Features";
import AboutProperty from "../../../src/component/PropertyView/AboutProperty/AboutProperty";
import Negotiate from "../../../src/component/PropertyView/Negotiate/Negotiate";
import HouseCard from "../../../src/component/reuseable/HouseCard/HouseCard";
import Footer from "../../../src/component/shared/Footer/Footer";
import SliderView from "../../../src/component/PropertyView/slider/SliderView";
import SlideImage from "../../../src/component/PropertyView/slideImage/SlideImage";
import SliderViewMobile from "../../../src/component/PropertyView/SliderViewMobile/SliderViewMobile";
import sliderView from "../../../public/Images/sliderView.png";
import sliderViewSmall from "../../../public/Images/sliderViewSmall.png";
import BaseModal from "../../../src/component/reuseable/baseModal/BaseModal";
import ProposalModal from "../../../src/component/PropertyView/ProposalStepperComponent/ProposalModal";
import { useEffect, useMemo, useState } from "react";
import yellowImage from "../../../public/Images/yellow.png";
import { getSession } from "next-auth/react";
import en from "locales/en";
import pt from "locales/pt";
import Link from "next/link";
import SlideImageMobile from "@/component/PropertyView/SlideImageMobile/SlideImageMobile";
import { _imageURL } from "consts";
import { useRouter } from "next/router";

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

export default function ProjectView({
  loginOpen,
  setLoginOpen,
  handleLoginOpen,
  handleLoginClose,
  singleProjectData,
  language,
}) {
  const [myValue, setMyValue] = useState(language || "en");
  const router = useRouter();
  const t = myValue === "en" ? en : pt;
  const [sideTabValue, setSideTabValue] = useState("photos");

  const filterLogo = singleProjectData?.project?.attachments?.filter(
    (data) => data.title === "logo"
  );

  const myLoader = ({ src }) => {
    return `${_imageURL}/${src}`;
  };

  const Images = useMemo(() => {
    return singleProjectData?.project?.attachments?.filter((data) => {
      return sideTabValue === "vision_360"
        ? data.title.includes(`project_${sideTabValue}`)
        : sideTabValue === "photos"
        ? data.title === "project_photo"
        : sideTabValue === "condominium"
        ? data.title === sideTabValue
        : null;
    });
  }, [singleProjectData, sideTabValue]);

  const [selectImage, setSelectImage] = useState(() => Images?.[0]?.file_path);

  useEffect(() => {
    if (Images?.length > 0) {
      setSelectImage(Images?.[0]?.file_path);
    } else {
      setSelectImage(Images?.[0]?.lofi);
    }
  }, [Images]);

  const goBack = () => {
    router.back();
  };

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
          languageName={language}
          setMyValue={setMyValue}
          myValue={myValue}
        />
        <Box sx={{ ml: 3 }}>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-start"
          >
            <Button
              color="inherit"
              // disabled={activeStep === 0}
              //   onClick={handleBack}
              onClick={goBack}
              sx={{
                mr: 1,
                border: "1px solid #38bdf8",
                borderRadius: "4px",
                px: 2,
                py: 1,
                my: 1,
                color: "#38bdf8",
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "22px",
                textTransform: "none",
              }}
            >
              {t["come back"]}
            </Button>
          </Grid>
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
                sx={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#1A1859",
                }}
              >
                {singleProjectData?.project?.name}
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
            {/* <TabView /> */}
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
              <SliderViewMobile
                sideTabValue={sideTabValue}
                setSideTabValue={setSideTabValue}
                selectImage={selectImage}
                languageName={myValue.toString()}
              />
            </Grid>
            {/* <Grid item xs={12} sx={{ mb: 1 }}>
              <Image src={sliderView} layout="responsive" alt="sliderView" />
            </Grid> */}
          </Grid>
          {/* <Grid container spacing={1}>
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
          </Grid> */}
          <Box>
            <SlideImageMobile Images={Images} setSelectImage={setSelectImage} />
          </Box>
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
                languageName={myValue.toString()}
                others={false}
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

        <Box
          sx={{
            mx: 3,
            mt: 4,

            background: "linear-gradient(90deg, #20BAF6 0%, #7450F0 100%);",
          }}
        >
          <Container maxWidth="lg">
            <Grid
              container
              spacing={2}
              sx={{
                height: {
                  xs: "auto",
                  sm: "auto",
                  md: "auto",
                  lg: "40vh",
                },
                pt: 1,
                pb: 1,
              }}
            >
              <Grid item xs={12} sm={12} md={12} lg={2}>
                <Box>
                  <Image
                    loader={myLoader}
                    src={filterLogo[0]?.file_path}
                    width={100}
                    height={100}
                    style={{ borderRadius: "50px" }}
                    alt="yellowImage"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={10}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#FFFFFF",
                    fontWeight: "800",
                    fontSize: "32px",
                    lineHeight: "38px",
                  }}
                >
                  {singleProjectData?.project?.name}
                </Typography>
                {/* <Typography
                  variant="h6"
                  sx={{
                    color: "#FFFFFF",
                    fontWeight: "500",
                    fontSize: "20px",
                    lineHeight: "28px",
                    mt: 2,
                  }}
                >
                  📍AV. AFONSO MARIANO FAGUNDES, 417 SAÚDE, SÃO PAULO - SP
                </Typography> */}
                <Typography
                  variant="h6"
                  sx={{
                    color: "#FFFFFF",
                    fontWeight: "500",
                    fontSize: "20px",
                    lineHeight: "28px",
                    mt: 2,
                  }}
                >
                  {singleProjectData?.project?.description}
                </Typography>
              </Grid>
            </Grid>
          </Container>
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
            {singleProjectData?.propject_wise_properties?.map((data, index) => (
              <Link
                key={data.id}
                href={`/property_view/${data.id}`}
                as={`/property_view/${data.id}`}
              >
                <ImageListItem
                  key={index}
                  cols={2}
                  sx={{
                    width: {
                      xl: "90%",
                      lg: "90%",
                      md: "70%",
                      sm: "90%",
                      xs: "90%",
                    },
                  }}
                >
                  <HouseCard
                    propertyInfo={data}
                    shadow={"0px 4px 18px rgba(0, 0, 0, 0.1)"}
                  />
                </ImageListItem>
              </Link>
            ))}
          </ImageList>
        </Box>
        <Footer />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const base_url = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${base_url}/api/project/show/${id}`);
  const singleProjectData = await res.json();

  const cookies = context.req.cookies["language"];

  return {
    props: {
      singleProjectData: singleProjectData,
      language: cookies,
      // tabArrayData:
      //   singlePropertyData?.property?.property_detail?.photo_types?.filter(
      //     (data) => data.slug.substr(data.slug.length - 3) !== "360"
      //   ),
    },
  };
}
