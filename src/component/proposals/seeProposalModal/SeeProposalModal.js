import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import loginImage from "../../../../public/Images/login.png";
import React from "react";
import Image from "next/image";
import BaseButton from "../../reuseable/button/BaseButton";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import rentImage from "../../../../public/Images/rentImage.png";
import avatar from "../../../../public/Images/AvatarPendant.png";
import BaseModal from "../../reuseable/baseModal/BaseModal";
import CounterProposalModal from "../counterProposalModal/counterProposalModal";
import { useState } from "react";
import { _baseURL, _imageURL } from "../../../../consts";
import { useRouter } from "next/router";
import { proposalRefuseData } from "../../../redux/proposalRefuse/actions";
import { findPropertyData } from "../../../redux/property/actions";
import { propertyAcceptData } from "../../../redux/proposalAccept/actions";
import { useDispatch, useSelector } from "react-redux";
import en from "locales/en";
import pt from "locales/pt";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  // top:{xs:"80%"},
  transform: "translate(-50%, -50%)",
  width: { xs: "80%", sm: "80%", md: "60%", lg: "25%", xl: "25%" },
  bgcolor: "#ffffff",
  // border: "2px solid #000",
  boxShadow: "none",
  borderRadius: "12px",
  maxHeight: "85vh",
  overflowY: "scroll",
  px: 0,
  py: 1,
};

function SeeProposalModal({
  handleSeeProposalClose,
  propertyData,
  proposalData,
  languageName,
}) {
  const dispatch = useDispatch();

  const t = languageName === "en" ? en : pt;
  //add_counter_proposal_modal
  const [counterProposalOpen, setCounterProposalOpen] = useState(false);
  const handleCounterProposalOpen = () => setCounterProposalOpen(true);
  const handleCounterProposalClose = () => setCounterProposalOpen(false);

  const [acceptid, setAcceptId] = useState("");
  const [refuseId, setRefuseId] = useState("");
  const { query } = useRouter();

  const handleProposalRefuse = (id) => {
    setRefuseId(id);
    dispatch(proposalRefuseData(propertyData?.id, id));
    dispatch(findPropertyData(query));
  };

  const handleProposalAccept = (id) => {
    setAcceptId(id);
    dispatch(
      propertyAcceptData({ property_id: propertyData?.id, proposal_id: id })
    );
    handleSeeProposalClose(true);
  };

  const acceptLoading = useSelector((state) => state?.propertyAccept?.loading);
  const refuseLoading = useSelector((state) => state?.proposalRefuse?.loading);

  const myLoader = ({ src }) => {
    return `${_imageURL}/${src}`;
  };

  return (
    <Box sx={style}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 2, px: 2 }}
      >
        <Typography
          variant="p"
          sx={{
            color: "#1A1859",
            fontSize: "24px",
            lineHeight: "32px",
            fontWeight: "700",
          }}
        >
          {t["Confirm"]}
        </Typography>
        <CloseIcon onClick={handleSeeProposalClose} />
      </Grid>
      <Box
        sx={{
          background: "#ffffff",
          boxShadow: "0px 4px 8px rgba(0, 33, 82, 0.08)",
          border: "1px solid #DBE1E5",
          borderRadius: { xs: 0, sm: 0, md: 0, lg: "8px", xl: "8px" },
          mt: 2,
          mx: 2,
        }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={4}
            xl={4}
            // className="rentImageCard"
          >
            <Box>
              <Image
                loader={myLoader}
                src={`${propertyData?.attachments[0]?.file_path}`}
                width={500}
                height={500}
                alt="rent"
                style={{ borderRadius: "8px 0 0 8px" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              sx={{ p: { xs: 2, sm: 2, md: 2, lg: 0 }, mt: 0.5 }}
            >
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Box>
                  <Button
                    sx={{
                      textTransform: "none",
                      background: "rgba(116, 80, 240, 0.2)",
                      borderRadius: "2px",
                      padding: "2px 8px",
                      color: "#7450F0",
                      fontSize: "12px",
                      lineHeight: "18px",
                      fontWeight: "400",
                    }}
                  >
                    {propertyData?.ad_type}
                  </Button>
                  <Button
                    sx={{
                      textTransform: "none",
                      background: "#FFF7E6",
                      borderRadius: "2px",
                      padding: "2px 8px",
                      color: "#229464",
                      fontSize: "12px",
                      lineHeight: "18px",
                      fontWeight: "400",
                      ml: "3px",
                    }}
                  >
                    {t["pending proposal"]}
                  </Button>
                </Box>
              </Grid>
              <Typography
                variant="p"
                sx={{
                  color: "#002152",
                  fontSize: "16px",
                  lineHeight: "28px",
                  fontWeight: "500",
                }}
              >
                {`BRL ${propertyData?.brl_rent}`}
              </Typography>
              <Typography
                variant="p"
                sx={{
                  color: " #9FAAB1",
                  fontSize: "12px",
                  lineHeight: "20px",
                  fontWeight: "300",

                  mr: 0.5,
                }}
              >
                {propertyData?.address?.address}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 1 }}>
        <Typography
          variant="p"
          sx={{
            color: "#9FAAB1",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "18px",

            px: 2,
          }}
        >
          {t["Proposal details"]}
        </Typography>
      </Box>
      <Box>
        <List
        // sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <ListItem sx={{ margin: 0, paddingY: "1px" }}>
            <ListItemAvatar>
              <Avatar>
                <Image src={avatar} alt="avatar" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  variant="p"
                  sx={{
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "#1A1859",
                    lineHeight: "18px",
                  }}
                >
                  {proposalData?.user?.name}
                </Typography>
              }
            />
          </ListItem>
        </List>
      </Box>
      <Divider sx={{ mx: 2 }} />
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ px: 2, py: 1 }}
      >
        <Typography
          variant="p"
          sx={{
            color: "#1A1859",
            fontSize: "14px",
            lineHeight: "28px",
            fontWeight: "400",
          }}
        >
          {`${t["Value"]}:`}
        </Typography>
        <Typography
          variant="p"
          sx={{
            color: "#1A1859",
            fontSize: "14px",
            lineHeight: "28px",
            fontWeight: "700",
          }}
        >
          {`BRL ${proposalData?.total_amount}`}
        </Typography>
      </Grid>
      <Divider sx={{ mx: 2 }} />
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ px: 2, py: 1 }}
      >
        <Typography
          variant="p"
          sx={{
            color: "#1A1859",
            fontSize: "14px",
            lineHeight: "28px",
            fontWeight: "400",
          }}
        >
          {`${t["Proposal type"]}:`}
        </Typography>
        <Typography
          variant="p"
          sx={{
            color: "#1A1859",
            fontSize: "14px",
            lineHeight: "28px",
            fontWeight: "400",
          }}
        >
          {proposalData?.payment_type}
        </Typography>
      </Grid>
      <Divider sx={{ mx: 2 }} />
      <Grid container spacing={1} sx={{ px: 1, mt: 3, mb: 2 }}>
        <Grid item xs={12} sm={12} md={12} lg={3}>
          <Button
            fullWidth
            onClick={() => handleProposalRefuse(proposalData?.id)}
            sx={{
              color: " #002152",
              fontSize: "14px",

              lineHeight: "18px",
              fontWeight: "600",
              background: "#DBE1E5",
              borderRadius: "4px",

              textTransform: "none",

              "&:hover": {
                color: " #002152",
                fontSize: "14px",

                lineHeight: "18px",
                fontWeight: "600",
                background: "#DBE1E5",
                borderRadius: "4px",

                textTransform: "none",
              },
            }}
          >
            {refuseLoading && refuseId === proposalData?.id ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              t["refuse"]
            )}
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={5}>
          <Button
            fullWidth
            sx={{
              color: "#FFFFFF",
              fontSize: "14px",

              lineHeight: "18px",
              fontWeight: "600",
              background: "#7450F0",
              borderRadius: "4px",

              textTransform: "none",

              "&:hover": {
                color: "#FFFFFF",
                fontSize: "14px",

                lineHeight: "18px",
                fontWeight: "600",
                background: "#7450F0",
                borderRadius: "4px",

                textTransform: "none",
              },
            }}
            onClick={handleCounterProposalOpen}
          >
            {t["Counter proposal"]}
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <Button
            fullWidth
            sx={{
              color: "#FFFFFF",
              fontSize: "14px",

              lineHeight: "18px",
              fontWeight: "600",
              background: " #34BE84",
              borderRadius: "4px",

              textTransform: "none",

              "&:hover": {
                color: "#FFFFFF",
                fontSize: "14px",

                lineHeight: "18px",
                fontWeight: "600",
                background: " #34BE84",
                borderRadius: "4px",

                textTransform: "none",
              },
            }}
            onClick={() => handleProposalAccept(proposalData?.id)}
          >
            {acceptLoading && acceptid === proposalData?.id ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              t["To accept"]
            )}
          </Button>
        </Grid>
      </Grid>
      <BaseModal
        isShowing={counterProposalOpen}
        isClose={handleCounterProposalClose}
      >
        <Tooltip title="Something">
          <>
            <CounterProposalModal
              handleCounterProposalClose={handleCounterProposalClose}
              proposalData={proposalData}
              propertyData={propertyData}
              languageName={languageName}
            />
          </>
        </Tooltip>
      </BaseModal>
    </Box>
  );
}

export default SeeProposalModal;
