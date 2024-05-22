import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("@/component/shared/Navbar/Navbar"));
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
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
const PropertyList = dynamic(() =>
  import("@/component/IAmOwner/propertyList/PropertyList")
);
const SearchComponent = dynamic(() =>
  import("@/component/reuseable/SearchComponent/SearchComponent")
);
const BaseOutlinedCurrencyInput = dynamic(() =>
  import(
    "@/component/reuseable/baseOutlinedCurrencyInput/BaseOutlinedCurrencyInput"
  )
);
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

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
import BaseOutlinedAreaInput from "@/component/reuseable/baseOutlinedAreaInput/BaseOutlinedAreaInput";
import { userDetailsApi } from "@/api";
import SearchIcon from "@mui/icons-material/Search";
import useCurrentUser from "@/hooks/useCurrentUser";

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
  const [myValue, setMyValue] = useState(language || "pt");

  const t = myValue === "en" ? en : pt;

  useEffect(() => {
    userDetailsApi();
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, [propertyData]);

  const dispatch = useDispatch();
  const router = useRouter();
  const [pageSize, setPageSize] = React.useState(3);
  const [page, setPage] = React.useState(1);
  const [selectval, setSelectVal] = useState(null);
  const [proposalStatus, setProposalStatus] = useState("pending");
  const [journeyStage, setJourneyStage] = useState("contract");

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
      pathname: "/search-real-estate",
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
    setProposalStatus(searchParams?.proposal_status);
    setJourneyStage(searchParams.journey_stage);
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
      pathname: "/search-real-estate",
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
      proposal_status: proposalStatus,
      journey_stage: journeyStage,
    };
    // const fd = serialize(allFilterData, {
    //   indices: true,
    //   allowEmptyArrays: false,
    //   booleansAsIntegers: true,
    // });

    // const sp = new URLSearchParams(fd.entries());
    // const spEntries = Object.fromEntries(sp.entries());
    router.replace({
      pathname: "/search-real-estate",
      query: $params.encode(omitEmpties(allFilterData)).toString(),
    });
  };

  const handleCancelFilter = () => {
    router.replace({
      pathname: "/search-real-estate",
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
      pathname: "/search-real-estate",
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
            {t["filters"]}
          </Typography>
          <CloseIcon
            onClick={toggleDrawer(anchor, false)}
            sx={{ cursor: "pointer" }}
          />
        </Grid>

        <Box sx={{ mx: 2, mt: 3 }}>
          <Box sx={{ mt: 1, mb: 1 }}>
            <Controller
              name="all"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  placeholder="Search"
                  size="small"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          aria-label="Search by broker name"
                        >
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <Typography
              variant="p"
              sx={{
                color: "#6C7A84",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "18px",
              }}
            >
              You can search by broker,development or condominium
            </Typography>
          </Box>
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
              Proposal Status
            </Typography>

            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              gap={1}
              sx={{ mt: 2 }}
            >
              {[
                { name: "pending", slug: "Pending" },
                { name: "accepted", slug: "Accepted" },
              ].map((data, index) => (
                // <Grid xs={6} sm={6} md={6} lg={3} xl={3} key={index}>
                <Button
                  key={index}
                  onClick={() => setProposalStatus(data?.name)}
                  sx={{
                    background: `${
                      data?.name === proposalStatus ? "#7450F0" : "transparent"
                    }`,
                    borderRadius: "56px",
                    // width: "100%",
                    color: `${
                      data?.name === proposalStatus ? "#ffffff" : "#32414C"
                    }`,
                    border: `${
                      data?.name === proposalStatus ? "" : "1px solid #9FAAB1"
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
              Journey Stage
            </Typography>

            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              gap={1}
              sx={{ mt: 2 }}
            >
              {[
                { name: "contract", slug: "Contract" },
                { name: "certificates", slug: "Certificates and documents" },
                { name: "pre-analysis", slug: "Pre-analysis" },
                { name: "digital-notary", slug: "Digital notary" },
              ].map((data, index) => (
                // <Grid xs={6} sm={6} md={6} lg={3} xl={3} key={index}>
                <Button
                  key={index}
                  onClick={() => setJourneyStage(data?.name)}
                  sx={{
                    background: `${
                      data?.name === journeyStage ? "#7450F0" : "transparent"
                    }`,
                    borderRadius: "56px",
                    // width: "100%",
                    color: `${
                      data?.name === journeyStage ? "#ffffff" : "#32414C"
                    }`,
                    border: `${
                      data?.name === journeyStage ? "" : "1px solid #9FAAB1"
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
                max={30000000}
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
                        data?.name === pets ? "#7450F0" : "transparent"
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
                    <BaseOutlinedAreaInput
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
                    <BaseOutlinedAreaInput
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
                {(key === "condominium" ||
                  key === "accessibility" ||
                  key === "amenities" ||
                  key === "appliances" ||
                  key === "rooms" ||
                  key === "room" ||
                  key === "sorrounding" ||
                  key === "wellbeing" ||
                  key === "feature") &&
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
                  key === "accessibility" ||
                  key === "amenities" ||
                  key === "appliances" ||
                  key === "rooms" ||
                  key === "room" ||
                  key === "sorrounding" ||
                  key === "wellbeing" ||
                  key === "feature") &&
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
        <title>Lokkan - A imobiliária digital</title>
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
          colorLogo={true}
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
            <PropertyList
              propertyData={propertyData}
              isLoading={isLoading}
              handleLoginOpen={handleLoginOpen}
            />
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
  { value: "most_relevant", label: "mais relevante" },
  { value: "latest", label: "recentes" },
  { value: "cheapest", label: "mais barato" },
  { value: "most_expensive", label: "mais caro" },
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
