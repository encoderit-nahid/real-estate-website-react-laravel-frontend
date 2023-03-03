import React, { useState } from "react";
import { Button, Grid, Typography, Box, TextField, Stack } from "@mui/material";
import negotiateImage from "../../../../public/Images/negotiate.png";
import Image from "next/image";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

function Negotiate({
  handleProposalOpen,
  negotiate,
  schedule,
  setNegotiate,
  setSchedule,
}) {
  const [date, setDate] = React.useState(dayjs("2022-04-07"));
  const [value, setValue] = React.useState(dayjs("2020-01-01 12:00"));
  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        border: "1px solid #F9F9FB",
        boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.08)",
        borderRadius: "8px",
        py: 2,
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ px: 4, py: 1 }}
      >
        <Typography
          variant="p"
          sx={{ fontSize: "14px", fontWeight: "400", color: "#1A1859" }}
        >
          Value
        </Typography>
        <Typography
          variant="p"
          sx={{ fontSize: "14px", fontWeight: "700", color: "#1A1859" }}
        >
          R$950.000,00
        </Typography>
      </Grid>
      <Box sx={{ borderBottom: "1px dashed #D3D3DF" }}></Box>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ px: 4, py: 1 }}
      >
        <Typography
          variant="p"
          sx={{ fontSize: "14px", fontWeight: "400", color: "#1A1859" }}
        >
          Condominium
        </Typography>
        <Typography
          variant="p"
          sx={{ fontSize: "14px", fontWeight: "700", color: "#1A1859" }}
        >
          R$1.315,00
        </Typography>
      </Grid>
      <Box sx={{ borderBottom: "1px dashed #D3D3DF" }}></Box>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ px: 4, py: 1 }}
      >
        <Typography
          variant="p"
          sx={{ fontSize: "14px", fontWeight: "400", color: "#1A1859" }}
        >
          IPTU
        </Typography>
        <Typography
          variant="p"
          sx={{ fontSize: "14px", fontWeight: "700", color: "#1A1859" }}
        >
          R$3.000,00
        </Typography>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 1, px: 4 }}
      >
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            px: 4,
            fontSize: "16px",
            fontWeight: "600",
            textTransform: "none",
            background: "#0E97F7",
            borderRadius: "4px",
            mb: 1,
            // mb: 2,
            "&:hover": {
              fontSize: "16px",
              fontWeight: "600",
              textTransform: "none",
              background: "#0E97F7",
              borderRadius: "4px",
              px: 4,
            },
          }}
          onClick={() => {
            setNegotiate(true);
            setSchedule(false);
          }}
        >
          Negotiate
        </Button>
        {negotiate && (
          <Box
            sx={{
              mt: 3,
              boxSizing: "border-box",
              backgroundColor: "#F9F9FB",
              border: "1px solid #D3D3DF",
              height: "30vh",
              width: "100%",
              borderRadius: "4px",
            }}
          >
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              sx={{ mt: 2 }}
            >
              <Image src={negotiateImage} alt="negotiate" />
              <Box
                sx={{
                  background: "#3E50D8",
                  borderRadius: "0 20px 20px 20px",
                  py: 1,
                  px: 2,
                  width: "70%",
                }}
              >
                <Typography
                  variant="p"
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    lineHeight: "18px",
                    color: "#ffffff",
                  }}
                >
                  There is no proposal or schedule yet
                </Typography>
              </Box>
            </Grid>
          </Box>
        )}
      </Grid>
      {negotiate && (
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{ px: 4, py: 1 }}
        >
          <Typography
            variant="p"
            sx={{
              fontSize: "12px",
              fontWeight: "400",
              lineHeight: "32px",
            }}
          >
            Proposal
          </Typography>
          <TextField
            fullWidth
            size="small"
            type="number"
            id="outlined-basic"
            placeholder="BRL"
            variant="outlined"
          />
          <Button
            fullWidth
            variant="outlined"
            sx={{ textTransform: "none", mt: 1 }}
          >
            Include Conditions
          </Button>
          <Button
            fullWidth
            sx={{
              background: "#00C1B4",
              boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.08)",
              borderRadius: "4px",
              color: "#ffffff",
              fontSize: "16px",
              lineHeight: "22px",
              fontWeight: "600",
              mt: 1,
              textTransform: "none",

              py: 1,
              "&:hover": {
                background: "#00C1B4",
                boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.08)",
                borderRadius: "4px",
                color: "#ffffff",
                fontSize: "16px",
                lineHeight: "22px",
                fontWeight: "600",
                mt: 1,
                textTransform: "none",

                py: 1,
              },
            }}
            onClick={handleProposalOpen}
          >
            Submit proposals
          </Button>
        </Grid>
      )}
      <Box sx={{ border: "1px dashed #D3D3DF", mt: 1 }}></Box>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ px: 4, py: 1 }}
      >
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{
            mt: 1,
            px: 4,
            fontSize: "16px",
            fontWeight: "600",
            textTransform: "none",
            background: "#7450F0",
            borderRadius: "4px",
            // mb: 2,
            "&:hover": {
              fontSize: "16px",
              fontWeight: "600",
              textTransform: "none",
              background: "#7450F0",
              borderRadius: "4px",
              px: 4,
            },
          }}
          onClick={() => {
            setNegotiate(false);
            setSchedule(true);
          }}
        >
          Schedule visit
        </Button>
      </Grid>
      {schedule && (
        <Box sx={{ mt: 1 }}>
          <Box
            sx={{
              border: "1px solid #D3D3DF",
              background: "#F9F9FB",
              borderRadius: "4px",
              mx: 2,
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid container sx={{ width: "100%" }}>
                <Grid item xs={12}>
                  <CalendarPicker
                    date={date}
                    onChange={(newDate) => setDate(newDate)}
                  />
                </Grid>
              </Grid>
            </LocalizationProvider>
          </Box>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack sx={{ mx: 2 }}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography
                      varinat="p"
                      sx={{
                        color: "#4B4B66",
                        fontSize: "12px",
                        fontWeight: "400",
                        lineHeight: "24px",
                      }}
                    >
                      Choose a time:
                    </Typography>
                  </Grid>
                </Grid>
                <TimePicker
                  renderInput={(params) => (
                    <TextField size="small" {...params} />
                  )}
                  value={value}
                  // label="min/max time"
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  minTime={dayjs("2018-01-01T08:00")}
                  maxTime={dayjs("2018-01-01T18:45")}
                />
              </Stack>
            </LocalizationProvider>
          </Box>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ px: 4, py: 1 }}
          >
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              sx={{
                mt: 1,

                fontSize: "16px",
                fontWeight: "600",
                textTransform: "none",
                background: "#00C1B4",
                borderRadius: "4px",
                "&: hover": {
                  background: "#00C1B4",
                  borderRadius: "4px",
                  fontSize: "16px",
                  fontWeight: "600",
                },
              }}
            >
              To schedule
            </Button>
          </Grid>
        </Box>
      )}
    </Box>
  );
}

export default Negotiate;
