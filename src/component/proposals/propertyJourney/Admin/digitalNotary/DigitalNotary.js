import {
  Box,
  Button,
  Grid,
  Typography,
  Tooltip,
  LinearProgress,
  Skeleton,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import notary from "../../../../../../public/Images/notary.png";
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
import DigitalNotaryPdfModal from "../digitalNotaryPdfModal/DigitalNotaryPdfModal";
import DigitalNotaryModal from "../digitalNotaryModal/DigitalNotaryModal";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findUploadCertificateData } from "../../../../../redux/uploadCertificate/actions";
import { useState } from "react";

function DigitalNotary({ handleNext, singlePropertyData }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const type = "certificate_validated";
    dispatch(
      findUploadCertificateData(+singlePropertyData?.contract?.id, type)
    );
  }, [dispatch, singlePropertyData]);
  const uploadCertificateData = useSelector(
    (state) => state?.uploadCertificate?.uploadCertificateData
  );
 
  const [certificateData, setCertificateData] = useState("");
  const Loading = useSelector((state) => state?.uploadCertificate?.loading);
  console.log({Loading})
  //digital_notary_modal_open
  const [digitalNotaryModalOpen, setDigitalNotaryModalOpen] =
    React.useState(false);
  const handleOpen = () => setDigitalNotaryModalOpen(true);
  const handleClose = () => setDigitalNotaryModalOpen(false);
  //pdf_open
  const [digitalNotaryPdfOpen, setDigitalNotaryPdfOpen] = React.useState(false);
  const handlePdfOpen = (data) => {
    setDigitalNotaryPdfOpen(true);
    setCertificateData(data);
  };
  const handlePdfClose = () => setDigitalNotaryPdfOpen(false);

  return (
    <Box sx={{ mt: 4 }}>
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
       
          {Loading ? (
            <Grid item xs={12} sm={12} md={12} lg={3}>
              <Skeleton
                variant="rect"
                height={230}
                sx={{ mx: 2, my: 2, borderRadius: "8px" }}
              />
            </Grid>
          ) : (
            <Grid item xs={12} sm={12} md={12} lg={3}>
              <SaleCard singlePropertyData={singlePropertyData} />
            </Grid>
          )}
    
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
            <Grid container spacing={2}>
              {
                Loading ?
                [0, 1, 2].map((data, index) => (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={6}
                    xl={6}
                    xxl={6}
                  >
                    <Skeleton
                      variant="rect"
                      height={150}
                      width={300}
                      sx={{ mx: 2, my: 2, borderRadius: "8px" }}
                    />
                  </Grid>
                ))
                :
                uploadCertificateData?.documents?.map((data, index) => (
                  <Grid key={index} item xs={12} sm={12} md={12} lg={6}>
                    <Box
                      sx={{
                        border: "1px solid #34BE84",
                        borderRadius: "8px",
                        px: 2,
                        py: 2,
                        mt: 1,
                        height: {
                          xs: 200,
                          sm: 200,
                          md: 200,
                          lg: 200,
                          xl: 180,
                        },
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
                              Validated document
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
                            {data?.tag?.name}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                        sx={{ mt: 1 }}
                      >
                        <Button
                          sx={{
                            background: "#DBE1E5",
                            color: "#002152",
                            fontWeight: "600",
                            fontSize: "14px",
                            lineHeight: "18px",
                            textTransform: "none",
                            "&:hover": {
                              background: "#DBE1E5",
                              color: "#002152",
                              fontWeight: "600",
                              fontSize: "14px",
                              lineHeight: "18px",
                            },
                          }}
                          onClick={() => handlePdfOpen(data)}
                        >
                          Details
                        </Button>
                      </Grid>
                    </Box>
                  </Grid>
                ))}

              
             
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-end"
              sx={{ mt: 3, mb: 1 }}
            >
              <Button
                onClick={handleOpen}
                sx={{
                  background: "#7450F0",
                  color: "#ffffff",
                  fontWeight: "600",
                  fontSize: "14px",
                  lineHeight: "18px",
                  textTransform: "none",
                  "&:hover": {
                    background: "#7450F0",
                    color: "#ffffff",
                    fontWeight: "600",
                    fontSize: "14px",
                    lineHeight: "18px",
                  },
                }}
              >
                Send documents
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <BaseModal isShowing={digitalNotaryModalOpen} isClose={handleClose}>
        <Tooltip title="Something">
          <>
            <DigitalNotaryModal
              handleClose={handleClose}
              handleNext={handleNext}
              singlePropertyData={singlePropertyData}
            />
          </>
        </Tooltip>
      </BaseModal>
      <BaseModal isShowing={digitalNotaryPdfOpen} isClose={handlePdfClose}>
        <Tooltip title="Something">
          <>
            <DigitalNotaryPdfModal
              handleClose={handlePdfClose}
              handlePdfOpen={handlePdfOpen}
              handleNext={handleNext}
              singlePropertyData={singlePropertyData}
              certificateData={certificateData}
            />
          </>
        </Tooltip>
      </BaseModal>
    </Box>
  );
}

export default DigitalNotary;
