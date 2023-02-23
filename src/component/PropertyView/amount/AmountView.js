import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";

function AmountView() {
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
        pt: 4,
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
            sale value
          </Typography>
          <Typography
            variant="p"
            sx={{
              fontSize: "24px",
              fontWeight: "800",
              color: "#1A1859",
            }}
          >
            R$ 950,000.00
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
            Condominium
          </Typography>
          <Typography
            variant="p"
            sx={{
              fontSize: "24px",
              fontWeight: "800",
              color: "#1A1859",
            }}
          >
            R$ 1,315.00
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
            R$ 3,000.00
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
            variant="contained"
            color="primary"
            sx={{
              px: 4,
              fontSize: "16px",
              fontWeight: "600",
              textTransform: "none",
              minWidth: "195px",
            }}
          >
            Negotiate
          </Button>
       
          <Button
            variant="contained"
            color="secondary"
            sx={{
              mt: 1,
              px: 4,
              fontSize: "16px",
              fontWeight: "600",
              textTransform: "none",
              minWidth: "195px",
            }}
          >
            Schedule visit
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AmountView;
