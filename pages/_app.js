import "../styles/globals.css";
import "@fontsource/lato";

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { SessionProvider } from "next-auth/react"

function MyApp({ Component,  pageProps: { session, ...pageProps }, }) {
  const theme = createTheme({
    typography: {
      fontFamily: ["Lato", "sans-serif", "Inter"].join(","),
    },

    breakpoints: {
      values: {
        xs: 0,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        xxl: 1536,
      },
    },
  });
  //add_login_modal
  const [loginOpen, setLoginOpen] = useState(false);
  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SessionProvider session={session} refetchInterval={5 * 60}>
      <Component
        {...pageProps}
        loginOpen={loginOpen}
        setLoginOpen={setLoginOpen}
        handleLoginClose={handleLoginClose}
        handleLoginOpen={handleLoginOpen}
      />
       </SessionProvider>
    </ThemeProvider>
  );
}

export default MyApp;
// import { useRouter } from "next/router";
// import { useEffect } from "react";
// import "@fontsource/tajawal";

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

// export default MyApp;
