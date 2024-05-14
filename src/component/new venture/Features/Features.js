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

const PropertyFeature = [
  "close to the metro",
  "close to hospital",
  "silent street",
  "accept anials",
  "close to restaurants",
  "new property",
  "close to gyms",
  "close to pharmacies",

  "gas shower",
  "glass box",
  "hot tub",
  "service room",
  "service bathroom",
  "removable extra room",
  "gourmet balcony",
  "private pool",
  "barbecue grill",
  "football field",
  "lake",
  "heated pool",
  "fireplace",
  "furnish",
];
function Features({ featuretypes, setFeatureTypes, errors, languageName }) {
  const t = languageName === "en" ? en : pt;

  const { data: session } = useSession();
  const [item, setItem] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findFeatureData());
  }, [dispatch]);

  const featureData = useSelector((state) => state.feature.featureData);
  console.log({ featureData });

  const loading = useSelector((state) => state.featureButton?.loading);

  useEffect(() => {
    if (featuretypes.length > 0) {
      delete errors.features;
    }
  }, [featuretypes, errors]);

  const handleAddFeature = async () => {
    if (item.length > 0) {
      await dispatch(featureDataCreate({ name: item, type: "feature" }));
      await dispatch(findButtonData());
    }
  };

  const FeatureAddLoading = useSelector(
    (state) => state?.featureButton?.buttonData
  );

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
                  fontWeight: "400",
                  lineHeight: "19px",
                }}
              >
                {(key === "condominium" ||
                  key === "accessibility" ||
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
                {(key === "condominium" ||
                  key === "accessibility" ||
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
            sx={{ width: "50%" }}
            placeholder={t["Add feature"]}
            onChange={(e) => setItem(e.target.value)}
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
    </Box>
  );
}

export default Features;
