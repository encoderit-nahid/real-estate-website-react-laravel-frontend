import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

function BaseStepper({ activeStep, steps, isStepSkipped, marginTop }) {
  return (
    <Stepper activeStep={activeStep} sx={{ marginTop: marginTop }}>
      {steps.map((label, index) => {
        const stepProps = {};
        const labelProps = {};
        // if (isStepOptional(index)) {
        //   labelProps.optional = (
        //     <Typography variant="caption">Optional</Typography>
        //   );
        // }
        if (isStepSkipped(index)) {
          stepProps.completed = false;
        }
        return (
          <Step key={label} {...stepProps}>
            <StepLabel {...labelProps}>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
}

export default BaseStepper;
