import {
  Box,
  Button,
  Divider,
  Grid,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import React from "react";
import brokerImage from "../../../../public/Images/broker-image.png";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneEnabledOutlinedIcon from "@mui/icons-material/PhoneEnabledOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { useState } from "react";

function TabRegisteredCard() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 380 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 2, px: 2 }}
      >
        <Typography
          variant="p"
          sx={{
            color: "#1A1859",
            fontSize: "24px",
            lineHeight: "32px",
            fontWeight: "700",
          }}
        >
          Broker
        </Typography>
        <CloseIcon />
      </Grid>
      <Box
        sx={{
          background: "#ffffff",
          boxShadow: "0px 4px 8px rgba(0, 33, 82, 0.08)",
          border: "1px solid #DBE1E5",
          borderRadius: { xs: 0, sm: 0, md: 0, lg: "8px", xl: "8px" },
          mt: 2,
          mx: 2,
        }}
      ></Box>
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
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: "22px",
            pl: 0.5,
          }}
        >
          Name: Jenifer Mascarenhas
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#002152",
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: "22px",
            pl: 0.5,
            mt: 1,
          }}
        >
          Date of birth: 02/03/1989
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#002152",
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: "22px",
            pl: 0.5,
            mt: 1,
          }}
        >
          RG: 234.456.67-10
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#002152",
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: "22px",
            pl: 0.5,
            mt: 1,
          }}
        >
          CPF: 123.345.567-40
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#002152",
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: "22px",
            pl: 0.5,
            mt: 1,
          }}
        >
          CRECI: 394757349
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#002152",
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: "22px",
            pl: 0.5,
            mt: 1,
          }}
        >
          Email: je.nifere@gmail.com
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#002152",
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: "22px",
            pl: 0.5,
            mt: 1,
          }}
        >
          Phone: (11) 9999-6666
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#002152",
            fontWeight: "700",
            fontSize: "16px",
            lineHeight: "22px",
            pl: 0.5,
            mt: 3,
          }}
        >
          Address
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#002152",
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: "22px",
            pl: 0.5,
            mt: 1,
          }}
        >
          Jaceguai Street, Bela Vista, São Paulo - SP - CEP 01315010
        </Typography>
      </Grid>
      <Grid container spacing={1} sx={{ px: 1.5, mt: 2 }}>
        <Grid item xs={12} sm={12} md={12} lg={6}>
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
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6}>
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
        </Grid>
      </Grid>
    </Box>
  );

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
          onClick={toggleDrawer("right", true)}
          sx={{
            background: "#DBE1E5",
            color: "#002152",
            fontWeight: "600",
            fontSize: "14px",
            lineHeight: "18px",
            textTransform: "none",
            mb: 2,
            "&:hover": {
              background: "#DBE1E5",
              color: "#002152",
            },
          }}
        >
          See all data
        </Button>
        <SwipeableDrawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
          onOpen={toggleDrawer("right", true)}
        >
          {list("right")}
        </SwipeableDrawer>
      </Box>
    </Box>
  );
}

export default TabRegisteredCard;
