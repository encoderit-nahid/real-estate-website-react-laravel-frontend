import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("@/component/shared/Navbar/Navbar"), {
  ssr: false,
});
const Footer = dynamic(() => import("@/component/shared/Footer/Footer"), {
  ssr: false,
});
import Head from "next/head";
import { Box, Tooltip } from "@mui/material";
import brokerBackgroundImage from "../public/Images/brokerBackground.png";
import { useSession } from "next-auth/react";
import { _baseURL } from "../consts";
import { useEffect, useState } from "react";
import SetCookie from "@/hooks/setCookie";
import en from "locales/en";
import pt from "locales/pt";
const BaseModal = dynamic(() =>
  import("@/component/reuseable/baseModal/BaseModal")
);
const BrokerContent = dynamic(() =>
  import("@/component/IAmBroker/BrokerContent/BrokerContent")
);
const KnowMoreContentBroker = dynamic(() =>
  import("@/component/IAmBroker/knowMoreContentBroker/KnowMoreContentBroker")
);

export default function Broker({
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
              xs: `url(${brokerBackgroundImage.src})`,
              sm: `url(${brokerBackgroundImage.src})`,
              md: `url(${brokerBackgroundImage.src})`,
              lg: `url(${brokerBackgroundImage.src})`,
              xl: `url(${brokerBackgroundImage.src})`,
            },
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%", // Set backgroundSize to cover the entire area
            minHeight: "100vh", // Ensure the box covers at least the viewport height
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
            <BrokerContent setKnowMoreModal={setKnowMoreModal} />
          </Box>
        </Box>
        <Footer />

        <BaseModal isShowing={knowMoreModal} isClose={handleKnowMoreModalClose}>
          <Tooltip title="Something">
            <>
              <KnowMoreContentBroker
                handleClose={handleKnowMoreModalClose}
                languageName={myValue.toString()}
                buttonName={"Cadastro de corretor"}
                href={{
                  pathname: "/registration",
                  query: {
                    user_type: "broker",
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
