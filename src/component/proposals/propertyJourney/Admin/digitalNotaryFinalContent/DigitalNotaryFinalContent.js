import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Tooltip,
  LinearProgress,
  Divider,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import SaleCard from "../../../../reuseable/saleCard/SaleCard";
import notary from "../../../../../../public/Images/notary.png";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function DigitalNotaryFinalContent() {
  return (
    <Box sx={{ mt: 4, mb: 2 }}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Image height={40} width={60} src={notary} alt="notary" />
        <Typography
          variant="p"
          sx={{
            color: "#002152",
            fontSize: "24px",
            fontWeight: "700",
            lineHeight: "32px",
            ml: 1,
          }}
        >
          Digital notary
        </Typography>
      </Grid>
      <Box sx={{ mt: { xs: 2, sm: 2, md: 2, lg: 4 } }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={3}>
            <SaleCard />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={8}>
            <Box
              sx={{ px: 2, border: "1px solid #DBE1E5", borderRadius: "8px" }}
            >
              <Grid container sx={{ py: 1 }}>
                <Grid item xs={6}>
                  <Typography
                    variant="p"
                    sx={{
                      color: "#6C7A84",
                      fontSize: "16px",
                      lineHeight: "22px",
                      fontWeight: "400",
                    }}
                  >
                    Protocol No.:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="p"
                    sx={{
                      color: "#002152",
                      fontSize: "16px",
                      lineHeight: "22px",
                      fontWeight: "600",
                    }}
                  >
                    203.849.735
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid container sx={{ py: 1 }}>
                <Grid item xs={6}>
                  <Typography
                    variant="p"
                    sx={{
                      color: "#6C7A84",
                      fontSize: "16px",
                      lineHeight: "22px",
                      fontWeight: "400",
                    }}
                  >
                    Registry:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="p"
                    sx={{
                      color: "#002152",
                      fontSize: "16px",
                      lineHeight: "22px",
                      fontWeight: "600",
                    }}
                  >
                    6391 Elgin St. Celina, Delaware, ZIP Code 10299
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid container sx={{ py: 1 }}>
                <Grid item xs={6}>
                  <Typography
                    variant="p"
                    sx={{
                      color: "#6C7A84",
                      fontSize: "16px",
                      lineHeight: "22px",
                      fontWeight: "400",
                    }}
                  >
                    Contact:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="p"
                    sx={{
                      color: "#002152",
                      fontSize: "16px",
                      lineHeight: "22px",
                      fontWeight: "600",
                    }}
                  >
                    (11) 99203-01010
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid container sx={{ py: 1 }}>
                <Grid item xs={6}>
                  <Typography
                    variant="p"
                    sx={{
                      color: "#6C7A84",
                      fontSize: "16px",
                      lineHeight: "22px",
                      fontWeight: "400",
                    }}
                  >
                    Return term:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="p"
                    sx={{
                      color: "#002152",
                      fontSize: "16px",
                      lineHeight: "22px",
                      fontWeight: "600",
                    }}
                  >
                    03/08/2021
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-end"
                sx={{ mt: 1 }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "#002152",
                    fontSize: "14px",
                    lineHeight: "18px",
                    fontWeight: "600",
                    color: "#002152",
                    textTransform: "none",
                    paddingX: 4,
                    paddingY: 0.6,
                    mb: 2,

                    mr: 3,
                    "&:hover": {
                      borderColor: "#002152",
                      fontSize: "14px",
                      lineHeight: "18px",
                      fontWeight: "600",
                      color: "#002152",
                      textTransform: "none",
                      paddingX: 4,
                      paddingY: 0.6,
                    },
                  }}
                >
                  Download
                </Button>
              </Grid>
            </Box>
            <Box
              sx={{
                border: "1px solid #DBE1E5",
                borderRadius: "8px",
                px: 2,
                py: 2,
                mt: 2,
              }}
            >
              <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Box>
                  <Button
                    sx={{
                      display: "flex",
                      textTransform: "none",
                      background: "#E0F2FE",
                      borderRadius: "2px",
                      padding: "2px 8px",
                      color: " #0362F0",
                      fontSize: "14px",
                      lineHeight: "18px",
                      fontWeight: "400",
                      mr: 1,
                    }}
                  >
                    <Typography
                      varianat="p"
                      sx={{
                        color: "#0362F0",
                        fontSize: "14px",
                        lineHeight: "18px",
                        fontWeight: "400",
                      }}
                    >
                      Contract
                    </Typography>
                  </Button>
                </Box>
                <Box>
                  <Typography
                    variant="p"
                    sx={{
                      color: "#1A1859",
                      fontSize: "18px",
                      lineHeight: "28px",
                      fontWeight: "400",
                    }}
                  >
                    Honorary contracts lorem ipsum dolor amet.pdf
                  </Typography>
                </Box>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-end"
                sx={{ mt: 1 }}
                gap={1}
              >
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "#002152",
                    fontSize: "14px",
                    lineHeight: "18px",
                    fontWeight: "600",
                    color: "#002152",
                    textTransform: "none",

                    "&:hover": {
                      borderColor: "#002152",
                      fontSize: "14px",
                      lineHeight: "18px",
                      fontWeight: "600",
                      color: "#002152",
                      textTransform: "none",
                    },
                  }}
                >
                  Download
                </Button>
                <Button
                  sx={{
                    background: "#0362F0",
                    color: "#ffffff",
                    fontWeight: "600",
                    fontSize: "14px",
                    lineHeight: "18px",
                    textTransform: "none",
                    "&:hover": {
                      background: "#0362F0",
                      color: "#ffffff",
                      fontWeight: "600",
                      fontSize: "14px",
                      lineHeight: "18px",
                    },
                  }}
                >
                  Details
                </Button>
              </Grid>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography
                variant="p"
                sx={{
                  color: "#1A1859",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "22px",
                }}
              >
                Documents sent
              </Typography>
            </Box>

            <Grid container spacing={2}>
              {[0, 1, 2, 3, 4, 5].map((data, index) => (
                <Grid key={index} item xs={12} sm={12} md={12} lg={6}>
                  <Box
                    sx={{
                      border: "1px solid #34BE84",
                      borderRadius: "8px",
                      px: 2,
                      pt: 2,
                      mt: 1,
                      pb: 1,
                    }}
                  >
                    <Grid
                      container
                      direction="column"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                    >
                      <Box>
                        <Button
                          sx={{
                            display: "flex",
                            textTransform: "none",
                            background: "#E0F2FE",
                            borderRadius: "2px",
                            padding: "2px 8px",
                            color: " #0362F0",
                            fontSize: "14px",
                            lineHeight: "18px",
                            fontWeight: "400",
                            mr: 1,
                          }}
                        >
                          <CheckCircleOutlineIcon sx={{ color: "#114B32" }} />
                          <Typography
                            varianat="p"
                            sx={{
                              color: "#114B32",
                              fontSize: "14px",
                              lineHeight: "18px",
                              fontWeight: "400",
                            }}
                          >
                            Document sent
                          </Typography>
                        </Button>
                      </Box>
                      <Box>
                        <Typography
                          variant="p"
                          sx={{
                            color: "#1A1859",
                            fontSize: "14px",
                            lineHeight: "18px",
                            fontWeight: "400",
                          }}
                        >
                          State tax regularity certificate - State CDN
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      <Grid item xs={6}>
                        <Button
                          fullWidth
                          variant="outlined"
                          sx={{
                            borderColor: "#002152",
                            fontSize: "14px",
                            lineHeight: "18px",
                            fontWeight: "600",
                            color: "#002152",
                            textTransform: "none",

                            "&:hover": {
                              borderColor: "#002152",
                              fontSize: "14px",
                              lineHeight: "18px",
                              fontWeight: "600",
                              color: "#002152",
                              textTransform: "none",
                            },
                          }}
                        >
                          Download
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          fullWidth
                          sx={{
                            background: "#0362F0",
                            color: "#ffffff",
                            fontWeight: "600",
                            fontSize: "14px",
                            lineHeight: "18px",
                            textTransform: "none",
                            "&:hover": {
                              background: "#0362F0",
                              color: "#ffffff",
                              fontWeight: "600",
                              fontSize: "14px",
                              lineHeight: "18px",
                            },
                          }}
                        >
                          Details
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default DigitalNotaryFinalContent;
