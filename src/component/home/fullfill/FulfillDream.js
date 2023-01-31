import {
  Autocomplete,
  Box,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import BaseButton from "../../reuseable/button/BaseButton";
import homeImage from "../../../../public/Images/home.png";
import Image from "next/image";

function FulfillDream() {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="flex-start"
      sx={{ ml: 3, mt: 15 }}
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
          wordBreak: "break-all",
        }}
      >
        Fulfill your Dream!
      </Typography>
      <TextField
        fullWidth
        id="outlined-basic"
        label="Location"
        placeholder="Search by street, neighborhood or city"
        size="medium"
        variant="outlined"
        sx={{ mt: 4 }}
        InputProps={{
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
        size="medium"
        id="combo-box-demo"
        sx={{ mt: 4 }}
        options={top100Films}
        renderInput={(params) => <TextField {...params} label="value up to" />}
      />
      <BaseButton
        name={"search real estate"}
        width={"100%"}
        fontSize={"24px"}
        margin={"4vh 0 0 0"}
      />
    </Grid>
  );
}

export default FulfillDream;

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
];
