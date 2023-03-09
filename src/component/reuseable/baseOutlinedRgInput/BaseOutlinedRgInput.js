import { OutlinedInput } from "@mui/material";
import React from "react";
import { IMaskInput } from "react-imask";

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="00.000.000-0"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

function BaseOutlinedRgInput({ placeholder, label, size }) {
  const [values, setValues] = React.useState({
    textmask: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <OutlinedInput
      value={values.textmask}
      onChange={handleChange}
      name="textmask"
      placeholder={placeholder}
      id="formatted-text-mask-input"
      inputComponent={TextMaskCustom}
      label={label}
      size={size}
      inputProps={{ style: { textTransform: "uppercase" } }}
      // startAdornment={
      //   <InputAdornment position="start">
      //     <Typography variant="p" sx={{ color: "#7450F0" }}>
      //       Eg: 00000-000
      //     </Typography>
      //   </InputAdornment>
      // }
    />
  );
}

export default BaseOutlinedRgInput;
