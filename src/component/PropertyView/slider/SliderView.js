import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Image from "next/image";
import home from "../../../../public/Images/Rectangle 1814.svg";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function SliderView() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        // height: 224,
      }}
    >
      <Tabs
        className="slider-tab"
        orientation="vertical"
        variant="scrollable"
        // value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        // sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab
          label="Photos"
          sx={{
            fontSize: "14px",
            color: "#4B4B66",
            fontWeight: "400",
            px: 3,
            py: 2,
            mt: 1,
            textTransform: "none",
            width: `${value === 0 ? "20vh" : "15vh"}`,
            boxShadow: `${
              value === 0 ? "0px 4px 24px rgba(69, 38, 177, 0.13)" : ""
            }`,
            borderLeft: `${value === 0 ? "2px solid #0E97F7" : ""}`,
            clipPath: `${
              value === 0
                ? "polygon(0% 0%, 90% 0, 100% 50%, 91% 100%, 0% 100%)"
                : ""
            }`,
            borderRight: `${value === 0 ? "2px solid #F9F9FB" : ""}`,
            borderBottom: `${value === 0 ? "2px solid #F9F9FB" : ""}`,
            borderTop: `${value === 0 ? "2px solid #F9F9FB" : ""}`,
          }}
          {...a11yProps(0)}
        />
        <Tab
          sx={{
            textTransform: "none",
            width: `${value === 1 ? "20vh" : "15vh"}`,
            boxShadow: `${
              value === 1 ? "0px 4px 24px rgba(69, 38, 177, 0.13)" : ""
            }`,
            borderLeft: `${value === 1 ? "2px solid #0E97F7" : ""}`,
            clipPath: `${
              value === 1
                ? "polygon(0% 0%, 90% 0, 100% 50%, 91% 100%, 0% 100%)"
                : ""
            }`,
            borderRight: `${value === 1 ? "2px solid #F9F9FB" : ""}`,
            borderBottom: `${value === 1 ? "2px solid #F9F9FB" : ""}`,
            borderTop: `${value === 1 ? "2px solid #F9F9FB" : ""}`,
          }}
          label="360 vision"
          {...a11yProps(1)}
        />
        <Tab
          sx={{
            textTransform: "none",
            width: `${value === 2 ? "20vh" : "15vh"}`,
            boxShadow: `${
              value === 2 ? "0px 4px 24px rgba(69, 38, 177, 0.13)" : ""
            }`,
            borderLeft: `${value === 2 ? "2px solid #0E97F7" : ""}`,
            clipPath: `${
              value === 2
                ? "polygon(0% 0%, 90% 0, 100% 50%, 91% 100%, 0% 100%)"
                : ""
            }`,
            borderRight: `${value === 2 ? "2px solid #F9F9FB" : ""}`,
            borderBottom: `${value === 2 ? "2px solid #F9F9FB" : ""}`,
            borderTop: `${value === 2 ? "2px solid #F9F9FB" : ""}`,
          }}
          label="Condominium"
          {...a11yProps(2)}
        />
        <Tab
          sx={{
            textTransform: "none",
            width: `${value === 3 ? "20vh" : "15vh"}`,
            boxShadow: `${
              value === 3 ? "0px 4px 24px rgba(69, 38, 177, 0.13)" : ""
            }`,
            borderLeft: `${value === 3 ? "2px solid #0E97F7" : ""}`,
            clipPath: `${
              value === 3
                ? "polygon(0% 0%, 90% 0, 100% 50%, 91% 100%, 0% 100%)"
                : ""
            }`,
            borderRight: `${value === 3 ? "2px solid #F9F9FB" : ""}`,
            borderBottom: `${value === 3 ? "2px solid #F9F9FB" : ""}`,
            borderTop: `${value === 3 ? "2px solid #F9F9FB" : ""}`,
          }}
          label="Location"
          {...a11yProps(3)}
        />
        <Tab
          sx={{
            textTransform: "none",
            width: `${value === 4 ? "20vh" : "15vh"}`,
            boxShadow: `${
              value === 4 ? "0px 4px 24px rgba(69, 38, 177, 0.13)" : ""
            }`,
            borderLeft: `${value === 4 ? "2px solid #0E97F7" : ""}`,
            clipPath: `${
              value === 4
                ? "polygon(0% 0%, 90% 0, 100% 50%, 91% 100%, 0% 100%)"
                : ""
            }`,
            borderRight: `${value === 4 ? "2px solid #F9F9FB" : ""}`,
            borderBottom: `${value === 4 ? "2px solid #F9F9FB" : ""}`,
            borderTop: `${value === 4 ? "2px solid #F9F9FB" : ""}`,
          }}
          label="Street view"
          {...a11yProps(4)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Image src={home} alt="home" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Image src={home} alt="home" />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Image src={home} alt="home" />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Image src={home} alt="home" />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Image src={home} alt="home" />
      </TabPanel>
    </Box>
  );
}

export default SliderView;
