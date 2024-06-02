import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("@/component/shared/Navbar/Navbar"), {
  ssr: false,
});
import Head from "next/head";
import {
  Box,
  Grid,
  Typography,
  Container,
  ImageList,
  ImageListItem,
  Button,
  Stack,
} from "@mui/material";
import orionImage from "../../public/Images/orion_view.svg";
import Image from "next/image";
const HouseCard = dynamic(
  () => import("@/component/reuseable/HouseCard/HouseCard"),
  {
    ssr: false,
  }
);
const Footer = dynamic(() => import("@/component/shared/Footer/Footer"), {
  ssr: false,
});
const SliderView = dynamic(
  () => import("@/component/PropertyView/slider/SliderView"),
  {
    ssr: false,
  }
);
const SliderViewMobile = dynamic(
  () => import("@/component/PropertyView/SliderViewMobile/SliderViewMobile"),
  {
    ssr: false,
  }
);
import { useEffect, useMemo, useState } from "react";
import en from "locales/en";
import pt from "locales/pt";
import Link from "next/link";
import { _imageURL } from "consts";
import { useRouter } from "next/router";
import { stripHtmlTags } from "@/utils/stripHtmlTags";
const BaseShareButton = dynamic(
  () => import("@/component/reuseable/baseShareButton/BaseShareButton"),
  {
    ssr: false,
  }
);
const AboutProperty = dynamic(
  () => import("@/component/PropertyView/AboutProperty/AboutProperty"),
  {
    ssr: false,
  }
);
const BaseFavoriteButton = dynamic(
  () => import("@/component/reuseable/baseFavoriteButton/BaseFavoriteButton"),
  {
    ssr: false,
  }
);

export default function ProjectView({
  loginOpen,
  setLoginOpen,
  handleLoginOpen,
  handleLoginClose,
  singleProjectData,
  projectDescription,
  language,
}) {
  const router = useRouter();
  const [myValue, setMyValue] = useState(language || "pt");

  const t = myValue === "en" ? en : pt;
  const [sideTabValue, setSideTabValue] = useState("photos");

  const seoImage = useMemo(() => {
    return singleProjectData?.project?.attachments?.find(
      (data) => data?.title === "logo"
    );
  }, [singleProjectData]);

  const Images = useMemo(() => {
    const regexPatternThreeSixtyImages = /^[a-zA-Z_]+_vision_360$/;
    return singleProjectData?.project?.attachments?.filter((data) => {
      return sideTabValue === "vision_360"
        ? regexPatternThreeSixtyImages.test(data?.title)
        : sideTabValue === "photos"
        ? data?.title === "Photo"
        : sideTabValue === "condominium"
        ? data?.title === "condominium"
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
        <Head>
          <title>{`${singleProjectData?.project?.name} - Lokkan`}</title>
          <meta name="description" content={`${projectDescription}`} />
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta
            property="og:url"
            content={`https://www.lokkan.site/property-view/${singleProjectData?.project?.id}`}
          />
          <meta
            property="og:title"
            content={`${singleProjectData?.project?.name}`}
          />
          <meta property="og:description" content={`${projectDescription}`} />
          <meta
            property="og:image"
            content={`${_imageURL}/${seoImage?.file_path}`}
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
        </Head>
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
            justifyContent="space-between"
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
            <Stack direction="row" alignItems={"center"} spacing={1}>
              <BaseShareButton
                base_url={`https://www.lokkan.site/project-view/${singleProjectData?.property?.id}`}
              />

              <BaseFavoriteButton
                handleLoginOpen={handleLoginOpen}
                itemID={singleProjectData?.project?.id}
                type="project"
              />
            </Stack>
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
                images={Images}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
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
                  component="div"
                  align="left"
                  sx={{
                    color: "#FFFFFF",
                    fontWeight: "500",
                    fontSize: "20px",
                    lineHeight: "28px",
                    mt: 2,
                  }}
                  dangerouslySetInnerHTML={{
                    __html: singleProjectData?.project?.description,
                  }}
                ></Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box sx={{ mx: 3 }}>
          <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
            {Object.keys(singleProjectData?.projectFeatures || {})?.map(
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
    },
  };
}
