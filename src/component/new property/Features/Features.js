import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import buildingImage from "../../../../public/Images/buildingRed.png";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const PropertyFeature = [
  "close to the metro",
  "close to hospital",
  "silent street",
  "accept anials",
  "close to restaurants",
  "new property",
  "close to gyms",
  "close to pharmacies",

  "gas shower",
  "glass box",
  "hot tub",
  "service room",
  "service bathroom",
  "removable extra room",
  "gourmet balcony",
  "private pool",
  "barbecue grill",
  "football field",
  "lake",
  "heated pool",
  "fireplace",
  "furnish",
];
function Features() {
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
    <Box sx={{ mt: 4 }}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Image height={40} width={40} src={buildingImage} alt="building" />
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
          Features
        </Typography>
      </Grid>
      <Box sx={{ mt: 2 }}>
        <Typography
          variant="p"
          sx={{
            color: "#002152",
            fontSize: "16px",
            fontWeight: "400",
            lineHeight: "22px",
          }}
        >
          Select property features:
        </Typography>
      </Box>
      <Grid container spacing={1} sx={{ mt: 2 }}>
        {PropertyFeature.map((data, index) => (
          <Grid item xs={4} sm={4} md={4} lg={3} xl={3} key={index}>
            <Button
              sx={{
                background: `${index === 0 ? "#7450F0" : "transparent"}`,
                borderRadius: "56px",
                width: "100%",
                color: `${index === 0 ? "#ffffff" : "#32414C"}`,
                border: `${index === 0 ? "" : "1px solid #9FAAB1"}`,
                fontSize: {
                  xs: "12px",
                  sm: "13px",
                  md: "16px",
                  lg: "13px",
                  xl: "16px",
                },
                fontWeight: "400",
                lineHeight: "22px",
                textTransform: "none",
                px: { xs: 0, sm: 2, md: 2, lg: 2, xl: 2 },
                py: 1,
                "&:hover": {
                  background: "#7450F0",
                  borderRadius: "56px",
                  color: "#ffffff",
                  border: `${index === 0 ? "" : "1px solid #9FAAB1"}`,
                  width: "100%",
                  fontSize: {
                    xs: "12px",
                    sm: "13px",
                    md: "16px",
                    lg: "13px",
                    xl: "16px",
                  },
                  fontWeight: "400",
                  lineHeight: "22px",
                  textTransform: "none",
                  px: { xs: 0, sm: 2, md: 2, lg: 2, xl: 2 },
                  py: 1,
                },
              }}
            >
              {data}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ mt: 3 }}
      >
        <TextField
          sx={{ width: "50%" }}
          size="medium"
          id="outlined-basic"
          placeholder="Zip code"
          value={value}
          onChange={(e) => handleValidation(e)}
          error={!valid && value.length > 0 ? true : false}
          required={true}
          variant="outlined"
        />
        <Button
          sx={{
            backgroundColor: "#0362F0",
            py: 2,
            ml: 1,
            borderRadius: "4px",
            "&:hover": {
              backgroundColor: "#0362F0",
              py: 2,
              ml: 1,
              borderRadius: "4px",
            },
          }}
        >
          <AddOutlinedIcon sx={{ color: "#ffffff" }} />
        </Button>
      </Grid>
    </Box>
  );
}

export default Features;
