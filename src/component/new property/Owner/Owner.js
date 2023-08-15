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
import React, { useEffect, useRef } from "react";
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
import pt from "locales/pt";
import en from "locales/en";
import{ buscaCEP } from "@/api";

function Owner({
  control,
  errors,
  maritalStatus,
  setMaritalStatus,
  languageName,
  setSingle,
  single,
  married,
  setMarried,
  allValues,
  setV_owner_cep,
  setV_owner_endereco,
  setV_owner_cidade,
  setV_owner_estado,
  setV_owner_bairro
}) {
  const t = languageName === "en" ? en : pt;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findStateData());
  }, [dispatch]);
  const allStateData = useSelector((state) => state.state.stateData);

  const owner_cep = useRef();
  const owner_endereco = useRef();
  const owner_cidade = useRef();
  const owner_estado = useRef();
  const owner_bairro = useRef();

  var desabilitado = false;

  var desabilitado = false;
  if(owner_cep.current!=undefined && owner_cep.current!=null && owner_cep.current!='') {
  if(owner_cep.current.value.length > 8){
    owner_endereco.current.disabled = false;
    owner_cidade.current.disabled = false;
    owner_estado.current.disabled = false;
    owner_bairro.current.disabled = false;
    desabilitado = true;
  }else{
    owner_endereco.current.value = "";
    owner_cidade.current.value = "";
    owner_estado.current.value = "";
    owner_bairro.current.value = "";
    owner_endereco.current.disabled = false;
    owner_cidade.current.disabled = false;
    owner_estado.current.disabled = false;
    owner_bairro.current.disabled = false;
  }}

  const carregaCEP = async () => {
    if(owner_cep.current!=undefined && owner_cep.current.value!=null && owner_cep.current.value!='') {
    if(owner_cep.current.value.length > 8){
      setV_owner_cep(owner_cep.current.value);
      const [error, response] = await buscaCEP(owner_cep.current.value);
    if(owner_endereco.current!=undefined){
      owner_endereco.current.disabled = false;
      owner_cidade.current.disabled = false;
      owner_estado.current.disabled = false;
      owner_bairro.current.disabled = false;
      }
      
      if(response.data.logradouro!=""&& response.data.logradouro != null && owner_endereco.current!= undefined){
        owner_endereco.current.value = response.data.logradouro;
        owner_endereco.current.disabled = true;
        allValues.owner_address = response.data.logradouro;
        setV_owner_endereco(response.data.logradouro);
      }
      
      if(response.data.localidade!=""&& response.data.localidade != null && owner_cidade.current!=undefined){
        owner_cidade.current.value = response.data.localidade;
        owner_cidade.current.disabled = true;
        allValues.owner_city = response.data.localidade;
        setV_owner_cidade(owner_cidade.current.value)
        }
      
      if(response.data.uf!=""&& response.data.uf != null && owner_estado.current!=undefined){
        owner_estado.current.value = response.data.uf;
     
        
        const valor_estado_lista = "";
        allStateData.forEach(element => {
          if(element.name ===  response.data.uf){
            valor_estado_lista = element;
          }
        }); 
        setV_owner_estado(valor_estado_lista);
        allValues.owner_state = valor_estado_lista;
        owner_estado.current.disabled = true;
        }
      
      if(response.data.bairro!=""&& response.data.bairro != null && owner_bairro.current!=undefined){
        owner_bairro.current.value= response.data.bairro;
        owner_bairro.current.disabled = true;
        desabilitado = true;
        allValues.owner_neighbourhood = response.data.bairro;
        setV_owner_bairro(response.data.bairro);
        }
   }}
       
  };

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
          {t["Owner&apos;s Data"]}
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
            {`${t["Marital status"]}:`}
          </Typography>
        </Grid>
        {[
          { name: "Married", slug: t["Married"] },
          { name: "Single", slug: t["Single"] },
        ].map((data, index) => (
          <Button
            key={index}
            onClick={() => {
              setMaritalStatus(data?.name);
              if (data?.name === "Single") {
                setSingle(true);
                setMarried(false);
              } else {
                setMarried(true);
                setSingle(false);
              }
            }}
            sx={{
              textTransform: "none",
              padding: "3px 10px",

              borderRadius: "56px",
              ml: index === 1 ? 1 : 0,
              background: maritalStatus === data?.name ? "#0362F0" : "#F2F5F6",

              color: maritalStatus === data?.name ? "#ffffff" : "#002152",
              "&:hover": {
                background: "#0362F0",
                color: "#ffffff",
              },
            }}
          >
            {data?.slug}
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
                placeholder={`${t["Full Name"]}*`}
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
      {married && (
        <Box>
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
                dados do cônjuge:
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
                    placeholder={`${t["Full Name"]}*`}
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
        </Box>
      )}
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
            endereço:
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <FormControl variant="outlined" sx={{ width: "100%" }}>
            <Controller
              name="owner_zip_code"
              control={control}
              onBlur={ carregaCEP() }
              defaultValue={""}
              render={({ field }) => (
                <BaseOutlinedZipInput
                  placeholder={`${t["Zip code"]}*`}
                  size={"medium"}
                  referencia={owner_cep}
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
                referencia={owner_endereco}
                placeholder={`${t["Address"]}*`}
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
                placeholder={`${t["Number"]}*`}
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
                referencia={owner_bairro}
                placeholder={`${t["Neighborhood"]}*`}
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
                placeholder={t["Complement"]}
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
                referencia={owner_cidade}
                placeholder={`${t["City"]}*`}
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
            render={({ field }) => (
              <BaseAutocomplete
                //   sx={{ margin: "0.6vh 0" }}
                estado={owner_estado}
                options={allStateData || []}
                getOptionLabel={(option) => option.name || ""}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                size={"medium"}
                desabilitado={desabilitado}
                placeholder={`${t["State"]}*`}
                onChange={(e, v, r, d) => field.onChange(v)}
                value={field.value}
                name="owner_state"
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.owner_state?.message}
          </Typography>
        </Grid>
      </Grid>
      {/* <Grid container sx={{ mt: 2 }}>
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
            {`${t["Document data"]}:`}
          </Typography>
        </Grid>
      </Grid> */}
      {/* <Grid container spacing={1} sx={{ mt: 1 }}>
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
                placeholder={t["documents"]}
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
                placeholder={t["registry office"]}
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
                placeholder={t["registration number"]}
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
      </Grid> */}
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
