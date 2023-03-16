import {
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  Typography,
} from "@mui/material";
import loginImage from "../../../../public/Images/login.png";
import React from "react";
import Image from "next/image";
import BaseButton from "../../reuseable/button/BaseButton";
import Link from "next/link";
import { useState } from "react";
import BaseTextField from "../../reuseable/baseTextField/BaseTextField";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import NoEncryptionOutlinedIcon from "@mui/icons-material/NoEncryptionOutlined";

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

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .matches(/.+@.+\.[A-Za-z]+$/, "Email is invalid"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
});

function LoginModal({ handleLoginClose }) {
  const [validEmail, setValidEmail] = useState(false);

  const [showPass, setShowPass] = useState(false);
  const handleClickShowPassword = () => {
    setShowPass(!showPass);
  };

  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2));
  };

  const allValues = watch();
  console.log({ allValues });

  return (
    <Box sx={style}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              Email
            </Typography>
          </Grid>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <BaseTextField
                size={"small"}
                placeholder={"Email"}
                onChange={(e) => {
                  if (/.+@.+\.[A-Za-z]+$/.test(e.target.value)) {
                    setValidEmail(false);
                  } else {
                    setValidEmail(true);
                  }
                  field.onChange(e.target.value);
                }}
                name={"email"}
                // value={field.value}
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
                error={errors.email ? true : false}
              />
            )}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.email?.message}
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
              Password
            </Typography>
          </Grid>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <BaseTextField
                size={"small"}
                placeholder={"Password"}
                type={showPass ? "text" : "password"}
                name={"password"}
                // {...field}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                // value={field.value}
                error={errors.password ? true : false}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      sx={{ cursor: "pointer" }}
                      position="end"
                      onClick={handleClickShowPassword}
                    >
                      {showPass ? (
                        <NoEncryptionOutlinedIcon />
                      ) : (
                        <LockOutlinedIcon />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.password?.message}
          </Typography>

          {/* <Link href="/my_properties">
            <a
              style={{
                textDecoration: "none",
                listStyle: "none",
                width: "100%",
              }}
            > */}
          <Button
            type="submit"
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
          {/* </a>
          </Link> */}

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
      </form>
    </Box>
  );
}

export default LoginModal;
