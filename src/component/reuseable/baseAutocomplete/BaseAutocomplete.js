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
  defaultValue,
  estado
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
      defaultValue={defaultValue}
      value={value}
      renderInput={(params) => (
        <TextField {...params} inputRef={estado} placeholder={placeholder} />
      )}
    />
  );
}

export default BaseAutocomplete;
