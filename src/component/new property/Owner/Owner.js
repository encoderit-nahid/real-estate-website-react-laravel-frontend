import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";
import buyerProfile from "../../../../public/Images/buyer_profile.png";
import { useState } from "react";
import BaseOutlinedZipInput from "../../reuseable/baseOutlinedZipInput/BaseOutlinedZipInput";
import BaseOutlinedCpfInput from "../../reuseable/baseOutlinedCpfInput/BaseOutlinedCpfInput";
import BaseOutlinedRgInput from "../../reuseable/baseOutlinedRgInput/BaseOutlinedRgInput";
import BaseTextField from "../../reuseable/baseTextField/BaseTextField";
import { Controller } from "react-hook-form";
import BaseAutocomplete from "../../reuseable/baseAutocomplete/BaseAutocomplete";
import { useDispatch, useSelector } from "react-redux";
import { findStateData } from "../../../redux/state/actions";

function Owner({ control, errors, maritalStatus, setMaritalStatus }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findStateData());
  }, [dispatch]);
  const allStateData = useSelector((state) => state.state.stateData);
  console.log({ allStateData });

  return (
    <Box sx={{ mt: 4 }}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Box>
          <Image src={buyerProfile} alt="buyerProfile" />
        </Box>
        <Typography
          variant="p"
          sx={{
            marginLeft: 1,
            fontWeight: "700",
            fontSize: "24px",
            lineHeight: "32px",
          }}
        >
          Owner&apos;s data
        </Typography>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        sx={{ mt: 3, mb: 2 }}
      >
        <Grid container>
          <Typography
            variant="p"
            sx={{
              fontSize: "16px",
              fontWeight: 400,
              color: "#002152",
              lineHeight: "22px",
              mb: 1,
            }}
          >
            Marital Status:
          </Typography>
        </Grid>
        {["Married", "Single"].map((data, index) => (
          <Button
            key={index}
            onClick={() => setMaritalStatus(data)}
            sx={{
              textTransform: "none",
              padding: "3px 10px",

              borderRadius: "56px",
              ml: index === 1 ? 1 : 0,
              background: maritalStatus === data ? "#0362F0" : "#F2F5F6",

              color: maritalStatus === data ? "#ffffff" : "#002152",
              "&:hover": {
                background: "#0362F0",
                color: "#ffffff",
              },
            }}
          >
            {data}
          </Button>
        ))}
      </Grid>
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Controller
            name="owner_name"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextField
                size={"medium"}
                placeholder={"Full Name*"}
                // sx={{ mb: 2 }}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"owner_name"}
                value={field.value}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.owner_name?.message}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <FormControl variant="outlined" sx={{ width: "100%" }}>
            <Controller
              name="owner_rg"
              control={control}
              render={({ field }) => (
                <BaseOutlinedRgInput
                  placeholder={"RG*"}
                  size={"medium"}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  name={"owner_rg"}
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
              {errors?.owner_rg?.message}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <FormControl variant="outlined" sx={{ width: "100%" }}>
            <Controller
              name="owner_cpf"
              control={control}
              render={({ field }) => (
                <BaseOutlinedCpfInput
                  placeholder={"CPF*"}
                  size={"medium"}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  name={"owner_cpf"}
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
              {errors.owner_cpf?.message}
            </Typography>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Typography
            variant="p"
            sx={{
              fontSize: "16px",
              fontWeight: "400",
              color: "#002152",
              lineHeight: "22px",
            }}
          >
            Spouse details:
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Controller
            name="owner_spouse_name"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextField
                size={"medium"}
                placeholder={"Full Name*"}
                // sx={{ mb: 2 }}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"owner_spouse_name"}
                value={field.value}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.owner_spouse_name?.message}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <FormControl variant="outlined" sx={{ width: "100%" }}>
            <Controller
              name="owner_spouse_rg"
              control={control}
              render={({ field }) => (
                <BaseOutlinedRgInput
                  placeholder={"RG*"}
                  size={"medium"}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  name={"owner_spouse_rg"}
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
              {errors?.owner_spouse_rg?.message}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <FormControl variant="outlined" sx={{ width: "100%" }}>
            <Controller
              name="owner_spouse_cpf"
              control={control}
              render={({ field }) => (
                <BaseOutlinedCpfInput
                  placeholder={"CPF*"}
                  size={"medium"}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  name={"owner_spouse_cpf"}
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
              {errors.owner_spouse_cpf?.message}
            </Typography>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Typography
            variant="p"
            sx={{
              fontSize: "16px",
              fontWeight: "400",
              color: "#002152",
              lineHeight: "22px",
            }}
          >
            Address:
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <FormControl variant="outlined" sx={{ width: "100%" }}>
            <Controller
              name="owner_zip_code"
              control={control}
              render={({ field }) => (
                <BaseOutlinedZipInput
                  placeholder={"Zip Code*"}
                  size={"medium"}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  name={"owner_zip_code"}
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
              {errors.owner_zip_code?.message}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <Controller
            name="owner_address"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextField
                size={"medium"}
                placeholder={"Address*"}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"owner_address"}
                value={field.value}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.owner_address?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <Controller
            name="owner_number"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextField
                size={"medium"}
                placeholder={"Number*"}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"owner_number"}
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
            {errors.owner_number?.message}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Controller
            name="owner_neighbourhood"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextField
                size={"medium"}
                placeholder={"Neighbourhood*"}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"owner_neighbourhood"}
                value={field.value}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.owner_neighbourhood?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Controller
            name="owner_complement"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextField
                size={"medium"}
                placeholder={"Complement"}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"owner_complement"}
                value={field.value}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.owner_complement?.message}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Controller
            name="owner_city"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextField
                size={"medium"}
                placeholder={"City*"}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"owner_city"}
                value={field.value}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.owner_city?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Controller
            name="owner_state"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseAutocomplete
                //   sx={{ margin: "0.6vh 0" }}
                options={allStateData || []}
                getOptionLabel={(option) => option.name || ""}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                size={"medium"}
                placeholder={"State*"}
                onChange={(e, v, r, d) => field.onChange(v)}
                value={field.value}
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
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Typography
            variant="p"
            sx={{
              fontSize: "16px",
              fontWeight: "400",
              color: "#002152",
              lineHeight: "22px",
            }}
          >
            Document data:
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Controller
            name="owner_documnentation"
            control={control}
            render={({ field }) => (
              <BaseAutocomplete
                //   sx={{ margin: "0.6vh 0" }}
                options={top100Films || []}
                getOptionLabel={(option) => option.label || ""}
                isOptionEqualToValue={(option, value) =>
                  option.year === value.year
                }
                size={"medium"}
                placeholder={"Documents"}
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
            {errors.owner_documentation?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Controller
            name="owner_registry"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextField
                size={"medium"}
                placeholder={"Registry"}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"owner_registry"}
                value={field.value}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.owner_registry?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Controller
            name="owner_registration_number"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextField
                size={"medium"}
                placeholder={"Registartion Number"}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"owner_registartion_number"}
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
            {errors.owner_registration_number?.message}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Owner;
const top100Films = [
  { label: "Buyer's agent agreement", year: 1994 },
  { label: "Purchase Agreement", year: 1972 },
  { label: "Building Approval Plan", year: 1974 },
  { label: " Land Receipts", year: 2008 },
];
