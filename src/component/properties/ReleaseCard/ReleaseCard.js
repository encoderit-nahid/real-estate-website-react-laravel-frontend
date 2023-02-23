import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import cardMedia from "../../../../public/Images/CardMedia.png";
import Image from "next/image";
import Link from "next/link";

function ReleaseCard() {
  return (
    <Box
      sx={{
        background: "#ffffff",
        boxShadow: "0px 4px 8px rgba(0, 33, 82, 0.08)",
        borderRadius: "8px",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Image src={cardMedia} layout="responsive" alt="aston" />
      </Box>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Typography
          variant="p"
          sx={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#1A1859",
            lineHeight: "32px",
            px: 2,
            py: 2,
          }}
        >
          aston
        </Typography>
        <Typography
          variant="p"
          sx={{
            fontSize: "18px",
            fontWeight: "400",
            color: "#6C7A84",
            lineHeight: "28px",
            px: 2,
            py: 1,
          }}
        >
          10 properties registered
        </Typography>
        <Typography
          variant="p"
          sx={{
            fontSize: "18px",
            fontWeight: "400",
            color: "#6C7A84",
            lineHeight: "28px",
            px: 2,
            py: 1,
          }}
        >
          4 properties sold
        </Typography>

        <Link href="/view_properties">
          <a
            style={{
              textDecoration: "none",
              listStyle: "none",
              width: "100%",
            }}
          >
            <Button
              sx={{
                textTransform: "none",
                border: "1px solid #002152",
                borderRadius: "4px",
                color: "#002152",
                fontSize: "16px",
                fontWeight: "600",
                width: {
                  xs: "92%",
                  sm: "92%",
                  md: "92%",
                  lg: "85%",
                  xl: "92%",
                },
                mx: 2,
                my: 2,
              }}
            >
              View properties
            </Button>
          </a>
        </Link>
      </Grid>
    </Box>
  );
}

export default ReleaseCard;
