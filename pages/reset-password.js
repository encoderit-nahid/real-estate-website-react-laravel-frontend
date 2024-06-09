import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  InputAdornment,
  Typography,
} from "@mui/material";
import Head from "next/head";
import registerImage from "../public/Images/register.png";
import Image from "next/image";
import BaseTextField from "../src/component/reuseable/baseTextField/BaseTextField";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import NoEncryptionOutlinedIcon from "@mui/icons-material/NoEncryptionOutlined";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import en from "locales/en";
import pt from "locales/pt";
import { resetPasswordApi, userDetailsApi, verifyToken } from "../src/api";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),

  password_confirmation: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
});

export default function ResetPassword({ languageName }) {
  const t = languageName === "en" ? en : pt;

  const router = useRouter();
  const {
    register,
    watch,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { query } = router;

  const [loading, setLoading] = useState("");

  const [showPass, setShowPass] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPass(!showPass);
  };
  const [showConfirmPass, setShowConfirmPass] = React.useState(false);
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPass(!showConfirmPass);
  };

  const onSubmit = async (data) => {
    setLoading(true);

    const [errorVerifyToken, responseVerifyToken] = await verifyToken({
      token: query?.token,
    });
    if (!errorVerifyToken) {
      const [errorReset, responseReset] = await resetPasswordApi({
        ...data,
        token: query?.token,
        email: responseVerifyToken?.data?.token?.email,
      });
      if (!errorReset) {
        localStorage.setItem("token", responseReset?.data?.token);
        const [error, response] = await userDetailsApi();

        setLoading(false);
        if (!error) {
          return signIn("credentials", {
            userId: response.data.user.id,
            userEmail: response.data.user.email,
            name: response.data.user.name,
            phone: response.data.user.phone,
            status: response.data.user.status,
            role: response.data.user.roles[0].slug,
            roleId: response.data.user.roles[0].id,
            permissions: JSON.stringify(
              response.data.user.roles[0].permissions
            ),
            callbackUrl: "/my-properties",
          });
        }
      } else {
        const errors = errorToken?.response?.data?.errors ?? {};
        Object.entries(errors).forEach(([name, messages]) => {
          setError(name, { type: "manual", message: messages[0] });
        });
      }
    } else {
      console.log(response?.data?.errors?.token);
    }
  };

  return (
    <div>
      <Head>
        <title>Lokkan - A imobiliária digital</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/negotiate.png" />
      </Head>

      <main className="section">
        <Box sx={{ px: 5 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
              <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                sx={{ py: 4 }}
              >
                <Container maxWidth="xs">
                  <form onSubmit={handleSubmit(onSubmit)}>
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
                        {t["Password"]}
                        <span style={{ color: "#E63333" }}>*</span>
                      </Typography>
                    </Grid>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <BaseTextField
                          size={"small"}
                          placeholder={t["Password"]}
                          type={showPass ? "text" : "password"}
                          name={"password"}
                          // {...field}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
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
                    <Typography
                      variant="inherit"
                      color="textSecondary"
                      sx={{ color: "#b91c1c" }}
                    >
                      {errors.password?.message}
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
                        {t["Confirm Password"]}
                        <span style={{ color: "#E63333" }}>*</span>
                      </Typography>
                    </Grid>
                    <Controller
                      name="password_confirmation"
                      control={control}
                      render={({ field }) => (
                        <BaseTextField
                          size={"small"}
                          placeholder={t["Confirm Password"]}
                          type={showConfirmPass ? "text" : "password"}
                          name={"password_confirmation"}
                          // {...field}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment
                                sx={{ cursor: "pointer" }}
                                position="end"
                                onClick={handleClickShowConfirmPassword}
                              >
                                {showConfirmPass ? (
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
                    <Typography
                      variant="inherit"
                      color="textSecondary"
                      sx={{ color: "#b91c1c" }}
                    >
                      {errors.confirm_password?.message}
                    </Typography>
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
                        mt: 3,
                        textTransform: "none",
                        py: 1,
                      }}
                    >
                      {loading && (
                        <CircularProgress size={22} color="inherit" />
                      )}
                      {!loading && t["reset"]}
                    </Button>
                  </form>
                </Container>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
              <Box>
                <Image src={registerImage} alt="register" />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </main>
    </div>
  );
}
