import { OutlinedInput, TextField } from "@mui/material";
import React from "react";

import { NumericFormat } from "react-number-format";

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
      prefix="R$"
    />
  );
});

function BaseOutlinedCurrencyInput({ placeholder, label, size, borderColor }) {
  const [values, setValues] = React.useState({
    numberformat: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <TextField
      fullWidth
      size={size}
      label={label}
      placeholder={placeholder}
      value={values.numberformat}
      onChange={handleChange}
      name="numberformat"
      id="formatted-numberformat-input"
      InputProps={{
        inputComponent: NumericFormatCustom,
      }}
      variant="outlined"
      sx={{
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: borderColor,
          },
        },
        "& label.Mui-focused": {
          color: borderColor,
        },
      }}
    />
  );
}

export default BaseOutlinedCurrencyInput;
