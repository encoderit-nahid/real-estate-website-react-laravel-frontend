import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import brokerImage from "../../../../public/Images/broker-pendant.png";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneEnabledOutlinedIcon from "@mui/icons-material/PhoneEnabledOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import Image from "next/image";

function TabpendantCard() {
  return (
    <Box sx={{ background: "#ffffff", borderRadius: "8px" }}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ px: 1.5, py: 1 }}
      >
        <Box>
          <Image src={brokerImage} alt="brokerImahe" />
        </Box>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ px: 1.5, py: 1 }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#002152",
            fontWeight: "700",
            fontSize: "16px",
            lineHeight: "22px",
            pl: 0.5,
          }}
        >
          Ronald Richards
        </Typography>
        <Button
          sx={{
            display: "flex",
            padding: 0,
            textTransform: "none",
            mt: 2,
            "&:hover": {
              background: "transparent",
            },
          }}
        >
          <AssignmentOutlinedIcon sx={{ color: "#6C7A84" }} />
          <Typography
            variant="h6"
            sx={{
              color: "#6C7A84",
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "22px",
            }}
          >
            CRECI 95496840
          </Typography>
        </Button>
        <Button
          sx={{
            display: "flex",
            padding: 0,
            textTransform: "none",
            mt: 2,
            "&:hover": {
              background: "transparent",
            },
          }}
        >
          <EmailOutlinedIcon sx={{ color: "#6C7A84" }} />
          <Typography
            variant="h6"
            sx={{
              color: "#6C7A84",
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "22px",
            }}
          >
            asncontaa@gmail.com
          </Typography>
        </Button>
        <Button
          sx={{
            display: "flex",
            padding: 0,
            textTransform: "none",
            mt: 2,
            "&:hover": {
              background: "transparent",
            },
          }}
        >
          <PhoneEnabledOutlinedIcon sx={{ color: "#6C7A84" }} />
          <Typography
            variant="h6"
            sx={{
              color: "#6C7A84",
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "22px",
            }}
          >
            (11) 9366-666
          </Typography>
        </Button>
      </Grid>
      <Box sx={{ px: 1.5, mt: 2 }}>
        <Button
          fullWidth
          sx={{
            background: "#34BE84",
            color: "#ffffff",
            fontWeight: "600",
            fontSize: "14px",
            lineHeight: "18px",
            textTransform: "none",

            "&:hover": {
              background: "#34BE84",
              color: "#ffffff",
            },
          }}
        >
          Approve Registration
        </Button>
      </Box>
      <Box sx={{ px: 1.5, mt: 2 }}>
        <Button
          fullWidth
          sx={{
            background: "#DBE1E5",
            color: "#002152",
            fontWeight: "600",
            fontSize: "14px",
            lineHeight: "18px",
            textTransform: "none",

            "&:hover": {
              background: "#DBE1E5",
              color: "#002152",
            },
          }}
        >
          See all data
        </Button>
      </Box>
      <Box sx={{ px: 1.5, mt: 2 }}>
        <Button
          fullWidth
          sx={{
            background: "#ffffff",
            color: "#F44336",
            fontWeight: "600",
            fontSize: "14px",
            lineHeight: "18px",
            textTransform: "none",
            mb: 2,
            "&:hover": {
              background: "#ffffff",
              color: "#F44336",
            },
          }}
        >
          fail
        </Button>
      </Box>
    </Box>
  );
}

export default TabpendantCard;
