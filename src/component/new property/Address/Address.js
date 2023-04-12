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
import React, { useEffect } from "react";
import pinImage from "../../../../public/Images/pin.png";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
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
}) {
  const dispatch = useDispatch();
  console.log({ documents });

  useEffect(() => {
    dispatch(findPropertyTypeData());
    dispatch(findProjectsData({ page: 1, per_page: 10 }));
    dispatch(findStateData());
  }, [dispatch]);

  const projectData = useSelector((state) => state?.project?.projectData?.data);
  console.log({ projectData });

  const propertyDetail = useSelector(
    (state) => state?.propertyType?.propertyTypeData
  );
  console.log("id", propertyDetail[0]?.id);
  console.log({ propertyDetail });

  const allStateData = useSelector((state) => state.state.stateData);
  console.log({ allStateData });

  console.log({ property_detail_id });

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

    const allFiles = [...documents, ...acceptedFiles]; //save all files here
    console.log(allFiles);
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
        <Typography
          variant="inherit"
          color="textSecondary"
          sx={{ color: "#b91c1c" }}
        >
          {errors?.document_files?.message}
        </Typography>
      </Box>
      {documents?.length > 0 && (
        <Grid container spacing={1} sx={{ mt: 3 }}>
          {documents?.map((file, index) => (
            <Grid item xs={12} sm={12} md={4} lg={3} xl={3} key={index}>
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
                {/* <InsertDriveFileOutlinedIcon/> */}
                <Typography
                  variant="p"
                  sx={{ color: "#38bdf8", fontWeight: "600" }}
                >
                  {file?.name?.slice(0, 15)}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
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
                {["Rent", "Sale"].map((data, index) => (
                  <Grid item xs={6} key={index}>
                    <Button
                      onClick={() => setAdType(data)}
                      sx={{
                        width: "100%",
                        background: adType === data ? "#0362F0" : "#F2F5F6",
                        borderRadius: "152px",
                        color: adType === data ? "#ffffff" : "#002152",
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
                      {data}
                    </Button>
                  </Grid>
                ))}
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
                {["Residential", "Commercial"].map((data, index) => (
                  <Grid item xs={6} key={index}>
                    <Button
                      onClick={() => setPropertyType(data)}
                      sx={{
                        width: "100%",
                        background:
                          propertyType === data ? "#0362F0" : "#F2F5F6",
                        borderRadius: "152px",
                        color: propertyType === data ? "#ffffff" : "#002152",
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
                      {data}
                    </Button>
                  </Grid>
                ))}
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
                {propertyDetail?.map((data, index) => (
                  <Grid item xs={3} key={index}>
                    <Button
                      onClick={() => {
                        setPropertyDetailId(data.id);
                      }}
                      sx={{
                        width: "100%",
                        background:
                          property_detail_id === data.id
                            ? "#0362F0"
                            : "#F2F5F6",
                        borderRadius: "152px",
                        color:
                          property_detail_id === data.id
                            ? "#ffffff"
                            : "#002152",
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
                      {data?.name}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <Controller
        name="project_id"
        control={control}
        render={({ field }) => (
          <BaseAutocomplete
            sx={{ mt: 3, width: "70%" }}
            options={projectData || []}
            getOptionLabel={(option) => option.name || ""}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            size={"medium"}
            placeholder={"Select Enterprise Name*"}
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
        {errors.project_id?.message}
      </Typography>
      {/* <Autocomplete
        sx={{ mt: 3, width: '70%' }}
        disablePortal
        size="medium"
        id="combo-box-demo"
        options={top100Films}
        renderInput={(params) => (
          <TextField {...params} label="Select the enterprise" />
        )}
      /> */}
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
            <Controller
              name="zip_code"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <BaseOutlinedZipInput
                  placeholder={"Zip Code*"}
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
                placeholder={"Address*"}
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
                placeholder={"Number*"}
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
                placeholder={"Neighbourhood*"}
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
                placeholder={"Complement"}
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
                placeholder={"City*"}
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
                placeholder={"State*"}
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
      </Grid>
    </Box>
  );
}

export default Address;
const top100Films = [
  { label: "Buyer's agent agreement", year: 1994 },
  { label: "Purchase Agreement", year: 1972 },
  { label: "Building Approval Plan", year: 1974 },
  { label: " Land Receipts", year: 2008 },
];
