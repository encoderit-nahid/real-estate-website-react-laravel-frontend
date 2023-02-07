import React from "react";
import { Button, Grid, Typography, Box } from "@mui/material";

function Negotiate() {
  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        border: "1px solid #F9F9FB",
        boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.08)",
        borderRadius: "8px",
        py: 2,
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ px: 4, py: 1 }}
      >
        <Typography
          variant="p"
          sx={{ fontSize: "14px", fontWeight: "400", color: "#1A1859" }}
        >
          Value
        </Typography>
        <Typography
          variant="p"
          sx={{ fontSize: "14px", fontWeight: "700", color: "#1A1859" }}
        >
          R$950.000,00
        </Typography>
      </Grid>
      <Box sx={{ borderBottom: "1px dashed #D3D3DF" }}></Box>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ px: 4, py: 1 }}
      >
        <Typography
          variant="p"
          sx={{ fontSize: "14px", fontWeight: "400", color: "#1A1859" }}
        >
          Condominium
        </Typography>
        <Typography
          variant="p"
          sx={{ fontSize: "14px", fontWeight: "700", color: "#1A1859" }}
        >
          R$1.315,00
        </Typography>
      </Grid>
      <Box sx={{ borderBottom: "1px dashed #D3D3DF" }}></Box>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ px: 4, py: 1 }}
      >
        <Typography
          variant="p"
          sx={{ fontSize: "14px", fontWeight: "400", color: "#1A1859" }}
        >
          IPTU
        </Typography>
        <Typography
          variant="p"
          sx={{ fontSize: "14px", fontWeight: "700", color: "#1A1859" }}
        >
          R$3.000,00
        </Typography>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 1, px: 4 }}
      >
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            px: 4,
            fontSize: "16px",
            fontWeight: "600",
            textTransform: "none",
          }}
        >
          Negotiate
        </Button>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{
            mt: 1,
            px: 4,
            fontSize: "16px",
            fontWeight: "600",
            textTransform: "none",
          }}
        >
          Standard
        </Button>
      </Grid>
    </Box>
  );
}

export default Negotiate;
