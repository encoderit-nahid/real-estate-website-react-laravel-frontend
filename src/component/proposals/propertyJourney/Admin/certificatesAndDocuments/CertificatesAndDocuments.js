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
import certificate from "../../../../../../public/Images/certificate.png";
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

function CertificatesAndDocuments() {
  //contract_modal_open
  const [contractModalOpen, setContractModalOpen] = React.useState(false);
  const handleOpen = () => setContractModalOpen(true);
  const handleClose = () => setContractModalOpen(false);

  const [progress, setProgress] = React.useState(40);

  return (
    <Box sx={{ mt: 4 }}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Image height={40} width={60} src={certificate} alt="handshake" />
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
          Certificates and documents
        </Typography>
      </Grid>
      <Box sx={{ mt: { xs: 2, sm: 2, md: 2, lg: 4 } }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={3}>
            <SaleCard />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={8}>
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
                Requested documents (1/4):
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12} lg={6} sx={{ mt: 1 }}>
                <Box
                  sx={{
                    background: "#FFFFFF",
                    border: "1px solid #DBE1E5",
                    borderRadius: "8px",
                    py: 2,
                    px: { xs: 0, sm: 0, md: 0, lg: 2, xl: 0 },
                  }}
                >
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
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
                        Negative certificate of real estate tax debts
                      </Typography>
                    </Box>
                    <Grid
                      container
                      direction="row"
                      justifyContent={{
                        xs: "center",
                        sm: "center",
                        md: "center",
                        lg: "flex-start",
                        xl: "center",
                      }}
                      alignItems="center"
                      sx={{ mt: 2 }}
                    >
                      <Button
                        sx={{
                          background: "#7450F0",
                          color: "#ffffff",
                          mr: 1,
                          "&: hover": {
                            background: "#7450F0",
                            color: "#ffffff",
                          },
                        }}
                      >
                        <Image src={content} alt="content" />
                      </Button>
                      <Button
                        sx={{
                          background: "#F44336",
                          color: "#ffffff",
                          mr: 1,

                          "&: hover": {
                            background: "#F44336",
                            color: "#ffffff",
                          },
                        }}
                      >
                        <Image src={maskedIcon} alt="maskedIcon" />
                      </Button>
                      <Button
                        onClick={handleOpen}
                        sx={{
                          display: "flex",
                          background: "#0362F0",
                          color: "#ffffff",
                          textTransform: "none",
                          py: 0.5,
                          px: 2,
                          mt: { xs: 0, sm: 0, md: 0, lg: 1, xl: 0 },
                          "&: hover": {
                            background: "#0362F0",
                            color: "#ffffff",
                            textTransform: "none",
                            py: 0.5,
                            px: 2,
                          },
                        }}
                      >
                        <VisibilityOutlinedIcon sx={{ color: "#ffffff" }} />
                        <Typography
                          variant="p"
                          sx={{
                            color: "#ffffff",
                            fontSize: "14px",
                            lineHeight: "18px",
                            fontWeight: "400",
                          }}
                        >
                          To view
                        </Typography>
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              {[0, 1, 2].map((data, index) => (
                <Grid
                  key={index}
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={6}
                  sx={{ mt: 1 }}
                >
                  <Box
                    sx={{
                      background: "#FFFFFF",
                      border: "1px solid #DBE1E5",
                      borderRadius: "8px",
                      py: 2,
                      px: { xs: 0, sm: 0, md: 0, lg: 2, xl: 0 },
                    }}
                  >
                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                    >
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

                      <Box
                        sx={{
                          px: { xs: 2, sm: 2, md: 2, lg: 0, xl: 2 },
                          width: "100%",
                          mt: 2,
                        }}
                      >
                        <Button
                          fullWidth
                          onClick={handleOpen}
                          varinat="outlined"
                          sx={{
                            display: "flex",
                            border: "1px solid #000F1A",
                            color: "#000F1A",
                            textTransform: "none",

                            py: 0.5,
                            px: 2,

                            mt: { xs: 0, sm: 0, md: 0, lg: 1, xl: 0 },
                            "&: hover": {
                              border: "1px solid #000F1A",
                              color: "#000F1A",
                              textTransform: "none",
                              py: 0.5,
                              px: 2,
                            },
                          }}
                        >
                          <CloudUploadOutlinedIcon sx={{ color: "#000F1A" }} />
                          <Typography
                            variant="p"
                            sx={{
                              color: "#000F1A",
                              fontSize: "14px",
                              lineHeight: "18px",
                              fontWeight: "400",
                              ml: 0.5,
                            }}
                          >
                            Send document
                          </Typography>
                        </Button>
                      </Box>
                    </Grid>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <BaseModal isShowing={contractModalOpen} isClose={handleClose}>
        <Tooltip title="Something">
          <>
            <CertificateModal />
          </>
        </Tooltip>
      </BaseModal>
    </Box>
  );
}

export default CertificatesAndDocuments;
