import {
  Autocomplete,
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import pinImage from "../../../../public/Images/pin.png";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { useMemo } from "react";
import BaseOutlinedZipInput from "../../reuseable/baseOutlinedZipInput/BaseOutlinedZipInput";
import Link from "next/link";
import BaseTextField from "../../reuseable/baseTextField/BaseTextField";

const baseStyle = {
  flex: 1,
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
  width: "70%",
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

function Address() {
  const [files, setFiles] = useState([]);
  console.log(files);

  const [value, setValue] = useState("");
  console.log(value.length);
  const [valid, setValid] = useState(false);
  console.log({ valid });
  const handleValidation = (e) => {
    setValid(/^[0-9]{5}-[0-9]{3}$/.test(e.target.value));
    console.log(e.target.value);
    setValue(e.target.value);
  };

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
    <Box sx={{ mt: 4 }}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Image height={40} width={40} src={pinImage} alt="pin" />
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
          sales authorization document
        </Typography>
      </Grid>
      <Box {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <Typography
          variant="p"
          sx={{
            color: "#6C7A84",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "18px",
            mt: 1,
          }}
        >
          Drag and drop documents here
        </Typography>
        <Typography
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
        </Typography>
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
          select documents
        </Button>
      </Box>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ mt: 2 }}
      >
        <Image height={40} width={40} src={pinImage} alt="pin" />
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
          property type and address
        </Typography>
      </Grid>
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Typography
              variant="p"
              sx={{
                color: "#002152",
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "22px",
              }}
            >
              Ad type:
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Button
                    sx={{
                      width: "100%",
                      background: "#0362F0",
                      borderRadius: "152px",
                      color: "#ffffff",
                      fontSize: {
                        xs: "12px",
                        sm: "13px",
                        md: "16px",
                        lg: "13px",
                        xl: "16px",
                      },
                      fontWeight: "400",
                      lineHeight: "22px",
                      textTransform: "none",
                      px: { xs: 0, sm: 2, md: 2, lg: 2, xl: 2 },
                      py: 1,
                      "&:hover": {
                        width: "100%",
                        background: "#0362F0",
                        borderRadius: "152px",
                        color: "#ffffff",
                        fontSize: {
                          xs: "12px",
                          sm: "13px",
                          md: "16px",
                          lg: "13px",
                          xl: "16px",
                        },
                        fontWeight: "400",
                        lineHeight: "22px",
                        textTransform: "none",
                        px: { xs: 0, sm: 2, md: 2, lg: 2, xl: 2 },
                        py: 1,
                      },
                    }}
                  >
                    Rent
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    sx={{
                      width: "100%",
                      background: "#F2F5F6",
                      borderRadius: "152px",
                      color: "#002152",
                      fontSize: {
                        xs: "12px",
                        sm: "13px",
                        md: "16px",
                        lg: "13px",
                        xl: "16px",
                      },
                      fontWeight: "400",
                      lineHeight: "22px",
                      textTransform: "none",
                      px: { xs: 0, sm: 2, md: 2, lg: 2, xl: 2 },
                      py: 1,
                      "&:hover": {
                        width: "100%",
                        background: "#F2F5F6",
                        borderRadius: "152px",
                        color: "#002152",
                        fontSize: {
                          xs: "12px",
                          sm: "13px",
                          md: "16px",
                          lg: "13px",
                          xl: "16px",
                        },
                        fontWeight: "400",
                        lineHeight: "22px",
                        textTransform: "none",
                        px: { xs: 0, sm: 2, md: 2, lg: 2, xl: 2 },
                        py: 1,
                      },
                    }}
                  >
                    Sale
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Typography
              variant="p"
              sx={{
                color: "#002152",
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "22px",
              }}
            >
              Property type:
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Button
                    sx={{
                      width: "100%",
                      background: "#0362F0",
                      borderRadius: "152px",
                      color: "#ffffff",
                      fontSize: {
                        xs: "12px",
                        sm: "13px",
                        md: "16px",
                        lg: "13px",
                        xl: "16px",
                      },
                      fontWeight: "400",
                      lineHeight: "22px",
                      textTransform: "none",
                      px: { xs: 0, sm: 2, md: 2, lg: 2, xl: 2 },
                      py: 1,
                      "&:hover": {
                        width: "100%",
                        background: "#0362F0",
                        borderRadius: "152px",
                        color: "#ffffff",
                        fontSize: {
                          xs: "12px",
                          sm: "13px",
                          md: "16px",
                          lg: "13px",
                          xl: "16px",
                        },
                        fontWeight: "400",
                        lineHeight: "22px",
                        textTransform: "none",
                        px: { xs: 0, sm: 2, md: 2, lg: 2, xl: 2 },
                        py: 1,
                      },
                    }}
                  >
                    Residence
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    sx={{
                      width: "100%",
                      background: "#F2F5F6",
                      borderRadius: "152px",
                      color: "#002152",
                      fontSize: {
                        xs: "12px",
                        sm: "13px",
                        md: "16px",
                        lg: "13px",
                        xl: "16px",
                      },
                      fontWeight: "400",
                      lineHeight: "22px",
                      textTransform: "none",
                      px: { xs: 0, sm: 2, md: 2, lg: 2, xl: 2 },
                      py: 1,
                      "&:hover": {
                        width: "100%",
                        background: "#F2F5F6",
                        borderRadius: "152px",
                        color: "#002152",
                        fontSize: {
                          xs: "12px",
                          sm: "13px",
                          md: "16px",
                          lg: "13px",
                          xl: "16px",
                        },
                        fontWeight: "400",
                        lineHeight: "22px",
                        textTransform: "none",
                        px: { xs: 0, sm: 2, md: 2, lg: 2, xl: 2 },
                        py: 1,
                      },
                    }}
                  >
                    Commercial
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Typography
              variant="p"
              sx={{
                color: "#002152",
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "22px",
              }}
            >
              Property detail:
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Grid container spacing={1}>
                <Grid item xs={3}>
                  <Button
                    sx={{
                      width: "100%",
                      background: "#0362F0",
                      borderRadius: "152px",
                      color: "#ffffff",
                      fontSize: {
                        xs: "12px",
                        sm: "13px",
                        md: "16px",
                        lg: "13px",
                        xl: "16px",
                      },
                      fontWeight: "400",
                      lineHeight: "22px",
                      textTransform: "none",
                      px: { xs: 0, sm: 2, md: 2, lg: 2, xl: 2 },
                      py: 1,
                      "&:hover": {
                        width: "100%",
                        background: "#0362F0",
                        borderRadius: "152px",
                        color: "#ffffff",
                        fontSize: {
                          xs: "12px",
                          sm: "13px",
                          md: "16px",
                          lg: "13px",
                          xl: "16px",
                        },
                        fontWeight: "400",
                        lineHeight: "22px",
                        textTransform: "none",
                        px: { xs: 0, sm: 2, md: 2, lg: 2, xl: 2 },
                        py: 1,
                      },
                    }}
                  >
                    Appartment
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button
                    sx={{
                      width: "100%",
                      background: "#F2F5F6",
                      borderRadius: "152px",
                      color: "#002152",
                      fontSize: {
                        xs: "12px",
                        sm: "13px",
                        md: "16px",
                        lg: "13px",
                        xl: "16px",
                      },
                      fontWeight: "400",
                      lineHeight: "22px",
                      textTransform: "none",
                      px: { xs: 0, sm: 2, md: 2, lg: 2, xl: 2 },
                      py: 1,
                      "&:hover": {
                        width: "100%",
                        background: "#F2F5F6",
                        borderRadius: "152px",
                        color: "#002152",
                        fontSize: {
                          xs: "12px",
                          sm: "13px",
                          md: "16px",
                          lg: "13px",
                          xl: "16px",
                        },
                        fontWeight: "400",
                        lineHeight: "22px",
                        textTransform: "none",
                        px: { xs: 0, sm: 2, md: 2, lg: 2, xl: 2 },
                        py: 1,
                      },
                    }}
                  >
                    Casa,Lar
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button
                    sx={{
                      width: "100%",
                      background: "#F2F5F6",
                      borderRadius: "152px",
                      color: "#002152",
                      fontSize: {
                        xs: "12px",
                        sm: "13px",
                        md: "16px",
                        lg: "13px",
                        xl: "16px",
                      },
                      fontWeight: "400",
                      lineHeight: "22px",
                      textTransform: "none",
                      px: { xs: 0, sm: 2, md: 2, lg: 2, xl: 2 },
                      py: 1,
                      "&:hover": {
                        width: "100%",
                        background: "#F2F5F6",
                        borderRadius: "152px",
                        color: "#002152",
                        fontSize: {
                          xs: "12px",
                          sm: "13px",
                          md: "16px",
                          lg: "13px",
                          xl: "16px",
                        },
                        fontWeight: "400",
                        lineHeight: "22px",
                        textTransform: "none",
                        px: { xs: 0, sm: 2, md: 2, lg: 2, xl: 2 },
                        py: 1,
                      },
                    }}
                  >
                    Farm,Site
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button
                    sx={{
                      width: "100%",
                      background: "#F2F5F6",
                      borderRadius: "152px",
                      color: "#002152",
                      fontSize: {
                        xs: "12px",
                        sm: "13px",
                        md: "16px",
                        lg: "13px",
                        xl: "16px",
                      },
                      fontWeight: "400",
                      lineHeight: "22px",
                      textTransform: "none",
                      px: { xs: 0, sm: 2, md: 2, lg: 2, xl: 2 },
                      py: 1,
                      "&:hover": {
                        width: "100%",
                        background: "#F2F5F6",
                        borderRadius: "152px",
                        color: "#002152",
                        fontSize: {
                          xs: "12px",
                          sm: "13px",
                          md: "16px",
                          lg: "13px",
                          xl: "16px",
                        },
                        fontWeight: "400",
                        lineHeight: "22px",
                        textTransform: "none",
                        px: { xs: 0, sm: 2, md: 2, lg: 2, xl: 2 },
                        py: 1,
                      },
                    }}
                  >
                    Lot,Land
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Autocomplete
        sx={{ mt: 3, width: "70%" }}
        disablePortal
        size="medium"
        id="combo-box-demo"
        options={top100Films}
        renderInput={(params) => (
          <TextField {...params} label="Select the enterprise" />
        )}
      />
      <Box sx={{ mt: 1 }}>
        <Link href="/new_venture">
          <a
            style={{
              textDecoration: "none",
              listStyle: "none",
              width: "100%",
            }}
          >
            <Typography
              variant="p"
              sx={{
                color: "#7450F0",
                fontSize: "16px",
                lineHeight: "22px",
                fontWeight: "400",
              }}
            >
              New venture
            </Typography>
          </a>
        </Link>
        <Divider sx={{ mt: 1, background: "#DBE1E5" }} />
      </Box>
      <Grid container spacing={1} sx={{ mt: 3 }}>
        <Grid item xs={12} sm={12} md={12} lg={3}>
          <FormControl variant="outlined" sx={{ width: "100%" }}>
            <BaseOutlinedZipInput placeholder={"Zip Code"} size={"medium"} />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <BaseTextField size={"medium"} placeholder={"Address"} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={3}>
          <BaseTextField
            size={"medium"}
            placeholder={"Number"}
            type={"number"}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 3 }}>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <BaseTextField size={"medium"} placeholder={"Neighborhood"} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={8}>
          <BaseTextField size={"medium"} placeholder={"Complement"} />
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 3 }}>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <BaseTextField size={"medium"} placeholder={"City"} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <Autocomplete
            sx={{ width: "100%" }}
            disablePortal
            size="medium"
            id="combo-box-demo"
            options={top100Films}
            renderInput={(params) => <TextField {...params} label="State" />}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Address;
const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
];
