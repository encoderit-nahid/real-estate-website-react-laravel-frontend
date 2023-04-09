import { Autocomplete, Box, Grid, TextField, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import valueImage from "../../../../public/Images/proposal_modal.png";
import ventureImage from "../../../../public/Images/certidoes.png";
import BaseTextField from "../../reuseable/baseTextField/BaseTextField";
import { Controller } from "react-hook-form";
import BaseAutocomplete from "../../reuseable/baseAutocomplete/BaseAutocomplete";

function ValuesAndDescription({control,errors}) {
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
          Values
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
                size={"medium"}
                placeholder={"BRL Rent"}
                type={"number"}
                  onChange={(e) => {
                    field.onChange(e.target.value);
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
                placeholder={"R$ condominium"}
                type={"number"}
                  onChange={(e) => {
                    field.onChange(e.target.value);
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
                placeholder={"BRL IPTU"}
                type={"number"}
                  onChange={(e) => {
                    field.onChange(e.target.value);
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
          Description
        </Typography>
      </Grid>

      <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={12} md={12} lg={5}>
          
           <Controller
              name="land_area"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <BaseTextField
                size={"medium"}
                placeholder={"m² Land area"}
                type={"number"}
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
              render={({ field }) => (
                <BaseTextField
                size={"medium"}
                placeholder={"m²Size of the property"}
                type={"number"}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  name={"property_area"}
                  value={field.value}
                />
              )}
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
              render={({ field }) => (
                <BaseTextField
                size={"medium"}
                placeholder={"number of rooms"}
                type={"number"}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  name={"no_of_rooms"}
                  value={field.value}
                />
              )}
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
              render={({ field }) => (
                <BaseTextField
                size={"medium"}
            placeholder={"number of suites"}
            type={"number"}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  name={"no_of_suites"}
                  value={field.value}
                />
              )}
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
              render={({ field }) => (
                <BaseTextField
                size={"medium"}
            placeholder={"number of bathrooms"}
            type={"number"}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  name={"no_of_bathrooms"}
                  value={field.value}
                />
              )}
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
              render={({ field }) => (
                <BaseTextField
                size={"medium"}
                placeholder={"Number of parking spaces"}
                type={"number"}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  name={"no_of_parking_spaces"}
                  value={field.value}
                />
              )}
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
              defaultValue={""}
              render={({ field }) => (
                <BaseAutocomplete
                  //   sx={{ margin: "0.6vh 0" }}
                  options={top100Films}
                  getOptionLabel={(option) => option.label || ""}
                  isOptionEqualToValue={(option, value) =>
                    option.year === value.year
                  }
                  size={"medium"}
                  placeholder={"Documentation"}
                  onChange={(e, v, r, d) => field.onChange(v)}
                  value={field.value}
                />
              )}
            />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={2}>
          
          <Controller
              name="registry"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <BaseTextField
                size={"medium"} placeholder={"Registry office"} 
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  name={"registry"}
                  value={field.value}
                />
              )}
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
              name="registartion_number"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <BaseTextField
                size={"medium"}
                placeholder={"Registration number"}
                type={"number"}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  name={"registartion_number"}
                  value={field.value}
                />
              )}
            />
            <Typography
              variant="inherit"
              color="textSecondary"
              sx={{ color: "#b91c1c" }}
            >
              {errors.registartion_number?.message}
            </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ValuesAndDescription;
const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
];
