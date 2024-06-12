import { Box, Divider, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import logoWhiteIcon from "../../../../public/Images/branca-op1.png";
import facebook from "../../../../public/Images/facebook.png";
import twitter from "../../../../public/Images/twitter.png";
import instagram from "../../../../public/Images/instagram.png";
import linkedin from "../../../../public/Images/linkedin.png";
import { flexbox } from "@mui/system";
import Link from "next/link";

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#1A1859",
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Box sx={{ paddingX: 4, paddingY: 3 }}>
          <Image src={logoWhiteIcon} height={40} width={180} alt="logo" />
        </Box>
      </Grid>
      <Grid container spacing={2} sx={{ paddingX: 4, paddingBottom: 4 }}>
        <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ color: "#ffffff", fontSize: "14px" }}
          >
            <Typography variant="p">
              Lokkan serviços imobiliários LTDA.
            </Typography>
            <Typography variant="p">
              avenida paulista, 1439 - 1 andar - conj. 12
            </Typography>
            <Typography variant="p">
              jardim paulista - CEP 01311-200 - São Paulo / SP
            </Typography>
            <Typography variant="p">CRECI - SP 28810J</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ color: "#ffffff", fontSize: "14px" }}
          >
            <Link href="/termos-de-uso">
              <Typography variant="p" sx={{ cursor: "pointer" }}>
                termos de uso
              </Typography>
            </Link>
            <Link href="/politicas-de-privacidade">
              <Typography variant="p" sx={{ cursor: "pointer" }}>
                política de privacidade
              </Typography>
            </Link>
            <Link href="/contato">
              <Typography variant="p" sx={{ cursor: "pointer" }}>
                contato
              </Typography>
            </Link>
            <Link href="/user_manual">
              <Typography variant="p" sx={{ cursor: "pointer" }}>
                manual dos usuários
              </Typography>
            </Link>
            <Link href="/cookie_policy">
              <Typography variant="p" sx={{ cursor: "pointer" }}>
                política de cookies
              </Typography>
            </Link>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ color: "#ffffff", fontSize: "14px" }}
          >
            <Typography variant="p" sx={{ cursor: "pointer" }}>
              minha conta
            </Typography>
            <Link href="/cadastro-de-proprietario">
              <Typography variant="p" sx={{ cursor: "pointer" }}>
                anuncie seu imóvel
              </Typography>
            </Link>
            <Typography variant="p" sx={{ cursor: "pointer" }}>
              seja um consultor
            </Typography>
            <Link href="/blog">
              <Typography variant="p" sx={{ cursor: "pointer" }}>
                blog
              </Typography>
            </Link>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Box>
              <Link href="https://web.facebook.com/lokkan.com.br">
                <a target="_blank">
                  <Image src={facebook} height={30} width={15} alt="facebook" />
                </a>
              </Link>
            </Box>
            <Box sx={{ marginLeft: 2 }}>
              <Link href="https://www.instagram.com/lokkan.com.br/">
                <a target="_blank">
                  <Image
                    src={instagram}
                    height={30}
                    width={30}
                    alt="instagram"
                  />
                </a>
              </Link>
            </Box>
            <Box sx={{ marginLeft: 2 }}>
              <Link href="">
                <a target="_blank">
                  <Image src={twitter} height={30} width={30} alt="twitter" />
                </a>
              </Link>
            </Box>
            <Box sx={{ marginLeft: 2 }}>
              <Link href="https://www.linkedin.com/company/lokkan/">
                <a target="_blank">
                  <Image src={linkedin} height={30} width={30} alt="linkedin" />
                </a>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Divider sx={{ backgroundColor: "#3E50D8", height: 4 }} />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ paddingY: 2, paddingX: 3 }}
      >
        <Typography variant="p" sx={{ color: "#ffffff", fontSize: "14px" }}>
          © 2024. todos os direitos reservados a lokkan serviços imobiliários
          LTDA.
        </Typography>
      </Grid>
    </Box>
  );
}

export default Footer;
