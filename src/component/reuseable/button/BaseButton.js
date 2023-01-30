import { Button } from "@mui/material";
import React from "react";

function BaseButton({ name, margin, padding }) {
  return (
    <Button
      sx={{
        background: "linear-gradient(90deg, #20BAF6 0%, #7450F0 100%)",
        boxShadow: "0px 4px 24px rgba(69, 38, 177, 0.3)",
        borderRadius: "4px",
        color: "#ffffff",
        fontSize: "12px",
        fontWeight: "600",
        margin: margin,
        padding: padding,
      }}
    >
      {name}
    </Button>
  );
}

export default BaseButton;
