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
import MobileSideContent from "../src/component/home/FullfillSideContent/MobileSideContent";
import BrokerImageContentMobile from "../src/component/home/whoIsBroker/brokerContent/BrokerImageContentMobile";
import BrokerHelp from "../src/component/IAmBroker/BrokerHelp/BrokerHelp";
import BrokerHelpContent from "../src/component/IAmBroker/BrokerHelp/BrokerHelpContent";
import BecomeBrokerContent from "../src/component/IAmBroker/BecomeBroker/BecomeBrokerContent";
import BecomeBroker from "../src/component/IAmBroker/BecomeBroker/BecomeBroker";
import CalulateComission from "../src/component/IAmBroker/MaxmizeResult/CalulateComission";
import ComissionResult from "../src/component/IAmBroker/MaxmizeResult/ComissionResult";
import BrokerFacilities from "../src/component/IAmBroker/BrokerFacilities/BrokerFacilities";
import advertiseImage from "../public/Images/advertise.png";
import wantImage from "../public/Images/Want.png";
import wantImageMobile from "../public/Images/mobileWant.png";
import trackImage from "../public/Images/track.png";
import digitalImage from "../public/Images/digital.png";
import fastImage from "../public/Images/fast.png";
import { useState } from "react";
import pt from "locales/pt";
import en from "locales/en";

const advertiseData = [
  {
    name: "Practicality",
    info: "Advertise your property and find out about everything that happens through the application.",
  },
  {
    name: "100% digital",
    info: "100% digital buying and selling process (scheduling visits, proposals, contracts, certificates, public deed)",
  },
  {
    name: "Documentation and digital signature",
    info: "Contract, registrations, certificates, consultations (SERASA, SPC - seller) with a click. Elaboration and signature of the deed digitally (without having to go to the notary).",
  },
  {
    name: "Fast selling process",
    info: "Receive the down payment right after the analysis of the documents. Fastest sales process on the market.",
  },
];

const PracticalData = [
  {
    name: "track everything online",
    info: "Announcements, schedules of visits and proposals all in the palm of your hands",
    imageSrc: trackImage,
  },
  {
    name: "100% digital processes",
    info: "Signing of contracts, issuance of certificates, documents and even public deed of purchase and sale, all digitally, without leaving home",
    imageSrc: digitalImage,
  },
  {
    name: "Fast sale!",
    info: "Fastest sales process on the market",
    imageSrc: fastImage,
  },
];

export default function Advertise({
  loginOpen,
  setLoginOpen,
  handleLoginOpen,
  handleLoginClose,
  language,
}) {
  const svgString = encodeURIComponent(
    renderToStaticMarkup(<WantSellSvgBackground />)
  );

  const [myValue, setMyValue] = useState(language || "pt");

  const t = myValue === "en" ? en : pt;

  const advertiseData = [
    {
      name: t["Practicality"],
      info: "descomplicar a compra e venda de imóveis é com a gente! todo o processo é feito online, de forma 100% digital e sem burocracia. conheça a facilidade que a lokkan pode trazer para sua vida!",
    },
    {
      name: "100% digital: faça transações mais rápidas e seguras!",
      info: "com a Lokkan, você pode esquecer a papelada e a burocracia. oferecemos todo o processo de compra e venda de imóveis 100% digital, incluindo documentação e assinatura. aproveite a facilidade e agilidade que a lokkan oferece!",
    },
    {
      name: "documentação digital: agilize suas transações com a Lokkan!",
      info: "não perca mais tempo com a papelada e idas ao cartório! com a Lokkan, a documentação para compra e venda de imóveis é digital, incluindo contratos, matrículas, certidões e consultas ao SPC e Serasa (vendedor). até a elaboração de escritura e assinatura são digitais, tudo para tornar sua vida mais fácil!",
    },
    {
      name: "Processo de venda rápido: venda seu imóvel com facilidade e rapidez",
      info: "vender seu imóvel nunca foi tão fácil! Com a lokkan, todo o processo é feito online, de forma 100% digital e sem burocracia, incluindo documentação e assinatura digital. Ganhe tempo e agilidade!",
    },
  ];

  const PracticalData = [
    {
      name: t["track everything online"],
      info: t[
        "Announcements, schedules of visits and proposals all in the palm of your hands"
      ],
      imageSrc: trackImage,
    },
    {
      name: t["100% digital processes"],
      info: t[
        "Signing of contracts, issuance of certificates, documents and even public deed of purchase and sale, all digitally, without leaving home"
      ],
      imageSrc: digitalImage,
    },
    {
      name: t["Fast sale!"],
      info: t["Fastest sales process on the market"],
      imageSrc: fastImage,
    },
  ];
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
          loginOpen={loginOpen}
          setLoginOpen={setLoginOpen}
          handleLoginClose={handleLoginClose}
          handleLoginOpen={handleLoginOpen}
          languageName={language}
          setMyValue={setMyValue}
          myValue={myValue}
        />
        <Grid
          container
          spacing={6}
          sx={{
            paddingRight: { xs: 5, sm: 5, md: 10, xl: 10, lg: 10 },
            marginTop: { xs: 2, sm: 2, md: 2, lg: 2, xl: 4 },
          }}
        >
          <Grid item xs={12} sm={12} md={12} xl={6} lg={6}>
            <BrokerHelp
              name={t["The best experience for you!"]}
              content="com a lokkan, a compra e venda de imóveis nunca foi tão fácil e rápida. todo o processo é 100% digital e sem burocracia, desde o agendamento de visitas até a escritura pública. não perca mais tempo com documentos e processos demorados, descubra a facilidade que a lokkan pode proporcionar para você!"
              fieldItem={true}
              buttonName={t["I want to advertise"]}
              loginOpen={loginOpen}
              setLoginOpen={setLoginOpen}
              handleLoginClose={handleLoginClose}
              handleLoginOpen={handleLoginOpen}
              languageName={myValue.toString()}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} xl={6} lg={6}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="flex-end"
              sx={{ height: { xs: 0, sm: 0, md: 0, lg: "55vh", xl: 0 } }}
            >
              <BrokerHelpContent imageSrc={advertiseImage} />
            </Grid>
          </Grid>
        </Grid>
        <Box
          sx={{
            backgroundColor: "#F9F9FB",
            paddingTop: { xs: 0, sm: 0, md: 5, lg: 5, xl: 5 },
            marginTop: {
              xs: 25,
              sm: 25,
              md: 15,
              lg: 15,
              xl: 15,
              xxl: 15,
              xxxl: 35,
            },

            paddingBottom: { xs: 2, sm: 2, md: 20, lg: 20, xl: 20 },
            // clipPath:
            //   "polygon(0 0, 13% 5%, 30% 10%, 53% 13%, 71% 10%, 100% 0, 100% 85%, 100% 100%, 85% 100%, 15% 100%, 0 100%, 0% 85%)",
            // clipPath: "circle(15em at 10% 40%)",
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
                pt: { xs: 2, sm: 2, md: 0, lg: 0, xl: 0 },
                pb: { xs: 2, sm: 2, md: 5, lg: 5, xl: 5 },
                color: "#1A1859",
                fontWeight: "800",
              }}
            >
              {t["Lokkan for your property"]}
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
                <BecomeBrokerContent />
              </Grid>
              <Grid item xs={12} sm={12} md={12} xl={6} lg={6}>
                <BecomeBroker
                  contentData={advertiseData}
                  buttonVisible={false}
                  languageName={myValue.toString()}
                />
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
              mb: { xs: 10, sm: 10, md: 0, lg: 0, xl: 0 },
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
              {t["Practical, simple and easy"]}
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
                <BrokerImageContentMobile imageSrc={wantImageMobile} />
              </Grid>
              <Grid item xs={12} sm={12} md={12} xl={6} lg={6}>
                <BrokerRegisterContent
                  contentData={PracticalData}
                  buttonVisible={false}
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
                <BrokerImageContent imageSrc={wantImage} />
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Footer />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const cookies = context.req.cookies["language"] || "pt";
  return {
    props: {
      language: cookies,
    },
  };
}
