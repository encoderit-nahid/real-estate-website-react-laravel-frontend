import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("@/component/shared/Navbar/Navbar"));
const Footer = dynamic(() => import("@/component/shared/Footer/Footer"));
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
  Stack,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import orionImage from "../../public/Images/orion_view.svg";
import Image from "next/image";
import {
  EmailShareButton,
  FacebookShareButton,
  WhatsappShareButton,
} from "react-share";
import { EmailIcon, FacebookIcon, WhatsappIcon } from "react-share";
const AmountView = dynamic(() =>
  import("@/component/PropertyView/amount/AmountView")
);
const Features = dynamic(() =>
  import("@/component/PropertyView/feature/Features")
);
const AboutProperty = dynamic(() =>
  import("@/component/PropertyView/AboutProperty/AboutProperty")
);
const Negotiate = dynamic(() =>
  import("@/component/PropertyView/Negotiate/Negotiate")
);
const HouseCard = dynamic(() =>
  import("@/component/reuseable/HouseCard/HouseCard")
);
const SliderView = dynamic(() =>
  import("@/component/PropertyView/slider/SliderView")
);
const SliderViewMobile = dynamic(() =>
  import("@/component/PropertyView/SliderViewMobile/SliderViewMobile")
);
const BaseModal = dynamic(() =>
  import("@/component/reuseable/baseModal/BaseModal")
);
const ProposalModal = dynamic(() =>
  import("@/component/PropertyView/ProposalStepperComponent/ProposalModal")
);
import { useMemo, useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import en from "locales/en";
import pt from "locales/pt";
const SlideImageMobile = dynamic(() =>
  import("@/component/PropertyView/SlideImageMobile/SlideImageMobile")
);
const BaseCopyText = dynamic(() =>
  import("@/component/reuseable/baseCopyText/BaseCopyText")
);
import { useRouter } from "next/router";
import useCurrentUser from "@/hooks/useCurrentUser";
import { _imageURL } from "consts";
import { stripHtmlTags } from "@/utils/stripHtmlTags";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
const BaseFavoriteButton = dynamic(
  () => import("@/component/reuseable/baseFavoriteButton/BaseFavoriteButton"),
  {
    ssr: false,
  }
);
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
  propertyDescription,
  language,
}) {
  const [myValue, setMyValue] = useState(language || "en");
  const router = useRouter();

  console.log({ singlePropertyData });

  const t = myValue === "en" ? en : pt;
  //add_proposal_modal
  const [proposalOpen, setProposalOpen] = useState(false);
  const handleProposalOpen = () => setProposalOpen(true);
  const handleProposalClose = () => setProposalOpen(false);

  const [negotiate, setNegotiate] = useState(true);
  const [schedule, setSchedule] = useState(false);

  const [sideTabValue, setSideTabValue] = useState("photos");

  // const [propertyDescription, setPorpertyDescription] = useState("");

  // useEffect(() => {
  //   if (singlePropertyData?.property?.property_description) {
  //     const htmlString = singlePropertyData.property.property_description;
  //     const textContent = stripHtmlTags(htmlString);
  //     setPorpertyDescription(textContent);
  //   }
  // }, [singlePropertyData]);

  const Images = useMemo(() => {
    const regexPatternThreeSixtyImages = /^[a-zA-Z_]+_vision_360$/;
    const regexPatternImages = /^[a-zA-Z_]+$/;
    return singlePropertyData?.property?.attachments?.filter((data) => {
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
  }, [singlePropertyData, sideTabValue]);

  const seoImage = useMemo(() => {
    return singlePropertyData?.property?.attachments?.find(
      (data) => data?.title === "logo"
    );
  }, [singlePropertyData]);

  const Videos = useMemo(() => {
    if (sideTabValue === "videos") {
      return singlePropertyData?.property?.attachments?.filter((data) => {
        return data?.file_type === "url";
      });
    } else {
      return;
    }
  }, [sideTabValue, singlePropertyData]);

  console.log({ sideTabValue });

  const [selectImage, setSelectImage] = useState(() => Images[0]?.file_path);

  useEffect(() => {
    if (Images.length > 0) {
      setSelectImage(Images[0]?.file_path);
    } else {
      setSelectImage(Images[0]?.lofi);
    }
  }, [Images]);

  const goBack = () => {
    router.back();
  };

  console.log("🟥 ~ singlePropertyData:", singlePropertyData);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log({ propertyDescription });
  return (
    <div>
      <Head>
        <title>{`${singlePropertyData?.property?.property_title} - Lokkan`}</title>
        <meta name="description" content={`${propertyDescription}`} />
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:url"
          content={`https://www.lokkan.site/property-view/${singlePropertyData?.property?.id}`}
        />
        <meta
          property="og:title"
          content={`${singlePropertyData?.property?.property_title}`}
        />
        <meta property="og:description" content={`${propertyDescription}`} />
        <meta
          property="og:image"
          content={`${_imageURL}/${seoImage?.file_path}`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
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
            {/* <Link href="/search-real-estate"> */}
            <Button
              color="inherit"
              // disabled={activeStep === 0}
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
            {/* </Link> */}
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            sx={{
              pr: 7,
            }}
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
                {`${
                  singlePropertyData?.property?.property_title ||
                  "No title found"
                }`}
              </Typography>
            </Button>
            <Stack direction="row" spacing={1}>
              <IconButton
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <ShareIcon />
              </IconButton>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem onClick={handleClose}>
                  <Stack direction="column" spacing={3}>
                    <Typography
                      variant="p"
                      sx={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#1A1859",
                      }}
                      align="center"
                    >
                      Compartilhar
                    </Typography>
                    <Stack direction="row" spacing={3}>
                      <Stack direction="column">
                        <WhatsappShareButton
                          url={`https://www.lokkan.site/property-view/${singlePropertyData?.property?.id}`}
                        >
                          <WhatsappIcon round size={40} />
                          <Typography sx={{ fontSize: "12px" }}>
                            Whatsapp
                          </Typography>
                        </WhatsappShareButton>
                      </Stack>
                      <Stack direction="column">
                        <FacebookShareButton
                          url={`https://www.lokkan.site/property-view/${singlePropertyData?.property?.id}`}
                        >
                          <FacebookIcon round size={40} />
                          <Typography sx={{ fontSize: "12px" }}>
                            Facebook
                          </Typography>
                        </FacebookShareButton>
                      </Stack>
                      <Stack direction="column">
                        <EmailShareButton
                          url={`https://www.lokkan.site/property-view/${singlePropertyData?.property?.id}`}
                        >
                          <EmailIcon round size={40} />
                          <Typography sx={{ fontSize: "12px" }}>
                            Email
                          </Typography>
                        </EmailShareButton>
                      </Stack>
                      <Stack direction="column">
                        <BaseCopyText
                          text={`https://www.lokkan.site/property-view/${singlePropertyData?.property?.id}`}
                        />

                        <Typography sx={{ fontSize: "12px", mt: "6px" }}>
                          Copy URL
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </MenuItem>
              </Menu>
              <BaseFavoriteButton
                handleLoginOpen={handleLoginOpen}
                itemID={singlePropertyData?.property?.id}
              />
            </Stack>
          </Grid>
          {/* <Grid
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
          </Grid> */}
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
                videos={Videos}
                selectImage={selectImage}
                addressData={singlePropertyData?.property?.address}
                languageName={myValue.toString()}
                images={Images}
              />
            </Grid>
            {/* <Grid item xs={12} sx={{ mb: 1 }}>
              <Image src={sliderView} layout="responsive" alt="sliderView" />
            </Grid> */}
          </Grid>

          {/* <Box>
            <SlideImageMobile Images={Images} setSelectImage={setSelectImage} />
          </Box> */}
          <Grid container>
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
                addressData={singlePropertyData?.property?.address}
                languageName={myValue.toString()}
                videos={Videos}
                images={Images}
                others={true}
              />
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
              pt: { xs: 2, sm: 2, md: 0, lg: 0, xl: 0 },
              // pb: { xs: 0.5, sm: 0.5, md: 0, lg: 0, xl: 0 },
            }}
          >
            <AmountView
              negotiate={negotiate}
              setNegotiate={setNegotiate}
              schedule={schedule}
              setSchedule={setSchedule}
              singlePropertyData={singlePropertyData}
              languageName={myValue.toString()}
            />
          </Grid>
        </Box>
        <Box sx={{ mx: 3, mt: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
              <Box
                component="div"
                sx={{ p: 3, backgroundColor: "#f9f9fb" }}
                dangerouslySetInnerHTML={{
                  __html: singlePropertyData?.property?.property_description,
                }}
              ></Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
              <Features
                singlePropertyData={singlePropertyData}
                languageName={myValue.toString()}
              />

              {Object.keys(singlePropertyData?.propertyFeatures).map(
                (key, index) => (
                  <AboutProperty
                    key={index}
                    name={key}
                    array={singlePropertyData?.propertyFeatures[key]}
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
                languageName={myValue.toString()}
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
                href={`/property-view/${stateInfo.id}`}
                as={`/property-view/${stateInfo.id}`}
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
                languageName={myValue.toString()}
              />
            </>
          </Tooltip>
        </BaseModal>
      </main>
      <Grid
        item
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
          position: "fixed",
          bottom: 0,
          left: 0,
          backgroundColor: "#fff",
          width: "100%",
          p: 3,
        }}
        sm={6}
        md={6}
        xl={3}
        lg={3}
      >
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{
            width: "fit-content",
            mx: "auto",
          }}
        >
          <Button
            // disabled={
            //   session?.user?.role === "broker" ||
            //   session?.user?.role === "owner"
            // }
            variant="contained"
            color="primary"
            sx={{
              px: 4,
              fontSize: "16px",
              fontWeight: "600",
              textTransform: "none",
              minWidth: "250px",
              background: "#0E97F7",
              borderRadius: "4px",
              "&: hover": {
                px: 4,
                fontSize: "16px",
                fontWeight: "600",
                textTransform: "none",
                minWidth: "250px",
                background: "#0E97F7",
                borderRadius: "4px",
              },
            }}
            onClick={() => {
              setNegotiate(true);
              setSchedule(false);
            }}
          >
            {t["Negotiate"]}
          </Button>

          <Button
            // disabled={
            //   session?.user?.role === "broker" ||
            //   session?.user?.role === "owner"
            // }
            variant="contained"
            color="secondary"
            sx={{
              mt: 2,
              px: 4,
              fontSize: "16px",
              fontWeight: "600",
              textTransform: "none",
              minWidth: "250px",
              background: "#7450F0",
              borderRadius: "4px",
              "&: hover": {
                px: 4,
                fontSize: "16px",
                fontWeight: "600",
                textTransform: "none",
                minWidth: "250px",
                background: "#7450F0",
                borderRadius: "4px",
              },
            }}
            onClick={() => {
              setSchedule(true);
              setNegotiate(false);
            }}
          >
            {t["Schedule visit"]}
          </Button>
        </Grid>
      </Grid>
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

  const cookies = context.req.cookies["language"];

  console.log("single", singlePropertyData);
  return {
    props: {
      singlePropertyData: singlePropertyData,
      propertyDescription: stripHtmlTags(
        singlePropertyData?.property?.property_description
      ),
      tabArrayData:
        singlePropertyData?.property?.property_detail?.photo_types?.filter(
          (data) => data.slug.substr(data.slug.length - 3) !== "360"
        ),
      language: cookies,
    },
  };
}
