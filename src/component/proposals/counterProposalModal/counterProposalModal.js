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
import loginImage from "../../../../public/Images/login.png";
import React from "react";
import Image from "next/image";
import BaseButton from "../../reuseable/button/BaseButton";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import rentImage from "../../../../public/Images/rentImage.png";
import avatar from "../../../../public/Images/AvatarPendant.png";
import { useState } from "react";
import BaseModal from "../../reuseable/baseModal/BaseModal";
import SendModal from "../toSendModal/SendModal";
import BaseOutlinedCurrencyInput from "../../reuseable/baseOutlinedCurrencyInput/BaseOutlinedCurrencyInput";

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

function CounterProposalModal({ handleCounterProposalClose }) {
  //to_send_modal
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const handleSendModalOpen = () => setSendModalOpen(true);
  const handleSendModalClose = () => setSendModalOpen(false);

  const [cash, setCash] = useState(true);
  const [installment, setInstallment] = useState(false);

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
          Counter Proposal
        </Typography>
        <CloseIcon onClick={handleCounterProposalClose} />
      </Grid>

      <Box
        sx={{ mt: 1, background: "#F2F5F6", mx: 2, py: 2, borderRadius: "4px" }}
      >
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
                  albert flowers
                </Typography>
              }
            />
          </ListItem>
        </List>

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
            Value:
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
            BRL 3,700.00
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
            Proposal type:
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
            Cash
          </Typography>
        </Grid>
      </Box>
      <Box sx={{ mt: 1 }}>
        <Typography
          variant="p"
          sx={{
            color: "#000000",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "18px",

            px: 2,
          }}
        >
          Counter proposal information
        </Typography>
      </Box>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        sx={{ my: 2, mx: 2 }}
      >
        <Button
          sx={{
            textTransform: "none",
            padding: "3px 6px",
            backgroundColor: "#0362F0",
            color: "#ffffff",
            borderRadius: "56px",
          }}
          onClick={() => {
            setCash(true);
            setInstallment(false);
          }}
        >
          In Cash
        </Button>
        <Button
          sx={{
            textTransform: "none",
            padding: "3px 6px",
            backgroundColor: "#F2F5F6",
            color: "#002152",
            borderRadius: "56px",
            ml: 1,
          }}
          onClick={() => {
            setCash(false);
            setInstallment(true);
          }}
        >
          Installments
        </Button>
      </Grid>
      {cash && (
        <Box sx={{ mx: 2, mt: 2 }}>
          {/* <TextField
            sx={{ width: "100%" }}
            id="outlined-basic"
            size="small"
            type="number"
            placeholder="Value of the counter proposal"
            label="Value of the counter proposal"
            variant="outlined"
          /> */}
          <BaseOutlinedCurrencyInput
            placeholder={"Value of the counter proposal"}
            label={"Value of the counter proposal"}
            size={"small"}
          />
          <TextField
            sx={{ width: "100%", mt: 2 }}
            id="outlined-basic"
            size="small"
            placeholder="Comment"
            label="Comment"
            variant="outlined"
          />
        </Box>
      )}
      {installment && (
        <Box sx={{ mx: 2 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <BaseOutlinedCurrencyInput
                placeholder={"Value of the counter proposal"}
                label={"Value of the counter proposal"}
                size={"small"}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <BaseOutlinedCurrencyInput
                placeholder={"Cash Value"}
                label={"Cash Value"}
                size={"small"}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <BaseOutlinedCurrencyInput
                placeholder={"Amount Paid In Installments"}
                label={"Amount Paid In Installments"}
                size={"small"}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                sx={{ width: "100%" }}
                id="outlined-basic"
                size="small"
                type="number"
                placeholder="Number Of Installments"
                label="Number Of Installments"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                sx={{ width: "100%" }}
                id="outlined-basic"
                size="small"
                placeholder="Comments"
                label="Comments"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Box>
      )}
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
        sx={{ mt: 2, px: 2, pb: 3 }}
      >
        <Button
          onClick={handleCounterProposalClose}
          variant="outlined"
          sx={{
            borderColor: "#002152",
            fontSize: "16px",
            fontWeight: "600",
            color: "#002152",
            textTransform: "none",
            paddingX: 4,
            paddingY: 0.6,
            mr: 1,
            "&:hover": {
              borderColor: "#002152",
              fontSize: "16px",
              fontWeight: "600",
              color: "#002152",
              textTransform: "none",
              paddingX: 4,
              paddingY: 0.6,
              mr: 1,
            },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="outlined"
          sx={{
            background: "#34BE84",
            boxShadow: "0px 4px 8px rgba(34, 148, 100, 0.32)",
            borderRadius: "4px",
            fontSize: "16px",
            fontWeight: "600",
            lineHeight: "22px",
            textTransform: "none",
            color: "#ffffff",
            paddingX: 4,
            paddingY: 1,
            "&:hover": {
              background: "#34BE84",
              boxShadow: "0px 4px 8px rgba(34, 148, 100, 0.32)",
              borderRadius: "4px",
              fontSize: "16px",
              fontWeight: "600",
              lineHeight: "22px",
              textTransform: "none",
              color: "#ffffff",
              paddingX: 4,
              paddingY: 1,
            },
          }}
          onClick={handleSendModalOpen}
        >
          To send
        </Button>
      </Grid>
      <BaseModal isShowing={sendModalOpen} isClose={handleSendModalClose}>
        <Tooltip title="Something">
          <>
            <SendModal handleSendModalClose={handleSendModalClose} />
          </>
        </Tooltip>
      </BaseModal>
    </Box>
  );
}

export default CounterProposalModal;
