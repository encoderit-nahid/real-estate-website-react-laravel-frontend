import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import handshake from "../../../../public/Images/handshake.png";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

function Contract() {
  return (
    <Box sx={{ mt: 4 }}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Image height={40} width={60} src={handshake} alt="handshake" />
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
          Digital contract
        </Typography>
      </Grid>
      <Box sx={{ mt: 2 }}></Box>
    </Box>
  );
}

export default Contract;
