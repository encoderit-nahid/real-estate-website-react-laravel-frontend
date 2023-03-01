import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import analise from "../../../../../../public/Images/analise.png";
import maskedIcon from "../../../../../../public/Images/maskedIcon.png";
import content from "../../../../../../public/Images/content.png";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import generate from "../../../../../../public/Images/generate.png";
import BaseModal from "../../../../reuseable/baseModal/BaseModal";
import ContractModal from "../contractModal/ContractModal";
import SaleCard from "../../../../reuseable/saleCard/SaleCard";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CertificateModal from "../certificateModal/CertificateModal";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";

function PreAnalise() {
  //   const [contractModalOpen, setContractModalOpen] = React.useState(false);
  //   const handleOpen = () => setContractModalOpen(true);
  //   const handleClose = () => setContractModalOpen(false);

  //   const [progress, setProgress] = React.useState(40);

  return (
    <Box sx={{ mt: 4 }}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Image height={40} width={40} src={analise} alt="analise" />
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
          Pre-analysis
        </Typography>
      </Grid>
      <Box sx={{ mt: { xs: 2, sm: 2, md: 2, lg: 4 } }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={3}>
            <SaleCard />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={9}>
            <Box
              sx={{
                background: "#FFFFFF",
                border: "1px solid #DBE1E5",
                borderRadius: "8px",
                px: 2,
                py: 2,
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
                      Analysis completed
                    </Typography>
                  </Button>
                </Box>
                <Box>
                  <Typography
                    variant="p"
                    sx={{
                      color: "#1A1859",
                      fontSize: "16px",
                      lineHeight: "22px",
                      fontWeight: "400",
                    }}
                  >
                    Joint certificate of debts related to federal taxes and the
                    active debt of the rural property union - Federal Revenue
                    Service - NIRF
                  </Typography>
                </Box>
                <Box sx={{ width: "100%", py: 1 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={5}>
                      <Typography
                        sx={{
                          color: "#6C7A84",
                          fontSize: "12px",
                          lineHeight: "22px",
                          fontWeight: "400",
                        }}
                      >
                        Delivery: 06/13/2021,14:36
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={3}>
                      <Typography
                        sx={{
                          color: "#6C7A84",
                          fontSize: "12px",
                          lineHeight: "22px",
                          fontWeight: "400",
                        }}
                      >
                        Size: 1MB
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={4}>
                      <Typography
                        sx={{
                          color: "#6C7A84",
                          fontSize: "12px",
                          lineHeight: "22px",
                          fontWeight: "400",
                        }}
                      >
                        Format: PDF
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>

                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={12} lg={3}>
                    <Box
                      sx={{
                        background: "#E6F0FF",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        px: 3,
                        py: 2,
                      }}
                    >
                      <Image
                        height={50}
                        width={50}
                        src={analise}
                        alt="analise"
                      />
                      <Typography
                        variant="p"
                        sx={{
                          color: "#7450F0",
                          fontWeight: "400",
                          fontSize: "10px",
                          lineHeight: "14px",
                        }}
                      >
                        lukka
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={9}>
                    <Box
                      sx={{
                        background: "#F2F5F6",
                        borderRadius: "4px",
                        px: 2,
                        py: 4.5,
                        width: "100%",
                      }}
                    >
                      <Typography
                        variant="p"
                        sx={{
                          color: "#1A1859",
                          fontWeight: "400",
                          fontSize: "14px",
                          lineHeight: "22px",
                        }}
                      >
                        Document parsed, all data lorem ipsum dolor amet!
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ mt: 1 }}>
                  <Grid item xs={12} sm={12} md={12} lg={3}>
                    <Button
                      varinat="outlined"
                      fullWidth
                      sx={{
                        display: "flex",
                        border: "1px solid #000F1A",
                        color: "#ffffff",
                        textTransform: "none",
                        py: 0.5,
                        px: 2,
                        mt: { xs: 0, sm: 0, md: 0, lg: 1, xl: 0 },
                        "&: hover": {
                          border: "1px soli d#000F1A",
                          color: "#ffffff",
                          textTransform: "none",
                          py: 0.5,
                          px: 2,
                        },
                      }}
                    >
                      <CloudDownloadOutlinedIcon sx={{ color: "#000F1A" }} />
                      <Typography
                        variant="p"
                        sx={{
                          color: "#000F1A",
                          fontSize: "14px",
                          lineHeight: "18px",
                          fontWeight: "600",
                        }}
                      >
                        To go down
                      </Typography>
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={3}>
                    <Button
                      varinat="outlined"
                      fullWidth
                      sx={{
                        display: "flex",
                        border: "1px solid #000F1A",
                        color: "#ffffff",
                        textTransform: "none",
                        py: 0.5,
                        px: 2,
                        mt: { xs: 0, sm: 0, md: 0, lg: 1, xl: 0 },
                        "&: hover": {
                          border: "1px soli d#000F1A",
                          color: "#ffffff",
                          textTransform: "none",
                          py: 0.5,
                          px: 2,
                        },
                      }}
                    >
                      <VisibilityOutlinedIcon sx={{ color: "#000F1A" }} />
                      <Typography
                        variant="p"
                        sx={{
                          color: "#000F1A",
                          fontSize: "14px",
                          lineHeight: "18px",
                          fontWeight: "600",
                        }}
                      >
                        To view
                      </Typography>
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      sx={{
                        display: "flex",
                        background: "#DDF8ED",
                        border: "1px solid #34BE84",
                        color: "#ffffff",
                        textTransform: "none",
                        py: 0.5,
                        px: 2,
                        mt: { xs: 0, sm: 0, md: 0, lg: 1, xl: 0 },
                        "&: hover": {
                          background: "#DDF8ED",
                          color: "#ffffff",
                          textTransform: "none",
                          py: 0.5,
                          px: 2,
                          border: "1px solid #34BE84",
                        },
                      }}
                    >
                      <CheckCircleOutlineIcon sx={{ color: "#114B32" }} />
                      <Typography
                        variant="p"
                        sx={{
                          color: "#114B32",
                          fontSize: "14px",
                          lineHeight: "18px",
                          fontWeight: "600",
                        }}
                      >
                        Validated documnet
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/* <BaseModal isShowing={contractModalOpen} isClose={handleClose}>
        <Tooltip title="Something">
          <>
            <CertificateModal />
          </>
        </Tooltip>
      </BaseModal> */}
    </Box>
  );
}

export default PreAnalise;
