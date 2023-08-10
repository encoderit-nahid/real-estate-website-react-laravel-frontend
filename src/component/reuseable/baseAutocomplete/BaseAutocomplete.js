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
  estado,
  desabilitado,
  referencia
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
      disabled={desabilitado}
      renderInput={(params) => (
        <TextField {...params} inputRef={estado} placeholder={placeholder} ref={referencia} disabled={desabilitado} />
      )}
    />
  );
}

export default BaseAutocomplete;
