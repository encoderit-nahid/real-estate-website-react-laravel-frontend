import {
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import BaseButton from "../../reuseable/button/BaseButton";
import { IMaskInput } from "react-imask";
import { useState } from "react";
import Link from "next/link";
import BaseOutlinedZipInput from "../../reuseable/baseOutlinedZipInput/BaseOutlinedZipInput";

function BrokerHelp({ name, content, buttonName, fieldItem, handleLoginOpen }) {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="flex-start"
      sx={{ ml: 3 }}
    >
      <Typography
        variant="p"
        sx={{
          fontSize: {
            sm: "48px",
            xs: "48px",
            md: "48px",
            lg: "50px",
            xl: "50px",
          },
          lineHeight: "55px",
          fontWeight: "800",
          color: "#1A1859",
        }}
      >
        {name}
      </Typography>
      {/* <Typography
        variant="p"
        sx={{
          fontSize: {
            sm: "48px",
            xs: "48px",
            md: "48px",
            lg: "50px",
            xl: "50px",
          },
          fontWeight: "800",
          color: "#1A1859",
        }}
      >
        real estate market
      </Typography> */}
      <Typography
        variant="p"
        sx={{
          paddingTop: 3,
          fontSize: "20px",
          fontWeight: "400",
          color: "#1A1859",
        }}
      >
        {content}
      </Typography>
      {fieldItem && (
        <FormControl variant="outlined" sx={{ width: "100%", marginTop: 3 }}>
          <InputLabel htmlFor="sandbox" variant="outlined">
            Zip Code
          </InputLabel>
          <BaseOutlinedZipInput
            placeholder={"Eg: 00000-000"}
            label={"Zip Code"}
          />
        </FormControl>
      )}

      <BaseButton
        name={buttonName}
        width={"100%"}
        fontSize={"24px"}
        margin={"3vh 0 0 0"}
        handleFunction={handleLoginOpen}
      />
    </Grid>
  );
}

export default BrokerHelp;
