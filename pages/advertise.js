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
  Tooltip,
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
import ownerBackgroundImage from "../public/Images/ownerBackground.png";
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
import BaseModal from "@/component/reuseable/baseModal/BaseModal";
import KnowMoreContent from "@/component/home/knowMoreContent/KnowMoreContent";
import OwnerContent from "@/component/IAmOwner/ownerContent/OwnerContent";
// import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'

export default function Advertise({
  loginOpen,
  setLoginOpen,
  handleLoginOpen,
  handleLoginClose,
  language,
}) {
  const { data: session } = useSession();

  const [myValue, setMyValue] = useState(language || "pt");

  useEffect(() => {
    SetCookie("language", myValue);
  }, [myValue]);

  const t = myValue === "en" ? en : pt;

  const [knowMoreModal, setKnowMoreModal] = useState(false);
  const handleKnowMoreModalOpen = () => {
    setKnowMoreModal(true);
  };
  const handleKnowMoreModalClose = () => {
    setKnowMoreModal(false);
  };

  return (
    <div>
      <Head>
        <title>Lokkan</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/negotiate.png" />
      </Head>

      <main className="section">
        <Box
          sx={{
            backgroundImage: {
              xs: `url(${mobileGray.src})`,
              sm: `url(${mobileGray.src})`,
              md: `url(${ownerBackgroundImage.src})`,
              lg: `url(${ownerBackgroundImage.src})`,
              xl: `url(${ownerBackgroundImage.src})`,
            },
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%", // Set backgroundSize to cover the entire area
            minHeight: "100vh", // Ensure the box covers at least the viewport height
            // display: "flex",
            // flexDirection: "column",
            // justifyContent: "center", // Center content vertically
            // alignItems: "center", // Center content horizontally
          }}
        >
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

          <Box>
            <OwnerContent setKnowMoreModal={setKnowMoreModal} />
          </Box>
        </Box>
        <Footer />

        <BaseModal isShowing={knowMoreModal} isClose={handleKnowMoreModalClose}>
          <Tooltip title="Something">
            <>
              <KnowMoreContent
                handleClose={handleKnowMoreModalClose}
                languageName={myValue.toString()}
                buttonName={"Quero vender agora"}
              />
            </>
          </Tooltip>
        </BaseModal>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const cookies = context.req.cookies["language"] || "pt";

  return {
    props: { language: cookies }, // will be passed to the page component as props
  };
}
