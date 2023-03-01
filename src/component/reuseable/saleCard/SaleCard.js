import React from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import media from "../../../../public/Images/Media.png";
import Image from "next/image";

function SaleCard() {
  return (
    <Box
      sx={{
        background: "#FFFFFF",
        border: "1px solid #DBE1E5",
        borderRadius: "8px",
      }}
    >
      <Image src={media} layout="responsive" alt="media" />
      <Box sx={{ mt: 2, px: 2 }}>
        <Button
          sx={{
            textTransform: "none",
            background: "#E0F2FE",
            borderRadius: "2px",
            padding: "2px 8px",
            color: " #0362F0",
            fontSize: "14px",
            lineHeight: "18px",
            fontWeight: "400",
            mr: 1,
          }}
        >
          sale
        </Button>
        <Typography
          variant="h1"
          sx={{
            color: "#1A1859",
            fontWeight: "700",
            fontSize: "24px",
            lineHeight: "32px",
            mt: 1,
          }}
        >
          BRL 4,570.00
        </Typography>
        <Typography
          variant="h1"
          sx={{
            color: "#6C7A84",
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: "22px",
            my: 1,
          }}
        >
          Jaceguai Street, Bela Vista, São Paulo - SP - CEP 01315010
        </Typography>
      </Box>
    </Box>
  );
}

export default SaleCard;
