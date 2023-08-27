import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import propertyImage from "../../../../public/Images/propertyImage.png";
import { _baseURL, _imageURL } from "../../../../consts";

function PropertyCard({ srcImage, amount }) {
  const myLoader = ({ src }) => {
    return `${_imageURL}/${src}`;
  };
  return (
    <Box
      sx={{
        border: "1px solid #9FAAB1",
        borderRadius: "6px",

        // height: { lg: "17.8vh", xl: "17.5vh", xxl: "18.5vh" },
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Box
            sx={{
              height: "100%",
              width: "100%",
              display: { xs: "none", sm: "none", md: "none", lg: "inline" },
            }}
          >
            <Image
              loader={myLoader}
              height={150}
              width={250}
              src={`${srcImage?.[0]?.file_path}`}
              alt="property"
            />
          </Box>
          <Box
            sx={{
              height: "100%",
              width: "100%",
              display: { xs: "inline", sm: "inline", md: "inline", lg: "none" },
            }}
          >
            <Image
              layout="responsive"
              height={300}
              src={propertyImage}
              alt="property"
            />
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ pt: { xs: 0, sm: 0, md: 0, lg: 0, xl: 3 } }}
          >
            <Typography
              variant="p"
              sx={{
                color: " #002152",
                fontSize: {
                  xs: "14px",
                  sm: "24px",
                  md: "24px",
                  lg: "24px",
                  xl: "24px",
                },
                fontWeight: "700",
                lineHeight: "32px",
              }}
            >
              {`${parseInt(amount.replaceAll(".00","").replaceAll(".","").replaceAll("R$","")).toLocaleString("pt-BR",{ style: 'currency', currency: 'BRL' })}`}
            </Typography>
            <Typography
              variant="p"
              sx={{
                color: "#9FAAB1",
                fontSize: {
                  xs: "10px",
                  sm: "16px",
                  md: "16px",
                  lg: "16px",
                  xl: "16px",
                },
                fontWeight: "400",
                lineHeight: {
                  xs: "16px",
                  sm: "24px",
                  md: "24px",
                  lg: "24px",
                  xl: "24px",
                },
              }}
            >
              Jaceguai Street, Bela Vista, São Paulo - SP - CEP 01315010
            </Typography>
            <Typography
              variant="p"
              sx={{
                color: "#9FAAB1",
                fontSize: {
                  xs: "10px",
                  sm: "16px",
                  md: "16px",
                  lg: "16px",
                  xl: "16px",
                },
                fontWeight: "400",
                lineHeight: {
                  xs: "16px",
                  sm: "24px",
                  md: "24px",
                  lg: "24px",
                  xl: "24px",
                },
              }}
            >
              created on: 08/18/2020
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PropertyCard;
