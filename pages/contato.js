// import Footer from "@/component/shared/Footer/Footer";
// import { Container, Typography } from "@mui/material";
// import Head from "next/head";
// import React from "react";

// const Contato = () => {
//   return (
//     <div>
//       <Head>
//         <title>Lokkan</title>
//         <meta name="description" content="Generated by create next app" />
//         <link rel="icon" href="/negotiate.png" />
//       </Head>
//       <main className="section">
//         <Container maxWidth="lg" sx={{ py: 5, minHeight: "80svh" }}>
// <Typography variant="h6">Entre em contato com a Lokkan!</Typography>
// <Typography variant="h5" sx={{ fontWeight: 800 }}>
//   Lokkan: Seu parceiro completo em soluções imobiliárias!
// </Typography>
// <Typography variant="p">
//   Precisa de ajuda para comprar, vender ou alugar um imóvel? A Lokkan
//   está aqui para te auxiliar em todas as suas necessidades
//   imobiliárias! Nossa equipe de especialistas está pronta para
//   oferecer:
// </Typography>
// <ul>
//   <li>
//     <Typography variant="p">
//       Atendimento personalizado: Esclarecemos dúvidas, fornecemos
//       informações detalhadas sobre nossos serviços e encontramos a
//       solução ideal para você.
//     </Typography>
//   </li>
//   <li>
//     <Typography variant="p">
//       Visitas virtuais: Conheça os imóveis à distância, com conforto e
//       segurança, através de passeios virtuais interativos.
//     </Typography>
//   </li>
//   <li>
//     <Typography variant="p">
//       Acompanhamento: Do ​​início ao fim do processo, estamos ao seu
//       lado para garantir uma experiência tranquila e segura.
//     </Typography>
//   </li>
// </ul>
// <Typography variant="p">Entre em contato conosco:</Typography>
// <ul>
//   <li>
//     <Typography variant="p">Telefone: (11) 91128-0640</Typography>
//   </li>
//   <li>
//     <Typography variant="p">WhatsApp: (11) 91128-0640</Typography>
//   </li>
//   <li>
//     <Typography variant="p">
//       E-mail: [endereço de e-mail removido]
//     </Typography>
//   </li>
// </ul>
// <Typography variant="p" sx={{ display: "block", mt: 1 }}>
//   Fique à vontade para nos contatar a qualquer momento!
// </Typography>
// <Typography variant="p" sx={{ display: "block", mt: 1 }}>
//   Lokkan: A sua melhor escolha para realizar seus sonhos imobiliários!
// </Typography>
// <Typography variant="p" sx={{ display: "block", mt: 1 }}>
//   #lokkan #imobiliaria #compra #venda #aluguel #imóvel #casa
//   #apartamento #fácil #rápido #seguro #atendimento #especializado
//   #inovação #tecnologia #futuro #investimento #realização #sonho
// </Typography>
//         </Container>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default Contato;
import {
  Box,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("@/component/shared/Navbar/Navbar"), {
  ssr: false,
});
const Footer = dynamic(() => import("@/component/shared/Footer/Footer"), {
  ssr: false,
});
import Head from "next/head";
import categoryImage from "../public/Images/category.png";
import BlogCardUpper from "../src/component/blog/blogCardUpper/BlogCardUpper";
import blogLinkedIn from "../public/Images/blogLinkedin .png";
import blogWhatsapp from "../public/Images/blogWhatsapp.png";
import blogTwitter from "../public/Images/blogTwitter.png";
import blogFacebook from "../public/Images/blogFacebook.png";
import category_small from "../public/Images/category_small.png";
import Image from "next/image";
import CategoryUpperContent from "../src/component/category/categoryUpperContent/CategoryUpperContent";
import CategoryImageContent from "../src/component/category/categoryImageContent/CategoryImageContent";
import blue_facebook from "../public/Images/blue_facebook.png";
import blue_twitter from "../public/Images/blue_twitter.png";
import blue_linkedin from "../public/Images/blue_linkedin.png";
import blue_whatsapp from "../public/Images/blue_whatsapp.png";
import CategorySubscribe from "../src/component/category/categorySubscribe/CategorySubscribe";
import BlogHighlightsCard from "../src/component/blog/blogHighlightsCard/BlogHighlightsCard";
import PrivacyContent from "../src/component/privacy/privacyContent/PrivacyContent";
import BaseWhatsappButton from "@/component/reuseable/baseWhatsappButton/BaseWhatsappButton";
import Link from "next/link";

function Contato() {
  return (
    <div>
      <Head>
        <title>Lokkan</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/negotiate.png" />{" "}
      </Head>

      <main className="section">
        <Navbar
          shape={false}
          paddingY={"1vh"}
          language="pt"
          myValue="pt"
          colorLogo
        />
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            height: { xs: "25vh", sm: "25vh", md: "25vh" },
            // width: { xs: "120%", sm: "120%", md: "100%" },
            background: "linear-gradient(90deg, #20BAF6 0%, #7450F0 100%)",
          }}
        >
          <Box
            sx={{
              position: { lg: "absolute", xl: "absolute" },
            }}
          ></Box>
        </Grid>

        <Box
          sx={{
            px: { xs: 2, sm: 2, md: 2, lg: 25, xl: 25 },
            position: { lg: "relative", xl: "relative" },
            top: -120,
          }}
        >
          <PrivacyContent name="Contato">
            <Typography mt={4} mb={2} variant="h6">
              Lokkan: Sua jornada tecnológica para seu novo imóvel começa agora!
            </Typography>
            {/* <Typography variant="h5" sx={{ fontWeight: 800 }}>
              Lokkan: Sua jornada tecnológica para seu novo imóvel começa agora!
            </Typography> */}
            <Typography variant="p">
              Descubra um universo de possibilidades e realize seus sonhos com a
              Lokkan, a sua parceira completa no mercado imobiliário.
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              Na Lokkan, você encontra:
            </Typography>
            <ul>
              <li>
                <Typography variant="p">
                  Tecnologia de ponta: Plataforma online completa, busca
                  inteligente, visitas virtuais imersivas, assinatura digital e
                  muito mais para tornar sua experiência mais prática, rápida e
                  segura.
                </Typography>
              </li>
              <li>
                <Typography variant="p">
                  Diferenciais exclusivos: Compra garantida, maior comissão do
                  mercado, anúncios ilimitados e processo 100% digital para
                  garantir a sua tranquilidade e o seu sucesso.
                </Typography>
              </li>
              <li>
                <Typography variant="p">
                  Atendimento personalizado: Uma equipe de especialistas
                  experientes e apaixonados por realizar sonhos, prontos para te
                  guiar em cada etapa da sua jornada.
                </Typography>
              </li>
              <li>
                <Typography variant="p">
                  Compromisso com a sua felicidade: Acreditamos que a casa dos
                  seus sonhos é a chave para a sua realização pessoal, e por
                  isso, trabalhamos incansavelmente para te entregar o imóvel
                  perfeito para você.
                </Typography>
              </li>
            </ul>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              Dê o primeiro passo para o seu novo imóvel!
            </Typography>
            <Typography variant="p">Entre em contato conosco:</Typography>

            <Typography variant="p">Muito obrigado,</Typography>

            <Typography variant="p" sx={{ fontWeight: 600 }}>
              Equipe Lokkan
            </Typography>

            <Box sx={{ width: "10%", py: 1 }}>
              <BaseWhatsappButton />
            </Box>

            <Typography variant="p">atendimento@lokkan.com.br</Typography>
            <Link href="https://www.lokkan.com.br">
              <a target="_blank">www.lokkan.com.br</a>
            </Link>

            {/* <Typography variant="p" sx={{ display: "block", mt: 1 }}>
              Fique à vontade para nos contatar a qualquer momento!
            </Typography>
            <Typography variant="p" sx={{ display: "block", mt: 1 }}>
              Lokkan: A sua melhor escolha para realizar seus sonhos
              imobiliários!
            </Typography>
            <Typography variant="p" sx={{ display: "block", mt: 1 }}>
              #lokkan #imobiliaria #compra #venda #aluguel #imóvel #casa
              #apartamento #fácil #rápido #seguro #atendimento #especializado
              #inovação #tecnologia #futuro #investimento #realização #sonho
            </Typography> */}
          </PrivacyContent>
        </Box>

        <Footer />
      </main>
    </div>
  );
}

export default Contato;
