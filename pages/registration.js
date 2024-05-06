import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Head from "next/head";
import registerImage from "../public/Images/register.png";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import Image from "next/image";
import Link from "next/link";
import BaseTextField from "../src/component/reuseable/baseTextField/BaseTextField";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import NoEncryptionOutlinedIcon from "@mui/icons-material/NoEncryptionOutlined";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import BaseOutlinedPhoneInput from "../src/component/reuseable/baseOutlinedPhoneInput/BaseOutlinedPhoneInput";
import { emailVerifyApi, registrationApi, userDetailsApi } from "../src/api";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import GetCookie from "@/hooks/getCookie";
import en from "locales/en";
import pt from "locales/pt";
import { _baseURL } from "consts";
import SetCookie from "@/hooks/setCookie";

export default function Registration({ language, handleLoginOpen }) {
  const router = useRouter();
  const { query } = router;
  const [myValue, setMyValue] = useState(language || "pt");
  const t = myValue === "en" ? en : pt;
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t["Name is required"]),
    phone: Yup.string().required(t["Phone is required"]),
    email: Yup.string()
      .required(t["Email is required"])
      .matches(/.+@.+\.[A-Za-z]+$/, t["Email is invalid"]),
    password: Yup.string()
      .required(t["Password is required"])
      .min(6, t["Password must be at least 6 characters"])
      .max(40, t["Password must not exceed 40 characters"]),
  });

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

  const [successMessage, setSuccessMessage] = useState("");
  const [successSnackbarOpen, setSuccessSnackbarOpen] = React.useState(false);

  const handleClickSuccessSnackbar = () => {
    setSuccessSnackbarOpen(true);
  };

  const handleCloseSuccessSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessSnackbarOpen(false);
  };

  const UserRoleData = [
    {
      name: t["Buyer"],
      value: 4,
    },
    {
      name: t["Owner"],
      value: 3,
    },
    {
      name: t["Broker"],
      value: 2,
    },
  ];

  const handleSocialLogin = (provider) => {
    SetCookie(
      "role_id",
      query?.user_type === "broker" ? 2 : query?.user_type === "owner" ? 3 : 4
    );
    window.location.replace(`${_baseURL}/api/redirect/${provider}`);
  };

  // useEffect(() => {
  //   const getData = async () => {
  //     if (query?.token) {
  //       const [err, resp] = await emailVerifyApi(query?.token);
  //       if (!err) {
  //         router.push("/broker_registration");
  //         // localStorage.setItem("token", resp?.data?.token);
  //         // const [error, response] = await userDetailsApi();
  //         // if (!error) {
  //         //   return signIn("credentials", {
  //         //     userId: response.data.user.id,
  //         //     userEmail: response.data.user.email,
  //         //     name: response.data.user.name,
  //         //     phone: response.data.user.phone,
  //         //     status: response.data.user.status,
  //         //     role: response.data.user.roles[0].slug,
  //         //     roleId: response.data.user.roles[0].id,
  //         //     permissions: JSON.stringify(
  //         //       response.data.user.roles[0].permissions
  //         //     ),
  //         //     callbackUrl:
  //         //       response.data.user.roles[0].slug === "buyer"
  //         //         ? "/"
  //         //         : "/my_properties",
  //         //   });
  //         // }
  //       }
  //     } else {
  //       return;
  //     }
  //   };
  //   getData();
  // }, [query?.token, router]);

  const [activeBtn, setActiveBtn] = useState(4);
  const [disableBtn, setDisableBtn] = useState(true);

  const [showPass, setShowPass] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPass(!showPass);
  };
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [message, setMessage] = useState("");

  const handleClickSnackbar = () => {
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  const [loading, setLoading] = useState(false);
  const allValues = watch();

  useEffect(() => {
    if (
      allValues.email &&
      allValues.phone &&
      allValues.password &&
      allValues.name
    ) {
      setDisableBtn(false);
    }

    if (
      allValues.email === "" ||
      allValues.phone === "" ||
      allValues.password === "" ||
      allValues.name === ""
    ) {
      setDisableBtn(true);
    }
  }, [allValues]);

  useEffect(() => {
    if (activeBtn === 2) {
      localStorage.setItem(
        "broker_registration",
        JSON.stringify({ ...allValues, role_id: activeBtn })
      );
    }
  }, [activeBtn, allValues]);

  const onSubmit = async (data) => {
    setLoading(true);

    const allData = {
      ...data,
      role_id:
        query?.user_type === "broker"
          ? 2
          : query?.user_type === "owner"
          ? 3
          : 4,
      redirect_url: window.location.href,
    };

    const [errorToken, responseToken] = await registrationApi(allData);
    setLoading(false);
    if (!errorToken) {
      // console.log("pp", responseToken);
      // // setSuccessMessage(responseToken?.data?.message);
      // handleClickSuccessSnackbar();
      localStorage.setItem("registration_id", responseToken?.data?.user?.id);
      localStorage.setItem("user_role", responseToken?.data?.userRole);
      localStorage.setItem("Reg_user_name", data?.name);
      router.replace({
        pathname: "/other_information",
      });
    } else {
      const errors = errorToken?.response?.data?.errors ?? {};
      Object.entries(errors).forEach(([name, messages]) => {
        setError(name, { type: "manual", message: messages[0] });
      });

      // handleClickSnackbar();
      setLoading(false);
      setMessage(errorToken?.response?.data?.message);
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
                <Link href="/">
                  <a
                    style={{
                      textDecoration: "none",
                      listStyle: "none",
                      width: "100%",
                    }}
                  >
                    <Button sx={{ textTransform: "none" }}>
                      <ArrowBackIosNewOutlinedIcon sx={{ color: "#7450F0" }} />
                      <Typography
                        variant="p"
                        sx={{
                          color: "#7450F0",
                          fontSize: "14px",
                          fontWeight: "600",
                          lineHeight: "17px",
                        }}
                      >
                        {t["Cancel registration"]}
                      </Typography>
                    </Button>
                  </a>
                </Link>
                <Container maxWidth="xs">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                      sx={{ mt: 8, mb: 1 }}
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
                        {t["Name"]}
                        <span style={{ color: "#E63333" }}>*</span>
                      </Typography>
                    </Grid>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <BaseTextField
                          size={"small"}
                          placeholder={t["Name"]}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                          name={"name"}
                          // error={errors.email ? true : false}
                        />
                      )}
                    />
                    <Typography
                      variant="inherit"
                      color="textSecondary"
                      sx={{ color: "#b91c1c" }}
                    >
                      {errors.name?.message}
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
                        {t["Email"]}
                        <span style={{ color: "#E63333" }}>*</span>
                      </Typography>
                    </Grid>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <BaseTextField
                          size={"small"}
                          placeholder={t["Email"]}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                          name={"email"}
                          // error={errors.email ? true : false}
                        />
                      )}
                    />
                    <Typography
                      variant="inherit"
                      color="textSecondary"
                      sx={{ color: "#b91c1c" }}
                    >
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
                        {t["Phone"]}
                        <span style={{ color: "#E63333" }}>*</span>
                      </Typography>
                    </Grid>
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <BaseOutlinedPhoneInput
                          size={"small"}
                          placeholder={t["Phone"]}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                          name={"phone"}
                          value={field.value}
                          error={errors.phone ? true : false}
                        />
                      )}
                    />
                    <Typography
                      variant="inherit"
                      color="textSecondary"
                      sx={{ color: "#b91c1c" }}
                    >
                      {errors.phone?.message}
                    </Typography>

                    {/* <BaseTextField
                    fullWidth
                    size={"small"}
                    placeholder={"Phone"}
                    type={"number"}
                  /> */}
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
                          // value={field.value}
                          // error={errors.password ? true : false}
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

                    {/* <Grid
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
                        {t["Profile"]}
                      </Typography>
                    </Grid> */}
                    <Grid container spacing={1}>
                      {/* {UserRoleData?.map((data, index) => (
                        <Grid item xs={4} key={index}>
                          <Button
                            onClick={() => setActiveBtn(data.value)}
                            sx={{
                              width: "100%",
                              background: `${
                                activeBtn === data.value ? "#0362F0" : "#F2F5F6"
                              }`,
                              borderRadius: "152px",
                              color: `${
                                activeBtn === data.value ? "#ffffff" : "#002152"
                              }`,
                              fontSize: {
                                xs: "12px",
                                sm: "13px",
                                md: "16px",
                                lg: "13px",
                                xl: "16px",
                              },
                              fontWeight: "400",
                              lineHeight: "22px",
                              textTransform: "none",
                              px: {
                                xs: 0,
                                sm: 2,
                                md: 2,
                                lg: 2,
                                xl: 2,
                              },
                              py: 1,
                              "&:hover": {
                                width: "100%",
                                background: "#0362F0",
                                borderRadius: "152px",
                                color: "#ffffff",
                                fontSize: {
                                  xs: "12px",
                                  sm: "13px",
                                  md: "16px",
                                  lg: "13px",
                                  xl: "16px",
                                },
                                fontWeight: "400",
                                lineHeight: "22px",
                                textTransform: "none",
                                px: {
                                  xs: 0,
                                  sm: 2,
                                  md: 2,
                                  lg: 2,
                                  xl: 2,
                                },
                                py: 1,
                              },
                            }}
                          >
                            {data.name}
                          </Button>
                        </Grid>
                      ))} */}
                    </Grid>

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
                        mt: 5,
                        textTransform: "none",
                        py: 1,
                      }}
                    >
                      {loading && (
                        <CircularProgress size={22} color="inherit" />
                      )}
                      {!loading && t["Register"]}
                    </Button>
                  </form>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ height: "8vh" }}
                  >
                    ou
                  </Grid>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                      <Button
                        sx={{
                          display: "flex",
                          background: "#DC4C3F",
                          borderRadius: "4px",
                          textTransform: "none",
                          px: 2,
                          py: 1,
                          width: "100%",
                          "&:hover": {
                            background: "#DC4C3F",
                            borderRadius: "4px",
                            textTransform: "none",
                            px: 2,
                            py: 1,
                            width: "100%",
                          },
                        }}
                        onClick={() => handleSocialLogin("google")}
                      >
                        <GoogleIcon sx={{ color: "#ffffff" }} />
                        <Typography
                          sx={{
                            color: "#ffffff",
                            fontSize: {
                              xs: "12px",
                              sm: "12px",
                              md: "12px",
                              lg: "12px",
                              xl: "12px",
                              xxl: "14px",
                            },
                            lineHeight: "17px",
                            fontWeight: "400",
                          }}
                        >
                          Login with Gmail
                        </Typography>
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                      <Button
                        sx={{
                          display: "flex",
                          background: "#4469B0",
                          borderRadius: "4px",
                          textTransform: "none",
                          px: 2,
                          py: 1,
                          width: "100%",
                          "&:hover": {
                            background: "#4469B0",
                            borderRadius: "4px",
                            textTransform: "none",
                            px: 2,
                            py: 1,
                            width: "100%",
                          },
                        }}
                        onClick={() => handleSocialLogin("facebook")}
                      >
                        <FacebookOutlinedIcon sx={{ color: "#ffffff" }} />
                        <Typography
                          sx={{
                            color: "#ffffff",
                            fontSize: {
                              xs: "12px",
                              sm: "12px",
                              md: "12px",
                              lg: "12px",
                              xl: "12px",
                              xxl: "14px",
                            },
                            lineHeight: "17px",
                            fontWeight: "400",
                          }}
                        >
                          Login with Facebook
                        </Typography>
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        sx={{
                          background:
                            "linear-gradient(270deg, #0ea5e9 1.2%, #083344 98.7%)",
                          boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.08)",
                          borderRadius: "4px",
                          color: "#ffffff",
                          fontSize: "16px",
                          lineHeight: "22px",
                          fontWeight: "600",
                          mt: 5,
                          textTransform: "none",
                          py: 1,
                        }}
                        onClick={() => {
                          router.replace({ pathname: "/" });
                          handleLoginOpen();
                        }}
                      >
                        Do you have an account?
                      </Button>
                    </Grid>
                  </Grid>
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
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          key={"top"}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            sx={{ width: "100%" }}
          >
            {message && message}
          </Alert>
        </Snackbar>

        <Snackbar
          open={successSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSuccessSnackbar}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          key={"bottom"}
        >
          <Alert
            onClose={handleCloseSuccessSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            {successMessage && successMessage}
          </Alert>
        </Snackbar>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const cookies = context.req.cookies["language"] || "pt";
  return {
    props: {
      language: cookies,
    },
  };
}
