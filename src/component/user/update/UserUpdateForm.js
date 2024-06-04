import BaseAutocomplete from "@/component/reuseable/baseAutocomplete/BaseAutocomplete";
import BaseOutlinedZipInput from "@/component/reuseable/baseOutlinedZipInput/BaseOutlinedZipInput";
import BaseTextField from "@/component/reuseable/baseTextField/BaseTextField";
import { toast } from 'react-hot-toast';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputAdornment,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import NoEncryptionOutlinedIcon from "@mui/icons-material/NoEncryptionOutlined";
import Image from "next/image";
import en from "locales/en";
import pt from "locales/pt";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useCurrentUser from "@/hooks/useCurrentUser";
import { _baseURL, _imageURL } from "consts";
import { useUserUpdateMutation } from "@/queries/useUserQuery";
import { omitEmpties, userDetailsApi } from "@/api";
import { serialize } from "object-to-formdata";
import { useRouter } from "next/router";
const UserUpdateForm = ({ language }) => {
  const [myValue, setMyValue] = useState(language || "pt");
  const currentUser = useCurrentUser();
  const router = useRouter();
  const myLoader = ({ src }) => {
    return `${src}`;
  };
  const allStateData = useSelector((state) => state.state.stateData);

  useEffect(() => {
    setValue("user_id", currentUser?.id);
    setValue("image", `${_imageURL}/${currentUser?.attachments[0]?.file_path}`);
    setValue("name", currentUser?.name);
    setValue("email", currentUser?.email);
    setValue("phone", currentUser?.phone);
    setValue("zip_code", currentUser?.address?.zip_code);
    setValue("address", currentUser?.address?.address);
    setValue("number", currentUser?.address?.number);
    setValue("neighbourhood", currentUser?.address?.neighbourhood);
    // setValue("complement", currentUser?.address?.complement);
    setValue("city", currentUser?.address?.city);
    setValue("state_id", currentUser?.address?.state);
  }, [setValue, currentUser]);
  const mutation = useUserUpdateMutation();
  const [loading, setLoading] = useState(false);
  const onSubmit = (data) => {
    console.log({ data });
    setLoading(true);
    const { email, phone, user_id, image, name,password,repeat_password, ...rest } = data;
    const body = serialize(
      {
        email: email,
        phone: phone,
        user_id: user_id,
        image: image instanceof File ? data?.image : null,
        name: name,
        password: password,
        password_confirmation: repeat_password,
        address: omitEmpties({ ...rest, state_id: data.state_id.id }),
      },
      {
        indices: true,
        allowEmptyArrays: false,
        booleansAsIntegers: true,
        nullsAsUndefineds: true,
      }
    );
    mutation.mutate(body, {
      onError(error) {
        setLoading(false);
        toast.error("opa! algo deu errado")
      },
      onSuccess: async (data) => {
        await userDetailsApi();
        setLoading(false);
        toast.success("User profile updated successfully")
      },
    });
  };

  const t = myValue === "en" ? en : pt;
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t["Name is required"]),
    phone: Yup.string().required(t["Phone is required"]),
    password: Yup.string()
    .min(6, 'Password is too short - should be 6 chars minimum.')
    .required('Password is required'),
    repeat_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
    zip_code: Yup.string().required(t["Zip code number is required"]),
    address: Yup.string().required(t["Address is required"]),
    number: Yup.string().required(t["Number is required"]),
    neighbourhood: Yup.string().required(t["Neighbourhood is required"]),
    state_id: Yup.mixed()
    .test('is-object', 'State is required', value => value !== null && typeof value === 'object')
    .required(t['State is required']),
    city: Yup.string().required(t["City is required"]),
    email: Yup.string()
      .required(t["Email is required"])
      .matches(/.+@.+\.[A-Za-z]+$/, t["Email is invalid"]),
  });
  const {
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const allValues = watch();

  const [showPass, setShowPass] = useState(false);
  const [showRepeatPass, setShowRepeatPass] = useState(false);

  const handleClickShowPassword = () => {
    setShowPass(!showPass);
  };

  const handleClickShowRepeatPassword = () => {
    setShowRepeatPass(!showRepeatPass);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        spacing={2}
        sx={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "32px 24px",
          mt: 1,
        }}
      >
        <Grid item xs={12} lg={2}>
          <Box
            component="div"
            sx={{
              borderRadius: "6px",
              padding: "40px 0",
              backgroundColor: "#ECF0F3",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box>
              <Image
                loader={myLoader}
                src={
                  allValues.image instanceof File
                    ? URL.createObjectURL(allValues?.image)
                    : allValues.image
                }
                alt="account"
                width={70}
                height={70}
                objectFit="cover"
              />
            </Box>
            <Button
              variant="contained"
              component="label"
              sx={{
                mt: 3,
                background: "#0362F0",
                borderRadius: "4px",
                fontSize: "14px",
                fontWeight: "600",
                color: "#ffffff",
                lineHeight: "18px",
                textTransform: "none",
                "&: hover": {
                  background: "#0362F0",
                  borderRadius: "4px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#ffffff",
                },
              }}
            >
              {t["Edit"]}
              <Controller
                name="image"
                control={control}
                render={({ field }) => {
                  return (
                    <input
                      name="image"
                      hidden
                      accept="image/*"
                      type="file"
                      // value={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.files[0]);
                      }}
                    />
                  );
                }}
              />
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} lg={10}>
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <BaseTextField
                  size={"medium"}
                  placeholder={t["Name"]}
                  label={t["Name"]}
                  // sx={{ mb: 2 }}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  name={"name"}
                  value={field.value}
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
          </Grid>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <Controller
                name="email"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <BaseTextField
                    size={"medium"}
                    placeholder={t["Email"]}
                    label={t["Email"]}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    name={"email"}
                    value={field.value}
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
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="phone"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <BaseTextField
                    size={"medium"}
                    placeholder={t["Telephone"]}
                    label={t["Telephone"]}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    name={"phone"}
                    value={field.value}
                    // error={errors.telephone ? true : false}
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
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <BaseTextField
                    size={"medium"}
                    placeholder={t["Password"]}
                    label={t["Password"]}
                    type={showPass ? "text" : "password"}
                    name={"password"}
                    autoComplete={'new-password'}
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
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="repeat_password"
                control={control}
                render={({ field }) => (
                  <BaseTextField
                    size={"medium"}
                    placeholder={t["repeat password"]}
                    label={t["repeat password"]}
                    type={showRepeatPass ? "text" : "password"}
                    name={"password"}
                    // {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    // value={field.value}
                    error={errors.repeat_password ? true : false}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          sx={{ cursor: "pointer" }}
                          position="end"
                          onClick={handleClickShowRepeatPassword}
                        >
                          {showRepeatPass  ? (
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
                {errors.repeat_password?.message}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <FormControl variant="outlined" sx={{ width: "100%" }}>
                <Controller
                  name="zip_code"
                  control={control}
                  defaultValue={""}
                  render={({ field }) => (
                    <BaseOutlinedZipInput
                      placeholder={`${t["Zip code"]}*`}
                      // label={`${t["Zip code"]}*`} //! white color
                      size={"medium"}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                      name={"zip_code"}
                      value={field.value}
                      // error={errors.cpf_number ? true : false}
                    />
                  )}
                />
                <Typography
                  variant="inherit"
                  color="textSecondary"
                  sx={{ color: "#b91c1c" }}
                >
                  {errors.zip_code?.message}
                </Typography>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="address"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <BaseTextField
                    size={"medium"}
                    placeholder={`${t["Address"]}*`}
                    label={`${t["Address"]}*`}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    name={"address"}
                    value={field.value}
                  />
                )}
              />
              <Typography
                variant="inherit"
                color="textSecondary"
                sx={{ color: "#b91c1c" }}
              >
                {errors.address?.message}
              </Typography>
            </Grid>
           
          </Grid>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <Controller
                name="neighbourhood"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <BaseTextField
                    size={"medium"}
                    placeholder={`${t["Neighborhood"]}*`}
                    label={`${t["Neighborhood"]}*`}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    name={"neighbourhood"}
                    value={field.value}
                  />
                )}
              />
              <Typography
                variant="inherit"
                color="textSecondary"
                sx={{ color: "#b91c1c" }}
              >
                {errors.neighbourhood?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="number"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <BaseTextField
                    size={"medium"}
                    placeholder={`${t["Number"]}*`}
                    label={`${t["Number"]}*`}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    name={"number"}
                    type={"number"}
                    value={field.value}
                  />
                )}
              />
              <Typography
                variant="inherit"
                color="textSecondary"
                sx={{ color: "#b91c1c" }}
              >
                {errors.number?.message}
              </Typography>
            </Grid>
            {/* <Grid item xs={12} md={6}>
              <Controller
                name="complement"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <BaseTextField
                    size={"medium"}
                    placeholder={t["Complement"]}
                    label={t["Complement"]}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    name={"complement"}
                    value={field.value}
                  />
                )}
              />
              <Typography
                variant="inherit"
                color="textSecondary"
                sx={{ color: "#b91c1c" }}
              >
                {errors.complement?.message}
              </Typography>
            </Grid> */}
          </Grid>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <Controller
                name="city"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <BaseTextField
                    size={"medium"}
                    placeholder={`${t["City"]}*`}
                    label={`${t["City"]}*`}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    name={"city"}
                    value={field.value}
                  />
                )}
              />
              <Typography
                variant="inherit"
                color="textSecondary"
                sx={{ color: "#b91c1c" }}
              >
                {errors.city?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="state_id"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <BaseAutocomplete
                    //   sx={{ margin: "0.6vh 0" }}
                    options={allStateData || []}
                    getOptionLabel={(option) => option.name || ""}
                    isOptionEqualToValue={(option, value) => {
                      return option.id === value.id;
                    }}
                    size={"medium"}
                    placeholder={`${t["State"]}*`}
                    label={`${t["State"]}*`}
                    onChange={(e, v, r, d) => {
                      console.log("🟥 ~ UserUpdateForm ~ v:", v);

                      field.onChange(v);
                    }}
                    value={field.value || null}
                  />
                )}
              />
              <Typography
                variant="inherit"
                color="textSecondary"
                sx={{ color: "#b91c1c" }}
              >
                {errors.state_id?.message}
              </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            sx={{
              pt: 2,
              ml: { lg: "auto" },
              width: {
                xs: "100%",
                lg: "fit-content",
              },
            }}
            spacing={1}
          >
            <Grid item xs={12} md={6}>
              <Button
                color="inherit"
                fullWidth
                sx={{
                  border: "1px solid #002152",
                  borderRadius: "4px",
                  px: 2,
                  py: 1,
                  color: "#002152",
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "22px",
                  textTransform: "none",
                }}
                onClick={() => router.replace({ pathname: "/my-properties" })}
              >
                {t["Cancel"]}
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                color="inherit"
                type="submit"
                fullWidth
                sx={{
                  background: "#34BE84",
                  borderRadius: "4px",
                  px: 2,
                  py: 1,
                  color: "#ffffff",
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "22px",
                  textTransform: "none",
                  boxShadow: "0px 4px 8px rgba(81, 51, 182, 0.32)",
                  "&:hover": {
                    background: "#34BE84",
                    borderRadius: "4px",
                    px: 2,
                    py: 1,
                    color: "#ffffff",
                    fontSize: "16px",
                    fontWeight: "600",
                    lineHeight: "22px",
                    textTransform: "none",
                    boxShadow: "0px 4px 8px rgba(81, 51, 182, 0.32)",
                  },
                }}
              >
                {loading && <CircularProgress size={22} color="inherit" />}
                {!loading && t["Save"]}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserUpdateForm;
