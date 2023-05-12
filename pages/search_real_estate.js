import Navbar from "../src/component/shared/Navbar/Navbar";
import Footer from "../src/component/shared/Footer/Footer";
import shapeIcon from "../public/Images/eclipseShape.png";
import Head from "next/head";
import {
  Box,
  Grid,
  Typography,
  Container,
  ImageList,
  ImageListItem,
  Divider,
  Button,
  SwipeableDrawer,
} from "@mui/material";
import FulfillDream from "../src/component/home/fullfill/FulfillDream";
import SideContent from "../src/component/home/FullfillSideContent/SideContent";
import SellSideContent from "../src/component/home/wantToSellSideContent/SellSideContent";
import mobileGray from "../public/Images/mobileGray.png";
import mobileBlue from "../public/Images/mobileBlue.png";
import WantSellSvgBackground from "../src/component/svg/WantSellSvgBackground";
import { renderToStaticMarkup } from "react-dom/server";
import WantToSell from "../src/component/home/wantToSell/WantToSell";
import BrokerRegisterContent from "../src/component/home/whoIsBroker/brokerRegister/BrokerRegisterContent";
import BrokerImageContent from "../src/component/home/whoIsBroker/brokerContent/BrokerImageContent";
import BestDealSvgBackground from "../src/component/svg/BestDealSvgBackground";
import HouseCard from "../src/component/reuseable/HouseCard/HouseCard";
import MobileSideContent from "../src/component/home/FullfillSideContent/MobileSideContent";
import BrokerImageContentMobile from "../src/component/home/whoIsBroker/brokerContent/BrokerImageContentMobile";
import BrokerHelp from "../src/component/IAmBroker/BrokerHelp/BrokerHelp";
import BrokerHelpContent from "../src/component/IAmBroker/BrokerHelp/BrokerHelpContent";
import BecomeBrokerContent from "../src/component/IAmBroker/BecomeBroker/BecomeBrokerContent";
import BecomeBroker from "../src/component/IAmBroker/BecomeBroker/BecomeBroker";
import CalulateComission from "../src/component/IAmBroker/MaxmizeResult/CalulateComission";
import ComissionResult from "../src/component/IAmBroker/MaxmizeResult/ComissionResult";
import BrokerFacilities from "../src/component/IAmBroker/BrokerFacilities/BrokerFacilities";
import advertiseImage from "../public/Images/advertise.png";
import wantImageMobile from "../public/Images/mobileWant.png";
import trackImage from "../public/Images/track.png";
import digitalImage from "../public/Images/digital.png";
import fastImage from "../public/Images/fast.png";
import PropertyList from "../src/component/IAmOwner/propertyList/PropertyList";
import dynamic from "next/dynamic";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import SearchComponent from "../src/component/reuseable/SearchComponent/SearchComponent";
import Router, { useRouter } from "next/router";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import BaseOutlinedCurrencyInput from "../src/component/reuseable/baseOutlinedCurrencyInput/BaseOutlinedCurrencyInput";

const BaseGoogleMap = dynamic(
  () => import("../src/component/IAmOwner/map/BaseGoogleMap"),
  {
    ssr: false,
  }
);

import Slider from "@mui/material/Slider";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findPropertyTypeData } from "../src/redux/propertyType/actions";
import { findFeatureData } from "../src/redux/features/actions";
import { serialize } from "object-to-formdata";
import BaseAutocomplete from "../src/component/reuseable/baseAutocomplete/BaseAutocomplete";
import en from "locales/en";
import pt from "locales/pt";

const unflatten = require("flat").unflatten;

function valuetext(value) {
  return `${value}°C`;
}

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

export default function SearchRealEstate({
  loginOpen,
  setLoginOpen,
  handleLoginOpen,
  handleLoginClose,
  propertyData,
  query,
  language,
}) {
  console.log({ propertyData });

  const [myValue, setMyValue] = useState(language || "pt");

  const t = myValue === "en" ? en : pt;

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, [propertyData]);

  const dispatch = useDispatch();
  const router = useRouter();
  const [pageSize, setPageSize] = React.useState(3);
  const [page, setPage] = React.useState(1);
  const [selectval, setSelectVal] = useState(null);

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
  const [relevantValue, setRelevantValue] = useState(relevant[0]);

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
      pathname: "/search_real_estate",
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

    // console.log({
    // 	encoded: $params.encode(omitEmpties(allFilterData)).toString(),
    // 	decoded: $params.decode(),
    // })
    router.replace({
      pathname: "/search_real_estate",
      query: $params.encode(omitEmpties(allFilterData)).toString(),
    });
  };

  const handleCancelFilter = () => {
    router.replace({
      pathname: "/search_real_estate",
      query: omitEmpties({
        location: query?.location,
        value_up_to: query?.value_up_to,
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

  const handleRelevantValueChange = (v) => {
    setRelevantValue(v);
    router.replace({
      pathname: "/search_real_estate",
      query: omitEmpties({
        ...router.query,
        relevant_filter: v?.value,
      }),
    });
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
            Filters
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
              Property Type
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
              Value
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
                  Bedrooms
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
                  Bathrooms
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
                  Furnished
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                {["Yes", "No", "Whatever"].map((data, index) => (
                  // <Grid xs={6} sm={6} md={6} lg={3} xl={3} key={index}>
                  <Button
                    key={index}
                    onClick={() => setFurnished(data)}
                    sx={{
                      background: `${
                        data === furnished ? "#7450F0" : "transparent"
                      }`,
                      borderRadius: "56px",
                      // width: "100%",
                      color: `${data === furnished ? "#ffffff" : "#32414C"}`,
                      border: `${
                        data === furnished ? "" : "1px solid #9FAAB1"
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
                    {data}
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
                  Do you accept pets?
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                {["Yes", "No", "Whatever"].map((data, index) => (
                  // <Grid xs={6} sm={6} md={6} lg={3} xl={3} key={index}>
                  <Button
                    key={index}
                    onClick={() => setPets(data)}
                    sx={{
                      background: `${
                        data === pets ? "#7450F0" : "transparent"
                      }`,
                      borderRadius: "56px",
                      // width: "100%",
                      color: `${data === pets ? "#ffffff" : "#32414C"}`,
                      border: `${data === pets ? "" : "1px solid #9FAAB1"}`,
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
                    {data}
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
                  Close to the metro?
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                {["Yes", "No", "Whatever"].map((data, index) => (
                  // <Grid xs={6} sm={6} md={6} lg={3} xl={3} key={index}>
                  <Button
                    onClick={() => setCloseToTheMetro(data)}
                    key={index}
                    sx={{
                      background: `${
                        data === closeToTheMetro ? "#7450F0" : "transparent"
                      }`,
                      borderRadius: "56px",
                      // width: "100%",
                      color: `${
                        data === closeToTheMetro ? "#ffffff" : "#32414C"
                      }`,
                      border: `${
                        data === closeToTheMetro ? "" : "1px solid #9FAAB1"
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
                    {data}
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
                  Availability
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                {["Immediate", "Shortly", "Whatever"].map((data, index) => (
                  // <Grid xs={6} sm={6} md={6} lg={3} xl={3} key={index}>
                  <Button
                    key={index}
                    onClick={() => setAvailability(data)}
                    sx={{
                      background: `${
                        data === availability ? "#7450F0" : "transparent"
                      }`,
                      borderRadius: "56px",
                      // width: "100%",
                      color: `${data === availability ? "#ffffff" : "#32414C"}`,
                      border: `${
                        data === availability ? "" : "1px solid #9FAAB1"
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
                    {data}
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
                {(key === "condominium" ||
                  key === "amenities" ||
                  key === "wellbeing" ||
                  key === "appliances" ||
                  key === "rooms" ||
                  key === "accessibility") &&
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
                {(key === "condominium" ||
                  key === "amenities" ||
                  key === "wellbeing" ||
                  key === "appliances" ||
                  key === "rooms" ||
                  key === "accessibility") &&
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
                Cancel filter
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
                Apply filter
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

      <main className="section">
        <Navbar
          shape={false}
          paddingY={"1vh"}
          loginOpen={loginOpen}
          setLoginOpen={setLoginOpen}
          handleLoginClose={handleLoginClose}
          handleLoginOpen={handleLoginOpen}
          languageName={language}
          setMyValue={setMyValue}
          myValue={myValue}
        />
        <Grid
          container
          spacing={2}
          sx={{ px: 3, pb: 2, background: "#F9F9FB" }}
        >
          <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
            <SearchComponent
              marginY="6vh"
              handleSearch={handleSearch}
              handleSearchBtn={handleSearchBtn}
            />
            <Divider
              sx={{
                background: "#F9F9FB",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            />
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              sx={{ marginY: 2 }}
            >
              <Typography
                variant="p"
                sx={{
                  fontSize: "24px",
                  fontWeight: "600",
                  color: "#1A1859",
                }}
              >
                {`${t["property for sale in"]} ${
                  query?.location ? query?.location : ""
                }`}
              </Typography>
              <Typography
                variant="p"
                sx={{
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "#4B4B66",
                }}
              >
                {`${propertyData?.properties?.total} ${t["Properties found"]} `}
              </Typography>
            </Grid>
            <Box sx={{ borderBottom: "1px dashed #D3D3DF" }}></Box>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ marginTop: 2 }}
            >
              <Button
                onClick={toggleDrawer("left", true)}
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  textTransform: "none",
                  lineHeight: "17px",
                  background: "#0E97F7",
                  boxShadow: "0px 4px 24px rgba(26, 85, 181, 0.3)",
                  borderRadius: "4px",
                  color: "#ffffff",
                  display: "flex",
                  "&:hover": {
                    fontSize: "14px",
                    fontWeight: 600,
                    background: "#0E97F7",
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

              {/* <Autocomplete
                disablePortal
                sx={{
                  width: {
                    xs: "50%",
                    sm: "50%",
                    md: "50%",
                    lg: "25%",
                    xl: "20%",
                  },
                }}
                size="small"
                id="combo-box-demo"
                options={top100Films}
                renderInput={(params) => (
                  <TextField {...params} label="Most Relevant" />
                )}
              /> */}

              <BaseAutocomplete
                options={relevant || []}
                defaultValue={relevant[0]}
                getOptionLabel={(option) => option.label || ""}
                sx={{
                  width: {
                    xs: "50%",
                    sm: "50%",
                    md: "50%",
                    lg: "25%",
                    xl: "20%",
                  },
                }}
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
                size={"small"}
                placeholder={"Most Relevant"}
                onChange={(e, v, r, d) => handleRelevantValueChange(v)}
                value={relevantValue}
              />
            </Grid>
            <PropertyList propertyData={propertyData} isLoading={isLoading} />
            <Stack spacing={2} sx={{ marginY: 8 }}>
              <Pagination
                count={Math.ceil(propertyData?.properties?.total / 9) || 4}
                page={page}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
              />
            </Stack>
          </Grid>
          <Grid
            item
            className="base-map"
            xl={4}
            lg={4}
            sx={{
              display: {
                xs: "none",
                sm: "none",
                md: "none",
                lg: "inline",
                xl: "inline",
              },
            }}
          >
            <BaseGoogleMap height={"245vh"} markersData={propertyData} />
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

const relevant = [
  { value: "most_relevant", label: "Most Relevant" },
  { value: "latest", label: "Latest" },
  { value: "cheapest", label: "Cheapest" },
  { value: "most_expensive", label: "Most Expensive" },
];

export async function getServerSideProps(context) {
  const base_url = process.env.NEXT_PUBLIC_API_URL;
  const queryValue = context.query;

  var url = new URL(`${base_url}/api/property/index`),
    params = context.query;
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );
  // let now = Date.now()
  const res = await fetch(url);

  const data = await res.json();
  // console.log('getServerSideProps', data, Date.now() - now)
  const cookies = context.req.cookies["language"] || "pt";
  return {
    props: {
      propertyData: data,
      query: queryValue,
      language: cookies,
    },
  };
}
