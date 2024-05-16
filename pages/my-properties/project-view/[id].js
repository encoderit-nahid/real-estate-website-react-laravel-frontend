import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("@/component/shared/Navbar/Navbar"));
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
const HouseCard = dynamic(() =>
  import("@/component/reuseable/HouseCard/HouseCard")
);
const Footer = dynamic(() => import("@/component/shared/Footer/Footer"));
const SliderView = dynamic(() =>
  import("@/component/PropertyView/slider/SliderView")
);
import SlideImage from "../../../src/component/PropertyView/slideImage/SlideImage";
const SliderViewMobile = dynamic(() =>
  import("@/component/PropertyView/SliderViewMobile/SliderViewMobile")
);
import { useEffect, useMemo, useState } from "react";
import en from "locales/en";
import pt from "locales/pt";
import Link from "next/link";
const SlideImageMobile = dynamic(() =>
  import("@/component/PropertyView/SlideImageMobile/SlideImageMobile")
);
import { _imageURL } from "consts";
import { useRouter } from "next/router";
import { stripHtmlTags } from "@/utils/stripHtmlTags";
import AboutProperty from "@/component/PropertyView/AboutProperty/AboutProperty";

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
  projectDescription,
  language,
}) {
  const [myValue, setMyValue] = useState(language || "en");
  const router = useRouter();
  const t = myValue === "en" ? en : pt;
  const [sideTabValue, setSideTabValue] = useState("photos");

  const filterLogo = singleProjectData?.project?.attachments?.filter(
    (data) => data.title === "logo"
  );

  console.log({ singleProjectData });

  const myLoader = ({ src }) => {
    return `${_imageURL}/${src}`;
  };

  const Images = useMemo(() => {
    const regexPatternThreeSixtyImages = /^[a-zA-Z_]+_vision_360$/;
    const regexPatternImages = /^[a-zA-Z_]+$/;
    return singleProjectData?.project?.attachments?.filter((data) => {
      return sideTabValue === "vision_360"
        ? regexPatternThreeSixtyImages.test(data?.title)
        : sideTabValue === "photos"
        ? data?.title && regexPatternImages.test(data?.title)
        : sideTabValue === "condominium"
        ? data?.photo_type?.type === "condominium"
        : sideTabValue === "videos"
        ? !data?.title
        : null;
    });
  }, [singleProjectData, sideTabValue]);

  const Videos = useMemo(() => {
    if (sideTabValue === "videos") {
      return singleProjectData?.project?.attachments?.filter((data) => {
        return data?.file_type === "url";
      });
    } else {
      return;
    }
  }, [sideTabValue, singleProjectData]);

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
        <title>Lokkan - A imobiliária digital</title>
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
          colorLogo={true}
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
                videos={Videos}
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
              xs={12}
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
                addressData={singleProjectData?.project?.address}
                languageName={myValue.toString()}
                videos={Videos}
                images={Images}
                others={true}
              />
            </Grid>
            {/* <Grid
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
            </Grid> */}
          </Grid>
        </Box>

        <Box
          sx={{
            mx: 3,
            mt: 4,

            background: "linear-gradient(90deg, #20BAF6 0%, #7450F0 100%);",
          }}
        >
          <Container maxWidth="xxl">
            <Grid
              container
              spacing={2}
              sx={{
                pt: 1,
                pb: 1,
              }}
            >
              {/* <Grid item xs={12} sm={12} md={12} lg={2}>
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
              </Grid> */}
              <Grid item xs={12} sm={12} md={12} lg={12}>
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
                  📍
                  {`${singleProjectData?.project?.address?.address}, ${singleProjectData?.project?.address?.city}, ${singleProjectData?.project?.address?.state?.name}`}
                </Typography>

                <Typography
                  align="left"
                  sx={{
                    color: "#FFFFFF",
                    fontWeight: "500",
                    fontSize: "20px",
                    lineHeight: "28px",
                    mt: 2,
                  }}
                >
                  {projectDescription}
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box sx={{ mx: 3 }}>
          <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
            {Object.keys(singleProjectData?.projectFeatures).map(
              (key, index) => (
                <AboutProperty
                  key={index}
                  name={key}
                  array={singleProjectData?.projectFeatures[key]}
                />
              )
            )}
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
            {singleProjectData?.propject_wise_properties?.map((data, index) => (
              <Link
                key={data.id}
                href={`/property-view/${data.id}`}
                as={`/property-view/${data.id}`}
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
      projectDescription: stripHtmlTags(
        singleProjectData?.project?.description
      ),
      // tabArrayData:
      //   singlePropertyData?.property?.property_detail?.photo_types?.filter(
      //     (data) => data.slug.substr(data.slug.length - 3) !== "360"
      //   ),
    },
  };
}
