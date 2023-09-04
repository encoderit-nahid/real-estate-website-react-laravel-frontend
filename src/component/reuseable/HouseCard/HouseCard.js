import React from "react";
import { Box, Grid, Typography, Container } from "@mui/material";
import houseImage from "../../../../public/Images/house.png";
import bed from "../../../../public/Images/bed.png";
import rule from "../../../../public/Images/rule.png";
import check from "../../../../public/Images/check.png";
import Image from "next/image";
import Footer from "../../shared/Footer/Footer";
import { _baseURL, _imageURL } from "../../../../consts";
import en from "locales/en";
import pt from "locales/pt";

function HouseCard({ shadow, marginTop, propertyInfo, languageName }) {
  const t = languageName === "en" ? en : pt;
  const myLoader = ({ src }) => {
    return `${_imageURL}/${src}`;
  };

  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "8px",
        pb: 3,
        boxShadow: shadow,
        marginTop: marginTop,
        cursor: "pointer",
      }}
    >
      <Box sx={{ width: "100%" }}>
        {/* <Image src={houseImage} layout="responsive" alt="house" /> */}
        <Image
          loader={myLoader}
          src={`${propertyInfo?.attachments[0]?.file_path}`}
          width={500}
          height={400}
          alt="house"
        />
      </Box>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        sx={{ pl: 3, pt: 2 }}
      >
        <Typography
          variant="p"
          sx={{ fontSize: "18px", fontWeight: "700", color: "#1A1859" }}
        >
          {propertyInfo?.address?.address}
        </Typography>
        <Typography
          variant="p"
          sx={{ fontSize: "16px", fontWeight: "400", color: "#1A1859" }}
        >
          {`${propertyInfo?.address?.city},${propertyInfo?.address?.state?.name}`}
        </Typography>
        <Typography
          variant="p"
          sx={{
            fontSize: "12px",
            fontWeight: "400",
            color: "#7C7C99",
            pt: 2,
          }}
        >
          {`${t["sale value"]}:`}
        </Typography>
        <Typography
          variant="p"
          sx={{ fontSize: "24px", fontWeight: "800", color: "#0E97F7" }}
        >
          <span
            style={{
              fontSize: "16px",
              fontWeight: "400",
              color: "#0E97F7",
            }}
          >
            R$
          </span>
          {` ${parseInt(propertyInfo?.brl_rent.replaceAll(".00","").replaceAll(".","").replaceAll("R$","")).toLocaleString("pt-BR",{ style: 'currency', currency: 'BRL' })}`}
        </Typography>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ pl: 3 }}
      >
        <Box>
          <Image src={bed} alt="bed" />
          <Typography
            variant="p"
            sx={{
              fontSize: "14px",
              fontWeight: "400",
              color: "#7C7C99",
              ml: "0.5vh",
            }}
          >
            {`${propertyInfo?.no_of_rooms} ${t["bedrooms"]}`}
          </Typography>
        </Box>
        <Box sx={{ pl: 1, pr: 1 }}>
          <Image src={rule} alt="rule" />
          <Typography
            variant="p"
            sx={{
              fontSize: "14px",
              fontWeight: "400",
              color: "#7C7C99",
              ml: "0.5vh",
            }}
          >
            {`${propertyInfo?.land_area}m²`}
          </Typography>
        </Box>
        <Box>
          <Image src={check} alt="rule" />
          <Typography
            variant="p"
            sx={{
              fontSize: "14px",
              fontWeight: "400",
              color: "#7C7C99",
              ml: "0.5vh",
            }}
          >
            {`${t[propertyInfo?.property_type]}`}
          </Typography>
        </Box>
      </Grid>
    </Box>
  );
}

export default HouseCard;
