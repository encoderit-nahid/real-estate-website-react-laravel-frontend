import { Grid, InputAdornment, TextField, Typography } from "@mui/material";
import React from "react";
import BaseButton from "../../reuseable/button/BaseButton";
import { useState } from "react";
import Link from "next/link";

function BrokerHelp({ name, content, buttonName, fieldItem }) {
  const [value, setValue] = useState("");
  console.log(value.length);
  const [valid, setValid] = useState(false);
  console.log({ valid });
  const handleValidation = (e) => {
    setValid(/^[0-9]{5}-[0-9]{3}$/.test(e.target.value));
    console.log(e.target.value);
    setValue(e.target.value);
  };
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
        <TextField
          fullWidth
          id="outlined-basic"
          label="Zip Code"
          name="zip_code"
          placeholder="Zip Code"
          size="medium"
          type="number"
          variant="outlined"
          value={value}
          onChange={(e) => handleValidation(e)}
          error={!valid && value.length > 0 ? true : false}
          required={true}
          sx={{ mt: 4 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography variant="p" sx={{ color: "#7450F0" }}>
                  Eg: 00000-000
                </Typography>
              </InputAdornment>
            ),
          }}
        />
      )}

      <Link href="/registration">
        <a
          style={{
            textDecoration: "none",
            listStyle: "none",
            width: "100%",
          }}
        >
          <BaseButton
            name={buttonName}
            width={"100%"}
            fontSize={"24px"}
            margin={"4vh 0 0 0"}
          />
        </a>
      </Link>
    </Grid>
  );
}

export default BrokerHelp;
