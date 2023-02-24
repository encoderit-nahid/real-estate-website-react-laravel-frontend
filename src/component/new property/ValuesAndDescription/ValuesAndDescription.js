import { Autocomplete, Box, Grid, TextField, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import valueImage from "../../../../public/Images/proposal_modal.png";
import ventureImage from "../../../../public/Images/certidoes.png";

function ValuesAndDescription() {
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
          <TextField
            fullWidth
            size="medium"
            id="outlined-basic"
            placeholder="BRL Rent"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            size="medium"
            id="outlined-basic"
            placeholder="R$ condominium"
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            size="medium"
            id="outlined-basic"
            placeholder="IPTU BRL"
            variant="outlined"
          />
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
          <TextField
            fullWidth
            size="medium"
            id="outlined-basic"
            placeholder="m² Land area"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={5}>
          <TextField
            fullWidth
            size="medium"
            id="outlined-basic"
            placeholder="m²Size of the property"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={2}>
          <TextField
            fullWidth
            size="medium"
            id="outlined-basic"
            placeholder="number of rooms"
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={12} md={12} lg={5}>
          <TextField
            fullWidth
            size="medium"
            id="outlined-basic"
            placeholder="number of suites"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={2}>
          <TextField
            fullWidth
            size="medium"
            id="outlined-basic"
            placeholder="number of bathrooms"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={5}>
          <TextField
            fullWidth
            size="medium"
            id="outlined-basic"
            placeholder="Number of parking spaces"
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={12} md={12} lg={5}>
          <Autocomplete
            sx={{ width: "100%" }}
            disablePortal
            size="medium"
            id="combo-box-demo"
            options={top100Films}
            renderInput={(params) => (
              <TextField {...params} label="Documentation" />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={2}>
          <TextField
            fullWidth
            size="medium"
            id="outlined-basic"
            placeholder="Registry office"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={5}>
          <TextField
            fullWidth
            size="medium"
            id="outlined-basic"
            placeholder="Registration number"
            variant="outlined"
          />
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
