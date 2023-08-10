import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import valueImage from "../../../../public/Images/proposal_modal.png";
import ventureImage from "../../../../public/Images/certidoes.png";
import BaseTextField from "../../reuseable/baseTextField/BaseTextField";
import { Controller } from "react-hook-form";
import BaseAutocomplete from "../../reuseable/baseAutocomplete/BaseAutocomplete";
import en from "locales/en";
import pt from "locales/pt";
import { Sync } from "@mui/icons-material";

function ValuesAndDescription({
  control,
  errors,
  languageName,
  handleNext,
  handleBack,
  allValues,
  tipoVenda,
}) {

  var valor = useRef();
  var condominio = useRef();
  var iptu = useRef();
  var property_area= useRef();
  var no_of_rooms= useRef();
  var no_of_suites= useRef();
  var no_of_bathrooms= useRef();
  var no_of_parking_spaces= useRef();
  var documentation = useRef();
  var registry = useRef();
  var registration_number = useRef();
  var bloqueia = false;

  if(tipoVenda == 9 || tipoVenda == 10){
  bloqueia = true;
  allValues.property_area = 0;
  allValues.no_of_rooms = 0;
  allValues.no_of_suites = 0;
  allValues.no_of_bathrooms = 0;
  allValues.no_of_parking_spaces = 0;
  allValues.documentation = 0;
  allValues.registry = 0;
  allValues.registration_number = 0;
  }else{
  bloqueia = false;
  }
  
  const t = languageName === "en" ? en : pt;

  const top100Films = [
    { label: "escritura definitiva registrada", year: 1994 },
    { label: "escritura definitiva sem registro", year: 1972 },
    { label: "escritura de posse", year: 1974 },
    { label: "escritura de cessão de direitos hereditários", year: 2008 },
    { label: "contrato de compra e venda", year: 2003 },
    { label: "outros", year: 2005 },
  ];

  const [disableBtn, setDisableBtn] = useState(true);
  useEffect(() => {
    if (
      allValues?.brl_rent != null &&
      allValues?.condominium != null &&
      allValues?.brl_iptu != null &&
      allValues?.land_area != null &&
      allValues?.property_area != null &&
      allValues?.no_of_rooms != null &&
      allValues?.no_of_suites != null &&
      allValues?.no_of_bathrooms != null &&
      allValues?.no_of_parking_spaces != null &&
      allValues?.documentation != null &&
      allValues?.registry != null &&
      allValues?.registration_number != null
    ) {
      setDisableBtn(false);
    }
    if (
      allValues?.brl_rent === "" ||
      allValues?.condominium === "" ||
      allValues?.brl_iptu === "" ||
      allValues?.land_area === "" ||
      allValues?.property_area === "" ||
      allValues?.no_of_rooms === "" ||
      allValues?.no_of_suites === "" ||
      allValues?.no_of_bathrooms === "" ||
      allValues?.no_of_parking_spaces === "" ||
      allValues?.documentation === "" ||
      allValues?.registry === "" ||
      allValues?.registration_number === ""
    ) {
      setDisableBtn(true);
    }
    if (
      allValues?.brl_rent != null &&
      allValues?.condominium != null &&
      allValues?.brl_iptu != null &&
      allValues?.land_area != null &&
      bloqueia) {
      setDisableBtn(false);
    }
    if (
      (allValues?.brl_rent === "" ||
      allValues?.condominium === "" ||
      allValues?.brl_iptu === "" ||
      allValues?.land_area ==="") &&
      bloqueia) {
      setDisableBtn(true);
    }
  }, [allValues]);

  return (
    <Box sx={{ mt: 4 }}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Image height={40} width={40} src={valueImage} alt="value" />
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
          {t["Values"]}
        </Typography>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid item xs={6}>
          <Controller
            name="brl_rent"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextField
                referencia={valor}
                size={"medium"}
                placeholder={`${t["BRL Rent"]}*`}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                onBlur={(e) => {
                  field.onChange(parseInt(e.target.value.replaceAll(".","").replaceAll("R$","").replaceAll(",00","")).toLocaleString("pt-BR",{ style: 'currency', currency: 'BRL' }));
                }}
                name={"brl_rent"}
                value={field.value}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.brl_rent?.message}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="condominium"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextField
                size={"medium"}
                referencia={condominio}
                placeholder={`R$ ${t["Condominium"]}*`}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                onBlur={(e) => {
                  field.onChange(parseInt(e.target.value.replaceAll(".","").replaceAll("R$","").replaceAll(",00","")).toLocaleString("pt-BR",{ style: 'currency', currency: 'BRL' }));
                }}
                name={"condominium"}
                value={field.value}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.condominium?.message}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid item xs={6}>
          <Controller
            name="brl_iptu"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextField
                size={"medium"}
                referencia={iptu}
                placeholder={"R$ IPTU*"}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                onBlur={(e) => {
                  field.onChange(parseInt(e.target.value.replaceAll(".","").replaceAll("R$","").replaceAll(",00","")).toLocaleString("pt-BR",{ style: 'currency', currency: 'BRL' }));
                }}
                name={"brl_iptu"}
                value={field.value}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.brl_iptu?.message}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ mt: 3 }}
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
          {t["Description"]}
        </Typography>
      </Grid>

      <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid  item xs={12} sm={12} md={12} lg={5}>
          <Controller
            name="land_area"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextField
                size={"medium"}
                placeholder={`m² ${t["Land area"]}*`}
                type={"number"}
                referencia={land_area}
                onChange={(e) => {
                    field.onChange(e.target.value);
                }}
                name={"land_area"}
                value={field.value}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.land_area?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={5}>
          <Controller
            name="property_area"
            control={control}
            defaultValue={""}
            render={({ field }) => { if(!bloqueia){
              return(
              <BaseTextField
                size={"medium"}
                placeholder={`m² ${t["Size of the property"]}*`}
                type={"number"}
                desabilitado={bloqueia}
                referencia={property_area}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"property_area"}
                value={field.value}
              />
            )}}}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.property_area?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={2}>
          <Controller
            name="no_of_rooms"
            control={control}
            defaultValue={""}
            render={({ field }) =>  { if(!bloqueia){
              return (
              <BaseTextField
                size={"medium"}
                placeholder={`${t["number of rooms"]}*`}
                type={"number"}
                desabilitado={bloqueia}
                referencia={no_of_rooms}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"no_of_rooms*"}
                value={field.value}
              />
            )}}}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.no_of_rooms?.message}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={12} md={12} lg={5}>
          <Controller
            name="no_of_suites"
            control={control}
            defaultValue={""}
            render={({ field }) =>  { if(!bloqueia){
              return(
              <BaseTextField
                size={"medium"}
                placeholder={`${t["number of suites"]}*`}
                type={"number"}
                desabilitado={bloqueia}
                referencia={no_of_suites}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"no_of_suites"}
                value={field.value}
              />
            )}}}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.no_of_suites?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={2}>
          <Controller
            name="no_of_bathrooms"
            control={control}
            defaultValue={""}
            render={({ field }) =>  { if(!bloqueia){
              return(
              <BaseTextField
                size={"medium"}
                placeholder={`${t["bathrooms"]}*`}
                type={"number"}
                desabilitado={bloqueia}
                referencia={no_of_bathrooms}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"no_of_bathrooms"}
                value={field.value}
              />
            )}}}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.no_of_bathrooms?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={5}>
          <Controller
            name="no_of_parking_spaces"
            control={control}
            defaultValue={""}
            render={({ field }) =>  { if(!bloqueia){
              return(
              <BaseTextField
                size={"medium"}
                placeholder={`${t["number of parking spaces"]}*`}
                type={"number"}
                desabilitado={bloqueia}
                referencia={no_of_parking_spaces}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"no_of_parking_spaces"}
                value={field.value}
              />
            )}}}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.no_of_parking_spaces?.message}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={12} md={12} lg={5}>
          <Controller
            name="documentation"
            control={control}
            render={({ field }) =>  { if(!bloqueia){
              return(
              <BaseAutocomplete
                //   sx={{ margin: "0.6vh 0" }}
                options={top100Films || []}
                getOptionLabel={(option) => option.label || ""}
                isOptionEqualToValue={(option, value) =>
                  option.label === value.label
                }
                name="documentation"
                size={"medium"}
                referencia={documentation}
                desabilitado={bloqueia}
                placeholder={t["documents"]}
                onChange={(e, v, r, d) => field.onChange(v)}
                value={field.value || null}
              />
            )}}}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.documentation?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={2}>
          <Controller
            name="registry"
            control={control}
            defaultValue={""}
            render={({ field }) =>  { if(!bloqueia){
              return(
              <BaseTextField
                size={"medium"}
                placeholder={t["registry office"]}
                desabilitado={bloqueia}
                referencia={registry}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"registry"}
                value={field.value}
              />
            )}}}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.registry?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={5}>
          <Controller
            name="registration_number"
            control={control}
            defaultValue={""}
            render={({ field }) =>  { if(!bloqueia){
              return(
              <BaseTextField
                size={"medium"}
                placeholder={t["registration number"]}
                type={"number"}
                desabilitado={bloqueia}
                referencia={registration_number}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"registartion_number"}
                value={field.value}
              />
            )}}}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.registration_number?.message}
          </Typography>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          sx={{ mt: 2, mb: 2 }}
        >
          <Button
            color="inherit"
            onClick={handleBack}
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
            {t["come back"]}
          </Button>

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

export default ValuesAndDescription;
