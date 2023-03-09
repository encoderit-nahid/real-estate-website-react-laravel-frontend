import Head from "next/head";
import Image from "next/image";
import { Button, Container, Grid, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/material";
import ResponsiveDrawer from "../src/component/sharedProposal/ResponsiveDrawer/ResponsiveDrawer";
import logo from "../public/Images/logo.png";
import BasicBreadcrumbs from "../src/component/reuseable/baseBreadCrumb/BaseBreadCrumb";
import BaseStepper from "../src/component/reuseable/baseStepper/BaseStepper";
import { Fragment, useState } from "react";
import ProposalValueStep from "../src/component/properties/ProposalValueStep/ProposalValueStep";
import BuyerDataStep from "../src/component/properties/BuyerDataStep/BuyerDataStep";
import BaseModal from "../src/component/reuseable/baseModal/BaseModal";
import ProposalSentModal from "../src/component/properties/ProposalSentModal/ProposalSentModal";
import Address from "../src/component/new property/Address/Address";
import ValuesAndDescription from "../src/component/new property/ValuesAndDescription/ValuesAndDescription";
import PhotosAndVideos from "../src/component/new property/PhotosAndVideos/PhotosAndVideos";
import Features from "../src/component/new property/Features/Features";
import Owner from "../src/component/new property/Owner/Owner";
import PropertySubmittedModal from "../src/component/new property/PropertySubmittedModal/PropertySubmittedModal";
import Link from "next/link";

const drawerWidth = 240;

const BreadCrumbsData = [
  { stage: "Start", route: "" },
  { stage: "My properties", route: "" },
];

const steps = [
  "Address",
  "Values and description",
  "Features",
  "Photos and videos",
  "Owner",
];
export default function NewProperty(props) {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

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

  const [sentModalOpen, setSentModalOpen] = useState(false);
  const handleOpen = () => setSentModalOpen(true);
  const handleClose = () => setSentModalOpen(false);
  return (
    <div>
      <Head>
        <title>Lokkan</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/negotiate.png" />
      </Head>

      <main>
        <Box sx={{ display: "flex" }}>
          <ResponsiveDrawer />
          <Box
            sx={{
              //   backgroundColor: "#f6f8fc",
              flexGrow: 1,

              width: { sm: `calc(100% - ${drawerWidth}px)` },
              paddingX: { xs: 0, sm: 0, md: 6, lg: 6, xl: 6 },
              paddingY: { xs: 0, sm: 0, md: 3, lg: 3, xl: 3 },
            }}
          >
            <Container maxWidth="lg">
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                sx={{ mt: { xs: 8, sm: 8, md: 8, lg: 0 } }}
              >
                <BasicBreadcrumbs
                  BreadcrumbsData={BreadCrumbsData}
                  lastStageData={"New property"}
                />
              </Grid>
              <Box sx={{ mt: 3 }}>
                <BaseStepper
                  steps={steps}
                  activeStep={activeStep}
                  isStepSkipped={isStepSkipped}
                  marginTop={"2vh"}
                />
                {activeStep === steps.length ? (
                  <Container maxWidth="xs">
                    <Fragment>
                      {/* <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography> */}

                      {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box> */}
                    </Fragment>
                  </Container>
                ) : (
                  <Fragment>
                    {activeStep === 0 ? (
                      <Address handleNext={handleNext} />
                    ) : activeStep === 1 ? (
                      <ValuesAndDescription
                        handleNext={handleNext}
                        handleBack={handleBack}
                      />
                    ) : activeStep === 2 ? (
                      <Features
                        handleNext={handleNext}
                        handleBack={handleBack}
                      />
                    ) : activeStep === 3 ? (
                      <PhotosAndVideos
                        handleNext={handleNext}
                        handleBack={handleBack}
                      />
                    ) : (
                      <Owner handleNext={handleNext} handleBack={handleBack} />
                    )}
                    <Grid
                      container
                      direction="row"
                      justifyContent={{
                        xs: "flex-start",
                        sm: "flex-start",
                        md: "flex-start",
                        lg: "flex-end",
                        xl: "flex-end",
                      }}
                      alignItems="center"
                      sx={{
                        pt: 2,
                      }}
                    >
                      {activeStep !== 0 && (
                        <Button
                          color="inherit"
                          // disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{
                            mr: 1,
                            border: "1px solid #002152",
                            borderRadius: "4px",
                            px: 2,
                            py: 1,
                            color: "#002152",
                            fontSize: "16px",
                            fontWeight: "600",
                            lineHeight: "22px",
                            textTransform: "none",
                          }}
                        >
                          Come back
                        </Button>
                      )}
                      {activeStep === 0 && (
                        <Link href="/my_properties">
                          <Button
                            color="inherit"
                            // disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{
                              mr: 1,
                              border: "1px solid #002152",
                              borderRadius: "4px",
                              px: 2,
                              py: 1,
                              color: "#002152",
                              fontSize: "16px",
                              fontWeight: "600",
                              lineHeight: "22px",
                              textTransform: "none",
                            }}
                          >
                            Cancel
                          </Button>
                        </Link>
                      )}

                      {/* {isStepOptional(activeStep) && (
                <Button
                  sx={{
                    mr: 1,
                    border: "1px solid #002152",
                    borderRadius: "4px",
                    px: 2,
                    py: 1,
                    color: "#002152",
                    fontSize: "16px",
                    fontWeight: "600",
                    lineHeight: "22px",
                    textTransform: "none",
                  }}
                  color="inherit"
                  onClick={handleSkip}
                >
                  Skip
                </Button>
              )} */}
                      {activeStep === steps.length - 1 && (
                        <Button
                          sx={{
                            background: "#DBE1E5",
                            borderRadius: "4px",
                            px: 2,
                            py: 1,
                            mr: 1,
                            color: "#002152",
                            fontSize: "16px",
                            fontWeight: "600",
                            lineHeight: "22px",
                            textTransform: "none",

                            "&:hover": {
                              background: "#DBE1E5",
                              borderRadius: "4px",
                              px: 2,
                              py: 1,
                              color: "#002152",
                              fontSize: "16px",
                              fontWeight: "600",
                              lineHeight: "22px",
                              textTransform: "none",
                              mr: 1,
                            },
                          }}
                        >
                          Save as draft
                        </Button>
                      )}

                      <Button
                        onClick={
                          activeStep === steps.length - 1
                            ? handleOpen
                            : handleNext
                        }
                        sx={{
                          background: "#7450F0",
                          borderRadius: "4px",
                          px: 2,
                          py: 1,
                          color: "#ffffff",
                          fontSize: "16px",
                          fontWeight: "600",
                          lineHeight: "22px",
                          textTransform: "none",
                          boxShadow: "0px 4px 8px rgba(81, 51, 182, 0.32)",
                          "&:hover": {
                            background: "#7450F0",
                            borderRadius: "4px",
                            px: 2,
                            py: 1,
                            color: "#ffffff",
                            fontSize: "16px",
                            fontWeight: "600",
                            lineHeight: "22px",
                            textTransform: "none",
                            boxShadow: "0px 4px 8px rgba(81, 51, 182, 0.32)",
                          },
                        }}
                      >
                        {activeStep === steps.length - 1
                          ? "Submit Approval"
                          : "Next"}
                      </Button>
                    </Grid>
                  </Fragment>
                )}
              </Box>
              <BaseModal isShowing={sentModalOpen} isClose={handleClose}>
                <Tooltip title="Something">
                  <>
                    <PropertySubmittedModal handleClose={handleClose} />
                  </>
                </Tooltip>
              </BaseModal>
            </Container>
          </Box>
        </Box>
      </main>
    </div>
  );
}
