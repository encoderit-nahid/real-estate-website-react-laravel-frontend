import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import buildingImage from "../../../../public/Images/buildingRed.png";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import BaseOutlinedZipInput from "../../reuseable/baseOutlinedZipInput/BaseOutlinedZipInput";
import { useDispatch, useSelector } from "react-redux";

import BaseTextField from "../../reuseable/baseTextField/BaseTextField";
import {
  featureDataCreate,
  findButtonData,
} from "../../../redux/featureWithoutGroup/actions";
import { findFeatureData } from "../../../redux/features/actions";
import en from "locales/en";
import pt from "locales/pt";
import { useSession } from "next-auth/react";
import BaseAutocomplete from "@/component/reuseable/baseAutocomplete/BaseAutocomplete";

function Features({
  featuretypes,
  setFeatureTypes,
  errors,
  languageName,
  handleNext,
  handleBack,
  reset,
  replace,
}) {
  const t = languageName === "en" ? en : pt;

  const [featureSelectData, setFeatureSelectData] = useState(null);
  const { data: session } = useSession();
  const [item, setItem] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findFeatureData());
  }, [dispatch]);

  const featureData = useSelector((state) => state.feature.featureData);
  console.log({ featureData });

  const loading = useSelector((state) => state.feature?.loading);

  useEffect(() => {
    if (featuretypes.length > 0) {
      delete errors.features;
    }
  }, [featuretypes, errors]);

  const handleAddFeature = async () => {
    if (item.length > 0) {
      await dispatch(
        featureDataCreate({ name: item, type: featureSelectData?.name })
      );
      await dispatch(findFeatureData());
    }
  };

  const [disableBtn, setDisableBtn] = useState(true);
  useEffect(() => {
    if (featuretypes?.length > 0) {
      setDisableBtn(false);
    }
    if (featuretypes?.length < 1) {
      setDisableBtn(true);
    }
  }, [featuretypes]);

  return (
    <Box sx={{ mt: 4 }}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Image height={40} width={40} src={buildingImage} alt="building" />
        <Typography
          variant="p"
          sx={{
            color: "#002152",
            fontSize: "24px",
            fontWeight: "700",
            lineHeight: "32px",
            ml: 1,
          }}
        >
          {t["Features"]}
        </Typography>
      </Grid>
      <Box sx={{ mt: 2 }}>
        <Typography
          variant="p"
          sx={{
            color: "#002152",
            fontSize: "16px",
            fontWeight: "400",
            lineHeight: "22px",
          }}
        >
          {`${t["select property features"]}:`}
        </Typography>
      </Box>
      {loading ? (
        <Grid
          container
          sx={{ height: "60vh" }}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress sx={{ color: "#22d3ee" }} />
        </Grid>
      ) : (
        <Grid container spacing={1} sx={{ mt: 2 }}>
          {Object.keys(featureData).map((key, index) => (
            <Box key={index}>
              <Typography
                variant="p"
                sx={{
                  color: "#4B4B66",
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "19px",
                }}
              >
                {
                  t[
                    (key === "condominium" ||
                      key === "accessibility" ||
                      key === "amenities" ||
                      key === "appliances" ||
                      key === "room" ||
                      key === "rooms" ||
                      key === "sorrounding" ||
                      key === "wellbeing" ||
                      key === "feature") &&
                      key
                  ]
                }
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
                            ? "#FFFFFF"
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
                          md: "16px",
                          lg: "13px",
                          xl: "16px",
                        },
                        fontWeight: "400",
                        lineHeight: "22px",
                        textTransform: "none",
                        px: { xs: 0, sm: 2, md: 2, lg: 2, xl: 2 },
                        py: 1,
                        "&:hover": {
                          background: "#7450F0",
                          borderRadius: "56px",
                          color: "#FFFFFF",
                          border: `${index === 0 ? "" : "1px solid #9FAAB1"}`,
                          // width: "100%",
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
                          px: { xs: 0, sm: 2, md: 2, lg: 2, xl: 2 },
                          py: 1,
                        },
                      }}
                    >
                      {data?.name?.slice(0, 20)}
                    </Button>
                  ))}
              </Grid>
              <Divider sx={{ mt: 1, mb: 1 }} />
            </Box>
          ))}
        </Grid>
      )}

      <Typography
        variant="inherit"
        color="textSecondary"
        sx={{ color: "#b91c1c" }}
      >
        {errors?.features?.message}
      </Typography>
      {session?.user?.role === "admin" && (
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{ mt: 3 }}
        >
          <BaseTextField
            sx={{ width: "35%" }}
            placeholder={t["Add feature"]}
            onChange={(e) => setItem(e.target.value)}
          />
          <BaseAutocomplete
            //   sx={{ margin: "0.6vh 0" }}
            options={featureTypeData || []}
            getOptionLabel={(option) => option.name || ""}
            sx={{ ml: 1, width: "35%" }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            size={"large"}
            placeholder={"Feature Type"}
            onChange={(e, v, r, d) => setFeatureSelectData(v)}
            value={featureSelectData}
          />
          <Button
            onClick={handleAddFeature}
            sx={{
              backgroundColor: "#0362F0",
              py: 2,
              ml: 1,
              borderRadius: "4px",
              "&:hover": {
                backgroundColor: "#0362F0",
                py: 2,
                ml: 1,
                borderRadius: "4px",
              },
            }}
          >
            <AddOutlinedIcon sx={{ color: "#ffffff" }} />
          </Button>
        </Grid>
      )}
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        sx={{ mt: 2, mb: 2 }}
      >
        <Button
          type="button"
          variant="outlined"
          color="error"
          sx={{
            fontSize: "16px",
            lineHeight: "22px",
            fontWeight: "600",
            textTransform: "none",
            py: 1,
            mr: 1,
          }}
          onClick={() => {
            reset();
            replace("/my-properties");
          }}
        >
          {t["Cancel"]}
        </Button>
        <Button
          color="inherit"
          onClick={handleBack}
          // disabled={activeStep === 0}
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
          {t["come back"]}
        </Button>

        <Button
          onClick={handleNext}
          disabled={disableBtn}
          sx={{
            background: "#7450F0",
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
              background: "#7450F0",
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
          {t["Next"]}
        </Button>
      </Grid>
    </Box>
  );
}

export default Features;

const featureTypeData = [
  { id: 1, name: "condominium" },
  { id: 2, name: "accessibility" },
  { id: 3, name: "amenities" },
  { id: 4, name: "appliances" },
  { id: 5, name: "room" },
  { id: 6, name: "sorrounding" },
  { id: 7, name: "wellbeing" },
  { id: 8, name: "feature" },
  { id: 9, name: "rooms" },
];
