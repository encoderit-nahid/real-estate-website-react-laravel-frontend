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
import BaseHomeButton from "@/component/reuseable/button/BaseHomeButton";

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

function FulfillDream({ languageName, setKnowMoreModal }) {
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
      alignItems="center"
      sx={{ height: "75vh" }}
    >
      <BaseTextField
        fullWidth
        label={"Onde você que o imóvel?"}
        placeholder={"procure por rua, bairro ou cidade"}
        InputLabelProps={{
          sx: {
            color: "#ffffff", // Change label color here
          },
        }}
        sx={{
          mt: 4,
          width: { xs: "90%", sm: "90%", md: "50%", xl: "30%", lg: "35%" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#ffffff",
              borderRadius: "25px",
            },
          },
        }}
        inputProps={{
          style: { color: "#ffffff" }, // Change placeholder color here
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
        label={"Faixa de preço"}
        getOptionLabel={(option) => option.label || ""}
        sx={{
          mt: 4,
          width: { xs: "90%", sm: "90%", md: "50%", xl: "30%", lg: "35%" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#ffffff", // Change border color here
              borderRadius: "25px",
            },
          },
          "& .MuiSvgIcon-root": {
            color: "#ffffff", // Change arrow icon color here
          },
        }}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        size={"medium"}
        placeholder={t["Value up to"]}
        onChange={(e, v, r, d) => handleValueChange(v)}
        value={value}
        inputTextColor={{ color: "#ffffff" }}
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BaseButton
            name={t["search real estate"]}
            width={{
              xs: "90%",
              sm: "90%",
              md: "50%",
              xl: "30%",
              lg: "35%",
            }}
            fontSize={"24px"}
            borderRadius={"25px"}
            margin={"4vh 0 0 0"}
          />
        </a>
      </Link>

      <BaseHomeButton
        name={"Saiba mais"}
        width={{
          xs: "90%",
          sm: "90%",
          md: "50%",
          xl: "30%",
          lg: "35%",
        }}
        fontSize={"20px"}
        borderRadius={"25px"}
        margin={"4vh 0 0 0"}
        color={"#ffffff"}
        background={"transparent"}
        handleFunction={() => setKnowMoreModal(true)}
      />
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
