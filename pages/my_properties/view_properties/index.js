import Head from "next/head";
import Image from "next/image";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ResponsiveDrawer from "../../../src/component/sharedProposal/ResponsiveDrawer/ResponsiveDrawer";
import {
  Button,
  Container,
  Divider,
  Grid,
  InputBase,
  Pagination,
  Paper,
  Skeleton,
  Slider,
  Stack,
  SwipeableDrawer,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Releases from "../../../src/component/properties/Releases/Releases";
import ThirdTab from "../../../src/component/properties/Third/ThirdTab";
import NewRegistration from "../../../src/component/properties/NewRegistration/NewRegistration";
import notifyImage from "../../../public/Images/notify.png";
import BasicBreadcrumbs from "../../../src/component/reuseable/baseBreadCrumb/BaseBreadCrumb";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import Link from "next/link";
import searchIcon from "../../../public/Images/SearchBlack.png";
import RentCard from "../../../src/component/reuseable/rentCard/RentCard";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import BaseOutlinedCurrencyInput from "../../../src/component/reuseable/baseOutlinedCurrencyInput/BaseOutlinedCurrencyInput";
import CloseIcon from "@mui/icons-material/Close";
import { getSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { findProjectPropertyData } from "../../../src/redux/projectProperty/actions";
import { Controller, useForm } from "react-hook-form";
import { findPropertyTypeData } from "../../../src/redux/propertyType/actions";
import { findFeatureData } from "../../../src/redux/features/actions";
import { serialize } from "object-to-formdata";
import SearchComponent from "../../../src/component/reuseable/SearchComponent/SearchComponent";
import en from "locales/en";
import pt from "locales/pt";

function valuetext(value) {
  return `${value}°C`;
}

const unflatten = require("flat").unflatten;

const $params = {
  encode(input) {
    const searchParams = new URLSearchParams(window.location.search);

    const formData = serialize(input, {
      indices: true,
      allowEmptyArrays: false,
      booleansAsIntegers: true,
    });

    const inputSearchParams = new URLSearchParams(formData.entries());
    for (const [key, value] of inputSearchParams.entries()) {
      searchParams.set(key, value);
    }

    return searchParams;
  },
  decode(input = new URLSearchParams(window.location.search)) {
    return unflatten(
      [...input.entries()].reduce((carry, [key, value]) => {
        const numValue = +value;
        return {
          ...carry,
          [key.replace(/\[([^\]]+)\]/g, ".$1")]: !isNaN(numValue)
            ? numValue
            : value,
        };
      }, {})
    );
  },
};
const drawerWidth = 240;

const BreadCrumbsData = [
  { stage: "Start", route: "" },
  { stage: "My properties", route: "" },
];

const style = {
  ml: { xs: 4, sm: 4, md: 0, lg: 0, xl: 0 },
  mt: { xs: 1, sm: 1, md: 0, lg: 0, xl: 0 },
};

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

export default function ViewProperties({
  projectPropertyData,
  query,
  language,
}) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [myValue, setMyValue] = useState(language || "en");

  const t = myValue === "en" ? en : pt;

  const [page, setPage] = useState(1);

  const omitEmpties = (obj) => {
    return Object.entries(obj).reduce((carry, [key, value]) => {
      if (![null, undefined, "", []].includes(value)) {
        carry[key] = value;
      }
      return carry;
    }, {});
  };

  useEffect(() => {
    dispatch(findPropertyTypeData());
    dispatch(findFeatureData());
  }, [dispatch]);

  const propertyType = useSelector(
    (state) => state.propertyType.propertyTypeData
  );

  const featureData = useSelector((state) => state.feature.featureData);

  const handlePageChange = (event, value) => {
    setPage(value);
    router.replace({
      pathname: "/search_real_estate",
      query: { ...router.query, page: value },
    });
    // setData(datas.slice(firstIndex + pageSize * (value - 1), pageSize * value));
  };

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
  const [searchValue, setSearchValue] = useState(null);
  const [type, setType] = useState(1);
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [furnished, setFurnished] = useState("Yes");
  const [pets, setPets] = useState("Yes");
  const [closeToTheMetro, setCloseToTheMetro] = useState("Yes");
  const [availability, setAvailability] = useState("Immediate");
  const [featuretypes, setFeatureTypes] = useState([]);
  const [valueSlider, setValueSlider] = React.useState([20, 37]);
  const [areaSlider, setAreaSlider] = React.useState([20, 37]);

  useEffect(() => {
    if (valueSlider) {
      setValue("min_value", valueSlider[0]);
      setValue("max_value", valueSlider[1]);
    }
  }, [valueSlider, setValue]);

  useEffect(() => {
    if (areaSlider) {
      setValue("min_area", areaSlider[0]);
      setValue("max_area", areaSlider[1]);
    }
  }, [areaSlider, setValue]);

  useEffect(() => {
    const searchParams = $params.decode();
    setType(searchParams?.type || 1);
    setBedrooms(searchParams?.bedroom || 1);
    setBathrooms(searchParams?.bathroom || 1);
    setPets(searchParams?.pets || "Yes");
    setFurnished(searchParams?.furnish || "Yes");
    setCloseToTheMetro(searchParams?.metro || "Yes");
    setFeatureTypes(searchParams?.tag || []);
    setValue("min_value", searchParams.min_value || 22);
    setValue("max_value", searchParams.max_value || 37);
    setValue("min_area", searchParams.min_area || 22);
    setValue("max_area", searchParams.max_area || 37);
  }, [setValue]);

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchBtn = () => {
    router.replace({
      pathname: "/my_properties/view_properties",
      query: { ...router.query, all: searchValue },
    });
  };

  const handleChange = (event, newValue) => {
    setValueSlider(newValue);
    setValue("min_value", newValue[0]);
    setValue("max_value", newValue[1]);
  };

  const handleAreaChange = (event, newValue) => {
    setAreaSlider(newValue);
    setValue("min_area", newValue[0]);
    setValue("max_area", newValue[1]);
  };

  const onSubmit = async (data) => {
    const allFilterData = {
      ...data,
      type: type,
      bedroom: bedrooms,
      bathroom: bathrooms,
      furnish: furnished,
      pets: pets,
      metro: closeToTheMetro,
      tag: featuretypes,
    };

    const fd = serialize(allFilterData, {
      indices: true,
      allowEmptyArrays: false,
      booleansAsIntegers: true,
    });

    const sp = new URLSearchParams(fd.entries());
    const spEntries = Object.fromEntries(sp.entries());

    console.log({
      encoded: $params.encode(omitEmpties(allFilterData)).toString(),
      decoded: $params.decode(),
    });
    router.replace({
      pathname: "/my_properties/view_properties",
      query: $params.encode(omitEmpties(allFilterData)).toString(),
    });
  };

  const handleCancelFilter = () => {
    router.replace({
      pathname: "/my_properties/view_properties",
      query: omitEmpties({
        project_id: query?.project_id,
        page: 1,
        per_page: 9,
      }),
    });
    setFeatureTypes([]);
    setType(1);
    setBedrooms(1);
    setBathrooms(1);
    setPets("Yes");
    setFurnished("Yes");
    setCloseToTheMetro("Yes");
    setValue("min_value", 22);
    setValue("max_value", 37);
    setValue("min_area", 22);
    setValue("max_area", 37);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 450 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 2, px: 2 }}
        >
          <Typography
            variant="p"
            sx={{
              color: "#1A1859",
              fontSize: "24px",
              lineHeight: "32px",
              fontWeight: "700",
            }}
          >
            {t["filters"]}
          </Typography>
          <CloseIcon onClick={toggleDrawer(anchor, false)} />
        </Grid>

        <Box sx={{ mx: 2, mt: 3 }}>
          <Box>
            <Typography
              variant="p"
              sx={{
                color: "#4B4B66",
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "19px",
              }}
            >
              {t["Property type"]}
            </Typography>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              gap={1}
              sx={{ mt: 2 }}
            >
              {propertyType?.map((data, index) => (
                <Button
                  key={index}
                  onClick={() => setType(data.id)}
                  sx={{
                    background: `${
                      data.id === type ? "#7450F0" : "transparent"
                    }`,
                    borderRadius: "56px",

                    color: `${data.id === type ? "#ffffff" : "#32414C"}`,
                    border: `${data.id === type ? "" : "1px solid #9FAAB1"}`,
                    fontSize: {
                      xs: "12px",
                      sm: "13px",
                      md: "14px",
                      lg: "13px",
                      xl: "14px",
                    },
                    fontWeight: "400",
                    lineHeight: "17px",
                    textTransform: "none",
                    px: { xs: 0, sm: 1, md: 1, lg: 1, xl: 1 },
                    py: 1,
                    "&:hover": {
                      background: "#7450F0",
                      borderRadius: "56px",
                      color: "#ffffff",
                    },
                  }}
                >
                  {data.name}
                </Button>
              ))}
            </Grid>
          </Box>
          <Divider sx={{ mt: 1, mb: 1 }} />
          <Box>
            <Typography
              variant="p"
              sx={{
                color: "#4B4B66",
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "19px",
              }}
            >
              {t["Value"]}
            </Typography>
            <Grid container spacing={2} sx={{ mt: 0.5 }}>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                {/* <BaseOutlinedCurrencyInput
                  size={"medium"}
                  placeholder={"Minimum"}
                  label={"Minimum"}
                  borderColor={"#7450F0"}
                /> */}
                <Controller
                  name="min_value"
                  control={control}
                  render={({ field }) => (
                    <BaseOutlinedCurrencyInput
                      size={"medium"}
                      placeholder={"Minimum"}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                      // label={"Minimum"}
                      // type={"number"}
                      name={"min_value"}
                      value={field.value}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: "#7450F0",
                          },
                        },
                        "& label.Mui-focused": {
                          color: "#7450F0",
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <Controller
                  name="max_value"
                  control={control}
                  render={({ field }) => (
                    <BaseOutlinedCurrencyInput
                      size={"medium"}
                      placeholder={"Maximum"}
                      // type={"number"}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                      // label={"Maximum"}
                      name={"max_value"}
                      value={field.value}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: "#7450F0",
                          },
                        },
                        "& label.Mui-focused": {
                          color: "#7450F0",
                        },
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 1 }}>
              <Slider
                getAriaLabel={() => "Temperature range"}
                value={
                  allValues.min_value && allValues?.max_value
                    ? [allValues.min_value, allValues?.max_value]
                    : valueSlider
                }
                size="small"
                max={+allValues?.max_value + 1000 || 1000}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                sx={{ color: "#7450F0" }}
              />
            </Box>
          </Box>
          <Divider sx={{ mt: 1, mb: 1 }} />
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                <Typography
                  variant="p"
                  sx={{
                    color: "#4B4B66",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "19px",
                  }}
                >
                  {t["bedrooms"]}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                {[1, 2, 3, 4].map((data, index) => (
                  // <Grid xs={6} sm={6} md={6} lg={3} xl={3} key={index}>
                  <Button
                    onClick={() => setBedrooms(data)}
                    key={index}
                    sx={{
                      background: `${
                        data === bedrooms ? "#7450F0" : "transparent"
                      }`,
                      borderRadius: "56px",
                      // width: "100%",
                      color: `${data === bedrooms ? "#ffffff" : "#32414C"}`,
                      border: `${data === bedrooms ? "" : "1px solid #9FAAB1"}`,
                      ml: 0.5,
                      fontSize: {
                        xs: "12px",
                        sm: "13px",
                        md: "14px",
                        lg: "13px",
                        xl: "14px",
                      },
                      fontWeight: "400",
                      lineHeight: "17px",
                      textTransform: "none",
                      px: { xs: 0, sm: 1, md: 1, lg: 1, xl: 1 },
                      py: 1,
                      "&:hover": {
                        background: "#7450F0",
                        borderRadius: "56px",
                        color: "#ffffff",
                      },
                    }}
                  >
                    {`${data}+`}
                  </Button>
                  // </Grid>
                ))}
              </Grid>
            </Grid>
          </Box>
          <Divider sx={{ mt: 1, mb: 1 }} />
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                <Typography
                  variant="p"
                  sx={{
                    color: "#4B4B66",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "19px",
                  }}
                >
                  {t["bathrooms"]}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                {[1, 2, 3, 4].map((data, index) => (
                  // <Grid xs={6} sm={6} md={6} lg={3} xl={3} key={index}>
                  <Button
                    onClick={() => setBathrooms(data)}
                    key={index}
                    sx={{
                      background: `${
                        data === bathrooms ? "#7450F0" : "transparent"
                      }`,
                      borderRadius: "56px",
                      // width: "100%",
                      color: `${data === bathrooms ? "#ffffff" : "#32414C"}`,
                      border: `${
                        data === bathrooms ? "" : "1px solid #9FAAB1"
                      }`,
                      ml: 0.5,
                      fontSize: {
                        xs: "12px",
                        sm: "13px",
                        md: "14px",
                        lg: "13px",
                        xl: "14px",
                      },
                      fontWeight: "400",
                      lineHeight: "17px",
                      textTransform: "none",
                      px: { xs: 0, sm: 1, md: 1, lg: 1, xl: 1 },
                      py: 1,
                      "&:hover": {
                        background: "#7450F0",
                        borderRadius: "56px",
                        color: "#ffffff",
                      },
                    }}
                  >
                    {`${index + 1}+`}
                  </Button>
                  // </Grid>
                ))}
              </Grid>
            </Grid>
          </Box>
          <Divider sx={{ mt: 1, mb: 1 }} />
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                <Typography
                  variant="p"
                  sx={{
                    color: "#4B4B66",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "19px",
                  }}
                >
                  {t["furnished"]}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                {[
                  { name: "Yes", slug: t["yes"] },
                  { name: "No", slug: t["no"] },
                  { name: "Whatever", slug: t["whatever"] },
                ].map((data, index) => (
                  // <Grid xs={6} sm={6} md={6} lg={3} xl={3} key={index}>
                  <Button
                    key={index}
                    onClick={() => setFurnished(data?.name)}
                    sx={{
                      background: `${
                        data?.name === furnished ? "#7450F0" : "transparent"
                      }`,
                      borderRadius: "56px",
                      // width: "100%",
                      color: `${
                        data?.name === furnished ? "#ffffff" : "#32414C"
                      }`,
                      border: `${
                        data?.name === furnished ? "" : "1px solid #9FAAB1"
                      }`,
                      ml: 0.5,
                      fontSize: {
                        xs: "12px",
                        sm: "13px",
                        md: "14px",
                        lg: "13px",
                        xl: "14px",
                      },
                      fontWeight: "400",
                      lineHeight: "17px",
                      textTransform: "none",
                      px: { xs: 0, sm: 1, md: 1, lg: 1, xl: 1 },
                      py: 1,
                      "&:hover": {
                        background: "#7450F0",
                        borderRadius: "56px",
                        color: "#ffffff",
                      },
                    }}
                  >
                    {data?.slug}
                  </Button>
                  // </Grid>
                ))}
              </Grid>
            </Grid>
          </Box>
          <Divider sx={{ mt: 1, mb: 1 }} />
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                <Typography
                  variant="p"
                  sx={{
                    color: "#4B4B66",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "19px",
                  }}
                >
                  {t["do you accept pets"]}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                {[
                  { name: "Yes", slug: t["yes"] },
                  { name: "No", slug: t["no"] },
                  { name: "Whatever", slug: t["whatever"] },
                ].map((data, index) => (
                  // <Grid xs={6} sm={6} md={6} lg={3} xl={3} key={index}>
                  <Button
                    key={index}
                    onClick={() => setPets(data?.name)}
                    sx={{
                      background: `${
                        data === pets ? "#7450F0" : "transparent"
                      }`,
                      borderRadius: "56px",
                      // width: "100%",
                      color: `${data?.name === pets ? "#ffffff" : "#32414C"}`,
                      border: `${
                        data?.name === pets ? "" : "1px solid #9FAAB1"
                      }`,
                      ml: 0.5,
                      fontSize: {
                        xs: "12px",
                        sm: "13px",
                        md: "14px",
                        lg: "13px",
                        xl: "14px",
                      },
                      fontWeight: "400",
                      lineHeight: "17px",
                      textTransform: "none",
                      px: { xs: 0, sm: 1, md: 1, lg: 1, xl: 1 },
                      py: 1,
                      "&:hover": {
                        background: "#7450F0",
                        borderRadius: "56px",
                        color: "#ffffff",
                      },
                    }}
                  >
                    {data?.slug}
                  </Button>
                  // </Grid>
                ))}
              </Grid>
            </Grid>
          </Box>
          <Divider sx={{ mt: 1, mb: 1 }} />
          <Box>
            <Typography
              variant="p"
              sx={{
                color: "#4B4B66",
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "19px",
              }}
            >
              Area (m²)
            </Typography>
            <Grid container spacing={2} sx={{ mt: 0.5 }}>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <Controller
                  name="min_area"
                  control={control}
                  render={({ field }) => (
                    <BaseOutlinedCurrencyInput
                      size={"medium"}
                      placeholder={"Minimum"}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                      name={"min_area"}
                      value={field.value}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: "#7450F0",
                          },
                        },
                        "& label.Mui-focused": {
                          color: "#7450F0",
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <Controller
                  name="max_area"
                  control={control}
                  render={({ field }) => (
                    <BaseOutlinedCurrencyInput
                      size={"medium"}
                      placeholder={"Maximum"}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                      name={"max_area"}
                      value={field.value}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: "#7450F0",
                          },
                        },
                        "& label.Mui-focused": {
                          color: "#7450F0",
                        },
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 1 }}>
              <Slider
                getAriaLabel={() => "Temperature range"}
                value={
                  allValues.min_area && allValues?.max_area
                    ? [allValues.min_area, allValues?.max_area]
                    : areaSlider
                }
                size="small"
                max={+allValues?.max_area + 1000 || 1000}
                onChange={handleAreaChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                sx={{ color: "#7450F0" }}
              />
            </Box>
          </Box>
          <Divider sx={{ mt: 1, mb: 1 }} />
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                <Typography
                  variant="p"
                  sx={{
                    color: "#4B4B66",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "19px",
                  }}
                >
                  {t["close to the metro"]}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                {[
                  { name: "Yes", slug: t["yes"] },
                  { name: "No", slug: t["no"] },
                  { name: "Whatever", slug: t["whatever"] },
                ].map((data, index) => (
                  // <Grid xs={6} sm={6} md={6} lg={3} xl={3} key={index}>
                  <Button
                    onClick={() => setCloseToTheMetro(data?.name)}
                    key={index}
                    sx={{
                      background: `${
                        data?.name === closeToTheMetro
                          ? "#7450F0"
                          : "transparent"
                      }`,
                      borderRadius: "56px",
                      // width: "100%",
                      color: `${
                        data?.name === closeToTheMetro ? "#ffffff" : "#32414C"
                      }`,
                      border: `${
                        data?.name === closeToTheMetro
                          ? ""
                          : "1px solid #9FAAB1"
                      }`,
                      ml: 0.5,
                      fontSize: {
                        xs: "12px",
                        sm: "13px",
                        md: "14px",
                        lg: "13px",
                        xl: "14px",
                      },
                      fontWeight: "400",
                      lineHeight: "17px",
                      textTransform: "none",
                      px: { xs: 0, sm: 1, md: 1, lg: 1, xl: 1 },
                      py: 1,
                      "&:hover": {
                        background: "#7450F0",
                        borderRadius: "56px",
                        color: "#ffffff",
                      },
                    }}
                  >
                    {data?.slug}
                  </Button>
                  // </Grid>
                ))}
              </Grid>
            </Grid>
          </Box>
          <Divider sx={{ mt: 1, mb: 1 }} />
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                <Typography
                  variant="p"
                  sx={{
                    color: "#4B4B66",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "19px",
                  }}
                >
                  {t["Availability"]}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                {[
                  { name: "Immediate", slug: t["immediate"] },
                  { name: "Shortly", slug: t["shortly"] },
                  { name: "Whatever", slug: t["whatever"] },
                ].map((data, index) => (
                  // <Grid xs={6} sm={6} md={6} lg={3} xl={3} key={index}>
                  <Button
                    key={index}
                    onClick={() => setAvailability(data?.name)}
                    sx={{
                      background: `${
                        data?.name === availability ? "#7450F0" : "transparent"
                      }`,
                      borderRadius: "56px",
                      // width: "100%",
                      color: `${
                        data?.name === availability ? "#ffffff" : "#32414C"
                      }`,
                      border: `${
                        data?.name === availability ? "" : "1px solid #9FAAB1"
                      }`,
                      ml: 0.5,
                      fontSize: {
                        xs: "12px",
                        sm: "13px",
                        md: "14px",
                        lg: "13px",
                        xl: "14px",
                      },
                      fontWeight: "400",
                      lineHeight: "17px",
                      textTransform: "none",
                      px: { xs: 0, sm: 1, md: 1, lg: 1, xl: 1 },
                      py: 1,
                      "&:hover": {
                        background: "#7450F0",
                        borderRadius: "56px",
                        color: "#ffffff",
                      },
                    }}
                  >
                    {data?.slug}
                  </Button>
                  // </Grid>
                ))}
              </Grid>
            </Grid>
          </Box>
          <Divider sx={{ mt: 1, mb: 1 }} />
          {Object.keys(featureData).map((key, index) => (
            <Box key={index}>
              <Typography
                variant="p"
                sx={{
                  color: "#4B4B66",
                  fontSize: "16px",
                  fontWeight: "400",
                  lineHeight: "19px",
                }}
              >
                {(key === "Condomínio" ||
                  key === "Comodidades" ||
                  key === "Bem-estar" ||
                  key === "Eletrodomésticos" ||
                  key === "Cômodos" ||
                  key === "Acessibilidade") &&
                  key}
              </Typography>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                gap={1}
                sx={{ mt: 2 }}
              >
                {(key === "Condomínio" ||
                  key === "Comodidades" ||
                  key === "Bem-estar" ||
                  key === "Eletrodomésticos" ||
                  key === "Cômodos" ||
                  key === "Acessibilidade") &&
                  featureData[key].map((data, index) => (
                    <Button
                      key={index}
                      onClick={() => {
                        if (!featuretypes?.includes(data.id)) {
                          setFeatureTypes((current) => [...current, data.id]);
                        } else {
                          const newArray = featuretypes?.filter(
                            (value) => value !== data.id
                          );
                          setFeatureTypes(newArray);
                        }
                      }}
                      sx={{
                        background: `${
                          featuretypes?.includes(data.id)
                            ? "#7450F0"
                            : "transparent"
                          // console.log("feature", featuretypes)
                          // console.log(
                          //   "bool",
                          //   featuretypes?.includes(data.id.toString())
                          // )
                        }`,
                        borderRadius: "56px",
                        // width: "100%",
                        color: `${
                          featuretypes?.includes(data.id)
                            ? "#ffffff"
                            : "#32414C"
                        }`,
                        border: `${
                          featuretypes?.includes(data.id)
                            ? ""
                            : "1px solid #9FAAB1"
                        }`,
                        fontSize: {
                          xs: "12px",
                          sm: "13px",
                          md: "14px",
                          lg: "13px",
                          xl: "14px",
                        },
                        fontWeight: "400",
                        lineHeight: "17px",
                        textTransform: "none",
                        px: { xs: 0, sm: 1, md: 1, lg: 1, xl: 1 },
                        py: 1,
                        "&:hover": {
                          background: "#7450F0",
                          borderRadius: "56px",
                          color: "#ffffff",
                        },
                      }}
                    >
                      {data.name}
                    </Button>
                  ))}
              </Grid>
              <Divider sx={{ mt: 1, mb: 1 }} />
            </Box>
          ))}
        </Box>
        <Divider sx={{ mt: 2, mb: 1 }} />
        <Box
          sx={{
            // mx: 2,
            // my: 2,

            position: "sticky",
            bottom: 0,
            width: "100%",
            background: "#ffffff",
            px: 2,
            py: 2,
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <Button
                onClick={handleCancelFilter}
                fullWidth
                variant="outlined"
                sx={{
                  borderColor: "#002152",
                  borderRadius: "4px",
                  color: "#002152",
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "22px",
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "#002152",
                    borderRadius: "4px",
                    color: "#002152",
                  },
                }}
              >
                {t["cancel filter"]}
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{
                  background: " #7450F0",
                  borderRadius: "4px",
                  color: "#ffffff",
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "22px",
                  textTransform: "none",
                  "&:hover": {
                    background: " #7450F0",
                    borderRadius: "4px",
                    color: "#ffffff",
                  },
                }}
              >
                {t["apply filters"]}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Box>
  );
  return (
    <div>
      <Head>
        <title>Lokkan</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/negotiate.png" />
      </Head>

      <main>
        <Box sx={{ display: "flex" }}>
          <ResponsiveDrawer />
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
              <BasicBreadcrumbs
                BreadcrumbsData={BreadCrumbsData}
                lastStageData={"aston"}
                style={style}
              />
              <Image src={notifyImage} alt="notify" />
            </Grid>

            <Grid
              container
              spacing={1}
              //   direction="row"
              //   justifyContent="space-between"
              //   alignItems="flex-start"
              sx={{ mt: 1 }}
            >
              <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>
                <Link href="/my_properties">
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
                        {t["Come back"]}
                      </Typography>
                    </Button>
                  </a>
                </Link>
              </Grid>
              <Grid item xs={0} sm={0} md={0} lg={0} xl={2}></Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={4}
                xl={4}
                sx={{ mx: { xs: 2, sm: 2, md: 0 } }}
              >
                {/* <Paper
                  component="form"
                  sx={{
                   
                    display: "flex",
                    alignItems: "center",
                    // border: "1px solid red",
                    boxShadow: "none",
                    border: "1px solid #D3D3DF",
                    borderRadius: "4px",

                    width: {
                      xs: "100%",
                      sm: "100%",
                      md: "100%",
                      xl: "100%",
                      lg: "100%",
                    },
                  }}
                >
                  <Grid sx={{ paddingRight: 2, width: "100%" }}>
                  
                    <InputBase
                      fullWidth
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="search.."
                      inputProps={{
                        "aria-label": "search google maps",
                        style: {
                          color: "#9F9FA9",
                          fontSize: "20px",
                        },
                      }}
                    />
                  </Grid>
                  <Box
                    sx={{
                      padding: "1vh",
                    }}
                  >
                    <Image src={searchIcon} alt="search" />
                  </Box>
                </Paper> */}
                <SearchComponent
                  handleSearch={handleSearch}
                  handleSearchBtn={handleSearchBtn}
                  languageName={myValue.toString()}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={2}
                xl={2}
                sx={{
                  mr: { xs: 2, sm: 2, md: 2, lg: 0 },
                  ml: { xs: 2, sm: 2, md: 2, lg: 0 },
                }}
              >
                <Button
                  onClick={toggleDrawer("left", true)}
                  fullWidth
                  variant="outlined"
                  sx={{
                    borderColor: "#002152",
                    borderRadius: "4px",
                    color: "#002152",
                    fontSize: "16px",
                    fontWeight: "600",

                    textTransform: "none",
                    "&:hover": {
                      borderColor: "#002152",
                      borderRadius: "4px",
                      color: "#002152",
                    },
                  }}
                >
                  <FilterAltOutlinedIcon />
                  <Typography variant="p">{t["filter"]}</Typography>
                </Button>
                <SwipeableDrawer
                  anchor={"left"}
                  open={state["left"]}
                  onClose={toggleDrawer("left", false)}
                  onOpen={toggleDrawer("left", true)}
                >
                  {list("left")}
                </SwipeableDrawer>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={2}
                xl={2}
                sx={{ mx: { xs: 2, sm: 2, md: 0 } }}
              >
                <Link href="/my_properties/new_property">
                  <Button
                    sx={{
                      textTransform: "none",
                      background: "#0362F0",
                      borderRadius: "4px",
                      color: "#ffffff",
                      fontSize: "16px",
                      fontWeight: "600",

                      width: {
                        xs: "100%",
                        sm: "100%",
                        md: "100%",
                        lg: "100%",
                        xl: "100%",
                      },
                    }}
                  >
                    {t["New property"]}
                  </Button>
                </Link>
              </Grid>
            </Grid>
            <Box sx={{ mt: 4, mx: { xs: 2, sm: 2, md: 0 } }}>
              <Grid container spacing={4}>
                {projectPropertyData?.map((data, index) => (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={6}
                    xl={6}
                    xxl={6}
                  >
                    <Link href={`/property_view/${data?.id}`}>
                      <a
                        style={{
                          textDecoration: "none",
                          listStyle: "none",
                          width: "100%",
                        }}
                      >
                        <RentCard
                          propertyData={data}
                          languageName={myValue.toString()}
                        />
                      </a>
                    </Link>
                  </Grid>
                ))}
              </Grid>

              <Stack spacing={2} sx={{ marginY: 8 }}>
                <Pagination
                  count={Math.ceil(projectPropertyData?.total / 9) || 1}
                  page={page}
                  onChange={handlePageChange}
                  variant="outlined"
                  shape="rounded"
                />
              </Stack>
            </Box>
          </Box>
        </Box>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  //* Session for SSG
  const session = await getSession(context);
  //? If Not Logged In
  if (!session) {
    return {
      redirect: {
        destination: "/",
      },
      props: {
        session: null,
      },
    };
  }

  const base_url = process.env.NEXT_PUBLIC_API_URL_TESTE;
  const queryValue = context.query;

  var url = new URL(`${base_url}/api/property/index`),
    params = context.query;
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );
  const res = await fetch(url);

  const data = await res.json();

  const cookies = context.req.cookies["language"] || "pt";

  return {
    props: {
      projectPropertyData: data?.properties?.data,
      query: queryValue,
      language: cookies,
    },
  };
}
