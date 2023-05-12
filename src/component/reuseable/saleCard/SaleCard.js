import React from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import media from "../../../../public/Images/Media.png";
import Image from "next/image";
import { _baseURL, _imageURL } from "../../../../consts";

function SaleCard({ singlePropertyData }) {
  const myLoader = ({ src }) => {
    return `${_imageURL}/storage/${src}`;
  };
  return (
    <Box
      sx={{
        background: "#FFFFFF",
        border: "1px solid #DBE1E5",
        borderRadius: "8px",
      }}
    >
      <Image
        loader={myLoader}
        src={`${singlePropertyData?.attachments?.[0]?.file_path}`}
        height={250}
        width={300}
        alt="media"
      />
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
          {singlePropertyData?.ad_type}
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
          {`BRL ${singlePropertyData?.brl_rent}`}
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
          {singlePropertyData?.address?.address}
        </Typography>
      </Box>
    </Box>
  );
}

export default SaleCard;
