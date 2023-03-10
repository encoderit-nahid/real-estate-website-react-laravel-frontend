import Head from "next/head";
import Image from "next/image";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ResponsiveDrawer from "../src/component/sharedProposal/ResponsiveDrawer/ResponsiveDrawer";
import { Button, Container, Grid } from "@mui/material";
import { useState } from "react";
import Releases from "../src/component/properties/Releases/Releases";
import ThirdTab from "../src/component/properties/Third/ThirdTab";
import NewRegistration from "../src/component/properties/NewRegistration/NewRegistration";
import notifyImage from "../public/Images/notify.png";
import rentImage from "../public/Images/rentCard.png";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneEnabledOutlinedIcon from "@mui/icons-material/PhoneEnabledOutlined";
import Link from "next/link";

const drawerWidth = 240;

export default function Schedules(props) {
  return (
    <div>
      <Head>
        <title>Lokkan</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/negotiate.png" />
      </Head>

      <main>
        <Box sx={{ display: "flex" }}>
          <ResponsiveDrawer />
          <Box
            sx={{
              //   backgroundColor: "#f6f8fc",
              flexGrow: 1,
              background: "#F2F5F6",
              minHeight: "100vh",
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              paddingX: { xs: 0, sm: 0, md: 6, lg: 1, xl: 6 },
              paddingTop: { xs: 6, sm: 6, md: 6, lg: 8, xl: 3 },
              paddingBottom: { xs: 3, sm: 3, md: 3, lg: 4, xl: 3 },
            }}
          >
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Typography
                variant="p"
                sx={{
                  color: "#002152",
                  fontSize: "24px",
                  fontWeight: "700",
                  lineHeight: "32px",
                  ml: { xs: 4, sm: 4, md: 0, lg: 0, xl: 0 },
                  mt: { xs: 1, sm: 1, md: 0, lg: 0, xl: 0 },
                }}
              >
                Schedules
              </Typography>
              <Image src={notifyImage} alt="notify" />
            </Grid>
            {[0, 1, 2].map((data, index) => (
              <Container key={index} maxWidth="xl" sx={{ marginTop: 5 }}>
                <Box
                  sx={{
                    width: "100%",
                    background: "#ffffff",
                    borderRadius: "6px",
                    pr: 2,
                  }}
                >
                  <Grid
                    container
                    spacing={{ xs: 0, sm: 0, md: 0, lg: 2, xl: 2, xxl: 2 }}
                  >
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={4}
                      className="rentImage"
                    >
                      <Box>
                        <Image
                          src={rentImage}
                          layout="responsive"
                          alt="rentImage"
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={8}>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={12} lg={4}>
                          <Grid
                            container
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            sx={{
                              px: { xs: 2, sm: 2, md: 2, lg: 0 },
                              py: { xs: 2, sm: 2, md: 2, lg: 0 },
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                color: "#002152",
                                fontWeight: "700",
                                fontSize: {
                                  xs: "16px",
                                  sm: "16px",
                                  md: "16px",
                                  lg: "12px",
                                  xl: "16px",
                                },
                                lineHeight: "22px",
                              }}
                            >
                              property details
                            </Typography>
                            <Typography
                              variant="h6"
                              sx={{
                                color: "#002152",
                                fontWeight: "700",
                                fontSize: {
                                  xs: "24px",
                                  sm: "24px",
                                  md: "24px",
                                  lg: "14px",
                                  xl: "24px",
                                },
                                lineHeight: "32px",
                              }}
                            >
                              BRL 1,700.00
                            </Typography>
                            <Typography
                              variant="h6"
                              sx={{
                                color: "#6C7A84",
                                fontWeight: "400",
                                fontSize: {
                                  xs: "16px",
                                  sm: "16px",
                                  md: "16px",
                                  lg: "12px",
                                  xl: "16px",
                                },
                                lineHeight: "22px",
                              }}
                            >
                              Jaceguai Street, Bela Vista, São Paulo - SP - CEP
                              01315010
                            </Typography>
                            <Typography
                              variant="h6"
                              sx={{
                                color: "#6C7A84",
                                fontWeight: "400",
                                fontSize: {
                                  xs: "16px",
                                  sm: "16px",
                                  md: "16px",
                                  lg: "12px",
                                  xl: "16px",
                                },
                                lineHeight: "22px",
                              }}
                            >
                              created on: 08/18/2020
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={4}>
                          <Grid
                            container
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            sx={{
                              px: { xs: 2, sm: 2, md: 2, lg: 0 },
                              py: { xs: 2, sm: 2, md: 2, lg: 0 },
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                color: "#002152",
                                fontWeight: "700",
                                fontSize: {
                                  xs: "16px",
                                  sm: "16px",
                                  md: "16px",
                                  lg: "12px",
                                  xl: "16px",
                                },
                                lineHeight: "22px",
                                pl: 0.5,
                              }}
                            >
                              visitor data
                            </Typography>
                            <Button
                              sx={{
                                display: "flex",
                                padding: 0,
                                textTransform: "none",
                                mt: 1,
                                "&:hover": {
                                  background: "transparent",
                                },
                              }}
                            >
                              <PermIdentityOutlinedIcon
                                sx={{ color: "#6C7A84" }}
                              />
                              <Typography
                                variant="h6"
                                sx={{
                                  color: "#6C7A84",
                                  fontWeight: "400",
                                  fontSize: {
                                    xs: "16px",
                                    sm: "16px",
                                    md: "16px",
                                    lg: "12px",
                                    xl: "16px",
                                  },
                                  lineHeight: "22px",
                                }}
                              >
                                André Nascimento
                              </Typography>
                            </Button>
                            <Button
                              sx={{
                                display: "flex",
                                padding: 0,
                                textTransform: "none",
                                mt: 1,
                                "&:hover": {
                                  background: "transparent",
                                },
                              }}
                            >
                              <EmailOutlinedIcon sx={{ color: "#6C7A84" }} />
                              <Typography
                                variant="h6"
                                sx={{
                                  color: "#6C7A84",
                                  fontWeight: "400",
                                  fontSize: {
                                    xs: "16px",
                                    sm: "16px",
                                    md: "16px",
                                    lg: "12px",
                                    xl: "16px",
                                  },
                                  lineHeight: "22px",
                                }}
                              >
                                asncontaa@gmail.com
                              </Typography>
                            </Button>
                            <Button
                              sx={{
                                display: "flex",
                                padding: 0,
                                textTransform: "none",
                                mt: 1,
                                "&:hover": {
                                  background: "transparent",
                                },
                              }}
                            >
                              <PhoneEnabledOutlinedIcon
                                sx={{ color: "#6C7A84" }}
                              />
                              <Typography
                                variant="h6"
                                sx={{
                                  color: "#6C7A84",
                                  fontWeight: "400",
                                  fontSize: {
                                    xs: "16px",
                                    sm: "16px",
                                    md: "16px",
                                    lg: "12px",
                                    xl: "16px",
                                  },
                                  lineHeight: "22px",
                                }}
                              >
                                (11) 9366-666
                              </Typography>
                            </Button>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={4}>
                          <Grid
                            container
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            sx={{
                              px: { xs: 2, sm: 2, md: 2, lg: 0 },
                              py: { xs: 2, sm: 2, md: 2, lg: 0 },
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                color: "#002152",
                                fontWeight: "700",
                                fontSize: {
                                  xs: "16px",
                                  sm: "16px",
                                  md: "16px",
                                  lg: "12px",
                                  xl: "16px",
                                },
                                lineHeight: "22px",
                              }}
                            >
                              visit data
                            </Typography>

                            <Typography
                              variant="h6"
                              sx={{
                                color: "#6C7A84",
                                fontWeight: "700",
                                fontSize: {
                                  xs: "16px",
                                  sm: "16px",
                                  md: "16px",
                                  lg: "12px",
                                  xl: "16px",
                                },
                                lineHeight: "22px",
                                mt: 1,
                              }}
                            >
                              <span style={{ fontWeight: "400" }}>Date:</span>
                              10/23/2022
                            </Typography>
                            <Typography
                              variant="h6"
                              sx={{
                                color: "#6C7A84",
                                fontWeight: "700",
                                fontSize: {
                                  xs: "16px",
                                  sm: "16px",
                                  md: "16px",
                                  lg: "12px",
                                  xl: "16px",
                                },
                                lineHeight: "22px",
                                mt: 1,
                              }}
                            >
                              <span style={{ fontWeight: "400" }}>Time:</span>
                              10:45
                            </Typography>
                            <Typography
                              variant="h6"
                              sx={{
                                color: "#6C7A84",
                                fontWeight: "700",
                                fontSize: {
                                  xs: "16px",
                                  sm: "16px",
                                  md: "16px",
                                  lg: "12px",
                                  xl: "16px",
                                },
                                lineHeight: "22px",
                                mt: 1,
                              }}
                            >
                              <span style={{ fontWeight: "400" }}>
                                Observation:
                              </span>
                              Lorem ipsum dolor amet
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                        gap={{
                          xs: 0.5,
                          sm: 0.5,
                          md: 0.5,
                          lg: 2,
                          xl: 2,
                          xxl: 2,
                        }}
                        sx={{ ml: { xs: 1, sm: 1, md: 1, lg: 0 } }}
                      >
                        <Button
                          variant="outlined"
                          sx={{
                            borderColor: "#F44336",
                            color: "#F44336",
                            textTransform: "none",
                            fontSize: "16px",
                            fontWeight: "600",
                            lineHeight: "22px",
                            mt: { xs: 3, sm: 3, md: 3, lg: 0, xl: 3 },
                            mb: 1,
                            "&:hover": {
                              borderColor: "#F44336",
                              color: "#F44336",
                            },
                          }}
                        >
                          Cancel visit
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            textTransform: "none",
                            mt: { xs: 3, sm: 3, md: 3, lg: 0, xl: 3 },
                            mb: 1,

                            fontSize: "16px",
                            fontWeight: "600",
                            lineHeight: "22px",
                          }}
                        >
                          Copy Information
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Container>
            ))}
          </Box>
        </Box>
      </main>
    </div>
  );
}
