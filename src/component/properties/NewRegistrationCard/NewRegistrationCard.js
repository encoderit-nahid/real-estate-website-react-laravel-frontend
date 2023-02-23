import { Box, Button, Grid, LinearProgress, Typography } from "@mui/material";
import React from "react";
import rentImage from "../../../../public/Images/rentImage.png";
import Image from "next/image";

function NewRegistrationCard() {
  const [progress, setProgress] = React.useState(87);
  return (
    <Box
      sx={{
        background: "#ffffff",
        boxShadow: "0px 4px 8px rgba(0, 33, 82, 0.08)",
        borderRadius: { xs: 0, sm: 0, md: 0, lg: "8px", xl: "8px" },
        mt: 1,
      }}
    >
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={4}
          xl={4}
          className="rentImageCard"
        >
          {/* <Box>
            <Image src={rentImage} layout="responsive" alt="rent" />
          </Box> */}
          <Box
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              //   display: { lg: "inline" },
            }}
          >
            <Image
              alt="rent"
              src={rentImage}
              layout="fill"
              objectFit="cover"
              style={{ borderRadius: "8px 0 0 8px" }}
            />
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          className="rentImageCard"
          sx={{
            display: { xs: "inline", sm: "inline", md: "inline", lg: "none" },
            ml: 2,
          }}
        >
          {/* <Box>
            <Image src={rentImage} layout="responsive" alt="rent" />
          </Box> */}
          <Box>
            <Image
              alt="rent"
              src={rentImage}
              width={400}
              //   style={{ borderRadius: "8px 0 0 8px" }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ p: { xs: 2, sm: 2, md: 2, lg: 0 } }}
          >
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Box>
                <Button
                  sx={{
                    textTransform: "none",
                    background: "rgba(116, 80, 240, 0.2)",
                    borderRadius: "2px",
                    padding: "2px 8px",
                    color: "#7450F0",
                    fontSize: "14px",
                    lineHeight: "18px",
                    fontWeight: "400",
                  }}
                >
                  rent
                </Button>
                <Button
                  sx={{
                    textTransform: "none",
                    background: "#DDF8ED",
                    borderRadius: "2px",
                    padding: "2px 8px",
                    color: "#229464",
                    fontSize: "14px",
                    lineHeight: "18px",
                    fontWeight: "400",
                    ml: "3px",
                  }}
                >
                  published
                </Button>
              </Box>
              <Box sx={{ ml: { xs: 0, sm: 0, md: 0, lg: 1, xl: 3, xxl: 8 } }}>
                <Typography
                  variant="p"
                  sx={{
                    fontSize: "14px",
                    lineHeight: "18px",
                    fontWeight: "400",
                    color: "#9FAAB1",
                  }}
                >
                  87%
                </Typography>
              </Box>
              <Box sx={{ width: "20%", mr: 1, mt: "1.5vh", ml: 1 }}>
                <LinearProgress
                  sx={{
                    "& .MuiLinearProgress-barColorPrimary": {
                      backgroundColor: "#34BE84",
                      borderRadius: "10px",
                    },
                    backgroundColor: "#f5f5f5",
                    borderRadius: "10px",
                    // "& .MuiLinearProgress-colorPrimary": {
                    //   backgroundColor: "#F5F5F5",
                    // },
                  }}
                  variant="determinate"
                  value={progress}
                />
              </Box>
            </Grid>
            <Typography
              variant="p"
              sx={{
                color: "#002152",
                fontSize: "24px",
                lineHeight: "32px",
                fontWeight: "700",
                mt: 1,
              }}
            >
              BRL 3,100.00
            </Typography>
            <Typography
              variant="p"
              sx={{
                color: " #9FAAB1",
                fontSize: "16px",
                lineHeight: "24px",
                fontWeight: "400",
                mt: 1,
                mr: 0.5,
              }}
            >
              Rua do Bixiga, Bela Vista, São Paulo, São Paulo- CEP 01315020
            </Typography>
            <Typography
              variant="p"
              sx={{
                color: " #9FAAB1",
                fontSize: "16px",
                lineHeight: "24px",
                fontWeight: "400",
                mt: 0.5,
              }}
            >
              created on: 08/19/2020
            </Typography>
            <Box sx={{ mt: 1, mb: { xs: 0, sm: 0, md: 0, lg: 2, xl: 2 } }}>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#F44336",
                  color: "#F44336",
                  fontSize: "14px",
                  lineHeight: "18px",
                  fontWeight: "600",

                  borderRadius: "4px",

                  textTransform: "none",
                  "&:hover": {
                    borderColor: "#F44336",
                    color: "#F44336",
                    fontSize: "14px",
                    lineHeight: "18px",
                    fontWeight: "600",

                    borderRadius: "4px",

                    textTransform: "none",
                  },
                }}
              >
                Reject
              </Button>
              <Button
                variant="contained"
                sx={{
                  fontSize: "14px",
                  lineHeight: "18px",
                  fontWeight: "600",

                  borderRadius: "4px",
                  //   padding: "8px 20px",
                  textTransform: "none",
                  ml: 1,
                  mr: 1,
                  "&:hover": {
                    fontSize: "14px",
                    lineHeight: "18px",
                    fontWeight: "600",

                    borderRadius: "4px",
                    //   padding: "8px 20px",
                    textTransform: "none",
                    ml: 1,
                    mr: 1,
                  },
                }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="success"
                sx={{
                  fontSize: "14px",
                  lineHeight: "18px",
                  fontWeight: "600",

                  borderRadius: "4px",
                  //   padding: "8px 20px",
                  textTransform: "none",
                  mt: { xs: 0, sm: 0, md: 0, lg: 1, xl: 0 },
                  "&:hover": {
                    fontSize: "14px",
                    lineHeight: "18px",
                    fontWeight: "600",

                    borderRadius: "4px",
                    //   padding: "8px 20px",
                    textTransform: "none",
                    mt: { xs: 0, sm: 0, md: 0, lg: 1, xl: 0 },
                  },
                }}
              >
                Approves
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default NewRegistrationCard;
