import { Box, Button, Grid, InputAdornment, Typography } from "@mui/material";
import React from "react";
import impulseImage from "../../../../public/Images/impulse.png";
import Image from "next/image";
import { useState } from "react";
import BaseTextField from "../../reuseable/baseTextField/BaseTextField";

function CalulateComission({ setFullCommission, setYourCommission }) {
  const [salevalue, setSaleValue] = useState(0);
  const [commission, setCommission] = useState(0);
  const [value, setValue] = useState("");
  console.log(value.length);
  const [valid, setValid] = useState(false);
  console.log({ valid });
  const handleComissionChange = (e) => {
    setValid(/^\d{3,}$/.test(e.target.value));
    console.log(e.target.value);
    setCommission(e.target, value);
  };

  const handleSaleValueChange = (e) => {
    setSaleValue(e.target.value);
  };

  const handleCalculation = () => {
    const fullComissionValue = salevalue * (6 / 100);
    setFullCommission(fullComissionValue);
    console.log({ fullComissionValue });
    const yourComissionValue = fullComissionValue * (70 / 100);
    console.log({ yourComissionValue });
    setYourCommission(yourComissionValue);
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
      <BaseTextField
        label={"Sale Value"}
        placeholder={"Sale Value"}
        size={"medium"}
        type={"number"}
        onChange={handleSaleValueChange}
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
      <BaseTextField
        label={"Comission"}
        placeholder={"Comission"}
        size={"medium"}
        type={"number"}
        sx={{ mt: 4 }}
        // value={commission}
        onChange={handleComissionChange}
        error={!valid && commission.length > 0 ? true : false}
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
        onClick={handleCalculation}
      >
        calculate my commission
      </Button>
    </Grid>
  );
}

export default CalulateComission;
