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
import { useSession, signIn, signOut } from "next-auth/react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { FormControl, InputLabel, Popover, Select } from "@mui/material";
import { useRouter } from "next/router";
import en from "../../../../locales/en";
import pt from "../../../../locales/pt";
import SetCookie from "@/hooks/setCookie";
import GetCookie from "@/hooks/getCookie";
import { languageChangeApi } from "@/api";
// import { getCookies, setCookie, deleteCookie, getCookie } from 'cookies-next'

function Navbar({
  shape,
  paddingY,
  loginOpen,
  setLoginOpen,
  handleLoginOpen,
  handleLoginClose,
  language,
  languageName,
  setMyValue,
  myValue,
}) {
  const { data: session } = useSession();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // const languageName = GetCookie('language')?.toString()

  // const [myValue, setMyValue] = useState(languageName || 'en')

  // React.useEffect(() => {
  // 	console.log('myValue', myValue)
  // 	SetCookie('language', myValue)
  // }, [myValue])

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
  const handleLogout = () => {
    localStorage.clear();
    signOut();
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // React.useEffect(() => {
  // 	Cookies.set('language', myValue, { expires: 1 })
  // }, [myValue])

  // //add_login_modal
  // const [loginOpen, setLoginOpen] = useState(false);
  // const handleLoginOpen = () => setLoginOpen(true);
  // const handleLoginClose = () => setLoginOpen(false);

  // const router = useRouter()
  // const { locale } = router
  // console.log('r', router)
  const locale = myValue.toString();

  const t = locale === "en" ? en : pt;

  const pagesData = [
    { name: t["search real estate"], page: "search_real_estate" },
    { name: t["I am broker"], page: "broker" },
    { name: t["I am owner"], page: "advertise" },
    // { name: "blog", page: "blog" },
  ];

  // const changeLanguage = (e) => {
  // 	const locale = e.target.value
  // 	setMyValue(e.target.value)

  // }

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
            <a
              style={{
                textDecoration: "none",
                listStyle: "none",
              }}
            >
              <Box
                sx={{
                  display: { xs: "none", md: "none", lg: "flex" },
                  cursor: "pointer",
                }}
              >
                <Image src={logoIcon} height={25} width={110} alt="logo" />
              </Box>
            </a>
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
                <Link
                  href={{
                    pathname: `/${data.page}`,
                    query: data.page === "search_real_estate" && {
                      status: "approved",
                      page: 1,
                      per_page: 9,
                    },
                  }}
                  key={index}
                >
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
                name={!session ? t["login"] : session?.user?.name}
                margin={"0 0 0 1vh"}
                handleFunction={!session ? handleLoginOpen : handleClick}
              />
            </Menu>
          </Box>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
              display: { xs: "flex", md: "flex", lg: "none" },
              mr: 1,
            }}
          >
            <Link href="/">
              <a
                style={{
                  textDecoration: "none",
                  listStyle: "none",
                  cursor: "pointer",
                }}
              >
                <Image src={logoIcon} height={25} width={100} alt="logo" />
              </a>
            </Link>
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
              <Link
                href={{
                  pathname: `/${data.page}`,
                  query: data.page === "search_real_estate" && {
                    status: "approved",
                    page: 1,
                    per_page: 9,
                  },
                }}
                key={index}
              >
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
                      "&:hover": {
                        background: "transparent",
                      },
                    }}
                  >
                    {data?.name}
                  </Button>
                </a>
              </Link>
            ))}
            {session ? (
              <Button
                sx={{ display: "flex", textTransform: "none" }}
                onClick={handleClick}
              >
                <PersonOutlineOutlinedIcon sx={{ color: "#1A1859" }} />
                <Typography
                  variant="p"
                  sx={{
                    color: `${"#1A1859"}`,
                    fontSize: "16px",
                  }}
                >
                  {session.user.name}
                </Typography>
              </Button>
            ) : (
              <BaseButton
                name={t.login}
                handleFunction={!session ? handleLoginOpen : handleLogout}
                shape={shape}
                fontSize={"12px"}
              />
            )}
          </Grid>
          
        </Toolbar>
        <BaseModal isShowing={loginOpen} isClose={handleLoginClose}>
          <Tooltip title="Something">
            <>
              <LoginModal
                handleLoginClose={handleLoginClose}
                myValue={myValue}
              />
            </>
          </Tooltip>
        </BaseModal>
      </Container>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography
          sx={{
            px: 2,
            py: 0.5,
            cursor: "pointer",
            "&:hover": {
              background: "#e0f2fe",
            },
          }}
          onClick={handleLogout}
        >
          {t["Log out"]}
        </Typography>
        <Link
          href={{
            pathname: "/my_properties",
            query: {
              page: 1,
              per_page: 9,
            },
          }}
        >
          <Typography
            sx={{
              px: 2,
              py: 0.5,
              cursor: "pointer",
              "&:hover": {
                background: "#e0f2fe",
              },
            }}
          >
            painel
          </Typography>
        </Link>
      </Popover>
    </AppBar>
  );
}
export default Navbar;
