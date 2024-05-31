import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ShareIcon from "@mui/icons-material/Share";
import {
  EmailShareButton,
  FacebookShareButton,
  WhatsappShareButton,
} from "react-share";
import { EmailIcon, FacebookIcon, WhatsappIcon } from "react-share";
import BaseCopyText from "../baseCopyText/BaseCopyText";
const BaseShareButton = ({ base_url, bg = false }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={bg && { bgcolor: "#fff", borderRadius: "100%" }}>
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <ShareIcon sx={{ color: "#878787" }} />
        </IconButton>
      </Box>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Stack direction="column" spacing={3}>
            <Typography
              variant="p"
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#1A1859",
              }}
              align="center"
            >
              Compartilhar
            </Typography>
            <Stack direction="row" spacing={3}>
              <Stack direction="column">
                <WhatsappShareButton url={base_url}>
                  <WhatsappIcon round size={40} />
                  <Typography sx={{ fontSize: "12px" }}>Whatsapp</Typography>
                </WhatsappShareButton>
              </Stack>
              <Stack direction="column">
                <FacebookShareButton url={base_url}>
                  <FacebookIcon round size={40} />
                  <Typography sx={{ fontSize: "12px" }}>Facebook</Typography>
                </FacebookShareButton>
              </Stack>
              <Stack direction="column">
                <EmailShareButton url={base_url}>
                  <EmailIcon round size={40} />
                  <Typography sx={{ fontSize: "12px" }}>Email</Typography>
                </EmailShareButton>
              </Stack>
              <Stack direction="column">
                <BaseCopyText text={base_url} />

                <Typography sx={{ fontSize: "12px", mt: "6px" }}>
                  Copy URL
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </MenuItem>
      </Menu>
    </>
  );
};

export default BaseShareButton;
