import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import submitProposal from "../../../../public/Images/submit_proposal.png";
import stepFinish from "../../../../public/Images/step_finish.png";
import technologyImage from "../../../../public/Images/advertise.png";
import clientsImage from "../../../../public/Images/handshake.png";
import earnImage from "../../../../public/Images/broker_help.png";

import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import en from "locales/en";
import pt from "locales/pt";
import BaseButton from "@/component/reuseable/button/BaseButton";

function KnowMoreContentBroker({
  handleClose,
  languageName,
  buttonName,
  href,
}) {
  const style = {
    position: "absolute",
    top: "45%",
    left: "50%",
    // top:{xs:"80%"},
    transform: "translate(-50%, -50%)",
    width: { xs: "80%", sm: "80%", md: "60%", lg: "60%", xl: "60%" },
    bgcolor: "#ffffff",
    // border: "2px solid #000",
    boxShadow: "none",
    borderRadius: "12px",
    maxHeight: "85vh",
    overflowY: "scroll",
    px: 3,
    py: 2,
  };

  const t = languageName === "en" ? en : pt;

  const brokerData = [
    {
      name: "zero burocracia, 100% agilidade aumente seus lucros com a comissão mais alta do mercado",
      info: "Trabalhe com quem valoriza o seu trabalho e reconhece o seu esforço. na lokkan, você terá a oportunidade de ganhar a maior comissão do mercado imobiliário, com 70% do valor da comissão. seja recompensado pelo seu talento e dedicação!",
      imageSrc: clientsImage,
    },
    {
      name: "Processo de venda rápido: venda seu imóvel com facilidade e rapidez",
      info: "vender seu imóvel nunca foi tão fácil! Com a lokkan, todo o processo é feito online, de forma 100% digital e sem burocracia, incluindo documentação e assinatura digital. Ganhe tempo e agilidade!",
      imageSrc: clientsImage,
      imageSrc: technologyImage,
    },
    {
      name: "Documentação digital: agilize suas transações com a lokkan!",
      info: "tempo com a papelada e idas ao cartório! com a lokkan, a documentação para compra e venda de imóveis é digital, incluindo contratos, matrículas, certidões e consultas ao SPC e Serasa (vendedor). até a elaboração de escritura e assinatura são digitais, tudo para tornar sua vida mais fácil!",
      imageSrc: earnImage,
    },
  ];
  return (
    <Box sx={style}>
      <Box sx={{ width: "100%" }}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: "24px",
              fontWeight: "700",
              lineHeight: "32px",
              color: "#002152",
            }}
          >
            Quero evoluir
          </Typography>
          <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
        </Grid>
        <Grid container spacing={4} sx={{ pt: 2 }}>
          {brokerData?.map((data, index) => (
            <Grid item xs={12} md={6} lg={index === 0 ? 12 : 6} key={index}>
              <Grid
                container
                spacing={1}
                sx={{
                  backgroundColor: "#F9F9FB",
                  borderRadius: "6px",
                  paddingX: 4,
                  paddingY: 2.5,
                  position: { xs: "relative", sm: "relative" },
                  paddingBottom: `${index < 2 ? "4.5vh" : "1.5vh"}`,
                  //   mb: { xs: 2, xm: 2, md: 5, xl: 5, lg: 5 },
                }}
              >
                <Grid item xs={12}>
                  <Image
                    src={data.imageSrc}
                    alt="track"
                    height={index > 0 ? "125px" : ""}
                    width={index > 0 ? "200px" : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                  >
                    <Typography
                      variant="p"
                      sx={{
                        fontSize: "24px",
                        fontWeight: "700",
                        color: "#1A1859",
                      }}
                    >
                      {data.name}
                    </Typography>
                    <Typography
                      variant="p"
                      sx={{
                        fontSize: "18px",
                        fontWeight: "400",
                        color: "#7C7C99",
                      }}
                    >
                      {data?.info}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Link href={href}>
          <a
            style={{
              textDecoration: "none",
              listStyle: "none",
              width: "100%",
              display: "flex",
            }}
          >
            <BaseButton
              name={buttonName || t["search real estate"]}
              width={"100%"}
              fontSize={"24px"}
              borderRadius={"25px"}
              margin={"4vh 0 0 0"}
            />
          </a>
        </Link>
      </Box>
    </Box>
  );
}

export default KnowMoreContentBroker;
