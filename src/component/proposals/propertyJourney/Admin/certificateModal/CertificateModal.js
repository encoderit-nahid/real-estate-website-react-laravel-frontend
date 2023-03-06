import {
  Box,
  Button,
  Grid,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React from "react";
import handshake from "../../../../../../public/Images/handshake.png";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import certificate from "../../../../../../public/Images/certificate.png";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import { useState } from "react";
import { useMemo } from "react";

const baseStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "50px",
  borderWidth: 2,
  borderRadius: "4px",
  borderColor: "#DBE1E5",
  borderStyle: "dashed",
  backgroundColor: "#F2F5F6",

  color: "#c4c4c4",
  outline: "none",
  transition: "border .24s ease-in-out",
  width: "90%",

  marginTop: "2vh",
};

const activeStyle = {
  borderColor: "#f2f",
};

const acceptStyle = {
  borderColor: "#f8f",
};

const rejectStyle = {
  borderColor: "#f2f",
};

function CertificateModal({ handleClose }) {
  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    // top:{xs:"80%"},
    transform: "translate(-50%, -50%)",
    width: { xs: "70%", sm: "70%", md: "70%", lg: "35%", xl: "35%" },
    bgcolor: "#ffffff",
    // border: "2px solid #000",
    boxShadow: "none",
    borderRadius: "12px",
    overflowY: "scroll",
    px: 1,
    py: 2,
  };

  const [files, setFiles] = useState([]);
  console.log(files);

  const onDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
    acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    const allFiles = [...files, ...acceptedFiles]; //save all files here
    console.log(allFiles);
    setFiles(allFiles);
  };
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  const handleDelete = (index) => {
    console.log(index);
    const filterItem = files.filter((file, fileIndex) => fileIndex !== index);
    setFiles(filterItem);
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );
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
              xs: "50vh",
              sm: "50vh",
              md: "50vh",
              lg: "60vh",
              xl: "50vh",
            },
          }}
        >
          <Box>
            <Image src={certificate} alt="certificate" />
          </Box>
          <Box sx={{ pl: { xs: 2, sm: 2, md: 2, lg: 2, xl: 2 } }}>
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
              Negative certificate of real estate tax debts
            </Typography>
          </Box>
          <Box {...getRootProps({ style })}>
            <input {...getInputProps()} />
            {/* <Typography
              variant="p"
              sx={{
                color: "#6C7A84",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "18px",
                mt: 1,
              }}
            >
              Drag and drop here
            </Typography> */}
            {/* <Typography
              variant="p"
              sx={{
                color: "#6C7A84",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "18px",
                mt: 1,
              }}
            >
              or
            </Typography> */}
            <FolderOutlinedIcon />
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                mt: 1,
                background: "#0362F0",
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: "600",
                lineHeight: "18px",
              }}
            >
              select document
            </Button>
          </Box>
        </Grid>
      </Box>
      <Box sx={{ px: 3 }}>
        <Typography
          variant="p"
          sx={{
            color: "#002152",
            fontSize: "16px",
            lineHeight: "22px",
            fontWeight: "400",
          }}
        >
          Comments:
        </Typography>
        <TextareaAutosize
          aria-label="minimum height"
          minRows={4}
          //   placeholder="Observation"
          //   value={field.value}
          style={{
            marginTop: "0.5vh",
            width: "100%",
            // margin: "2vh 0",
            color: "rgba(0, 0, 0, 0.87)",
            fontSize: "17px",
            outlineColor: "#1976d2",
            border: `1px solid silver`,
            borderRadius: "5px",
            padding: "0.4vh 1.4vh",
          }}
        />
      </Box>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
        sx={{ mt: { xs: 2, sm: 2, md: 2, lg: 0, xl: 2 }, px: 3, pb: 3 }}
      >
        <Button
          variant="outlined"
          sx={{
            borderColor: "#002152",
            fontSize: "16px",
            fontWeight: "600",
            color: "#002152",
            textTransform: "none",
            paddingX: 4,
            paddingY: 0.6,
            mr: 1,
            "&:hover": {
              borderColor: "#002152",
              fontSize: "16px",
              fontWeight: "600",
              color: "#002152",
              textTransform: "none",
              paddingX: 4,
              paddingY: 0.6,
              mr: 1,
            },
          }}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          variant="outlined"
          sx={{
            background: "#34BE84",
            boxShadow: "0px 4px 8px rgba(34, 148, 100, 0.32)",
            borderRadius: "4px",
            fontSize: "16px",
            fontWeight: "600",
            lineHeight: "22px",
            textTransform: "none",
            color: "#ffffff",
            paddingX: 4,
            paddingY: 1,
            "&:hover": {
              background: "#34BE84",
              boxShadow: "0px 4px 8px rgba(34, 148, 100, 0.32)",
              borderRadius: "4px",
              fontSize: "16px",
              fontWeight: "600",
              lineHeight: "22px",
              textTransform: "none",
              color: "#ffffff",
              paddingX: 4,
              paddingY: 1,
            },
          }}
        >
          To send
        </Button>
      </Grid>
    </Box>
  );
}

export default CertificateModal;
