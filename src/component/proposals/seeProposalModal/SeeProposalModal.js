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

function SeeProposalModal({ handleSeeProposalClose }) {
  //add_counter_proposal_modal
  const [counterProposalOpen, setCounterProposalOpen] = useState(false);
  const handleCounterProposalOpen = () => setCounterProposalOpen(true);
  const handleCounterProposalClose = () => setCounterProposalOpen(false);

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
          Confirm
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
                alt="rent"
                src={rentImage}
                layout="responsive"
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
                    rent
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
                    pending proposal
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
                BRL 3,100.00
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
                Rua do Bixiga, Bela Vista, São Paulo, São Paulo- CEP 01315020
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
          Proposal details
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
                  albert flowers
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
      <Divider sx={{ mx: 2 }} />
      <Grid container spacing={1} sx={{ px: 1, mt: 3, mb: 2 }}>
        <Grid item xs={12} sm={12} md={12} lg={3}>
          <Button
            fullWidth
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
            Refuse
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
            Counter proposal
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
          >
            To accept
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
            />
          </>
        </Tooltip>
      </BaseModal>
    </Box>
  );
}

export default SeeProposalModal;
