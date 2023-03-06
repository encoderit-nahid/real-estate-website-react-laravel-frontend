import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import buyerProfile from "../../../../public/Images/buyer_profile.png";
import { useState } from "react";

function Owner() {
  const [value, setValue] = useState("");
  console.log(value.length);

  //zip_code
  const [valid, setValid] = useState(false);
  console.log({ valid });
  const handleValidation = (e) => {
    setValid(/^[0-9]{5}-[0-9]{3}$/.test(e.target.value));
    console.log(e.target.value);
    setValue(e.target.value);
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

  //cpf_spouse
  const [cpfSpouseValue, setCPFSpouseValue] = useState("");
  const [cpfSpouseValid, setCPFSpouseValid] = useState(false);
  const handleCPFSpouseValidation = (e) => {
    setCPFSpouseValid(
      /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/.test(e.target.value)
    );
    setCPFSpouseValue(e.target.value);
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
          Owner&apos;s data
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
            Marital Status:
          </Typography>
        </Grid>
        <Button
          sx={{
            textTransform: "none",
            padding: "3px 10px",
            backgroundColor: "#0362F0",
            color: "#ffffff",
            borderRadius: "56px",
          }}
        >
          Married
        </Button>
        <Button
          sx={{
            textTransform: "none",
            padding: "3px 10px",
            backgroundColor: "#F2F5F6",
            color: "#002152",
            borderRadius: "56px",
            ml: 1,
          }}
        >
          Single
        </Button>
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
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <TextField
            fullWidth
            size="medium"
            id="outlined-basic"
            type="number"
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
            Spouse details:
          </Typography>
        </Grid>
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
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <TextField
            fullWidth
            size="medium"
            id="outlined-basic"
            placeholder="CPF"
            variant="outlined"
            type="number"
            value={cpfSpouseValue}
            onChange={(e) => handleCPFSpouseValidation(e)}
            error={!cpfSpouseValid && cpfSpouseValue.length > 0 ? true : false}
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
      <Grid container spacing={1} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <TextField
            fullWidth
            size="medium"
            id="outlined-basic"
            placeholder="Zip code"
            variant="outlined"
            value={value}
            onChange={(e) => handleValidation(e)}
            error={!valid && value.length > 0 ? true : false}
            required={true}
            type="number"
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
            type="number"
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
            Document data:
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Autocomplete
            fullWidth
            disablePortal
            size="medium"
            id="combo-box-demo"
            options={top100Films}
            renderInput={(params) => (
              <TextField {...params} label="Type of document" />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <TextField
            fullWidth
            size="medium"
            id="outlined-basic"
            placeholder="Registry"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <TextField
            fullWidth
            size="medium"
            id="outlined-basic"
            placeholder="Registration number"
            variant="outlined"
            type="number"
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Owner;
const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
];
