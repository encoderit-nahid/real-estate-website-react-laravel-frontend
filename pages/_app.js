import "../styles/globals.css";
import "@fontsource/lato";

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { configureStore } from "../src/redux/store";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useRouter } from "next/router";
import { _gaId } from "consts";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
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
        xxxl: 2100,
      },
    },
  });
  //add_login_modal
  const [loginOpen, setLoginOpen] = useState(false);
  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

  const router = useRouter();
  React.useEffect(() => {
    const handleRouteChange = (url) => {
      window.gtag("config", _gaId, {
        page_path: url,
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnmount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
      },
    },
    queryCache: new QueryCache({
      onError(error, query) {
        query.meta?.onError?.(error);
      },
      onSuccess(data, query) {
        query.meta?.onSuccess?.(data);
      },
    }),
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SessionProvider session={session} refetchInterval={5 * 60}>
        <QueryClientProvider client={queryClient}>
          <Provider store={configureStore()}>
            <Component
              {...pageProps}
              loginOpen={loginOpen}
              setLoginOpen={setLoginOpen}
              handleLoginClose={handleLoginClose}
              handleLoginOpen={handleLoginOpen}
            />
          </Provider>
        </QueryClientProvider>
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
