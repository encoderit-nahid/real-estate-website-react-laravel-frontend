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
import React, { useState } from "react";
import Image from "next/image";
import BaseOutlinedRgInput from "../../reuseable/baseOutlinedRgInput/BaseOutlinedRgInput";
import BaseOutlinedCpfInput from "../../reuseable/baseOutlinedCpfInput/BaseOutlinedCpfInput";
import BaseTextField from "../../reuseable/baseTextField/BaseTextField";
import { Controller } from "react-hook-form";
import BaseDateField from "../../reuseable/baseDateField/BaseDateField";
import { formatISO } from "date-fns";

function PersonalData({ handleNext, control, errors }) {
  console.log("dob", errors.full_name);
  //rg
  const [rgValue, setRGValue] = useState("");
  const [rgValid, setRGValid] = useState(false);
  const handleRGValidation = (e) => {
    setRGValid(/^W(\d(\d(\d[A-Z]?)?)?$)/.test(e.target.value));
    setRGValue(e.target.value);
  };
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
          personal data
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
                  <Image src={accountIcon} alt="account" />
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
                  Profile picture
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
                  <input hidden accept="image/*" multiple type="file" />
                </Button>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={9}>
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
              Full Name<span style={{ color: "#E63333" }}>*</span>
            </Typography>
          </Grid>
          <Controller
            name="full_name"
            control={control}
            render={({ field }) => (
              <BaseTextField
                size={"small"}
                placeholder={"Full Name"}
                // sx={{ mb: 2 }}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"full_name"}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.full_name?.message}
          </Typography>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ mb: 1, mt: 1 }}
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
              Social Name
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
            render={({ field }) => (
              <BaseTextField
                size={"small"}
                placeholder={"Social Name"}
                sx={{ mb: 1 }}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
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
            render={({ field }) => (
              <BaseTextField
                size={"small"}
                type={"number"}
                placeholder={"CRECI Number"}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
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
              Date of Birth<span style={{ color: "#E63333" }}>*</span>
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
                  field.onChange(formatISO(value));
                }}
                sx={{ mb: 1 }}
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
