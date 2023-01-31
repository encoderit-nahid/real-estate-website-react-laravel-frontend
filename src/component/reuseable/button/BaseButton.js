import { Button } from "@mui/material";
import React from "react";

function BaseButton({ name, margin, padding, shape, width, fontSize }) {
  return (
    <Button
      sx={{
        background: `${
          shape ? "#ffffff" : "linear-gradient(90deg, #20BAF6 0%, #7450F0 100%)"
        }`,
        boxShadow: "0px 4px 24px rgba(69, 38, 177, 0.3)",
        borderRadius: "4px",
        color: `${shape ? "#1A1859" : "#ffffff"}`,
        fontSize: fontSize,
        fontWeight: "600",
        textTransform: "none",
        margin: margin,
        padding: padding,
        width: width,
      }}
    >
      {name}
    </Button>
  );
}

export default BaseButton;
