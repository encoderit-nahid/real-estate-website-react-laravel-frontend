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
import React from "react";
import BaseButton from "../../reuseable/button/BaseButton";
import homeImage from "../../../../public/Images/home.png";
import Image from "next/image";
import Link from "next/link";
import BaseTextField from "../../reuseable/baseTextField/BaseTextField";

// const AutoComplete = styled(Autocomplete)`
//   & .MuiInputBase-input {
//     height: {xl:0.9rem,lg:0.9rem};
//   }
// `;

function FulfillDream() {
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
        Make your
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
        Dream!
      </Typography>
      <BaseTextField
        fullWidth
        label={"Location"}
        placeholder={"Search by street, neighborhood or city"}
        sx={{
          mt: 4,
          width: { xs: "90%", sm: "90%", md: "90%", xl: "90%", lg: "75%" },
        }}
        InputProps={{
          // style: {
          //   height: "6.4vh",
          // },
          endAdornment: (
            <InputAdornment position="end">
              <Image src={homeImage} alt="homeImage" />
            </InputAdornment>
          ),
        }}
      />
      <Autocomplete
        fullWidth
        disablePortal
        id="combo-box-demo"
        sx={{
          mt: 4,
          width: { xs: "90%", sm: "90%", md: "90%", xl: "90%", lg: "75%" },
        }}
        options={valueUpto}
        renderInput={(params) => <TextField {...params} label="value up to" />}
      />
      <Link href={{ pathname: '/search_real_estate', query: { location: 'badda',value:"10000",page:1 } }}>
        <a style={{ textDecoration: "none", listStyle: "none", width: "100%" }}>
          <BaseButton
            name={"search real estate"}
            width={{ xs: "90%", sm: "90%", md: "90%", xl: "90%", lg: "75%" }}
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
  { label: "5000"},
  { label: "10000" },
  { label: "15000" },
  { label: "20000" },
  { label: "25000" },
  { label: "30000" },
  { label: "35000" },
];
