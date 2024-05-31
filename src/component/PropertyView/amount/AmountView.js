import BaseWhatsappButton from "@/component/reuseable/baseWhatsappButton/BaseWhatsappButton";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
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
    <Stack
      spacing={3}
      sx={{
        background: "#ffffff",
        boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.08)",
        borderRadius: "8px",
        ml: 0,
        px: 4,
        width: "100%",
        py: 6,
      }}
      direction={{
        xs: "column",
        md: "row",
      }}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      {singlePropertyData?.property?.brl_rent && (
        <Stack
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
        </Stack>
      )}

      {singlePropertyData?.property?.condominium && (
        <Stack
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
        </Stack>
      )}

      {singlePropertyData?.property?.brl_iptu && (
        <Stack
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
        </Stack>
      )}

      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{
          display: {
            xs: "none",
            sm: "flex",
          },
        }}
        spacing={1}
      >
        <BaseWhatsappButton />
        <Button
          disabled={
            session?.user?.role === "broker" || session?.user?.role === "owner"
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
            session?.user?.role === "broker" || session?.user?.role === "owner"
          }
          variant="contained"
          color="secondary"
          sx={{
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
      </Stack>
    </Stack>
  );
}

export default AmountView;
