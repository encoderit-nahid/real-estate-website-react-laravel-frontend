import React from "react";
import { Button, Typography } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const BaseWhatsappButton = () => {
  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      sx={{
        px: 4,
        py: 1,
        fontSize: "16px",
        fontWeight: "600",
        textTransform: "none",
        minWidth: "195px",
        background: "#1bd741",
        borderRadius: "4px",
        "&: hover": {
          px: 4,
          fontSize: "16px",
          fontWeight: "600",
          textTransform: "none",
          minWidth: "195px",
          background: "#1bd741",
          borderRadius: "4px",
        },
      }}
    >
      <WhatsAppIcon />
      <Typography
        sx={{
          color: "#ffffff",
          fontSize: "16px",
          fontWeight: "600",
          ml: 1,
        }}
      >
        Whatsapp
      </Typography>
    </Button>
  );
};

export default BaseWhatsappButton;
