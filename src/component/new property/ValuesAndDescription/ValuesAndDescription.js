import { Autocomplete, Box, Grid, TextField, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import valueImage from "../../../../public/Images/proposal_modal.png";
import ventureImage from "../../../../public/Images/certidoes.png";
import BaseTextField from "../../reuseable/baseTextField/BaseTextField";

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
          <BaseTextField
            size={"medium"}
            placeholder={"BRL Rent"}
            type={"number"}
          />
        </Grid>
        <Grid item xs={6}>
          <BaseTextField
            size={"medium"}
            placeholder={"R$ condominium"}
            type={"number"}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid item xs={6}>
          <BaseTextField
            size={"medium"}
            placeholder={"IPTU BRL"}
            type={"number"}
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
          <BaseTextField
            size={"medium"}
            placeholder={"m² Land area"}
            type={"number"}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={5}>
          <BaseTextField
            size={"medium"}
            placeholder={"m²Size of the property"}
            type={"number"}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={2}>
          <BaseTextField
            size={"medium"}
            placeholder={"number of rooms"}
            type={"number"}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={12} md={12} lg={5}>
          <BaseTextField
            size={"medium"}
            placeholder={"number of suites"}
            type={"number"}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={2}>
          <BaseTextField
            size={"medium"}
            placeholder={"number of bathrooms"}
            type={"number"}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={5}>
          <BaseTextField
            size={"medium"}
            placeholder={"Number of parking spaces"}
            type={"number"}
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
          <BaseTextField size={"medium"} placeholder={"Registry office"} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={5}>
          <BaseTextField
            size={"medium"}
            placeholder={"Registration number"}
            type={"number"}
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
