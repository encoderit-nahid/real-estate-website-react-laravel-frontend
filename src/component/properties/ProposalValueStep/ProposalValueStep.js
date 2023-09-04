import {
  Box,
  Button,
  Grid,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import PropertyCard from "../PropertyCard/PropertyCard";
import Image from "next/image";
import proposeImage from "../../../../public/Images/proposal_modal.png";
import BaseTextField from "../../reuseable/baseTextField/BaseTextField";
import { Controller } from "react-hook-form";
import en from "locales/en";
import pt from "locales/pt";

function ProposalValueStep({
  cash,
  setCash,
  installment,
  setInstallment,
  control,
  errors,
  propertyData,
  srcImage,
  languageName,
}) {
  const t = languageName === "en" ? en : pt;
  return (
    <Box sx={{ mt: 4 }}>
      {/* <PropertyCard srcImage={srcImage} /> */}
      <Box sx={{ mt: 2, mb: 1 }}>
        <Button sx={{ display: "flex" }}>
          <Image src={proposeImage} alt="proposeImage" />

          <Typography
            variant="p"
            sx={{
              fontSize: "24px",
              fontWeight: 700,
              color: "#002152",

              textTransform: "none",
            }}
          >
            {t["Proposal values"]}
          </Typography>
        </Button>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          sx={{ my: 2 }}
        >
          <Button
            sx={{
              textTransform: "none",
              padding: "3px 6px",
              backgroundColor: cash ? "#0362F0" : "#F2F5F6",
              color: cash ? "#ffffff" : "#002152",
              borderRadius: "56px",
              "&: hover": {
                padding: "3px 6px",
                backgroundColor: "#0362F0",
                color: "#ffffff",
                borderRadius: "56px",
              },
            }}
            onClick={() => {
              setInstallment(false);
              setCash(true);
            }}
          >
            {t["In Cash"]}
          </Button>
          <Button
            sx={{
              textTransform: "none",
              padding: "3px 6px",
              backgroundColor: installment ? "#0362F0" : "#F2F5F6",
              color: installment ? "#ffffff" : "#002152",
              borderRadius: "56px",
              ml: 1,
              "&: hover": {
                padding: "3px 6px",
                backgroundColor: "#0362F0",
                color: "#ffffff",
                borderRadius: "56px",
              },
            }}
            onClick={() => {
              setInstallment(true);
              setCash(false);
            }}
          >
            {t["Installments"]}
          </Button>
        </Grid>
        {cash && (
          <Box>
            <Controller
              name="total_amount"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <BaseTextField
                  size={"medium"}
                  placeholder={t["Total amount"]}
                  variant={"outlined"}
                  type={"number"}
                  sx={{ width: "70%" }}
                  name={"total_amount"}
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  onBlur={(e) => {
                    field.onChange(parseInt(e.target.value.replaceAll(".","").replaceAll("R$","").replaceAll(",00","")).toLocaleString("pt-BR",{ style: 'currency', currency: 'BRL' }));
                  }}
                />
              )}
            />
            <Typography
              variant="inherit"
              color="textSecondary"
              sx={{ color: "#b91c1c" }}
            >
              {errors.total_amount?.message}
            </Typography>
            <Controller
              name="observation"
              control={control}
              render={({ field }) => (
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={4}
                  placeholder={t["Observation"]}
                  value={field.value}
                  name={"observation"}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  style={{
                    marginTop: "2vh",
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
              )}
            />
          </Box>
        )}
        {installment && (
          <Box>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <Controller
                  name="total_amount"
                  control={control}
                  defaultValue={""}
                  render={({ field }) => (
                    <BaseTextField
                      size={"medium"}
                      placeholder={t["Total amount"]}
                      variant={"outlined"}
                      type={"number"}
                      name={"total_amount"}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                      onBlur={(e) => {
                        field.onChange(parseInt(e.target.value.replaceAll(".","").replaceAll("R$","").replaceAll(",00","")).toLocaleString("pt-BR",{ style: 'currency', currency: 'BRL' }));
                      }}
                    />
                  )}
                />
                <Typography
                  variant="inherit"
                  color="textSecondary"
                  sx={{ color: "#b91c1c" }}
                >
                  {errors.total_amount?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <Controller
                  name="cash_amount"
                  control={control}
                  render={({ field }) => (
                    <BaseTextField
                      size={"medium"}
                      placeholder={t["Cash value"]}
                      type={"number"}
                      // sx={{ mt: 2 }}
                      variant={"outlined"}
                      name={"cash_amount"}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                      onBlur={(e) => {
                        field.onChange(parseInt(e.target.value.replaceAll(".","").replaceAll("R$","").replaceAll(",00","")).toLocaleString("pt-BR",{ style: 'currency', currency: 'BRL' }));
                      }}
                    />
                  )}
                />
                <Typography
                  variant="inherit"
                  color="textSecondary"
                  sx={{ color: "#b91c1c" }}
                >
                  {errors.cash_amount?.message}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <Controller
                  name="payment_per_installment"
                  control={control}
                  render={({ field }) => (
                    <BaseTextField
                      size={"medium"}
                      placeholder={t["Term value"]}
                      type={"number"}
                      // sx={{ mt: 2 }}
                      variant={"outlined"}
                      name={"payment_per_installment"}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                  )}
                />
                <Typography
                  variant="inherit"
                  color="textSecondary"
                  sx={{ color: "#b91c1c" }}
                >
                  {errors.payment_per_installment?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <Controller
                  name="no_of_installment"
                  control={control}
                  render={({ field }) => (
                    <BaseTextField
                      size={"medium"}
                      placeholder={t["Number of installments"]}
                      type={"number"}
                      // sx={{ mt: 2 }}
                      variant={"outlined"}
                      name={"no_of_installment"}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                  )}
                />
                <Typography
                  variant="inherit"
                  color="textSecondary"
                  sx={{ color: "#b91c1c" }}
                >
                  {errors.no_of_installment?.message}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <Controller
                  name="observation"
                  control={control}
                  render={({ field }) => (
                    <TextareaAutosize
                      aria-label="minimum height"
                      minRows={4}
                      placeholder={t["Observation"]}
                      value={field.value}
                      name={"observation"}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                      style={{
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
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default ProposalValueStep;
