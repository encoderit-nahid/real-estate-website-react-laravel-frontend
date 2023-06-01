import Navbar from "../src/component/shared/Navbar/Navbar";
import Footer from "../src/component/shared/Footer/Footer";
import shapeIcon from "../public/Images/eclipseShape.png";
import Head from "next/head";
import dynamic from "next/dynamic";
import {
  Box,
  Grid,
  Typography,
  Container,
  ImageList,
  ImageListItem,
  Skeleton,
} from "@mui/material";
import FulfillDream from "../src/component/home/fullfill/FulfillDream";
import SideContent from "../src/component/home/FullfillSideContent/SideContent";
import SellSideContent from "../src/component/home/wantToSellSideContent/SellSideContent";
import mobileGray from "../public/Images/mobileGray.png";
import mobileBlue from "../public/Images/mobileBlue.png";
import WantSellSvgBackground from "../src/component/svg/WantSellSvgBackground";
import { renderToStaticMarkup } from "react-dom/server";
import WantToSell from "../src/component/home/wantToSell/WantToSell";
import BrokerRegisterContent from "../src/component/home/whoIsBroker/brokerRegister/BrokerRegisterContent";
import BrokerImageContent from "../src/component/home/whoIsBroker/brokerContent/BrokerImageContent";
import BestDealSvgBackground from "../src/component/svg/BestDealSvgBackground";
import HouseCard from "../src/component/reuseable/HouseCard/HouseCard";
import MobileSideContent from "../src/component/home/FullfillSideContent/MobileSideContent";
import BrokerImageContentMobile from "../src/component/home/whoIsBroker/brokerContent/BrokerImageContentMobile";
import whoBroker from "../public/Images/who_broker.png";
import whoBrokerMobile from "../public/Images/who_broker_mobile.png";
import technologyImage from "../public/Images/technology.png";
import clientsImage from "../public/Images/clients.png";
import earnImage from "../public/Images/earn.png";
import { useSession, signIn, signOut } from "next-auth/react";
import { _baseURL } from "../consts";
import { bestDealsApi } from "../src/api";
import { useEffect, useState } from "react";
import Link from "next/link";
import Slider from "react-slick";
import GetCookie from "@/hooks/getCookie";
import Cookies from "js-cookie";
import SetCookie from "@/hooks/setCookie";
import en from "locales/en";
import pt from "locales/pt";
// import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'

export default function App({
  loginOpen,
  setLoginOpen,
  handleLoginOpen,
  handleLoginClose,
  language,
  data,
}) {
  const svgString = encodeURIComponent(
    renderToStaticMarkup(<WantSellSvgBackground />)
  );
  const svgDealsString = encodeURIComponent(
    renderToStaticMarkup(<BestDealSvgBackground />)
  );
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  const [myValue, setMyValue] = useState(language || "pt");

  useEffect(() => {
    // console.log("myValue", myValue);
    SetCookie("language", myValue);
  }, [myValue]);

  const t = myValue === "en" ? en : pt;

  const brokerData = [
    {
      name: t["High technology and low bureaucracy"],
      info: "Digital and simplified sales process, which provides agility and transparency, allowing you to focus on your customer.",
      imageSrc: technologyImage,
    },
    {
      name: t["Clients and full assistance"],
      info: "Simple ad system combined with complete assistance in the end-to-end buying and selling process. From announcement to public deed.",
      imageSrc: clientsImage,
    },
    {
      name: t["earn more"],
      info: "We offer the best technologies, the most complete and agile advice on the market and the highest commission, the broker gets up to 70% of the total commission.",
      imageSrc: earnImage,
    },
  ];

  useEffect(() => {
    setIsLoading(false);
  }, [data]);

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div>
      <Head>
        <title>Lokkan</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/negotiate.png" />
      </Head>

      <main className="section">
        <Grid
          className="box box1"
          sx={{
            display: {
              xs: "none",
              sm: "none",
              md: "none",
              xl: "inline",
              lg: "inline",
            },
          }}
        ></Grid>
        <Navbar
          shape={true}
          loginOpen={loginOpen}
          setLoginOpen={setLoginOpen}
          handleLoginClose={handleLoginClose}
          handleLoginOpen={handleLoginOpen}
          session={session}
          language={true}
          languageName={language}
          setMyValue={setMyValue}
          myValue={myValue}
        />
        <Grid
          container
          spacing={2}
          sx={{ paddingRight: { xs: 5, sm: 5, md: 10, xl: 10, lg: 10 } }}
        >
          <Grid item xs={12} sm={12} md={12} xl={6} lg={6}>
            <FulfillDream languageName={myValue.toString()} />
          </Grid>
          <Grid
            item
            xl={6}
            lg={6}
            md={12}
            sx={{
              display: {
                xs: "none",
                sm: "none",
                xl: "inline",
                lg: "inline",
                md: "inline",
              },
            }}
          >
            <SideContent />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            sx={{
              marginLeft: { xs: 2, sm: 2, md: 5, lg: 5, xl: 5 },

              display: {
                xl: "none",
                lg: "none",
                md: "none",
                xs: "inline",
                sm: "inline",
              },
            }}
          >
            <MobileSideContent />
          </Grid>
        </Grid>
        <Box
          sx={{
            // backgroundColor: "#F9F9FB",
            paddingTop: { xs: 5, sm: 5, md: 15, lg: 25, xl: 25 },
            paddingBottom: 5,
            // clipPath:
            //   "polygon(0 0, 13% 5%, 30% 10%, 53% 13%, 71% 10%, 100% 0, 100% 85%, 100% 100%, 85% 100%, 15% 100%, 0 100%, 0% 85%)",
            // clipPath: "circle(15em at 10% 40%)",
            backgroundImage: {
              xs: `url(${mobileGray.src})`,
              sm: `url(${mobileGray.src})`,
              md: `url("data:image/svg+xml,${svgString}")`,
              lg: `url("data:image/svg+xml,${svgString}")`,
              xl: `url("data:image/svg+xml,${svgString}")`,
            },
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
              mt: { xs: 8, sm: 8, md: 8, xl: 0, lg: 0 },
              pb: 5,
              px: { xs: "2.5vh", sm: "2.5vh" },
            }}
          >
            <Typography
              variant="p"
              sx={{
                fontSize: {
                  sm: "32px",
                  xs: "32px",
                  md: "40px",
                  lg: "40px",
                  xl: "40px",
                },
                color: "#1A1859",
                fontWeight: "800",
              }}
            >
              {t["For those who want to sell"]}
            </Typography>
          </Grid>
          <Container
            maxWidth="lg"
            sx={{
              mt: { xs: 8, sm: 8, md: 8, xl: 0, lg: 0 },
              paddingLeft: 0,
            }}
          >
            <Grid
              container
              spacing={1}
              sx={{ ml: { xs: 0, sm: 0, md: 0, lg: 2, xl: 2 } }}

              // className="shape-circle"
            >
              <Grid item xs={12} sm={12} md={12} xl={5} lg={5}>
                <SellSideContent />
              </Grid>
              <Grid item xs={12} sm={12} md={12} xl={6} lg={6}>
                <WantToSell languageName={myValue.toString()} />
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Box>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
              pb: { xs: 4, sm: 4, md: 5, lg: 5, xl: 5 },
              pt: { xs: 2, sm: 2, md: 6, lg: 6, xl: 6 },
              px: { xs: "2.5vh", sm: "2.5vh" },
            }}
          >
            <Typography
              variant="p"
              sx={{
                fontSize: {
                  sm: "32px",
                  xs: "32px",
                  md: "40px",
                  lg: "40px",
                  xl: "40px",
                },
                color: "#1A1859",
                fontWeight: "800",
              }}
            >
              {t["For anyone who is a broker"]}
            </Typography>
          </Grid>
          <Container maxWidth="lg" sx={{ paddingLeft: 0 }}>
            <Grid
              container
              spacing={2}
              sx={{
                mt: { xs: 10, sm: 10, md: 9, xl: 0, lg: 0 },
                ml: { xs: 0, sm: 0, md: 0, lg: 2, xl: 2 },
              }}
              // className="shape-circle"
            >
              <Grid
                className="broker"
                item
                xs={12}
                sm={12}
                md={12}
                xl={6}
                lg={6}
                sx={{
                  display: {
                    xl: "none",
                    lg: "none",
                    md: "inline",
                    xs: "inline",
                    sm: "inline",
                  },
                }}
              >
                <BrokerImageContentMobile imageSrc={whoBrokerMobile} />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                xl={6}
                lg={6}
                className="broker"
                sx={{
                  ml: { xs: 1.1, sm: 1.1, md: 0, lg: 0, xl: 0 },
                  mr: { xs: 0.9, sm: 0.9, md: 0, lg: 0, xl: 0 },
                }}
              >
                <BrokerRegisterContent
                  languageName={myValue.toString()}
                  contentData={brokerData}
                  buttonVisible={true}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                xl={6}
                lg={6}
                sx={{
                  display: {
                    xl: "inline",
                    lg: "inline",
                    md: "none",
                    xs: "none",
                    sm: "none",
                  },
                }}
              >
                {/* <WantToSell /> */}
                <BrokerImageContent imageSrc={whoBroker} />
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            pb: { xs: 2, sm: 2, md: 5, lg: 5, xl: 5 },
            pt: { xs: 2, sm: 2, md: 6, lg: 6, xl: 6 },
            px: { xs: "2.5vh", sm: "2.5vh" },
          }}
        >
          <Typography
            variant="p"
            sx={{
              fontSize: {
                sm: "32px",
                xs: "32px",
                md: "40px",
                lg: "40px",
                xl: "40px",
              },
              color: "#1A1859",
              fontWeight: "800",
            }}
          >
            {t["The best deals for you"]}
          </Typography>
        </Grid>
        <Box
          sx={{
            // backgroundColor: "#F9F9FB",
            paddingBottom: 5,
            paddingTop: { xs: 5, sm: 5, md: 0, lg: 0, xl: 0 },
            // clipPath:
            //   "polygon(0 0, 13% 5%, 30% 10%, 53% 13%, 71% 10%, 100% 0, 100% 85%, 100% 100%, 85% 100%, 15% 100%, 0 100%, 0% 85%)",
            // clipPath: "circle(15em at 10% 40%)",
            backgroundImage: {
              xs: `url(${mobileBlue.src})`,
              sm: `url(${mobileBlue.src})`,
              md: `url("data:image/svg+xml,${svgDealsString}")`,
              lg: `url("data:image/svg+xml,${svgDealsString}")`,
              xl: `url("data:image/svg+xml,${svgDealsString}")`,
            },
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <Container maxWidth="xl">
            <Slider {...settings}>
              {/* <ImageList
							container
							spacing={3}

							cols={3}
							gap={4}
							sx={{
								gridAutoFlow: 'column',
								gridTemplateColumns:
									'repeat(auto-fill,minmax(110px,1fr)) !important',
								gridAutoColumns: 'minmax(110px, 1fr)',
							}}
							> */}
              {isLoading
                ? [0, 1, 2, 3].map((data, index) => (
                    <Box
                      key={index}
                      cols={3}
                      sx={{
                        width: {
                          xl: "95%",
                          lg: "95%",
                          md: "70%",
                          sm: "70%",
                          xs: "70%",
                        },
                      }}
                    >
                      <Skeleton
                        variant="rect"
                        height={220}
                        sx={{
                          mx: 2,
                          my: 2,
                          borderRadius: "8px",
                        }}
                      />
                      <Box sx={{ mx: 2, my: 1 }}>
                        <Skeleton width="60%" />
                        <Skeleton width="60%" />
                        <Skeleton width="60%" />
                        <Skeleton />
                      </Box>
                    </Box>
                  ))
                : data?.property?.map((stateInfo, index) => (
                    <Link
                      key={stateInfo.id}
                      href={`/property_view/${stateInfo.id}`}
                      as={`/property_view/${stateInfo.id}`}
                    >
                      <Box sx={{ pl: 5 }}>
                        <HouseCard
                          propertyInfo={stateInfo}
                          languageName={myValue.toString()}
                        />
                      </Box>
                    </Link>
                  ))}
            </Slider>
          </Container>
        </Box>
        <Footer />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const base_url = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${base_url}/api/property/best-deals`);
  const data = await res.json();

  const cookies = context.req.cookies["language"] || "pt";

  // console.log('sfas', data)
  // if (!data) {
  // 	return {
  // 		notFound: true,
  // 	}
  // }

  // console.log({ cookies })

  return {
    props: { data: data, language: cookies }, // will be passed to the page component as props
  };
}
