import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import logo from "../../public/Images/logo.png";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import NoEncryptionOutlinedIcon from "@mui/icons-material/NoEncryptionOutlined";
import accountIcon from "../../public/Images/account.png";
const ResponsiveDrawer = dynamic(() =>
  import("@/component/sharedProposal/ResponsiveDrawer/ResponsiveDrawer")
);
import {
  Avatar,
  Badge,
  Button,
  Chip,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";

import { useEffect, useState } from "react";
const Releases = dynamic(() =>
  import("@/component/properties/Releases/Releases")
);
const ThirdTab = dynamic(() => import("@/component/properties/Third/ThirdTab"));
const NewRegistration = dynamic(() =>
  import("@/component/properties/NewRegistration/NewRegistration")
);
const UserUpdateForm = dynamic(
  () => import("@/component/user/update/UserUpdateForm"),
  {
    ssr: false,
  }
);
import notifyImage from "../../public/Images/notify.png";
import Link from "next/link";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { _baseURL } from "../../consts";
import useChannel from "@/hooks/useChannel";
import Popover from "@mui/material/Popover";
import { useDispatch, useSelector } from "react-redux";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import {
  GetAllNotification,
  notificationAddPusherItem,
  notificationRemove,
} from "@/redux/all-notification/actions";
import {
  findNotificationCountData,
  notificationAddCount,
} from "@/redux/notificationCount/actions";
import { NOTIFICATION_ADD_COUNT } from "@/redux/notificationCount/types";
import { NotificationReadApi, omitEmpties, userDetailsApi } from "@/api";
import en from "locales/en";
import pt from "locales/pt";
import { findPropertyCountData } from "@/redux/propertyCount/actions";
import WishProperty from "@/component/properties/WishProperty/WishProperty";
import { useGetPropertyCountQuery } from "@/queries/useGetPropertyCountQuery";
import useParams from "@/hooks/useParams";
import { Controller, useForm } from "react-hook-form";
import BaseTextField from "@/component/reuseable/baseTextField/BaseTextField";
import BaseAutocomplete from "@/component/reuseable/baseAutocomplete/BaseAutocomplete";
import BaseOutlinedZipInput from "@/component/reuseable/baseOutlinedZipInput/BaseOutlinedZipInput";
import { findStateData } from "@/redux/state/actions";
import useCurrentUser from "@/hooks/useCurrentUser";

const drawerWidth = 240;

function onSubmit(data) {
  console.log("🟥 ~ onSubmit ~ onSubmit:", data);
}
function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Index({ language }) {
  // const {
  //   register,
  //   watch,
  //   control,
  //   handleSubmit,
  //   setValue,
  //   formState: { errors },
  //   setError,
  // } = useForm();
  // const allValues = watch();
  const [showPass, setShowPass] = useState(false);
  const [preview, setPreview] = useState();
  const handleClickShowPassword = () => {
    setShowPass(!showPass);
  };

  const [showRepeatPass, setShowRepeatPass] = useState(false);

  const handleClickShowRepeatPassword = () => {
    setShowRepeatPass(!showRepeatPass);
  };

  // useEffect(() => {
  //   if (!allValues.image) {
  //     setPreview(undefined);
  //     return;
  //   }

  //   const objectUrl = URL.createObjectURL(allValues.image);
  //   setPreview(objectUrl);

  //   // free memory when ever this component is unmounted
  //   return () => URL.revokeObjectURL(objectUrl);
  // }, [allValues.image]);

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
        //   backgroundColor: "#f6f8fc",
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
      <UserUpdateForm onSubmit={onSubmit} />
    </Box>
  );
}
