import {
  Box,
  Button,
  Grid,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Image from "next/image";
import proposeImage from "../../../../public/Images/proposal_modal.png";

const steps = ["Proposal Values", "Buyer's Data"];

function ProposalModal({ handleProposalClose }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    // top:{xs:"80%"},
    transform: "translate(-50%, -50%)",
    width: { xs: "80%", sm: "80%", md: "60%", lg: "35%", xl: "35%" },
    bgcolor: "#ffffff",
    // border: "2px solid #000",
    boxShadow: "none",
    borderRadius: "12px",
    px: 3,
    py: 2,
  };
  return (
    <Box sx={style}>
      <Box sx={{ width: "100%" }}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="p"
            sx={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#002152",
            }}
          >
            Proposal
          </Typography>
          <Button onClick={handleProposalClose}>
            <CloseIcon sx={{ color: "#6C7A84" }} />
          </Button>
        </Grid>

        <Stepper activeStep={activeStep} sx={{ marginTop: 2 }}>
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
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {activeStep === 0 ? (
              <Typography sx={{ mt: 2, mb: 1 }}>
                <Button sx={{ display: "flex" }}>
                  <Image src={proposeImage} alt="proposeImage" />

                  <Typography
                    variant="p"
                    sx={{
                      fontSize: "24px",
                      fontWeight: 700,
                      color: "#002152",

                      textTransform: "none",
                    }}
                  >
                    Proposal values
                  </Typography>
                </Button>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  sx={{ my: 2 }}
                >
                  <Button
                    sx={{
                      textTransform: "none",
                      padding: "3px 6px",
                      backgroundColor: "#F2F5F6",
                      color: "#002152",
                      borderRadius: "56px",
                    }}
                  >
                    In Cash
                  </Button>
                  <Button
                    sx={{
                      textTransform: "none",
                      padding: "3px 6px",
                      backgroundColor: "#F2F5F6",
                      color: "#002152",
                      borderRadius: "56px",
                      ml: 1,
                    }}
                  >
                    Installments
                  </Button>
                </Grid>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  placeholder="BRL Total Amount"
                  variant="outlined"
                />
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={4}
                  placeholder="Observation"
                  //   value={field.value}
                  style={{
                    marginTop: "2vh",
                    width: "100%",
                    // margin: "2vh 0",
                    color: "rgba(0, 0, 0, 0.87)",
                    fontSize: "17px",
                    outlineColor: "#1976d2",
                    border: `1px solid silver`,
                    borderRadius: "5px",
                    padding: "0.4vh 1.4vh",
                  }}
                />
              </Typography>
            ) : (
              ""
            )}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}

              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
}

export default ProposalModal;
