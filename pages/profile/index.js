import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import logo from "../../public/Images/logo.png";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import NoEncryptionOutlinedIcon from "@mui/icons-material/NoEncryptionOutlined";
import accountIcon from "../../public/Images/account.png";
const ResponsiveDrawer = dynamic(() =>
  import("@/component/sharedProposal/ResponsiveDrawer/ResponsiveDrawer")
);
import {
  Avatar,
  Badge,
  Button,
  Chip,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";

import { useEffect, useState } from "react";
const Releases = dynamic(() =>
  import("@/component/properties/Releases/Releases")
);
const ThirdTab = dynamic(() => import("@/component/properties/Third/ThirdTab"));
const NewRegistration = dynamic(() =>
  import("@/component/properties/NewRegistration/NewRegistration")
);
const UserUpdateForm = dynamic(
  () => import("@/component/user/update/UserUpdateForm"),
  {
    ssr: false,
  }
);
import notifyImage from "../../public/Images/notify.png";
import Link from "next/link";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { _baseURL } from "../../consts";
import useChannel from "@/hooks/useChannel";
import Popover from "@mui/material/Popover";
import { useDispatch, useSelector } from "react-redux";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import {
  GetAllNotification,
  notificationAddPusherItem,
  notificationRemove,
} from "@/redux/all-notification/actions";
import {
  findNotificationCountData,
  notificationAddCount,
} from "@/redux/notificationCount/actions";
import { NOTIFICATION_ADD_COUNT } from "@/redux/notificationCount/types";
import { NotificationReadApi, omitEmpties, userDetailsApi } from "@/api";
import en from "locales/en";
import pt from "locales/pt";
import { findPropertyCountData } from "@/redux/propertyCount/actions";
import WishProperty from "@/component/properties/WishProperty/WishProperty";
import { useGetPropertyCountQuery } from "@/queries/useGetPropertyCountQuery";
import useParams from "@/hooks/useParams";
import { Controller, useForm } from "react-hook-form";
import BaseTextField from "@/component/reuseable/baseTextField/BaseTextField";
import BaseAutocomplete from "@/component/reuseable/baseAutocomplete/BaseAutocomplete";
import BaseOutlinedZipInput from "@/component/reuseable/baseOutlinedZipInput/BaseOutlinedZipInput";
import { findStateData } from "@/redux/state/actions";
import useCurrentUser from "@/hooks/useCurrentUser";

const drawerWidth = 240;

function onSubmit(data) {
  console.log("🟥 ~ onSubmit ~ onSubmit:", data);
}
function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Index({ language }) {
  const {
    register,
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm();
  const allValues = watch();
  const [showPass, setShowPass] = useState(false);
  const [preview, setPreview] = useState();
  const handleClickShowPassword = () => {
    setShowPass(!showPass);
  };

  const [showRepeatPass, setShowRepeatPass] = useState(false);

  const handleClickShowRepeatPassword = () => {
    setShowRepeatPass(!showRepeatPass);
  };

  useEffect(() => {
    if (!allValues.image) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(allValues.image);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [allValues.image]);

  const [myValue, setMyValue] = useState(language || "pt");

  const t = myValue === "en" ? en : pt;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findStateData());
  }, [dispatch]);

  const allStateData = useSelector((state) => state.state.stateData);

  useEffect(() => {
    setValue("state", allStateData[0]);
  }, [allStateData, setValue]);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box
      sx={{
        //   backgroundColor: "#f6f8fc",
        flexGrow: 1,
        background: "#F2F5F6",
        minHeight: "100vh",
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        paddingX: { xs: 0, sm: 0, md: 6, lg: 6, xl: 6 },
        paddingTop: { xs: 6, sm: 6, md: 6, lg: 8, xl: 3 },
        paddingBottom: { xs: 3, sm: 3, md: 3, lg: 4, xl: 3 },
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Typography
          variant="p"
          sx={{
            color: "#002152",
            fontSize: "24px",
            fontWeight: "700",
            lineHeight: "32px",
            ml: { xs: 4, sm: 4, md: 0, lg: 0, xl: 0 },
            mt: { xs: 1, sm: 1, md: 0, lg: 0, xl: 0 },
          }}
        >
          {t["profile"]}
        </Typography>
      </Grid>
      <UserUpdateForm onSubmit={onSubmit} />
      {/* <form onSubmit={handleSubmit(onSubmit)}>
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
                  src={preview != null ? preview : accountIcon}
                  alt="account"
                  width={50}
                  height={50}
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
                  render={({ field }) => (
                    <BaseTextField
                      size={"medium"}
                      placeholder={t["Email"]}
                      label={t["Email"]}
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
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="telephone"
                  control={control}
                  render={({ field }) => (
                    <BaseTextField
                      size={"medium"}
                      placeholder={t["Telephone"]}
                      label={t["Telephone"]}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                      name={"telephone"}
                      // error={errors.telephone ? true : false}
                    />
                  )}
                />
                <Typography
                  variant="inherit"
                  color="textSecondary"
                  sx={{ color: "#b91c1c" }}
                >
                  {errors.telephone?.message}
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
                        // label={`${t["Zip code"]}*`}
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
                  name="state"
                  control={control}
                  // defaultValue={{}}
                  render={({ field }) => (
                    <BaseAutocomplete
                      //   sx={{ margin: "0.6vh 0" }}
                      options={allStateData || []}
                      getOptionLabel={(option) => option.name || ""}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      size={"medium"}
                      placeholder={`${t["State"]}*`}
                      label={`${t["State"]}*`}
                      onChange={(e, v, r, d) => field.onChange(v)}
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
      </form> */}
    </Box>
  );
}
