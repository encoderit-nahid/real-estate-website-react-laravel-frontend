import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import accountIcon from "../../../../public/Images/account.png";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import BaseOutlinedRgInput from "../../reuseable/baseOutlinedRgInput/BaseOutlinedRgInput";
import BaseOutlinedCpfInput from "../../reuseable/baseOutlinedCpfInput/BaseOutlinedCpfInput";
import BaseTextField from "../../reuseable/baseTextField/BaseTextField";
import { Controller } from "react-hook-form";
import BaseDateField from "../../reuseable/baseDateField/BaseDateField";
import { formatISO } from "date-fns";
import en from "locales/en";
import pt from "locales/pt";
import { useMemo } from "react";

function PersonalData({
  handleNext,
  control,
  errors,
  allValues,
  languageName,
  activeStep,
}) {
  //rg
  const [rgValue, setRGValue] = useState("");
  const [rgValid, setRGValid] = useState(false);
  const handleRGValidation = (e) => {
    setRGValid(/^W(\d(\d(\d[A-Z]?)?)?$)/.test(e.target.value));
    setRGValue(e.target.value);
  };

  const [preview, setPreview] = useState();

  const t = languageName === "en" ? en : pt;

  const userRole = localStorage.getItem("user_role");

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!allValues.image) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(allValues.image);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [allValues.image]);

  const [disableBtn, setDisableBtn] = useState(true);
  useEffect(() => {
    if (
      allValues?.full_name != null &&
      allValues?.creci_number != null &&
      allValues?.cpf_number != null &&
      allValues?.rg_number != null &&
      allValues?.dob != null
    ) {
      setDisableBtn(false);
    }
    if (
      allValues?.full_name === "" ||
      allValues?.creci_number === "" ||
      allValues?.cpf_number === "" ||
      allValues?.rg_number === "" ||
      allValues?.dob === ""
    ) {
      setDisableBtn(true);
    }
  }, [allValues]);

  return (
    <Box sx={{ mt: 4 }}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Typography
          variant="p"
          sx={{
            color: "#1A1859",
            fontSize: "24px",
            fontWeight: "700",
            lineHeight: "29px",
          }}
        >
          {t["Personal data"]}
        </Typography>
      </Grid>

      <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={12} md={3}>
          <Box
            sx={{
              height: {
                xs: "20vh",
                sm: "20vh",
                md: "20vh",
                lg: "25vh",
                xl: "20vh",
              },
              width: {
                xs: "100%",
                sm: "100%",

                md: "20vh",
                lg: "25vh",
                xl: "20vh",
              },
              border: "1px dashed #DBE1E5",
              p: 1,
            }}
          >
            <Box
              sx={{
                background: "#F2F5F6",
                borderRadius: "4px",
                px: 1,
                py: 2,
                height: {
                  xs: "17.5vh",
                  sm: "17.5vh",
                  md: "17.5vh",
                  lg: "22vh",
                  xl: "17.5vh",
                },
              }}
            >
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Box>
                  <Image
                    src={preview != null ? preview : accountIcon}
                    alt="account"
                    width={50}
                    height={50}
                  />
                </Box>
                <Typography
                  variant="p"
                  sx={{
                    color: "#6C7A84",
                    fontSize: "14px",
                    fontWeight: "400",
                    lineHeight: "18px",
                  }}
                >
                  {t["Profile picture"]}
                </Typography>

                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    mt: 1,
                    background: "#0362F0",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#ffffff",
                    lineHeight: "18px",
                    textTransform: "none",
                    "&: hover": {
                      background: "#0362F0",
                      borderRadius: "4px",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#ffffff",
                    },
                  }}
                >
                  Select
                  <Controller
                    name="image"
                    control={control}
                    render={({ field }) => {
                      return (
                        <input
                          name="image"
                          hidden
                          accept="image/*"
                          type="file"
                          // value={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.files[0]);
                          }}
                        />
                      );
                    }}
                  />
                </Button>
              </Grid>
              <Typography
                variant="inherit"
                color="textSecondary"
                sx={{ color: "#b91c1c", mt: 4.5 }}
              >
                {errors.image?.message}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={9}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ mb: 1, ml: { xxl: 4 } }}
          >
            <Typography
              variant="p"
              sx={{
                color: "#253858",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "16px",
              }}
            >
              {t["Full Name"]}
              <span style={{ color: "#E63333" }}>*</span>
            </Typography>
          </Grid>
          <Controller
            name="full_name"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextField
                size={"small"}
                sx={{ ml: { xxl: 4 } }}
                placeholder={t["Full Name"]}
                // sx={{ mb: 2 }}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"full_name"}
                value={field.value}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c", ml: { xxl: 4 } }}
          >
            {errors.full_name?.message}
          </Typography>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ mb: 1, mt: 1, ml: { xxl: 4 } }}
          >
            <Typography
              variant="p"
              sx={{
                color: "#253858",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "16px",
              }}
            >
              {t["Social Name"]}
              <span
                style={{
                  color: "#7C7C99",
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                (optional)
              </span>
            </Typography>
          </Grid>
          <Controller
            name="social_name"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextField
                size={"small"}
                placeholder={t["Social Name"]}
                sx={{ mb: 1, ml: { xxl: 4 } }}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                value={field.value}
                name={"social_name"}
              />
            )}
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 3 }}>
        <Divider />
      </Box>
      <Grid container spacing={1} sx={{ mt: 3 }}>
        {userRole === "broker" && (
          <Grid item xs={12} sm={12} md={6}>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              sx={{ mb: 1 }}
            >
              <Typography
                variant="p"
                sx={{
                  color: "#253858",
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "16px",
                }}
              >
                CRECI number<span style={{ color: "#E63333" }}>*</span>
              </Typography>
            </Grid>
            <Controller
              name="creci_number"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <BaseTextField
                  size={"small"}
                  type={"number"}
                  placeholder={"CRECI Number"}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  value={field.value}
                  name={"creci_number"}
                />
              )}
            />
            <Typography
              variant="inherit"
              color="textSecondary"
              sx={{ color: "#b91c1c" }}
            >
              {errors?.creci_number?.message}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12} sm={12} md={userRole !== "broker" ? 12 : 6}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ mb: 1 }}
          >
            <Typography
              variant="p"
              sx={{
                color: "#253858",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "16px",
              }}
            >
              CPF<span style={{ color: "#E63333" }}>*</span>
            </Typography>
          </Grid>
          <FormControl variant="outlined" sx={{ width: "100%" }}>
            <Controller
              name="cpf_number"
              control={control}
              render={({ field }) => (
                <BaseOutlinedCpfInput
                  placeholder={"CPF"}
                  size={"small"}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  name={"cpf_number"}
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
              {errors.cpf_number?.message}
            </Typography>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={12} md={6}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ mb: 1 }}
          >
            <Typography
              variant="p"
              sx={{
                color: "#253858",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "16px",
              }}
            >
              RG<span style={{ color: "#E63333" }}>*</span>
            </Typography>
          </Grid>
          <FormControl
            variant="outlined"
            sx={{ width: "100%", marginBottom: 1 }}
          >
            <Controller
              name="rg_number"
              control={control}
              render={({ field }) => (
                <BaseOutlinedRgInput
                  placeholder={"RG"}
                  size={"small"}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  name={"RG_number"}
                  value={field.value}
                  // error={errors?.rg_number ? true : false}
                />
              )}
            />
            <Typography
              variant="inherit"
              color="textSecondary"
              sx={{ color: "#b91c1c" }}
            >
              {errors?.rg_number?.message}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ mb: 1 }}
          >
            <Typography
              variant="p"
              sx={{
                color: "#253858",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "16px",
              }}
            >
              {t["Date of Birth"]}
              <span style={{ color: "#E63333" }}>*</span>
            </Typography>
          </Grid>
          <Controller
            name="dob"
            control={control}
            defaultValue={formatISO(new Date())}
            render={({ field }) => (
              <BaseDateField
                placeholder={"Date of Birth"}
                size={"small"}
                onChange={(value) => {
                  field.onChange(value);
                }}
                // sx={{ mb: 1 }}
                name={"dob"}
                value={field.value}
                // error={errors.dob ? true : false}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors?.dob?.message}
          </Typography>
        </Grid>

        <Grid container spacing={1} sx={{ mt: 2, mb: 5 }}>
          <Grid item xs={6} sm={6} md={6}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              // onClick={handleBack}
              sx={{
                //   mr: 1,
                //   border: "1px solid #002152",
                //   borderRadius: "4px",
                background: "#ffffff",
                px: 2,
                py: 1,
                color: "#4B4B66",
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "22px",
                textTransform: "none",
              }}
            >
              {t["Come back"]}
            </Button>
          </Grid>
          <Grid item xs={6} sm={6} md={6}>
            <Button
              onClick={handleNext}
              disabled={disableBtn}
              fullWidth
              sx={{
                background: "#00C1B4",
                boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.08)",
                borderRadius: "4px",
                color: "#ffffff",
                fontSize: "16px",
                lineHeight: "22px",
                fontWeight: "600",
                //   mt: 3,
                textTransform: "none",
                py: 1,
                "&:hover": {
                  background: "#00C1B4",
                  boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.08)",
                  borderRadius: "4px",
                  color: "#ffffff",
                  fontSize: "16px",
                  lineHeight: "22px",
                  fontWeight: "600",
                  // mt: 3,
                  textTransform: "none",
                  py: 1,
                },
              }}
            >
              {t["Continue"]}
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* <Button
        onClick={handleNext}
        fullWidth
        sx={{
          background: "#00C1B4",
          boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.08)",
          borderRadius: "4px",
          color: "#ffffff",
          fontSize: "16px",
          lineHeight: "22px",
          fontWeight: "600",
          mt: 3,
          mb: 5,
          textTransform: "none",
          py: 1,
          "&:hover": {
            background: "#00C1B4",
            boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.08)",
            borderRadius: "4px",
            color: "#ffffff",
            fontSize: "16px",
            lineHeight: "22px",
            fontWeight: "600",
            mt: 3,
            textTransform: "none",
            py: 1,
          },
        }}
      >
        Continue
      </Button> */}
    </Box>
  );
}

export default PersonalData;
