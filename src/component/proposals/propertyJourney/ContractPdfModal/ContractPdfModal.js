import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  TextareaAutosize,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import logoIcon from "../../../../../public/Images/logo.png";
import { styled, useTheme } from "@mui/material/styles";

import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import dynamic from "next/dynamic";
const PDFViewer = dynamic(
  () => import("../../../reuseable/PDFComponent/pdf-viewer"),
  {
    ssr: false,
  }
);
const drawerWidth = 300;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  // top:{xs:"80%"},
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", sm: "95%", md: "95%", lg: "90%", xl: "75%" },
  bgcolor: "#ffffff",
  // border: "2px solid #000",
  boxShadow: "none",
  borderRadius: "4px",
  maxHeight: "85vh",
  overflowY: "scroll",
  //   px: 0,
  //   py: 1,
};

function ContractPdfModal({ handleClose }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={style}>
      {/* <Box sx={{ background: "#ffffff", border: "1px solid #DBE1E5" }}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 2, px: 2 }}
        >
          <Box>
            <Image src={logoIcon} height={25} width={110} alt="logo" />
          </Box>
          <Box>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#002152",
                fontSize: "16px",
                fontWeight: "600",
                color: "#002152",
                textTransform: "none",
                paddingX: 4,
                paddingY: 0.6,
                mr: 3,
                "&:hover": {
                  borderColor: "#002152",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#002152",
                  textTransform: "none",
                  paddingX: 4,
                  paddingY: 0.6,
                },
              }}
            >
              Download
            </Button>
            <CloseIcon onClick={handleClose} />
          </Box>
        </Grid>
        <div>
          <PDFViewer />
        </div>
      </Box> */}
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #DBE1E5",
            boxShadow: "none",
          }}
          open={open}
        >
          <Toolbar>
            <Box>
              <Image src={logoIcon} height={25} width={110} alt="logo" />
            </Box>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              sx={{ ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Main open={open}>
          <DrawerHeader />
          <PDFViewer />
        </Main>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
          variant="persistent"
          anchor="right"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {/* {theme.direction === "rtl" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )} */}
              <CloseIcon
                sx={{
                  display: {
                    xs: "inline",
                    sm: "inline",
                    md: "inline",
                    lg: "none",
                  },
                }}
              />
            </IconButton>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#002152",
                  fontSize: "14px",
                  lineHeight: "18px",
                  fontWeight: "600",
                  color: "#002152",
                  textTransform: "none",
                  paddingX: 4,
                  paddingY: 0.6,
                  display: { xs: "none", sm: "none", md: "none", lg: "inline" },
                  mr: 3,
                  "&:hover": {
                    borderColor: "#002152",
                    fontSize: "14px",
                    lineHeight: "18px",
                    fontWeight: "600",
                    color: "#002152",
                    textTransform: "none",
                    paddingX: 4,
                    paddingY: 0.6,
                  },
                }}
              >
                Download
              </Button>
              <CloseIcon
                onClick={handleClose}
                sx={{
                  display: { xs: "none", sm: "none", md: "none", lg: "inline" },
                }}
              />
            </Grid>
          </DrawerHeader>
          <Divider />
          <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
    </Box>
  );
}

export default ContractPdfModal;
