import React from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  ListItemAvatar,
  Tooltip,
  Typography,
} from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import cardMedia from "../../../../public/Images/pendant.png";
import rentImage from "../../../../public/Images/rentImage.png";
import avatar from "../../../../public/Images/AvatarPendant.png";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { useState } from "react";
import BaseModal from "../../reuseable/baseModal/BaseModal";
import SeeProposalModal from "../seeProposalModal/SeeProposalModal";

function PendantsCard() {
  //add_see_proposal_modal
  const [seeProposalOpen, setSeeProposalOpen] = useState(false);
  const handleSeeProposalOpen = () => setSeeProposalOpen(true);
  const handleSeeProposalClose = () => setSeeProposalOpen(false);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

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

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 380 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
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
          Proposals
        </Typography>
        <CloseIcon />
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
          Proposals (4)
        </Typography>
      </Box>
      {[0, 1, 2].map((data, index) => (
        <Box key={index}>
          <Grid container spacing={1}>
            <Grid item xs={7}>
              <List
              // sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Image src={avatar} alt="avatar" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="albert flowers"
                    secondary="10/03/2021, 19:04"
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={5}>
              <List
              // sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              >
                <ListItem>
                  <ListItemText primary="BRL 3,700.00" secondary="cash" />
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Grid container spacing={1} sx={{ px: 1 }}>
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
            <Grid item xs={12} sm={12} md={12} lg={6}>
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
                onClick={handleSeeProposalOpen}
              >
                see proposal
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={3}>
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
          <Divider sx={{ px: 2, mt: 1 }} />
        </Box>
      ))}
      <BaseModal isShowing={seeProposalOpen} isClose={handleSeeProposalClose}>
        <Tooltip title="Something">
          <>
            <SeeProposalModal handleSeeProposalClose={handleSeeProposalClose} />
          </>
        </Tooltip>
      </BaseModal>
    </Box>
  );

  return (
    <Box
      sx={{
        background: "#ffffff",
        boxShadow: "0px 4px 8px rgba(0, 33, 82, 0.08)",
        borderRadius: "8px",
        paddingBottom: 2,
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Image src={cardMedia} layout="responsive" alt="pendant" />
      </Box>

      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Box sx={{ pl: 2, mt: 2 }}>
          <Button
            sx={{
              textTransform: "none",
              background: "rgba(116, 80, 240, 0.2)",
              borderRadius: "2px",
              padding: "2px 8px",
              color: "#7450F0",
              fontSize: "14px",
              lineHeight: "18px",
              fontWeight: "400",
              mr: 1,
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
              fontSize: "14px",
              lineHeight: "18px",
              fontWeight: "400",
              ml: "3px",
            }}
          >
            pending proposal
          </Button>
        </Box>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ pl: 2, mt: 2 }}
      >
        <Typography
          variant="p"
          sx={{
            color: "#1A1859",
            fontSize: "24px",
            fontWeight: "700",
            lineHeight: "32px",
          }}
        >
          BRL 1,700,000.00
        </Typography>
        <Typography
          variant="p"
          sx={{
            color: "#1A1859",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "18px",
            mt: 1,
          }}
        >
          Jaceguai Street, Bela Vista, São Paulo - SP - CEP 01315010
        </Typography>
        <Typography
          variant="p"
          sx={{
            color: "#9FAAB1",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "18px",
            mt: 1,
          }}
        >
          2 Proposals:
        </Typography>
      </Grid>
      {[0, 1].map((data, index) => (
        <Box key={index}>
          <Grid container spacing={1}>
            <Grid item xs={7}>
              <List
              // sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              >
                <ListItem sx={{ margin: 0, paddingY: "1px" }}>
                  <ListItemAvatar sx={{ paddingRight: 0, minWidth: 0 }}>
                    <Avatar>
                      <Image src={avatar} alt="avatar" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ ml: "3px" }}
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
                    secondary={
                      <Typography
                        variant="h5"
                        sx={{
                          fontSize: "12px",
                          fontWeight: 400,
                          color: "#9FAAB1",
                          lineHeight: "18px",
                        }}
                      >
                        10/03/2021, 19:04
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={5}>
              <List
              // sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              >
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography
                        variant="p"
                        sx={{
                          fontSize: "12px",
                          fontWeight: 400,
                          color: "#1A1859",
                          lineHeight: "18px",
                          width: "100%",
                        }}
                      >
                        BRL 1,690,000.00
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Divider sx={{ px: 2, mt: 1 }} />
        </Box>
      ))}

      <Grid container spacing={1} sx={{ px: 2, mt: 1 }}>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <Link href="/include_proposal">
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
            >
              Include proposal
            </Button>
          </Link>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <Button
            fullWidth
            onClick={toggleDrawer("right", true)}
            sx={{
              color: "#FFFFFF",
              fontSize: "14px",
              lineHeight: "18px",
              fontWeight: "600",

              background: "#0362F0",
              borderRadius: "4px",

              textTransform: "none",
              "&:hover": {
                color: "#FFFFFF",
                fontSize: "14px",
                lineHeight: "18px",
                fontWeight: "600",
                background: "#0362F0",
                borderRadius: "4px",

                textTransform: "none",
              },
            }}
          >
            See proposals
          </Button>
          <SwipeableDrawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
            onOpen={toggleDrawer("right", true)}
          >
            {list("right")}
          </SwipeableDrawer>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PendantsCard;
