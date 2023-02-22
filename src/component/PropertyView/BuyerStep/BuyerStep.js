import {
  Autocomplete,
  Box,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import buyerProfile from "../../../../public/Images/buyer_profile.png";

function BuyerStep() {
  //zip_code
  const [zipCodeValue, setZipCodeValue] = useState("");
  const [zipCodeValid, setZipCodeValid] = useState(false);
  const handleZipCodeValidation = (e) => {
    setZipCodeValid(/^[0-9]{5}-[0-9]{3}$/.test(e.target.value));
    setZipCodeValue(e.target.value);
  };

  //rg
  const [rgValue, setRGValue] = useState("");
  const [rgValid, setRGValid] = useState(false);
  const handleRGValidation = (e) => {
    setRGValid(/^W(\d(\d(\d[A-Z]?)?)?$)/.test(e.target.value));
    setRGValue(e.target.value);
  };

  //cpf
  const [cpfValue, setCPFValue] = useState("");
  const [cpfValid, setCPFValid] = useState(false);
  const handleCPFValidation = (e) => {
    setCPFValid(
      /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/.test(e.target.value)
    );
    setCPFValue(e.target.value);
  };

  return (
    <Box sx={{ mt: 3 }}>
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
          Buyer&apos;s data
        </Typography>

        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <input hidden accept="image/*" type="file" />
          <Box
            sx={{ height: "10vh", width: "10vh", border: "1px dashed #9faab1" }}
          ></Box>
        </IconButton>
      </Grid>
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="medium"
            id="outlined-basic"
            placeholder="Full Name"
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <TextField
            fullWidth
            size="medium"
            id="outlined-basic"
            placeholder="RG"
            variant="outlined"
            value={rgValue}
            onChange={(e) => handleRGValidation(e)}
            error={!rgValid && rgValue.length > 0 ? true : false}
            required={true}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <TextField
            fullWidth
            size="medium"
            id="outlined-basic"
            placeholder="CPF"
            variant="outlined"
            value={cpfValue}
            onChange={(e) => handleCPFValidation(e)}
            error={!cpfValid && cpfValue.length > 0 ? true : false}
            required={true}
          />
        </Grid>
      </Grid>
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
            Address:
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <TextField
            fullWidth
            size="medium"
            id="outlined-basic"
            placeholder="Zip code"
            variant="outlined"
            value={zipCodeValue}
            onChange={(e) => handleZipCodeValidation(e)}
            error={!zipCodeValid && zipCodeValue.length > 0 ? true : false}
            required={true}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <TextField
            fullWidth
            size="medium"
            id="outlined-basic"
            placeholder="Address"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <TextField
            fullWidth
            size="medium"
            id="outlined-basic"
            placeholder="Number"
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <TextField
            fullWidth
            size="medium"
            id="outlined-basic"
            placeholder="Neighborhood"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <TextField
            fullWidth
            size="medium"
            id="outlined-basic"
            placeholder="Complement"
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <TextField
            fullWidth
            size="medium"
            id="outlined-basic"
            placeholder="City"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Autocomplete
            fullWidth
            disablePortal
            size="medium"
            id="combo-box-demo"
            options={top100Films}
            renderInput={(params) => <TextField {...params} label="State" />}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default BuyerStep;

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
];
