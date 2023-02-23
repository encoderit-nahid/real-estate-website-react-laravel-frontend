import React from "react";
import { Button, Grid, Typography, Box, TextField } from "@mui/material";
import negotiateImage from "../../../../public/Images/negotiate.png";
import Image from "next/image";

function Negotiate({ handleProposalOpen }) {
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
          onClick={handleProposalOpen}
        >
          Negotiate
        </Button>
        <Box
          sx={{
            mt: 4,
            boxSizing: "border-box",
            backgroundColor: "#F9F9FB",
            border: "1px solid #D3D3DF",
            height: "30vh",
            width: "100%",
            borderRadius: "4px",
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ mt: 2 }}
          >
            <Image src={negotiateImage} alt="negotiate" />
            <Box
              sx={{
                background: "#3E50D8",
                borderRadius: "0 20px 20px 20px",
                py: 1,
                px: 2,
                width: "70%",
              }}
            >
              <Typography
                variant="p"
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "18px",
                  color: "#ffffff",
                }}
              >
                There is no proposal or schedule yet
              </Typography>
            </Box>
          </Grid>
        </Box>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ px: 4, py: 1 }}
      >
        <Typography
          variant="p"
          sx={{
            fontSize: "12px",
            fontWeight: "400",
            lineHeight: "32px",
          }}
        >
          Proposal
        </Typography>
        <TextField
          fullWidth
          size="small"
          type="number"
          id="outlined-basic"
          placeholder="BRL"
          variant="outlined"
        />
        <Button
          fullWidth
          variant="outlined"
          sx={{ textTransform: "none", mt: 1 }}
        >
          Include Conditions
        </Button>
        <Button
          fullWidth
          sx={{
            background: "#00C1B4",
            boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.08)",
            borderRadius: "4px",
            color: "#ffffff",
            fontSize: "16px",
            lineHeight: "22px",
            fontWeight: "600",
            mt: 1,
            textTransform: "none",

            py: 1,
            "&:hover": {
              background: "#00C1B4",
              boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.08)",
              borderRadius: "4px",
              color: "#ffffff",
              fontSize: "16px",
              lineHeight: "22px",
              fontWeight: "600",
              mt: 1,
              textTransform: "none",

              py: 1,
            },
          }}
          onClick={handleProposalOpen}
        >
          Submit proposals
        </Button>
      </Grid>
      <Box sx={{ border: "1px dashed #D3D3DF" }}></Box>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ px: 4, py: 1 }}
      >
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{
            mt: 1,

            fontSize: "16px",
            fontWeight: "600",
            textTransform: "none",
          }}
        >
          Schedule visit
        </Button>
      </Grid>
    </Box>
  );
}

export default Negotiate;
