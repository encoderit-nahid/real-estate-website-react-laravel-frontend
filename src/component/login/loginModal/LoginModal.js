import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import loginImage from "../../../../public/Images/login.png";
import React from "react";
import Image from "next/image";
import BaseButton from "../../reuseable/button/BaseButton";
import Link from "next/link";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  // top:{xs:"80%"},
  transform: "translate(-50%, -50%)",
  width: { xs: "80%", sm: "80%", md: "60%", lg: "25%", xl: "25%" },
  bgcolor: "#ffffff",
  // border: "2px solid #000",
  boxShadow: "none",
  borderRadius: "12px",
  maxHeight: "85vh",
  overflowY: "scroll",
  px: 0,
  py: 6,
};

function LoginModal({ handleLoginClose }) {
  const [validEmail, setValidEmail] = useState(false);

  const handleEmail = (e) => {
    if (/.+@.+\.[A-Za-z]+$/.test(e.target.value)) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }
  };

  return (
    <Box sx={style}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ px: 3 }}
      >
        <Typography
          variant="p"
          sx={{
            fontSize: "18px",
            fontWeight: "700",
            lineHeight: "22px",
            color: "#1A1859",
          }}
        >
          Already have registration?
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{ mt: 3, mb: 1 }}
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
            Name
          </Typography>
        </Grid>
        <TextField
          fullWidth
          size="small"
          id="outlined-basic"
          placeholder="Name"
          variant="outlined"
        />
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{ mt: 3, mb: 1 }}
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
            Email
          </Typography>
        </Grid>
        <TextField
          fullWidth
          size="small"
          id="outlined-basic"
          placeholder="Email"
          variant="outlined"
          onChange={(e) => handleEmail(e)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: `${validEmail ? "#dc2626" : ""}`,
              },
            },
            // "& label.Mui-focused": {
            //   color: borderColor,
            // },
          }}
        />

        <Link href="/my_properties">
          <a
            style={{
              textDecoration: "none",
              listStyle: "none",
              width: "100%",
            }}
          >
            <Button
              fullWidth
              sx={{
                background:
                  "linear-gradient(270deg, #1DEECB 1.2%, #00C1B4 98.7%)",
                boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.08)",
                borderRadius: "4px",
                color: "#ffffff",
                fontSize: "16px",
                lineHeight: "22px",
                fontWeight: "600",
                mt: 2,
                textTransform: "none",
              }}
            >
              To enter
            </Button>
          </a>
        </Link>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-start"
          sx={{ mt: 1 }}
        >
          <Typography
            variant="p"
            sx={{
              color: "#0E97F7",
              fontSize: "12px",
              fontWeight: "600",
              lineHeight: "16px",
            }}
          >
            I forgot the password
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ borderTop: "2px dashed #D3D3DF", mt: 3 }} />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ px: 3, mt: 4 }}
      >
        <Box>
          <Image src={loginImage} alt="register" />
        </Box>
        <Typography
          variant="p"
          sx={{
            color: "#1A1859",
            fontSize: "18px",
            fontWeight: "800",
            lineHeight: "28px",
            pb: 1,
          }}
        >
          Register now!
        </Typography>
        <Link href="/registration">
          <a
            style={{
              textDecoration: "none",
              listStyle: "none",
              width: "100%",
            }}
          >
            <BaseButton
              width={"100%"}
              name="Register"
              handleFunction={handleLoginClose}
            />
          </a>
        </Link>
      </Grid>
    </Box>
  );
}

export default LoginModal;
