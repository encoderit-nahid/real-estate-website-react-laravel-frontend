import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";
import orionImage from "../../../../public/Images/orion.png";
import { useDropzone } from "react-dropzone";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useState } from "react";
import { useMemo } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import BaseTextField from "../../reuseable/baseTextField/BaseTextField";
import BaseAutocomplete from "../../reuseable/baseAutocomplete/BaseAutocomplete";
import { Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { GetPhotoTypeData } from "../../../redux/photo/actions";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { _baseURL } from "../../../../consts";
import { useRouter } from "next/router";

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

function PhotosAndVideos({
  control,
  errors,
  files,
  setFiles,
  imageError,
  imageErrorMessage,
  fields,
  append,
  remove,
}) {
  const dispatch = useDispatch();
  const { query } = useRouter();
  useEffect(() => {
    dispatch(GetPhotoTypeData());
  }, [dispatch]);

  const photoType = useSelector((state) => state.photoType.photoTypeData);
  console.log({ photoType });

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

  const myLoader = ({ src }) => {
    return `${_baseURL}/storage/${src}`;
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Image height={40} width={40} src={orionImage} alt="orion" />
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
          Photos and videos
        </Typography>
      </Grid>
      <Box sx={{ mt: 3 }}>
        <Typography
          variant="p"
          sx={{
            color: "#002152",
            fontSize: "16px",
            fontWeight: "400",
            lineHeight: "22px",
          }}
        >
          Images of the property:
        </Typography>
      </Box>

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
          Drag and drop images here
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
          select images
        </Button>
        <Typography
          variant="inherit"
          color="textSecondary"
          sx={{ color: "#b91c1c" }}
        >
          {errors?.images?.message}
        </Typography>
      </Box>

      {files?.length > 0 && (
        <Grid container spacing={1} sx={{ mt: 3 }}>
          {files?.map((file, index) => (
            <Grid item xs={12} sm={12} md={4} lg={3} xl={3} key={file.id}>
              <Box
                sx={{
                  p: 2,
                  boxSizing: "border-box",
                  border: "1px solid #DBE1E5",
                  borderRadius: "6px",
                }}
              >
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="flex-start"
                >
                  <DeleteOutlineOutlinedIcon
                    sx={{
                      background: "#F44336",
                      color: "#ffffff",
                      borderRadius: "50%",
                      height: "3vh",
                      width: "3vh",
                      paddingY: "3px",
                    }}
                    onClick={() => handleDelete(index)}
                  />
                </Grid>
                <Image
                  loader={myLoader}
                  src={file?.preview || file?.file_path}
                  height={70}
                  width={100}
                  // layout="responsive"
                  alt="file"
                />
                {/* <Autocomplete
                              sx={{ mt: 2 }}
                              disablePortal
                              fullWidth
                              size="small"
                              id="combo-box-demo"
                              options={top100Films}
                              renderInput={(params) => (
                                <TextField {...params} label="Convenient" />
                              )}
                            /> */}
                <Controller
                  name={`title_${index}`}
                  control={control}
                  defaultValue={photoType[0] || file.photo_type}
                  render={({ field }) => (
                    <BaseAutocomplete
                      //   sx={{ margin: "0.6vh 0" }}
                      options={photoType || []}
                      getOptionLabel={(option) => option.name || ""}
                      sx={{ mt: 2 }}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      size={"small"}
                      placeholder={"Convenient"}
                      onChange={(e, v, r, d) => field.onChange(v)}
                      value={field.value}
                    />
                  )}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      <Box sx={{ mt: 5 }}>
        <Typography
          variant="p"
          sx={{
            color: "#002152",
            fontSize: "16px",
            fontWeight: "400",
            lineHeight: "22px",
          }}
        >
          videos of the property:
        </Typography>
      </Box>
      {fields?.map((item, index) => (
        <Grid
          key={item.id}
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{ mt: 1 }}
        >
          <Controller
            name={`videos[${index}].url`}
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextField
                sx={{
                  width: "50%",

                  "& .MuiOutlinedInput-root": {
                    // - The Input-root, inside the TextField-root
                    "& fieldset": {
                      borderRadius: "4px 0px 0px 4px", // - The <fieldset> inside the Input-root
                      // - Set the Input border
                    },
                  },
                }}
                size={"medium"}
                placeholder={"paste the url of the video"}
                onChange={field.onChange}
                value={field.value}
              />
            )}
          />
          <Controller
            name={`videos[${index}].title`}
            control={control}
            defaultValue={photoType[0] || {}}
            render={({ field }) => (
              <BaseAutocomplete
                //   sx={{ margin: "0.6vh 0" }}
                options={photoType || []}
                getOptionLabel={(option) => option.name || ""}
                sx={{ width: "20%", ml: 1, mr: 1 }}
                isOptionEqualToValue={(option, value) =>
                  option.slug === value.slug
                }
                size={"medium"}
                placeholder={"Convenient"}
                onChange={(e, v, r, d) => field.onChange(v)}
                value={field.value}
              />
            )}
          />
          {index === fields?.length - 1 && (
            <Button
              sx={{
                backgroundColor: "#DBE1E5",
                py: 2,
                borderRadius: "0px 4px 4px 0px",
                "&:hover": {
                  backgroundColor: "#DBE1E5",
                  py: 2,
                  borderRadius: "0px 4px 4px 0px",
                },
              }}
              onClick={() => append({ url: "", title: null })}
            >
              <AddOutlinedIcon sx={{ color: "#002152" }} />
            </Button>
          )}
          {fields.length !== 1 && (
            <Button
              sx={{
                ml: 1,
                backgroundColor: "#DBE1E5",
                py: 2,
                borderRadius: "0px 4px 4px 0px",
                "&:hover": {
                  backgroundColor: "#DBE1E5",
                  py: 2,
                  borderRadius: "0px 4px 4px 0px",
                },
              }}
              onClick={() => {
                remove(index);
              }}
            >
              <CancelOutlinedIcon />
            </Button>
          )}
        </Grid>
      ))}
    </Box>
  );
}

export default PhotosAndVideos;
const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
];
