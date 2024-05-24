import BaseAutocomplete from "@/component/reuseable/baseAutocomplete/BaseAutocomplete";
import BaseOutlinedZipInput from "@/component/reuseable/baseOutlinedZipInput/BaseOutlinedZipInput";
import BaseTextField from "@/component/reuseable/baseTextField/BaseTextField";
import {
  Box,
  Button,
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
import accountIcon from "../../../../public/Images/account.png";
import en from "locales/en";
import pt from "locales/pt";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useCurrentUser from "@/hooks/useCurrentUser";
import { _baseURL, _imageURL } from "consts";
import { useUserUpdateMutation } from "@/queries/useUserQuery";
import { userDetailsApi } from "@/api";
const UserUpdateForm = ({ language }) => {
  const [myValue, setMyValue] = useState(language || "pt");
  const currentUser = useCurrentUser();
  // const [image, setImage] = useState(null);
  // const handleImageChange = (e) => {
  //   const file = e?.target?.files[0];
  //   if (file) {
  //     const imageURL = URL.createObjectURL(file);
  //     setImage(imageURL);
  //   }
  // };
  const myLoader = ({ src }) => {
    return `${src}`;
  };
  const allStateData = useSelector((state) => state.state.stateData);
  const selectedState = allStateData.find(
    (state) => state.id == currentUser?.address.state_id
  );
  console.log("🟥 ~ UserUpdateForm ~ selectedState:", selectedState);
  useEffect(() => {
    setValue("user_id", currentUser?.id);
    setValue("image", `${_imageURL}/${currentUser?.attachments[0].file_path}`);
    setValue("name", currentUser?.name);
    setValue("email", currentUser?.email);
    setValue("phone", currentUser?.phone);
    setValue("zip_code", currentUser?.address.zip_code);
    setValue("address", currentUser?.address.address);
    setValue("number", currentUser?.address.number);
    setValue("neighbourhood", currentUser?.address.neighbourhood);
    setValue("complement", currentUser?.address.complement);
    setValue("city", currentUser?.address.city);
    setValue(
      "state_id",
      allStateData.find((state) => state.id == currentUser?.address.state_id)
    );
  }, [setValue, currentUser]);
  console.log("✅ ~ UserUpdateForm ~ currentUser:", currentUser);
  const { mutate: userUpdate } = useUserUpdateMutation();
  const onSubmit = (data) => {
    userUpdate(
      {
        email: data.email,
        phone: data.phone,
        user_id: data.user_id,
        number: data.number,
        name: data.name,
        address: { ...data, state_id: data.state_id.id },
      },
      {
        onSuccess() {
          console.log("✅ User update successfully");
          userDetailsApi();
        },
        onError(e) {
          console.log("⛔ User not updated::", e);
        },
      }
    );
  };

  const t = myValue === "en" ? en : pt;
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t["Name is required"]),
    phone: Yup.string().required(t["Phone is required"]),
    email: Yup.string()
      .required(t["Email is required"])
      .matches(/.+@.+\.[A-Za-z]+$/, t["Email is invalid"]),
  });
  const {
    register,
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const allValues = watch();
  console.log("🟥 ~ UserUpdateForm ~ allValues:", allValues);

  const [showPass, setShowPass] = useState(false);
  const [preview, setPreview] = useState();
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
                {errors.repeat_password?.message}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={4}>
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
            <Grid item xs={12} md={4}>
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
            <Grid item xs={12} md={4}>
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
            </Grid>
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
                defaultValue={selectedState}
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
                {errors.state?.message}
              </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            justifyContent={{
              xs: "flex-start",
              sm: "flex-start",
              md: "flex-start",
              lg: "flex-end",
              xl: "flex-end",
            }}
            alignItems="center"
            sx={{
              pt: 2,
            }}
          >
            <Button
              color="inherit"
              sx={{
                mr: 1,
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
            >
              {t["Cancel"]}
            </Button>
            <Button
              color="inherit"
              type="submit"
              sx={{
                ml: 2,
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
              {t["Save"]}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserUpdateForm;
