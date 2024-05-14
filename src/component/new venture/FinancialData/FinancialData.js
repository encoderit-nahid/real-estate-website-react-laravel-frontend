import {
  Autocomplete,
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";
import pinImage from "../../../../public/Images/pin.png";
import ventureImage from "../../../../public/Images/certidoes.png";

import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { useMemo } from "react";
import BaseOutlinedZipInput from "../../reuseable/baseOutlinedZipInput/BaseOutlinedZipInput";
import Link from "next/link";
import BaseTextField from "../../reuseable/baseTextField/BaseTextField";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import { findPropertyTypeData } from "../../../redux/propertyType/actions";
import { useDispatch, useSelector } from "react-redux";
import { findProjectsData } from "../../../redux/projects/actions";
import { Controller } from "react-hook-form";
import BaseAutocomplete from "../../reuseable/baseAutocomplete/BaseAutocomplete";
import { findStateData } from "../../../redux/state/actions";
import en from "locales/en";
import pt from "locales/pt";
import dynamic from "next/dynamic";
import BaseTextArea from "@/component/reuseable/baseTextArea/BaseTextArea";
// import PhotosAndVideos from "@/component/new venture/PhotosAndVideos/PhotosAndVideos";

const BaseTextEditor = dynamic(
  () => import("@/component/reuseable/baseTextEditor/BaseTextEditor"),
  {
    ssr: false, // This ensures that the component is not rendered on the server
  }
);

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

const matchedPropertyType = [11, 10, 13, 6, 1, 2, 4, 8, 15];

function FinancialData({
  control,
  errors,
  adType,
  setAdType,
  propertyType,
  setPropertyType,
  property_detail_id,
  setPropertyDetailId,
  documents,
  setDocuments,
  languageName,
  allValues,
  setValue,
  handleNext,
}) {
  const dispatch = useDispatch();

  const t = languageName === "en" ? en : pt;

  console.log({ allValues });

  useEffect(() => {
    dispatch(
      findPropertyTypeData(
        propertyType === "Residential" ? "residential" : "commercial"
      )
    );
    dispatch(findProjectsData({ page: 1, per_page: 10 }));
    dispatch(findStateData());
  }, [dispatch, propertyType]);

  const projectData = useSelector((state) => state?.project?.projectData?.data);

  const propertyDetail = useSelector(
    (state) => state?.propertyType?.propertyTypeData
  );

  const allStateData = useSelector((state) => state.state.stateData);

  console.log({ allStateData });

  // console.log({ documents })
  // const filterDocs = documents?.filter((d) => d instanceof File)
  // console.log({ filterDocs })

  const onDrop = (acceptedFiles) => {
    acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    const allFiles = [...documents, ...acceptedFiles]; //save all files here

    setDocuments(allFiles);
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
    const filterItem = documents.filter(
      (file, fileIndex) => fileIndex !== index
    );
    setDocuments(filterItem);
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
        sx={{ mt: 2 }}
      >
        <Image src={ventureImage} alt="venture" />

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
          Financial Data
        </Typography>
      </Grid>

      <Grid container spacing={4} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Controller
            name="prohibited"
            control={control}
            // defaultValue={{}}
            render={({ field }) => (
              <BaseAutocomplete
                //   sx={{ margin: "0.6vh 0" }}
                options={allStateData || []}
                getOptionLabel={(option) => option.name || ""}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                size={"medium"}
                placeholder={`% Prohibited`}
                onChange={(e, v, r, d) => field.onChange(v)}
                value={field.value || null}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.state?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="adjustment_index"
            control={control}
            // defaultValue={{}}
            render={({ field }) => (
              <BaseAutocomplete
                //   sx={{ margin: "0.6vh 0" }}
                options={allStateData || []}
                getOptionLabel={(option) => option.name || ""}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                size={"medium"}
                placeholder={`Adjustment index`}
                onChange={(e, v, r, d) => field.onChange(v)}
                value={field.value || null}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.state?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="number_of_installments"
            control={control}
            // defaultValue={{}}
            render={({ field }) => (
              <BaseAutocomplete
                //   sx={{ margin: "0.6vh 0" }}
                options={allStateData || []}
                getOptionLabel={(option) => option.name || ""}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                size={"medium"}
                placeholder={`Number of installments`}
                onChange={(e, v, r, d) => field.onChange(v)}
                value={field.value || null}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.state?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="value_per_square_meter"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextField
                size={"medium"}
                placeholder={`R$ Value per square meter`}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"city"}
                value={field.value}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.city?.message}
          </Typography>
        </Grid>
        <Grid item xs={12}>
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
              Purchase and sale contract
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
              {t["drag and drop images here"]}
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
              {t["or"]}
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
              {t["select images"]}
            </Button>
            <Typography
              variant="inherit"
              color="textSecondary"
              sx={{ color: "#b91c1c" }}
            >
              {errors?.images?.message}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FinancialData;
