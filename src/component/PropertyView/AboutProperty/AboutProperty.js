import React from "react";
import { Button, Grid, Typography, Box, Stack } from "@mui/material";
import Image from "next/image";
import checkRound from "../../../../public/Images/check-round.png";

function AboutProperty({ name, array }) {
  return (
    <Box sx={{ background: "#F9F9FB", px: 3, py: 2, mt: { lg: 2 } }}>
      <Typography
        variant="p"
        sx={{ color: "#1A1859", fontWeight: "700", fontSize: "18px" }}
      >
        {name === "feature" ? "características" : name}
      </Typography>
      {/* <Grid container sx={{ mt: 2 }}>
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
      </Grid> */}
      <Stack
        sx={{ mt: 2 }}
        direction={{
          lg: "row",
        }}
        alignItems={{ lg: "center" }}
        justifyContent={{ lg: "space-between" }}
        spacing={3}
      >
        {array?.map((data, index) => (
          <Stack
            key={index}
            sx={{ pb: 5, maxWidth: { lg: 400 } }}
            direction={"row"}
            alignItems={"center"}
            spacing={1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              style={{
                flex: "none",
              }}
            >
              <g fill="#06c3b7">
                <path d="M10.243 16.314L6 12.07l1.414-1.414l2.829 2.828l5.656-5.657l1.415 1.415z"></path>
                <path
                  fillRule="evenodd"
                  d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12m11 9a9 9 0 1 1 0-18a9 9 0 0 1 0 18"
                  clipRule="evenodd"
                ></path>
              </g>
            </svg>
            <Typography
              variant="p"
              sx={{
                fontSize: "18px",
                fontWeight: "400",
                color: "#4B4B66",
                wordWrap: "break-word" /* Break long words */,
                wordBreak: "break-all" /* Break long words */,
                overflowWrap: "break-word" /* Ensures the text will wrap */,
                overflow: "hidden" /* Hide any overflow content */,
              }}
            >
              {data.name}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

export default AboutProperty;
