import Navbar from "../src/component/shared/Navbar/Navbar";
import Footer from "../src/component/shared/Footer/Footer";
import Head from "next/head";
import { Box, Tooltip } from "@mui/material";
import FulfillDream from "../src/component/home/fullfill/FulfillDream";
import mobileGray from "../public/Images/mobileGray.png";
import backgroundImage from "../public/Images/background.png";
import { useSession, signIn, signOut } from "next-auth/react";
import { _baseURL } from "../consts";
import { useEffect, useState } from "react";
import SetCookie from "@/hooks/setCookie";
import en from "locales/en";
import pt from "locales/pt";
import BaseModal from "@/component/reuseable/baseModal/BaseModal";
import KnowMoreContent from "@/component/home/knowMoreContent/KnowMoreContent";

export default function App({
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
        <title>Lokkan - A imobiliária digital</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/negotiate.png" />
      </Head>

      <main className="section">
        <Box
          sx={{
            backgroundImage: {
              xs: `url(${backgroundImage.src})`,
              sm: `url(${backgroundImage.src})`,
              md: `url(${backgroundImage.src})`,
              lg: `url(${backgroundImage.src})`,
              xl: `url(${backgroundImage.src})`,
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
            <FulfillDream setKnowMoreModal={setKnowMoreModal} />
          </Box>
        </Box>
        <Footer />

        <BaseModal isShowing={knowMoreModal} isClose={handleKnowMoreModalClose}>
          <Tooltip title="Something">
            <>
              <KnowMoreContent
                handleClose={handleKnowMoreModalClose}
                languageName={myValue.toString()}
                href={{
                  pathname: "/search_real_estate",
                }}
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
