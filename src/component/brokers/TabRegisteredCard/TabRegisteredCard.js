import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import React from "react";
import brokerImage from "../../../../public/Images/broker-image.png";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneEnabledOutlinedIcon from "@mui/icons-material/PhoneEnabledOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import Image from "next/image";
import { useState } from "react";
import dayjs from "dayjs";
import pt from "locales/pt";
import en from "locales/en";
import { _imageURL } from "consts";
import Link from "next/link";
import BaseCloseButton from "@/component/reuseable/baseCloseButton/BaseCloseButton";
import { useDispatch } from "react-redux";
import { deleteBroker } from "@/redux/broker/actions";
import { useSession } from "next-auth/react";
import { useBrokerDeleteMutation } from "@/queries/useBrokerDeleteMutation";

function TabRegisteredCard({
  brokerInfo,
  languageName,
  brokerCountRefetch,
  refetch,
  page,
}) {
  const t = languageName === "en" ? en : pt;
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const myLoader = ({ src }) => {
    return `${_imageURL}/${src}`;
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const mutation = useBrokerDeleteMutation(page);

  const handleDeleteBroker = async (id) => {
    const body = {
      broker_id: id,
    };
    mutation.mutate(body, {
      onError(error) {
        console.log(error);
      },
      onSuccess: async (data) => {
        await refetch();
        await brokerCountRefetch();
      },
    });
  };

  return (
    <Box sx={{ background: "#ffffff", borderRadius: "8px" }}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ px: 1.5, py: 1 }}
      >
        <Box>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                {brokerInfo?.attachments[0]?.file_path ? (
                  <Image
                    loader={myLoader}
                    src={`${brokerInfo?.attachments[0]?.file_path}`}
                    alt="brokerImahe"
                    height={70}
                    width={70}
                    style={{ borderRadius: "50px" }}
                  />
                ) : (
                  <Avatar />
                )}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "16px",
                    fontWeight: 700,
                    lineHeight: "22px",
                    color: "#6C7A84",
                  }}
                >
                  0
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "18px",
                      color: "#6C7A84",
                    }}
                  >
                    (0 reviews)
                  </span>
                </Typography>
              }
              secondary={<Rating name="size-large"  readOnly />}
            />
          </ListItem>
        </Box>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ px: 1.5, py: 1 }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#002152",
            fontWeight: "700",
            fontSize: "16px",
            lineHeight: "22px",
            pl: 0.5,
          }}
        >
          {brokerInfo?.name}
        </Typography>
        <Button
          sx={{
            display: "flex",
            padding: 0,
            textTransform: "none",
            mt: 2,
            "&:hover": {
              background: "transparent",
            },
          }}
        >
          <AssignmentOutlinedIcon sx={{ color: "#6C7A84" }} />
          <Typography
            variant="h6"
            sx={{
              color: "#6C7A84",
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "22px",
            }}
          >
            {`CRECI ${brokerInfo?.additional_info?.creci_number}`}
          </Typography>
        </Button>
        <Button
          sx={{
            display: "flex",
            padding: 0,
            textTransform: "none",
            mt: 2,
            "&:hover": {
              background: "transparent",
            },
          }}
        >
          <EmailOutlinedIcon sx={{ color: "#6C7A84" }} />
          <Typography
            variant="h6"
            sx={{
              color: "#6C7A84",
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "22px",
            }}
          >
            {brokerInfo?.email}
          </Typography>
        </Button>
        <Button
          sx={{
            display: "flex",
            padding: 0,
            textTransform: "none",
            mt: 2,
            "&:hover": {
              background: "transparent",
            },
          }}
        >
          <PhoneEnabledOutlinedIcon sx={{ color: "#6C7A84" }} />
          <Typography
            variant="h6"
            sx={{
              color: "#6C7A84",
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "22px",
            }}
          >
            {brokerInfo?.phone}
          </Typography>
        </Button>
      </Grid>
      <Box sx={{ px: 1.5, mt: 2 }}>
        <Link
          href={`/visualizacao-de-detalhes-do-corretor/${
            brokerInfo?.id
          }/${encodeURIComponent(brokerInfo?.name.replace(/-/g, " "))}`}
        >
          <a>
            <Button
              fullWidth
              onClick={toggleDrawer("right", true)}
              sx={{
                background: "#DBE1E5",
                color: "#002152",
                fontWeight: "600",
                fontSize: "14px",
                lineHeight: "18px",
                textTransform: "none",
                mb: 2,
                "&:hover": {
                  background: "#DBE1E5",
                  color: "#002152",
                },
              }}
            >
              {t["See all data"]}
            </Button>
          </a>
        </Link>
      </Box>
      {session?.user?.role === "admin" && (
        <Box sx={{ px: 1.5 }}>
          <Button
            fullWidth
            onClick={() => handleDeleteBroker(brokerInfo?.id)}
            sx={{
              background: "#ffffff",
              color: "#F44336",
              fontWeight: "600",
              fontSize: "14px",
              lineHeight: "18px",
              textTransform: "none",
              mb: 2,
              "&:hover": {
                background: "#ffffff",
                color: "#F44336",
              },
            }}
          >
            Excluir
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default TabRegisteredCard;
