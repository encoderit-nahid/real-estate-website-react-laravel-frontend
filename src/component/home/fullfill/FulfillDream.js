import {
  Autocomplete,
  Box,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BaseButton from "../../reuseable/button/BaseButton";
import homeImage from "../../../../public/Images/home.png";
import Image from "next/image";
import Link from "next/link";
import BaseTextField from "../../reuseable/baseTextField/BaseTextField";
import BaseAutocomplete from "../../reuseable/baseAutocomplete/BaseAutocomplete";
import en from "locales/en";
import pt from "locales/pt";

// const AutoComplete = styled(Autocomplete)`
//   & .MuiInputBase-input {
//     height: {xl:0.9rem,lg:0.9rem};
//   }
// `;

const omitEmpties = (obj) => {
  return Object.entries(obj).reduce((carry, [key, value]) => {
    if (![null, undefined, ""].includes(value)) {
      carry[key] = value;
    }
    return carry;
  }, {});
};

function FulfillDream({ languageName }) {
  const [value, setValue] = useState(null);

  const t = languageName === "en" ? en : pt;

  const [locationName, setLocationName] = useState(null);

  const handleValueChange = (v) => {
    setValue(v);
  };

  const handleLocationChange = (e) => {
    setLocationName(e.target.value);
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="flex-start"
      sx={{ ml: 3, mt: { xs: 3, sm: 3, md: 15, lg: 15, xl: 15 } }}
    >
      <Typography
        variant="h1"
        sx={{
          color: "#1A1859",
          fontSize: {
            xs: "56px",
            sm: "56px",
            md: "56px",
            lg: "72px",
            xl: "72px",
          },
          fontWeight: "800",
        }}
      >
        {t["Make your"]}
      </Typography>
      <Typography
        variant="h1"
        sx={{
          color: "#1A1859",
          fontSize: {
            xs: "56px",
            sm: "56px",
            md: "56px",
            lg: "72px",
            xl: "72px",
          },
          fontWeight: "800",
        }}
      >
        {t["Dream!"]}
      </Typography>
      <BaseTextField
        fullWidth
        label={t["Location"]}
        placeholder={"Search by street, neighborhood or city"}
        sx={{
          mt: 4,
          width: { xs: "90%", sm: "90%", md: "90%", xl: "90%", lg: "75%" },
        }}
        onChange={(e) => handleLocationChange(e)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Image src={homeImage} alt="homeImage" />
            </InputAdornment>
          ),
        }}
      />

      <BaseAutocomplete
        options={valueUpto || []}
        getOptionLabel={(option) => option.label || ""}
        sx={{
          mt: 4,
          width: { xs: "90%", sm: "90%", md: "90%", xl: "90%", lg: "75%" },
        }}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        size={"medium"}
        placeholder={t["Value up to"]}
        onChange={(e, v, r, d) => handleValueChange(v)}
        value={value}
      />
      <Link
        href={{
          pathname: "/search_real_estate",
          query: omitEmpties({
            status: "approved",
            location: locationName && locationName,
            value_up_to: value && value.label,
            page: 1,
            per_page: 9,
          }),
        }}
      >
        <a
          style={{
            textDecoration: "none",
            listStyle: "none",
            width: "100%",
          }}
        >
          <BaseButton
            name={t["search real estate"]}
            width={{
              xs: "90%",
              sm: "90%",
              md: "90%",
              xl: "90%",
              lg: "75%",
            }}
            fontSize={"24px"}
            margin={"4vh 0 0 0"}
          />
        </a>
      </Link>
    </Grid>
  );
}

export default FulfillDream;

const valueUpto = [
  { label: "5000", id: 1 },
  { label: "10000", id: 2 },
  { label: "15000", id: 3 },
  { label: "20000", id: 4 },
  { label: "25000", id: 5 },
  { label: "30000", id: 6 },
  { label: "35000", id: 7 },
];
