import { Autocomplete, TextField } from "@mui/material";
import React from "react";

function BaseAutocomplete({
  options,
  placeholder,
  sx,
  size,
  value,
  onChange,
  getOptionLabel,
  isOptionEqualToValue,
}) {
  return (
    <Autocomplete
      sx={sx}
      disablePortal
      fullWidth
      size={size}
      id="combo-box-demo"
      options={options}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      onChange={onChange}
      value={value}
      renderInput={(params) => (
        <TextField {...params} placeholder={placeholder} />
      )}
    />
  );
}

export default BaseAutocomplete;
