import React from "react";
import { Box, Grid, Typography, Container } from "@mui/material";
import houseImage from "../../../../public/Images/house.png";
import bed from "../../../../public/Images/bed.png";
import rule from "../../../../public/Images/rule.png";
import check from "../../../../public/Images/check.png";
import Image from "next/image";
import Footer from "../../shared/Footer/Footer";

function HouseCard({ shadow, marginTop, propertyInfo }) {
  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "8px",
        pb: 3,
        boxShadow: shadow,
        marginTop: marginTop,
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Image src={houseImage} layout="responsive" alt="house" />
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
          sx={{ fontSize: "12px", fontWeight: "400", color: "#7C7C99", pt: 2 }}
        >
          Sale value:
        </Typography>
        <Typography
          variant="p"
          sx={{ fontSize: "24px", fontWeight: "800", color: "#0E97F7" }}
        >
          <span
            style={{ fontSize: "16px", fontWeight: "400", color: "#0E97F7" }}
          >
            BRL
          </span>
          {`${propertyInfo?.brl_rent}.00`}
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
            {`${propertyInfo?.no_of_rooms} bedrooms`}
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
            {`${propertyInfo?.property_type}`}
          </Typography>
        </Box>
      </Grid>
    </Box>
  );
}

export default HouseCard;
