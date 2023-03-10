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

import BaseModal from "../../../../reuseable/baseModal/BaseModal";

import SaleCard from "../../../../reuseable/saleCard/SaleCard";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function BrokerCertificateAndDocument({ handleNext }) {
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
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="p"
                sx={{
                  color: "#1A1859",
                  fontSize: "16px",
                  lineHeight: "22px",
                  fontWeight: "700",
                }}
              >
                Select the required documents
              </Typography>
              <FormControl component="fieldset">
                <FormControlLabel
                  value="end"
                  control={<Checkbox sx={{ color: "#002152" }} />}
                  label={
                    <Typography
                      variant="h6"
                      style={{
                        color: "#002152",
                        fontSize: "14px",
                        fontWeight: "400",
                        lineHeight: "18px",
                      }}
                    >
                      Select all
                    </Typography>
                  }
                  labelPlacement="end"
                />
              </FormControl>
            </Grid>
            <Grid container spacing={3}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((data, index) => (
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
                      background: "#F2F5F6",

                      borderRadius: "8px",
                      py: 2,
                      px: 2,
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
                          Certificate of Distribution of Civil Actions - State
                          Justice (1st instance)
                        </Typography>
                      </Box>
                    </Grid>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-start"
            >
              <Button
                onClick={handleNext}
                sx={{
                  background: "#34BE84",
                  color: "#ffffff",
                  fontSize: "16px",
                  lineHeight: "22px",
                  textTransform: "none",
                  mt: 5,
                  px: 2,
                  "&: hover": {
                    background: "#34BE84",
                    color: "#ffffff",
                    fontSize: "16px",
                    lineHeight: "22px",
                    px: 2,
                  },
                }}
              >
                Request documents
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default BrokerCertificateAndDocument;
