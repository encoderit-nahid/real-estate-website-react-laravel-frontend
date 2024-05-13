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

function Address({
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
      "application/pdf": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
      "application/msword": [],
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

  const [disableBtn, setDisableBtn] = useState(false);
  useEffect(() => {
    // if (
    //   allValues?.zip_code != null &&
    //   allValues?.address != null &&
    //   allValues?.number != null &&
    //   allValues?.neighbourhood != null &&
    //   allValues?.property_title != null &&
    //   allValues?.city != null &&
    //   allValues?.state != null
    //   // documents?.length > 0
    // ) {
    //   setDisableBtn(false);
    // }
    // if (
    //   allValues?.zip_code === "" ||
    //   allValues?.address === "" ||
    //   allValues?.number === "" ||
    //   allValues?.neighbourhood === "" ||
    //   allValues?.property_title === "" ||
    //   allValues?.city === "" ||
    //   allValues?.state === ""
    //   // documents?.length < 1
    // ) {
    //   setDisableBtn(true);
    // }
  }, [allValues, documents]);

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
          {t["Address"]}
        </Typography>
      </Grid>
      <Grid container sx={{ mt: 2 }}>
        <Controller
          name="name"
          control={control}
          defaultValue={""}
          render={({ field }) => (
            <BaseTextField
              // size={"small"}
              placeholder={t["Enterprise Name"]}
              onChange={(e) => {
                field.onChange(e.target.value);
              }}
              name={"name"}
              value={field.value}
            />
          )}
        />
        <Typography
          variant="inherit"
          color="textSecondary"
          sx={{ color: "#b91c1c", mt: 0.5 }}
        >
          {errors.name?.message}
        </Typography>
      </Grid>
      <Grid container sx={{ mt: 2 }}>
        <Controller
          name="description"
          control={control}
          defaultValue={""}
          render={({ field }) => (
            <BaseTextArea
              minRows={3}
              onChange={(e) => {
                field.onChange(e.target.value);
              }}
              name={"description"}
              value={field.value}
              style={{
                marginTop: "1vh",
                width: "100%",

                color: "rgba(0, 0, 0, 0.87)",
                fontSize: "17px",
                outlineColor: "#1976d2",
                border: `1px solid silver`,
                borderRadius: "5px",
                padding: "0.4vh 1.4vh",
              }}
              placeholder={t["Description"]}
            />
          )}
        />
        <Typography
          variant="inherit"
          color="textSecondary"
          sx={{ color: "#b91c1c", mt: 0.5 }}
        >
          {errors.description?.message}
        </Typography>
      </Grid>

      <Grid container spacing={1} sx={{ mt: 3 }}>
        <Grid item xs={12} sm={12} md={12} lg={3}>
          <FormControl variant="outlined" sx={{ width: "100%" }}>
            <Controller
              name="zip_code"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <BaseOutlinedZipInput
                  placeholder={`${t["Zip code"]}*`}
                  size={"medium"}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  name={"zip_code"}
                  value={field.value}
                  // error={errors.cpf_number ? true : false}
                />
              )}
            />
            <Typography
              variant="inherit"
              color="textSecondary"
              sx={{ color: "#b91c1c" }}
            >
              {errors.zip_code?.message}
            </Typography>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={6}>
          <Controller
            name="address"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextField
                size={"medium"}
                placeholder={`${t["Address"]}*`}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"address"}
                value={field.value}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.address?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={3}>
          <Controller
            name="number"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextField
                size={"medium"}
                placeholder={`${t["Number"]}*`}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"number"}
                type={"number"}
                value={field.value}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.number?.message}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 3 }}>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <Controller
            name="neighbourhood"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextField
                size={"medium"}
                placeholder={`${t["Neighborhood"]}*`}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"neighbourhood"}
                value={field.value}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.neighbourhood?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={8}>
          <Controller
            name="complement"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextField
                size={"medium"}
                placeholder={t["Complement"]}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"complement"}
                value={field.value}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.complement?.message}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 3 }}>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <Controller
            name="city"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextField
                size={"medium"}
                placeholder={`${t["City"]}*`}
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
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <Controller
            name="state"
            control={control}
            // defaultValue={{}}
            render={({ field }) => (
              <BaseAutocomplete
                //   sx={{ margin: "0.6vh 0" }}
                options={allStateData || []}
                getOptionLabel={(option) => option.name || ""}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                size={"medium"}
                placeholder={`${t["State"]}*`}
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
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          sx={{ mt: 2, mb: 2 }}
        >
          <Link href="/my-properties">
            <Button
              color="inherit"
              // disabled={activeStep === 0}
              sx={{
                mr: 1,
                border: "1px solid #002152",
                borderRadius: "4px",
                px: 2,
                py: 1,
                color: "#002152",
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "22px",
                textTransform: "none",
              }}
            >
              {t["Cancel"]}
            </Button>
          </Link>
          <Button
            onClick={handleNext}
            disabled={disableBtn}
            sx={{
              background: "#7450F0",
              borderRadius: "4px",
              px: 2,
              py: 1,
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "600",
              lineHeight: "22px",
              textTransform: "none",
              boxShadow: "0px 4px 8px rgba(81, 51, 182, 0.32)",
              "&:hover": {
                background: "#7450F0",
                borderRadius: "4px",
                px: 2,
                py: 1,
                color: "#ffffff",
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "22px",
                textTransform: "none",
                boxShadow: "0px 4px 8px rgba(81, 51, 182, 0.32)",
              },
            }}
          >
            {t["Next"]}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Address;
