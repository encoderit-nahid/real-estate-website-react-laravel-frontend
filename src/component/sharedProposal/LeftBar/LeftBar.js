import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import AppsIcon from "@mui/icons-material/Apps";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Image from "next/image";
import Link from "next/link";
import { Avatar, Grid, ListItemButton, Typography } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import InputOutlinedIcon from "@mui/icons-material/InputOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { useRouter } from "next/router";
import logo from "../../../../public/Images/logo.png";
import person from "../../../../public/Images/person.png";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";

function LeftBar(props) {
  const router = useRouter();
  const { handleDrawerToggle, mobileOpen, drawerWidth, isDarkModeClose } =
    props;
  const { window } = props;
  const theme = createTheme({
    typography: {
      fontFamily: ["Lato", "Inter", "sans-serif"].join(","),
    },
  });

  const data = [
    {
      icon: <CampaignOutlinedIcon />,
      label: "properties",
      route: "my_properties",
    },
    {
      icon: <ArticleOutlinedIcon />,
      label: "Proposals",
      route: "proposals",
    },
    {
      icon: <StarBorderOutlinedIcon />,
      label: "Schedules",
      route: "schedules",
    },
    {
      icon: <PersonOutlineOutlinedIcon />,
      label: "Brokers",
      route: "brokers",
    },
    { icon: <HelpOutlineOutlinedIcon />, label: "FAQ", route: "faq" },
    { icon: <InputOutlinedIcon />, label: "Leave", route: "leave" },
  ];

  // const [selectedLabel, setSelectedLabel] = useState("properties");
  // console.log(selectedLabel);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // useEffect(() => {
  //   const name = router.pathname.split("/")[1];
  //   setSelectedLabel(name);
  //   console.log({ name });
  // }, [router.isReady, router.pathname]);

  // const handleListItemClick = (index, leftData) => {
  //   // const name = router.pathname.split("/")[1];
  //   setSelectedLabel(leftData.route);
  //   setSelectedIndex(index);
  //   // console.log({ name });
  // };

  const [selectedLabel, setSelectedLabel] = React.useState("");
  console.log(selectedLabel);

  React.useEffect(() => {
    // console.log(router.pathname)
    const name = router.pathname.split("/")[1];
    setSelectedLabel(name);
    console.log({ name });
  }, [router.isReady]);

  const handleListItemClick = (event, index, leftData) => {
    setSelectedIndex(index);
    router.push(`/${leftData.route}`);
  };

  const drawer = (
    <ThemeProvider theme={theme}>
      <Grid
        sx={{
          backgroundColor: `#FFFFFF`,
          boxShadow: "0px 4px 8px rgba(0, 33, 82, 0.08)",
          height: "100%",
        }}
      >
        <Box sx={{ pt: 2 }}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Link href="/">
              <a
                style={{
                  textDecoration: "none",
                  listStyle: "none",
                }}
              >
                <Box sx={{ cursor: "pointer" }}>
                  <Image height={30} width={120} src={logo} alt="logo" />
                </Box>
              </a>
            </Link>
            <Box sx={{ mt: 2 }}>
              <Avatar />
            </Box>
            <Typography
              variant="p"
              sx={{
                color: "#002152",
                fontWeight: "600",
                fontSize: "16px",
                lineHeight: "22px",
                mt: 2,
              }}
            >
              Jerome Bell
            </Typography>
            <Typography
              variant="p"
              sx={{
                color: "#9FAAB1",
                fontWeight: "400",
                fontSize: "14px",
                lineHeight: "18px",
                mt: 2,
              }}
            >
              Jerome@example.com
            </Typography>
          </Grid>
        </Box>
        <List
          component="nav"
          aria-label="main mailbox folders"
          sx={{ height: "55%", mt: 3 }}
        >
          {data?.map((leftData, index) => (
            <Link key={index} href={`/${leftData?.route}`}>
              <ListItemButton
                className="btn-leftbar"
                selected={selectedLabel === leftData.route}
                onClick={(event) => handleListItemClick(event, index, leftData)}
                to={`/${leftData?.route}`}
                sx={{
                  marginLeft: 2,
                  mt: 1,

                  "&:hover": {
                    borderRight: "3px solid #7450F0",
                  },
                  "&.Mui-selected": {
                    borderRight: "3px solid #7450F0",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: `${
                      selectedLabel === leftData.route ? "#7450F0" : "#9FAAB1"
                    }`,
                    minWidth: 0,
                    paddingRight: 1,
                  }}
                >
                  {leftData.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="p"
                      sx={{
                        listStyle: "none",
                        textDecoration: "none",
                        margin: 0,
                        padding: 0,
                        fontWeight: `${
                          selectedLabel === leftData.route ? "600" : "400"
                        }`,
                        fontSize: "16px",
                        color: `${
                          selectedLabel === leftData.route
                            ? "#7450F0"
                            : "#9FAAB1"
                        }`,
                        lineHeight: "22px",
                      }}
                    >
                      {leftData.label}
                    </Typography>
                  }
                  sx={{ color: "#FFFFFF" }}
                />
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Grid>
    </ThemeProvider>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
}

LeftBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default LeftBar;
