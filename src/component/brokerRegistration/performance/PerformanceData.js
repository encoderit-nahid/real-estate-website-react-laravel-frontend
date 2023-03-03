import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";

function PerformanceData({
  handleNext,
  handleBack,
  handleOpen,
  activeStep,
  steps,
}) {
  return (
    <Box sx={{ mt: 4 }}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Typography
          variant="p"
          sx={{
            color: "#1A1859",
            fontSize: "24px",
            fontWeight: "700",
            lineHeight: "29px",
          }}
        >
          Performance
        </Typography>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          sx={{ mt: 3 }}
        >
          <Typography
            variant="p"
            sx={{
              color: "#1A1859",
              fontSize: "18px",
              fontWeight: "400",
              lineHeight: "22px",
            }}
          >
            What is your acting preference?
          </Typography>
        </Grid>
        <Grid container spacing={1} sx={{ mt: 2 }}>
          {["Location", "Sales", "Both"].map((data, index) => (
            <Grid key={index} item xs={12} sm={12} md={4}>
              <Button
                sx={{
                  width: "100%",
                  background: `${index === 0 ? "#0362F0" : "#F2F5F6"}`,
                  borderRadius: "152px",
                  color: `${index === 0 ? "#ffffff" : "#002152"}`,
                  fontSize: "16px",
                  //   fontSize: {
                  //     xs: "12px",
                  //     sm: "13px",
                  //     md: "16px",
                  //     lg: "13px",
                  //     xl: "16px",
                  //   },
                  fontWeight: "400",
                  lineHeight: "22px",
                  textTransform: "none",
                  px: { xs: 0, sm: 2, md: 2, lg: 2, xl: 2 },
                  py: 1,
                  "&:hover": {
                    width: "100%",
                    background: "#0362F0",
                    borderRadius: "152px",
                    color: "#ffffff",
                    fontSize: "16px",
                    // fontSize: {
                    //   xs: "12px",
                    //   sm: "13px",
                    //   md: "16px",
                    //   lg: "13px",
                    //   xl: "16px",
                    // },
                    fontWeight: "400",
                    lineHeight: "22px",
                    textTransform: "none",
                    px: { xs: 0, sm: 2, md: 2, lg: 2, xl: 2 },
                    py: 1,
                  },
                }}
              >
                {data}
              </Button>
            </Grid>
          ))}
        </Grid>
        <Typography
          variant="p"
          sx={{
            color: "#7C7C99",
            fontSize: "16px",
            lineHeight: "22px",
            fontWeight: "400",
            mt: 2,
          }}
        >
          Choosing &quot;both&quot;, we will understand that your performance
          can be both in leasing and in sales and your accreditation will be
          carried out in the segment that we have demand at the moment. We do
          not accredit brokers to operate in both models.
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          sx={{ mt: 3 }}
        >
          <Typography
            variant="p"
            sx={{
              color: "#1A1859",
              fontSize: "18px",
              fontWeight: "400",
              lineHeight: "22px",
            }}
          >
            How did you find out about Lokkan opportunities?
          </Typography>
        </Grid>
        <Grid container spacing={1} sx={{ mt: 2 }}>
          {["Refer a friend", "Facebook", "Instagram"].map((data, index) => (
            <Grid key={index} item xs={12} sm={12} md={4}>
              <Button
                sx={{
                  width: "100%",
                  background: `${index === 0 ? "#0362F0" : "#F2F5F6"}`,
                  borderRadius: "152px",
                  color: `${index === 0 ? "#ffffff" : "#002152"}`,
                  fontSize: "16px",
                  //   fontSize: {
                  //     xs: "12px",
                  //     sm: "13px",
                  //     md: "16px",
                  //     lg: "13px",
                  //     xl: "16px",
                  //   },
                  fontWeight: "400",
                  lineHeight: "22px",
                  textTransform: "none",
                  px: { xs: 0, sm: 2, md: 2, lg: 2, xl: 2 },
                  py: 1,
                  "&:hover": {
                    width: "100%",
                    background: "#0362F0",
                    borderRadius: "152px",
                    color: "#ffffff",
                    fontSize: "16px",
                    // fontSize: {
                    //   xs: "12px",
                    //   sm: "13px",
                    //   md: "16px",
                    //   lg: "13px",
                    //   xl: "16px",
                    // },
                    fontWeight: "400",
                    lineHeight: "22px",
                    textTransform: "none",
                    px: { xs: 0, sm: 2, md: 2, lg: 2, xl: 2 },
                    py: 1,
                  },
                }}
              >
                {data}
              </Button>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={1} sx={{ mt: 2 }}>
          {["Linkedin", "News", "Partnerships"].map((data, index) => (
            <Grid key={index} item xs={12} sm={12} md={4}>
              <Button
                sx={{
                  width: "100%",
                  background: `${index === 0 ? "#0362F0" : "#F2F5F6"}`,
                  borderRadius: "152px",
                  color: `${index === 0 ? "#ffffff" : "#002152"}`,
                  //   fontSize: {
                  //     xs: "12px",
                  //     sm: "13px",
                  //     md: "16px",
                  //     lg: "13px",
                  //     xl: "16px",
                  //   },
                  fontSize: "16px",
                  fontWeight: "400",
                  lineHeight: "22px",
                  textTransform: "none",
                  px: { xs: 0, sm: 2, md: 2, lg: 2, xl: 2 },
                  py: 1,
                  "&:hover": {
                    width: "100%",
                    background: "#0362F0",
                    borderRadius: "152px",
                    color: "#ffffff",
                    fontSize: "16px",
                    // fontSize: {
                    //   xs: "12px",
                    //   sm: "13px",
                    //   md: "16px",
                    //   lg: "13px",
                    //   xl: "16px",
                    // },
                    fontWeight: "400",
                    lineHeight: "22px",
                    textTransform: "none",
                    px: { xs: 0, sm: 2, md: 2, lg: 2, xl: 2 },
                    py: 1,
                  },
                }}
              >
                {data}
              </Button>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={1} sx={{ mt: 4, mb: 5 }}>
          <Grid item xs={6} sm={6} md={6}>
            <Button
              color="inherit"
              // disabled={activeStep === 0}
              onClick={handleBack}
              sx={{
                //   mr: 1,
                //   border: "1px solid #002152",
                //   borderRadius: "4px",
                background: "#ffffff",
                px: 2,
                py: 1,
                color: "#4B4B66",
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "22px",
                textTransform: "none",
              }}
            >
              Come back
            </Button>
          </Grid>
          <Grid item xs={6} sm={6} md={6}>
            <Button
              onClick={
                activeStep === steps.length - 1 ? handleOpen : handleNext
              }
              fullWidth
              sx={{
                background: "linear-gradient(90deg, #20BAF6 0%, #7450F0 100%)",
                boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.08)",
                borderRadius: "4px",
                color: "#ffffff",
                fontSize: "16px",
                lineHeight: "22px",
                fontWeight: "600",
                //   mt: 3,
                textTransform: "none",
                py: 1,
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #20BAF6 0%, #7450F0 100%)",
                  boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.08)",
                  borderRadius: "4px",
                  color: "#ffffff",
                  fontSize: "16px",
                  lineHeight: "22px",
                  fontWeight: "600",
                  // mt: 3,
                  textTransform: "none",
                  py: 1,
                },
              }}
            >
              Continue
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PerformanceData;
