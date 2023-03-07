import {
  Box,
  Button,
  Grid,
  TextField,
  TextareaAutosize,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import notaryImage from "../../../../../../public/Images/notary_submission.png";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useState } from "react";
import { useMemo } from "react";
import BaseModal from "../../../../reuseable/baseModal/BaseModal";

import DigitalNotaryDocumentSentModal from "../DigitalNotaryDocumentSentModal/DigitalNotaryDocumentSentModal";

function DigitalNotaryModal({ handleClose, handleNext }) {
  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    // top:{xs:"80%"},
    transform: "translate(-50%, -50%)",
    width: { xs: "70%", sm: "70%", md: "70%", lg: "35%", xl: "30%" },
    bgcolor: "#ffffff",
    // border: "2px solid #000",
    boxShadow: "none",
    borderRadius: "12px",
    overflowY: "scroll",
    px: 1,
    py: 2,
  };

  //Notary_sent_modal_open
  const [digitalNotarySentModalOpen, setDigitalNotarySentModalOpen] =
    React.useState(false);
  const handleSentModalOpen = () => setDigitalNotarySentModalOpen(true);
  const handleSentModalClose = () => setDigitalNotarySentModalOpen(false);

  return (
    <Box sx={styleModal}>
      <Box sx={{ width: "100%" }}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            height: {
              xs: "40vh",
              sm: "40vh",
              md: "40vh",
              lg: "40vh",
              xl: "30vh",
            },
          }}
        >
          <Box>
            <Image src={notaryImage} alt="notaryImage" />
          </Box>
          <Box sx={{ px: { xs: 2, sm: 2, md: 2, lg: 0 } }}>
            <Typography
              variant="p"
              sx={{
                color: "#002152",
                fontSize: "24px",
                fontWeight: "700",
                lineHeight: "32px",
                textAlign: "center",
                mt: 2,
              }}
            >
              Confirm submission to notary
            </Typography>
          </Box>
        </Grid>
        <Box sx={{ mx: 2 }}>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                id="outlined-basic"
                placeholder="Protocol No"
                variant="outlined"
                type="number"
              />
            </Grid>
          </Grid>
          <Grid container sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                id="outlined-basic"
                placeholder="Registry"
                variant="outlined"
                type="number"
              />
            </Grid>
          </Grid>
          <Grid container sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                id="outlined-basic"
                placeholder="Contact Phone"
                variant="outlined"
                type="number"
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sx={{ mt: 1 }}>
              <TextField
                fullWidth
                size="small"
                id="outlined-basic"
                placeholder="Return Period"
                variant="outlined"
                type="number"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 1, mb: 1 }}>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <Button
                onClick={handleClose}
                fullWidth
                sx={{
                  background: "#DBE1E5",
                  borderRadius: "4px",
                  color: "#1A1859",
                  fontSize: "16px",
                  lineHeight: "22px",
                  fontWeight: "22px",
                  textTransform: "none",
                  "&:hover": {
                    background: "#DBE1E5",
                    borderRadius: "4px",
                    color: "#1A1859",
                    fontSize: "16px",
                    lineHeight: "22px",
                    fontWeight: "22px",
                  },
                }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <Button
                fullWidth
                onClick={handleSentModalOpen}
                sx={{
                  background: " #34BE84",
                  borderRadius: "4px",
                  color: "#ffffff",
                  fontSize: "16px",
                  lineHeight: "22px",
                  fontWeight: "22px",
                  textTransform: "none",
                  "&:hover": {
                    background: " #34BE84",
                    borderRadius: "4px",
                    color: "#ffffff",
                    fontSize: "16px",
                    lineHeight: "22px",
                    fontWeight: "22px",
                  },
                }}
              >
                To send
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <BaseModal
        isShowing={digitalNotarySentModalOpen}
        isClose={handleSentModalClose}
      >
        <Tooltip title="Something">
          <>
            <DigitalNotaryDocumentSentModal
              handleSentModalClose={handleSentModalClose}
              handleClose={handleClose}
              handleNext={handleNext}
            />
          </>
        </Tooltip>
      </BaseModal>
    </Box>
  );
}

export default DigitalNotaryModal;
