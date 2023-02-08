import Navbar from "../src/component/shared/Navbar/Navbar";
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
import orionImage from "../public/Images/orion_view.svg";
import Image from "next/image";
import TabView from "../src/component/PropertyView/tab/TabView";
import AmountView from "../src/component/PropertyView/amount/AmountView";
import Features from "../src/component/PropertyView/feature/Features";
import AboutProperty from "../src/component/PropertyView/AboutProperty/AboutProperty";
import Negotiate from "../src/component/PropertyView/Negotiate/Negotiate";
import HouseCard from "../src/component/reuseable/HouseCard/HouseCard";
import Footer from "../src/component/shared/Footer/Footer";
import SliderView from "../src/component/PropertyView/slider/SliderView";
import SlideImage from "../src/component/PropertyView/slideImage/SlideImage";
import SliderViewMobile from "../src/component/PropertyView/SliderViewMobile/SliderViewMobile";
import sliderView from "../public/Images/sliderView.png";
import sliderViewSmall from "../public/Images/sliderViewSmall.png";
import BaseModal from "../src/component/reuseable/baseModal/BaseModal";
import ProposalModal from "../src/component/PropertyView/ProposalModal/ProposalModal";
import { useState } from "react";

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

export default function PropertyView(props) {
  //add_proposal_modal
  const [proposalOpen, setProposalOpen] = useState(false);
  const handleProposalOpen = () => setProposalOpen(true);
  const handleProposalClose = () => setProposalOpen(false);

  return (
    <div>
      <Head>
        <title>Real Estate App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="section">
        <Navbar shape={false} paddingY={"1vh"} />
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
                Rua Carlos Vicari | Água Branca São Paulo - SP
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
            <TabView />
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
            <Grid item xs={12}>
              <Image src={sliderView} alt="sliderView" />
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
              <SliderView />
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
              <SlideImage />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mx: { xs: 1, sm: 3, md: 3, lg: 3, xl: 3 } }}>
          <Grid
            container
            direction="row"
            alignItems="center"
            sx={{
              height: "45vh",
              background: "#0E97F7",
              px: { xs: 2, sm: 2, md: 2, lg: 20, xl: 20 },
              pt: { xs: 2, sm: 2, md: 2, lg: 0, xl: 0 },
              // pb: { xs: 0.5, sm: 0.5, md: 0, lg: 0, xl: 0 },
              mt: 1,
            }}
          >
            <AmountView />
          </Grid>
        </Box>
        <Box sx={{ mx: 3, mt: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
              <Features />
              <AboutProperty name="About the property" array={aboutProperty} />
              <AboutProperty name="About the condo" array={aboutCondo} />
              <AboutProperty name="surroundings" array={surroundings} />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
              <Negotiate handleProposalOpen={handleProposalOpen} />
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
            }}
          >
            {[0, 1, 2, 3, 4, 5, 6].map((data, index) => (
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
                <HouseCard shadow={"0px 4px 18px rgba(0, 0, 0, 0.1)"} />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
        <Footer />

        <BaseModal isShowing={proposalOpen} isClose={handleProposalClose}>
          <ProposalModal handleProposalClose={handleProposalClose} />
        </BaseModal>
      </main>
    </div>
  );
}
