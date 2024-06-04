import { TextField } from "@mui/material";
import React from "react";

function BaseTextField({
  size,
  label,
  placeholder,
  value,
  onChange,
  name,
  type,
  sx,
  InputProps,
  InputLabelProps,
  inputProps,
  autoComplete,
  error,
  required,
}) {
  return (
    <TextField
      fullWidth
      size={size}
      label={label}
      type={type}
      InputLabelProps={InputLabelProps}
      inputProps={inputProps}
      placeholder={placeholder}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
      name={name}
      variant="outlined"
      sx={sx}
      InputProps={InputProps}
      error={error}
      required={required}
    />
  );
}

export default BaseTextField;
