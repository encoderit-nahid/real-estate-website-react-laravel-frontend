import Navbar from "../src/component/shared/Navbar/Navbar";
import Footer from "../src/component/shared/Footer/Footer";
import shapeIcon from "../public/Images/eclipseShape.png";
import Head from "next/head";
import {
  Box,
  Grid,
  Typography,
  Container,
  ImageList,
  ImageListItem,
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
import MobileSideContent from "../src/component/home/FullfillSideContent/mobileSideContent";
import BrokerImageContentMobile from "../src/component/home/whoIsBroker/brokerContent/BrokerImageContentMobile";

export default function App(props) {
  const svgString = encodeURIComponent(
    renderToStaticMarkup(<WantSellSvgBackground />)
  );
  const svgDealsString = encodeURIComponent(
    renderToStaticMarkup(<BestDealSvgBackground />)
  );
  return (
    <div>
      <Head>
        <title>Real Estate App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
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
        <Navbar shape={true} />
        <Grid
          container
          spacing={2}
          sx={{ paddingRight: { xs: 5, sm: 5, md: 10, xl: 10, lg: 10 } }}
        >
          <Grid item xs={12} sm={12} md={12} xl={6} lg={6}>
            <FulfillDream />
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
              marginLeft: 5,

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
              mt: { xs: 8, sm: 8, md: 0, xl: 0, lg: 0 },
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
              For those who want to sell
            </Typography>
          </Grid>
          <Container
            maxWidth="lg"
            sx={{ mt: { xs: 8, sm: 8, md: 0, xl: 0, lg: 0 } }}
          >
            <Grid
              container
              spacing={2}

              // className="shape-circle"
            >
              <Grid item xs={12} sm={12} md={12} xl={6} lg={6}>
                <SellSideContent />
              </Grid>
              <Grid item xs={12} sm={12} md={12} xl={6} lg={6}>
                <WantToSell />
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
              For anyone who is a broker
            </Typography>
          </Grid>
          <Container maxWidth="lg">
            <Grid
              container
              spacing={2}

              // className="shape-circle"
            >
              <Grid
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
                <BrokerImageContentMobile />
              </Grid>
              <Grid item xs={12} sm={12} md={12} xl={6} lg={6}>
                <BrokerRegisterContent />
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
                <BrokerImageContent />
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
            The Best Deals For You
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
          <Container maxWidth="lg">
            <ImageList
              // container
              // spacing={3}
              cols={3}
              gap={4}
              sx={{
                gridAutoFlow: "column",
                gridTemplateColumns:
                  "repeat(auto-fill,minmax(110px,1fr)) !important",
                gridAutoColumns: "minmax(110px, 1fr)",

                // px: 3,
                pl: 3,
              }}
            >
              {[0, 1, 2].map((data, index) => (
                <ImageListItem
                  key={index}
                  cols={3}
                  sx={{
                    width: {
                      xl: "90%",
                      lg: "90%",
                      md: "70%",
                      sm: "70%",
                      xs: "70%",
                    },
                  }}
                >
                  <HouseCard />
                </ImageListItem>
              ))}
            </ImageList>
          </Container>
        </Box>
        <Footer />
      </main>
    </div>
  );
}
