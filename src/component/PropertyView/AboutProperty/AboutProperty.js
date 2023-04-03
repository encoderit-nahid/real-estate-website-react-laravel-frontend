import React from "react";
import { Button, Grid, Typography, Box } from "@mui/material";
import Image from "next/image";
import checkRound from "../../../../public/Images/check-round.png";

function AboutProperty({ name, array }) {
  return (
    <Box sx={{ background: "#F9F9FB", pl: 3, py: 2, mt: 2 }}>
      <Typography
        variant="p"
        sx={{ color: "#1A1859", fontWeight: "700", fontSize: "18px" }}
      >
        {name}
      </Typography>
      <Grid container sx={{ mt: 2 }}>
        {array?.map((data, index) => (
          <Grid
            item
            xs={6}
            sm={6}
            md={6}
            lg={2}
            xl={2}
            key={index}
            sx={{ pb: 5 }}
          >
            <Image src={checkRound} height={14} width={14} alt="bed" />
            <Typography
              variant="p"
              sx={{
                fontSize: "18px",
                fontWeight: "400",
                color: "#4B4B66",
                ml: 0.4,
              }}
            >
              {data.name}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default AboutProperty;
