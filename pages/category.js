import {
  Box,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import React from "react";
import Navbar from "../src/component/shared/Navbar/Navbar";
import Footer from "../src/component/shared/Footer/Footer";
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

export default function Category({
  loginOpen,
  setLoginOpen,
  handleLoginOpen,
  handleLoginClose,
}) {
  return (
    <div>
      <Head>
        <title>Lokkan</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/negotiate.png" />
      </Head>

      <main className="section">
        <Navbar
          shape={false}
          paddingY={"1vh"}
          loginOpen={loginOpen}
          setLoginOpen={setLoginOpen}
          handleLoginClose={handleLoginClose}
          handleLoginOpen={handleLoginOpen}
        />
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            height: { xs: "40vh", sm: "40vh", md: "60vh" },
            // width: { xs: "120%", sm: "120%", md: "100%" },
            backgroundImage: {
              xs: `url(${categoryImage.src})`,
              sm: `url(${categoryImage.src})`,
              md: `url(${categoryImage.src})`,
              lg: `url(${categoryImage.src})`,
              xl: `url(${categoryImage.src})`,
            },
          }}
        >
          <Box
            sx={{
              position: { lg: "absolute", xl: "absolute" },
            }}
          ></Box>
        </Grid>
        <Grid
          container
          direction={{
            xs: "row",
            sm: "row",
            md: "row",
            lg: "column",
            xl: "column",
          }}
          gap={{ xs: 1, sm: 1, md: 1, lg: 0, xl: 0 }}
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{ pl: 5, pt: 2 }}
        >
          <Box>
            <Image src={blogLinkedIn} alt="linkedin" />
          </Box>
          <Box>
            <Image src={blogWhatsapp} alt="whatsapp" />
          </Box>
          <Box>
            <Image src={blogFacebook} alt="linkedin" />
          </Box>
          <Box>
            <Image src={blogTwitter} alt="linkedin" />
          </Box>
        </Grid>
        <Box
          sx={{
            px: { xs: 2, sm: 2, md: 2, lg: 25, xl: 25 },
            position: { lg: "relative", xl: "relative" },
            top: -240,
          }}
        >
          <CategoryUpperContent />
          <CategoryImageContent />
          <CategorySubscribe />
        </Box>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          sx={{ mt: { xs: 2, sm: 2, md: 1, lg: 0, xl: 0 } }}
        >
          <Typography
            variant="p"
            sx={{
              fontSize: "16px",
              fontWeight: "600",
              lineHeight: "19px",
              color: "#1A1859",
            }}
          >
            Related Post
          </Typography>
        </Grid>
        <Container maxWidth="xxl">
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
              pb: 3,
              // px: 3,
            }}
          >
            {[0, 1, 2, 3, 4].map((data, index) => (
              <ImageListItem
                key={index}
                cols={3}
                sx={{
                  width: {
                    xl: "95%",
                    lg: "95%",
                    md: "70%",
                    sm: "70%",
                    xs: "70%",
                  },
                }}
              >
                <BlogHighlightsCard />
              </ImageListItem>
            ))}
          </ImageList>
        </Container>

        <Footer />
      </main>
    </div>
  );
}
