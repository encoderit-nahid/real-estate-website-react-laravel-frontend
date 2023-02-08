import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import React from "react";

function BaseModal({ children, isShowing, isClose }) {
  return (
    <Modal
      open={isShowing}
      onClose={isClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {children}
    </Modal>
  );
}

export default BaseModal;
