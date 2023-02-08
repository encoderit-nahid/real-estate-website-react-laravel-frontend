import { Container } from "@mui/material";
import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import AutoAwesomeMotionOutlinedIcon from "@mui/icons-material/AutoAwesomeMotionOutlined";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import CabinOutlinedIcon from "@mui/icons-material/CabinOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import SignpostOutlinedIcon from "@mui/icons-material/SignpostOutlined";

function SliderViewMobile() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container maxWidth="sm">
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="icon label tabs example"
        variant="scrollable"
      >
        <Tab
          sx={{ minWidth: "60px" }}
          icon={<AutoAwesomeMotionOutlinedIcon />}
        />
        <Tab sx={{ minWidth: "60px" }} icon={<RedoOutlinedIcon />} />
        <Tab sx={{ minWidth: "60px" }} icon={<CabinOutlinedIcon />} />
        <Tab sx={{ minWidth: "60px" }} icon={<MapOutlinedIcon />} />
        <Tab sx={{ minWidth: "60px" }} icon={<SignpostOutlinedIcon />} />
      </Tabs>
    </Container>
  );
}

export default SliderViewMobile;
