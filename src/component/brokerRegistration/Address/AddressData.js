import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import BaseOutlinedZipInput from "../../reuseable/baseOutlinedZipInput/BaseOutlinedZipInput";
import BaseTextField from "../../reuseable/baseTextField/BaseTextField";

function AddressData({ handleBack, handleNext }) {
  const [value, setValue] = useState("");
  const [valid, setValid] = useState(false);
  console.log({ valid });
  const handleValidation = (e) => {
    setValid(/^[0-9]{5}-[0-9]{3}$/.test(e.target.value));
    console.log(e.target.value);
    setValue(e.target.value);
  };
  return (
    <Box sx={{ mt: 4 }}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Typography
          variant="p"
          sx={{
            color: "#1A1859",
            fontSize: "24px",
            fontWeight: "700",
            lineHeight: "29px",
          }}
        >
          Address
        </Typography>
      </Grid>

      <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ mb: 1 }}
          >
            <Typography
              variant="p"
              sx={{
                color: "#253858",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "16px",
              }}
            >
              Zip Code
            </Typography>
          </Grid>
          {/* <TextField
            fullWidth
            size="small"
            id="outlined-basic"
            type="number"
            value={value}
            onChange={(e) => handleValidation(e)}
            error={!valid && value.length > 0 ? true : false}
            required={true}
            // placeholder="Social Name"
            variant="outlined"
            sx={{ mb: 1 }}
          /> */}
          <FormControl variant="outlined" sx={{ width: "100%", mb: 1 }}>
            <BaseOutlinedZipInput placeholder={"Zip Code"} size={"small"} />
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={12} md={8}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ mb: 1 }}
          >
            <Typography
              variant="p"
              sx={{
                color: "#253858",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "16px",
              }}
            >
              Address<span style={{ color: "#E63333" }}>*</span>
            </Typography>
          </Grid>
          <BaseTextField size={"small"} sx={{ mb: 1 }} />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ mb: 1 }}
          >
            <Typography
              variant="p"
              sx={{
                color: "#253858",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "16px",
              }}
            >
              Number<span style={{ color: "#E63333" }}>*</span>
            </Typography>
          </Grid>
          <BaseTextField size={"small"} type={"number"} sx={{ mb: 1 }} />
        </Grid>
      </Grid>

      <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ mb: 1 }}
          >
            <Typography
              variant="p"
              sx={{
                color: "#253858",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "16px",
              }}
            >
              Neighborhood<span style={{ color: "#E63333" }}>*</span>
            </Typography>
          </Grid>
          <BaseTextField size={"small"} variant="outlined" sx={{ mb: 1 }} />
        </Grid>
      </Grid>

      <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ mb: 1 }}
          >
            <Typography
              variant="p"
              sx={{
                color: "#253858",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "16px",
              }}
            >
              Add-on
              <span
                style={{
                  color: "#7C7C99",
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                (optional)
              </span>
            </Typography>
          </Grid>
          <BaseTextField size={"small"} sx={{ mb: 1 }} />
        </Grid>
      </Grid>

      <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={12} md={6}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ mb: 1 }}
          >
            <Typography
              variant="p"
              sx={{
                color: "#253858",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "16px",
              }}
            >
              State<span style={{ color: "#E63333" }}>*</span>
            </Typography>
          </Grid>
          <BaseTextField size={"small"} sx={{ mb: 1 }} />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ mb: 1 }}
          >
            <Typography
              variant="p"
              sx={{
                color: "#253858",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "16px",
              }}
            >
              City<span style={{ color: "#E63333" }}>*</span>
            </Typography>
          </Grid>
          <BaseTextField size={"small"} sx={{ mb: 1 }} />
        </Grid>
      </Grid>

      {/* <Grid container spacing={1} sx={{ mt: 2, mb: 5 }}>
        <Grid item xs={6} sm={6} md={6}>
          <Button
            color="inherit"
            // disabled={activeStep === 0}
            onClick={handleBack}
            sx={{
              //   mr: 1,
              //   border: "1px solid #002152",
              //   borderRadius: "4px",
              background: "#ffffff",
              px: 2,
              py: 1,
              color: "#4B4B66",
              fontSize: "16px",
              fontWeight: "600",
              lineHeight: "22px",
              textTransform: "none",
            }}
          >
            Come back
          </Button>
        </Grid>
        <Grid item xs={6} sm={6} md={6}>
          <Button
            onClick={handleNext}
            fullWidth
            sx={{
              background: "#00C1B4",
              boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.08)",
              borderRadius: "4px",
              color: "#ffffff",
              fontSize: "16px",
              lineHeight: "22px",
              fontWeight: "600",
              //   mt: 3,
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
                // mt: 3,
                textTransform: "none",
                py: 1,
              },
            }}
          >
            Continue
          </Button>
        </Grid>
      </Grid> */}
    </Box>
  );
}

export default AddressData;
