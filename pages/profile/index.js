import dynamic from "next/dynamic";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
const UserUpdateForm = dynamic(
  () => import("@/component/user/update/UserUpdateForm"),
  {
    ssr: false,
  }
);
import { _baseURL } from "../../consts";
import { useDispatch, useSelector } from "react-redux";

import en from "locales/en";
import pt from "locales/pt";
import { findStateData } from "@/redux/state/actions";

const drawerWidth = 240;

export default function Index({ language }) {
  const [myValue, setMyValue] = useState(language || "pt");

  const t = myValue === "en" ? en : pt;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findStateData());
  }, [dispatch]);

  const allStateData = useSelector((state) => state.state.stateData);
  console.log("🟥 ~ Index ~ allStateData:", allStateData);

  return (
    <Box
      sx={{
        flexGrow: 1,
        background: "#F2F5F6",
        minHeight: "100vh",
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        paddingX: { xs: 0, sm: 0, md: 6, lg: 6, xl: 6 },
        paddingTop: { xs: 6, sm: 6, md: 6, lg: 8, xl: 3 },
        paddingBottom: { xs: 3, sm: 3, md: 3, lg: 4, xl: 3 },
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Typography
          variant="p"
          sx={{
            color: "#002152",
            fontSize: "24px",
            fontWeight: "700",
            lineHeight: "32px",
            ml: { xs: 4, sm: 4, md: 0, lg: 0, xl: 0 },
            mt: { xs: 1, sm: 1, md: 0, lg: 0, xl: 0 },
          }}
        >
          {t["profile"]}
        </Typography>
      </Grid>
      <UserUpdateForm />
    </Box>
  );
}
