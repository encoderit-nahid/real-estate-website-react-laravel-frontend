import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import impulseImage from "../../../../public/Images/impulse.png";
import Image from "next/image";
import { useState } from "react";

function CalulateComission() {
  const [value, setValue] = useState("");
  console.log(value.length);
  const [valid, setValid] = useState(false);
  console.log({ valid });
  const handleValidation = (e) => {
    setValid(/^\d{3,}$/.test(e.target.value));
    console.log(e.target.value);
    setValue(e.target.value);
  };
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="flex-start"
      sx={{ borderRight: "1px dashed #D3D3DF", px: 2 }}
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Image height={90} width={108} src={impulseImage} alt="impulse" />
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          variant="p"
          sx={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#1A1859",
          }}
        >
          Simulate a sale here
        </Typography>
      </Grid>
      <TextField
        fullWidth
        id="outlined-basic"
        label="Sale Value"
        placeholder="Sale Value"
        size="medium"
        type="number"
        variant="outlined"
        sx={{ mt: 4 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Typography variant="p" sx={{ color: "#7450F0" }}>
                R$
              </Typography>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        fullWidth
        id="outlined-basic"
        label="Comission"
        placeholder="Comission"
        size="medium"
        variant="outlined"
        type="number"
        sx={{ mt: 4 }}
        value={value}
        onChange={(e) => handleValidation(e)}
        error={!valid && value.length > 0 ? true : false}
        required={true}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Typography variant="p" sx={{ color: "#7450F0" }}>
                %
              </Typography>
            </InputAdornment>
          ),
        }}
      />
      <Button
        sx={{
          background: `#00C1B4`,
          borderRadius: "6px",
          color: "#ffffff",
          fontSize: "24px",
          fontWeight: "700",
          textTransform: "none",
          marginTop: 3,
          width: "100%",
          "&:hover": {
            background: `#00C1B4`,
            borderRadius: "6px",
            color: "#ffffff",
            fontSize: "24px",
            fontWeight: "700",
            textTransform: "none",
            marginTop: 3,
            width: "100%",
          },
        }}
      >
        calculate my commission
      </Button>
    </Grid>
  );
}

export default CalulateComission;
