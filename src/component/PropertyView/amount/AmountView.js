import { Box, Button, Grid, Typography } from "@mui/material";
import en from "locales/en";
import pt from "locales/pt";
import { useSession } from "next-auth/react";
import React from "react";

function AmountView({
  setNegotiate,
  setSchedule,
  singlePropertyData,
  languageName,
}) {
  const t = languageName === "en" ? en : pt;
  const { data: session } = useSession();
  return (
    <Grid
      container
      spacing={2}
      sx={{
        background: "#ffffff",
        boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.08)",
        borderRadius: "8px",
        ml: 0,
        px: 4,

        pb: 6,
      }}
    >
      <Grid item xs={12} sm={12} md={12} xl={3} lg={3}>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Typography
            variant="p"
            sx={{
              fontSize: "16px",
              fontWeight: "400",
              color: "#1A1859",
            }}
          >
            {t["sale value"]}
          </Typography>
          <Typography
            variant="p"
            sx={{
              fontSize: "24px",
              fontWeight: "800",
              color: "#1A1859",
            }}
          >
            {`R$ ${singlePropertyData?.property?.brl_rent}`}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={6} sm={6} md={6} xl={3} lg={3}>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Typography
            variant="p"
            sx={{
              fontSize: "16px",
              fontWeight: "400",
              color: "#1A1859",
            }}
          >
            {t["Condominium"]}
          </Typography>
          <Typography
            variant="p"
            sx={{
              fontSize: "24px",
              fontWeight: "800",
              color: "#1A1859",
            }}
          >
            {`R$ ${singlePropertyData?.property?.condominium}`}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={6} sm={6} md={6} xl={3} lg={3}>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Typography
            variant="p"
            sx={{
              fontSize: "16px",
              fontWeight: "400",
              color: "#1A1859",
            }}
          >
            IPTU
          </Typography>
          <Typography
            variant="p"
            sx={{
              fontSize: "24px",
              fontWeight: "800",
              color: "#1A1859",
            }}
          >
            {`R$ ${singlePropertyData?.property?.brl_iptu}`}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={6} sm={6} md={6} xl={3} lg={3}>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Button
            disabled={
              session?.user?.role === "broker" ||
              session?.user?.role === "owner"
            }
            variant="contained"
            color="primary"
            sx={{
              px: 4,
              fontSize: "16px",
              fontWeight: "600",
              textTransform: "none",
              minWidth: "195px",
              background: "#0E97F7",
              borderRadius: "4px",
              "&: hover": {
                px: 4,
                fontSize: "16px",
                fontWeight: "600",
                textTransform: "none",
                minWidth: "195px",
                background: "#0E97F7",
                borderRadius: "4px",
              },
            }}
            onClick={() => {
              setNegotiate(true);
              setSchedule(false);
            }}
          >
            {t["Negotiate"]}
          </Button>

          <Button
            disabled={
              session?.user?.role === "broker" ||
              session?.user?.role === "owner"
            }
            variant="contained"
            color="secondary"
            sx={{
              mt: 1,
              px: 4,
              fontSize: "16px",
              fontWeight: "600",
              textTransform: "none",
              minWidth: "195px",
              background: "#7450F0",
              borderRadius: "4px",
              "&: hover": {
                px: 4,
                fontSize: "16px",
                fontWeight: "600",
                textTransform: "none",
                minWidth: "195px",
                background: "#7450F0",
                borderRadius: "4px",
              },
            }}
            onClick={() => {
              setSchedule(true);
              setNegotiate(false);
            }}
          >
            {t["Schedule visit"]}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AmountView;
