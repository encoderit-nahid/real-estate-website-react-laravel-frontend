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
import handshake from "../../../../../../public/Images/handshake.png";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import media from "../../../../../../public/Images/Media.png";
import generate from "../../../../../../public/Images/generate.png";
import BaseModal from "../../../../reuseable/baseModal/BaseModal";
import ContractModal from "../contractModal/ContractModal";
import SaleCard from "../../../../reuseable/saleCard/SaleCard";
import ContractPdfModal from "../../ContractPdfModal/ContractPdfModal";

function Contract() {
  //contract_modal_open
  const [contractModalOpen, setContractModalOpen] = React.useState(false);
  const handleOpen = () => setContractModalOpen(true);
  const handleClose = () => setContractModalOpen(false);

  //pdf_open
  const [contractPdfOpen, setContractPdfOpen] = React.useState(false);
  const handlePdfOpen = () => setContractPdfOpen(true);
  const handlePdfClose = () => setContractPdfOpen(false);

  const [progress, setProgress] = React.useState(40);

  return (
    <Box sx={{ mt: 4 }}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Image height={40} width={60} src={handshake} alt="handshake" />
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
          Digital contract
        </Typography>
      </Grid>
      <Box sx={{ mt: { xs: 2, sm: 2, md: 2, lg: 4 } }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={3}>
            <SaleCard />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={5}>
            <Box
              sx={{
                background: "#FFFFFF",
                border: "1px solid #DBE1E5",
                borderRadius: "8px",
                py: { xs: 2, sm: 2, md: 4.4, lg: 4.4, xl: 5.4, xxl: 5.8 },
              }}
            >
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ px: 2 }}
              >
                <Image src={generate} alt="generateImage" />
                <Typography
                  variant="h1"
                  sx={{
                    color: "#1A1859",
                    fontWeight: "700",
                    fontSize: "24px",
                    lineHeight: "32px",
                    mt: 1,
                  }}
                >
                  Generate your digital contract
                </Typography>

                <Button
                  fullWidth
                  sx={{
                    color: "#FFFFFF",
                    fontSize: "16px",

                    lineHeight: "22px",
                    fontWeight: "600",
                    background: "#7450F0",
                    borderRadius: "4px",

                    textTransform: "none",
                    mt: 1,
                    py: 1,

                    "&:hover": {
                      color: "#FFFFFF",
                      fontSize: "16px",

                      lineHeight: "22px",
                      fontWeight: "600",
                      background: "#7450F0",
                      borderRadius: "4px",

                      textTransform: "none",
                      mt: 1,
                      py: 1,
                    },
                  }}
                  onClick={handleOpen}
                >
                  Generate contact
                </Button>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={4}>
            <Box
              sx={{
                background: "#FFFFFF",
                border: "1px solid #DBE1E5",
                borderRadius: "8px",
              }}
            >
              <Box sx={{ mt: 1, px: 2 }}>
                <Button
                  sx={{
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
                  waiting for signature
                </Button>
                <Typography
                  variant="h1"
                  sx={{
                    color: "#1A1859",
                    fontSize: "18px",
                    lineHeight: "28px",
                    fontWeight: "400",
                    mt: 0.5,
                  }}
                >
                  Honorary contracts lorem ipsum dolor amet.pdf
                </Typography>
                <Typography
                  variant="h1"
                  sx={{
                    color: "#6C7A84",
                    fontSize: "14px",
                    lineHeight: "18px",
                    fontWeight: "400",
                    mt: 0.5,
                  }}
                >
                  Subscriptions (2/5)
                </Typography>
              </Box>
              <Box sx={{ width: "100%", px: 2, my: 1 }}>
                <LinearProgress
                  sx={{
                    "& .MuiLinearProgress-barColorPrimary": {
                      backgroundColor: "#7450F0",
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
              <Grid container spacing={2} sx={{ px: 2, my: 1 }}>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                  <Button
                    color="inherit"
                    fullWidth
                    sx={{
                      mr: 1,
                      border: "1px solid #002152",
                      borderRadius: "4px",
                      px: 2,
                      py: 0.5,
                      color: "#002152",
                      fontSize: "16px",
                      fontWeight: "600",
                      lineHeight: "22px",
                      textTransform: "none",
                    }}
                  >
                    Download
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                  <Button
                    onClick={handlePdfOpen}
                    fullWidth
                    sx={{
                      background: "#0362F0",
                      borderRadius: "4px",
                      px: 2,
                      py: 0.5,
                      color: "#ffffff",
                      fontSize: "16px",
                      fontWeight: "600",
                      lineHeight: "22px",
                      textTransform: "none",
                      boxShadow: "0px 4px 8px rgba(81, 51, 182, 0.32)",
                      "&:hover": {
                        background: "#0362F0",
                        borderRadius: "4px",
                        px: 2,
                        py: 0.5,
                        color: "#ffffff",
                        fontSize: "16px",
                        fontWeight: "600",
                        lineHeight: "22px",
                        textTransform: "none",
                        boxShadow: "0px 4px 8px rgba(81, 51, 182, 0.32)",
                      },
                    }}
                  >
                    Details
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <BaseModal isShowing={contractModalOpen} isClose={handleClose}>
        <Tooltip title="Something">
          <>
            <ContractModal />
          </>
        </Tooltip>
      </BaseModal>
      <BaseModal isShowing={contractPdfOpen} isClose={handlePdfClose}>
        <Tooltip title="Something">
          <>
            <ContractPdfModal handleClose={handlePdfClose} />
          </>
        </Tooltip>
      </BaseModal>
    </Box>
  );
}

export default Contract;
