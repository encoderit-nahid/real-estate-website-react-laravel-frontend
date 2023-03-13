import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import logoIcon from "../../../../public/Images/logo.png";
import Image from "next/image";
import BaseButton from "../../reuseable/button/BaseButton";
import { useState } from "react";
import BaseModal from "../../reuseable/baseModal/BaseModal";
import LoginModal from "../../login/loginModal/LoginModal";
import Link from "next/link";

const pages = ["search Real estate", "I am broker", "I am Owner", "blog"];
const pagesData = [
  { name: "search real estate", page: "search_real_estate" },
  { name: "I am broker", page: "broker" },
  { name: "I am Owner", page: "advertise" },
  { name: "blog", page: "blog" },
];

function Navbar({
  shape,
  paddingY,
  loginOpen,
  setLoginOpen,
  handleLoginOpen,
  handleLoginClose,
}) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // //add_login_modal
  // const [loginOpen, setLoginOpen] = useState(false);
  // const handleLoginOpen = () => setLoginOpen(true);
  // const handleLoginClose = () => setLoginOpen(false);

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        color: "#1A1859",
        boxShadow: "none",
        paddingRight: 10,

        paddingY: paddingY,
      }}
    >
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          <Link href="/">
            <Box sx={{ display: { xs: "none", md: "none", lg: "flex" } }}>
              <Image src={logoIcon} height={25} width={110} alt="logo" />
            </Box>
          </Link>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "flex", lg: "none" },
              mr: 1,
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "block", lg: "none" },
              }}
            >
              {pagesData?.map((data, index) => (
                <Link href={`/${data.page}`} key={index}>
                  <a
                    style={{
                      textDecoration: "none",
                      listStyle: "none",
                      width: "100%",
                    }}
                  >
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center" sx={{ color: "#1A1859" }}>
                        {data?.name}
                      </Typography>
                    </MenuItem>
                  </a>
                </Link>
              ))}
              <BaseButton
                name={"Login"}
                margin={"0 0 0 1vh"}
                handleFunction={handleLoginOpen}
              />
            </Menu>
          </Box>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ display: { xs: "flex", md: "flex", lg: "none" }, mr: 1 }}
          >
            <Image src={logoIcon} height={25} width={100} alt="logo" />
          </Grid>
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography> */}
          {/* <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box> */}

          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{
              display: { xs: "none", md: "none", lg: "flex" },
            }}
          >
            {pagesData?.map((data, index) => (
              <Link href={`/${data.page}`} key={index}>
                <a
                  style={{
                    textDecoration: "none",
                    listStyle: "none",
                  }}
                >
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: `${shape ? "#ffffff" : "#1A1859"}`,
                      display: "block",
                      textTransform: "none",
                      fontSize: "16px",
                    }}
                  >
                    {data?.name}
                  </Button>
                </a>
              </Link>
            ))}
            <BaseButton
              name={"Login"}
              handleFunction={handleLoginOpen}
              shape={shape}
              fontSize={"12px"}
            />
          </Grid>
        </Toolbar>
        <BaseModal isShowing={loginOpen} isClose={handleLoginClose}>
          <Tooltip title="Something">
            <>
              <LoginModal handleLoginClose={handleLoginClose} />
            </>
          </Tooltip>
        </BaseModal>
      </Container>
    </AppBar>
  );
}
export default Navbar;
