import React from "react";
import { Button, Grid, Typography, Box } from "@mui/material";
import Image from "next/image";
import bed from "../../../../public/Images/bed.png";
import rule from "../../../../public/Images/rule.png";
import check from "../../../../public/Images/check.png";
import bath from "../../../../public/Images/bath.png";
import building from "../../../../public/Images//building.svg";
import car from "../../../../public/Images/car.png";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";

function Features() {
  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      sx={{ pl: 3 }}
    >
      <Typography
        variant="p"
        sx={{ color: "#1A1859", fontWeight: "700", fontSize: "18px" }}
      >
        Features
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Box sx={{ mt: 0.5 }}>
          <Image src={bed} alt="bed" />
          <Typography
            variant="p"
            sx={{
              fontSize: "14px",
              fontWeight: "400",
              color: "#7C7C99",
              ml: 0.4,
            }}
          >
            2 bedrooms
          </Typography>
        </Box>
        <Box sx={{ pl: 2, mt: 0.5 }}>
          <Image src={rule} alt="rule" />
          <Typography
            variant="p"
            sx={{
              fontSize: "14px",
              fontWeight: "400",
              color: "#7C7C99",
              ml: 0.4,
            }}
          >
            103m²
          </Typography>
        </Box>

        <Box sx={{ pl: 2 }}>
          <Image src={building} alt="bed" />
          <Typography
            variant="p"
            sx={{
              fontSize: "14px",
              fontWeight: "400",
              color: "#7C7C99",
              ml: 0.4,
            }}
          >
            6th floor
          </Typography>
        </Box>
        <Box sx={{ pl: 2 }}>
          <Image src={bath} alt="bath" />
          <Typography
            variant="p"
            sx={{
              fontSize: "14px",
              fontWeight: "400",
              color: "#7C7C99",
              ml: 0.4,
            }}
          >
            1 bathroom
          </Typography>
        </Box>
        <Box sx={{ pl: 2, mt: 0.5 }}>
          <Image src={car} alt="bath" />
          <Typography
            variant="p"
            sx={{
              fontSize: "14px",
              fontWeight: "400",
              color: "#7C7C99",
              ml: 0.4,
            }}
          >
            1 parking space
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Features;
