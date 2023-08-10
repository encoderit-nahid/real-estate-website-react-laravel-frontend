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
  error,
  required,
  desabilitado,
  referencia,
  onBlur
}) {
  return (
    <TextField
      fullWidth
      size={size}
      label={label}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      variant="outlined"
      sx={sx}
      InputProps={InputProps}
      error={error}
      required={required}
      disabled={desabilitado}
      inputRef={referencia}
    />
  );
}

export default BaseTextField;
