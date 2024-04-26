import Navbar from "../src/component/shared/Navbar/Navbar";
import Footer from "../src/component/shared/Footer/Footer";
import Head from "next/head";
import { Box, Tooltip } from "@mui/material";
import mobileGray from "../public/Images/mobileGray.png";
import ownerBackgroundImage from "../public/Images/ownerBackground.png";
import { useSession, signIn, signOut } from "next-auth/react";
import { _baseURL } from "../consts";
import { useEffect, useState } from "react";
import SetCookie from "@/hooks/setCookie";
import en from "locales/en";
import pt from "locales/pt";
import BaseModal from "@/component/reuseable/baseModal/BaseModal";
import KnowMoreContent from "@/component/home/knowMoreContent/KnowMoreContent";
import OwnerContent from "@/component/IAmOwner/ownerContent/OwnerContent";

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
                href={{
                  pathname: "/registration",
                  query: {
                    user_type: "owner",
                  },
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
