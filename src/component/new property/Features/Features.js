import {
  Box,
  Button,
  CircularProgress,
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
function Features({ featuretypes, setFeatureTypes, errors }) {
  const [item, setItem] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findButtonData());
  }, [dispatch]);

  const featureData = useSelector((state) => state.featureButton?.buttonData);

  const loading = useSelector((state) => state.featureButton?.loading);

  useEffect(() => {
    if (featuretypes.length > 0) {
      delete errors.features;
    }
  }, [featuretypes, errors]);

  const handleAddFeature = () => {
    if (item.length > 0) {
      console.log(item);
      dispatch(featureDataCreate({ name: item, type: "feature" }));
      dispatch(findButtonData());
    }
  };

  const FeatureAddLoading = useSelector(
    (state) => state?.featureButton?.buttonData
  );
  console.log({ FeatureAddLoading });

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
          Features
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
          Select property features:
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
          {featureData?.features?.map((data, index) => (
            <Grid item xs={4} sm={4} md={4} lg={3} xl={3} key={index}>
              <Button
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
                    featuretypes?.includes(data.id) ? "#7450F0" : "transparent"
                  }`,
                  borderRadius: "56px",
                  width: "100%",
                  color: `${
                    featuretypes?.includes(data.id) ? "#ffffff" : "#32414C"
                  }`,
                  border: `${
                    featuretypes?.includes(data.id) ? "" : "1px solid #9FAAB1"
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
                    color: "#ffffff",
                    border: `${index === 0 ? "" : "1px solid #9FAAB1"}`,
                    width: "100%",
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
            </Grid>
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
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ mt: 3 }}
      >
        <BaseTextField
          sx={{ width: "50%" }}
          placeholder={"Add feature"}
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
    </Box>
  );
}

export default Features;
