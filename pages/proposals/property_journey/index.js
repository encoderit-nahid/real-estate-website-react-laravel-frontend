import Head from "next/head";
import Image from "next/image";
import {
  Button,
  Container,
  Grid,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/material";
import ResponsiveDrawer from "../../../src/component/sharedProposal/ResponsiveDrawer/ResponsiveDrawer";
import logo from "../../../public/Images/logo.png";
import BasicBreadcrumbs from "../../../src/component/reuseable/baseBreadCrumb/BaseBreadCrumb";
import BaseStepper from "../../../src/component/reuseable/baseStepper/BaseStepper";
import { Fragment, useEffect, useState } from "react";
import ProposalValueStep from "../../../src/component/properties/ProposalValueStep/ProposalValueStep";
import BuyerDataStep from "../../../src/component/properties/BuyerDataStep/BuyerDataStep";
import BaseModal from "../../../src/component/reuseable/baseModal/BaseModal";
import ProposalSentModal from "../../../src/component/properties/ProposalSentModal/ProposalSentModal";
import Address from "../../../src/component/new property/Address/Address";
import ValuesAndDescription from "../../../src/component/new property/ValuesAndDescription/ValuesAndDescription";
import PhotosAndVideos from "../../../src/component/new property/PhotosAndVideos/PhotosAndVideos";
import Features from "../../../src/component/new property/Features/Features";
import Owner from "../../../src/component/new property/Owner/Owner";
import PropertySubmittedModal from "../../../src/component/new property/PropertySubmittedModal/PropertySubmittedModal";
import Contract from "../../../src/component/proposals/propertyJourney/Admin/contract/Contract";
import CertificatesAndDocuments from "../../../src/component/proposals/propertyJourney/Admin/certificatesAndDocuments/CertificatesAndDocuments";
import PreAnalise from "../../../src/component/proposals/propertyJourney/Admin/preAnalise/PreAnalise";
import DigitalNotary from "../../../src/component/proposals/propertyJourney/Admin/digitalNotary/DigitalNotary";
import DigitalNotaryFinalContent from "../../../src/component/proposals/propertyJourney/Admin/digitalNotaryFinalContent/DigitalNotaryFinalContent";
import BrokerCertificateAndDocument from "../../../src/component/proposals/propertyJourney/Broker/BrokerCertificateAndDocuments/BrokerCertificateAndDocument";
import Announce from "../../../src/component/proposals/propertyJourney/Admin/Announce/Announce";
import Proposal from "../../../src/component/proposals/propertyJourney/Admin/Proposal/Proposal";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { findSinglePropertyData } from "../../../src/redux/singleProperty/actions";
import en from "locales/en";
import pt from "locales/pt";

const drawerWidth = 240;

const BreadCrumbsData = [
  { stage: "Start", route: "" },
  { stage: "My properties", route: "" },
];

const omitEmpties = (obj) => {
  return Object.entries(obj).reduce((carry, [key, value]) => {
    if (![null, undefined, "", []].includes(value)) {
      carry[key] = value;
    }
    return carry;
  }, {});
};

export default function PropertyJourney({ language }) {
  const router = useRouter();
  const { query } = router;

  const [myValue, setMyValue] = useState(language || "pt");
  const t = myValue === "en" ? en : pt;

  const steps = [
    t["Announce"],
    t["Proposal"],
    t["Contract"],
    t["Certificates and documents"],
    t["Pre analysis"],
    t["Digital notery"],
  ];

  const BreadCrumbsData = [
    { stage: t["Start"], route: "" },
    { stage: t["My Properties"], route: "" },
  ];

  // const [activeStep, setActiveStep] = useState((+query?.step_count || 1) + 1);
  // useEffect(() => {
  //   const requireStep = (+query?.step_count || 1) + 1;
  //   if (requireStep !== activeStep) {
  //     setActiveStep(requireStep);
  //   }
  // }, [query, activeStep]);
  // console.log({ activeStep });
  const [skipped, setSkipped] = useState(new Set());
  const dispatch = useDispatch();

  const { data: session } = useSession();

  useEffect(() => {
    dispatch(findSinglePropertyData(query?.propertyId));
  }, [dispatch, query]);
  const [activeStep, setActiveStep] = useState((+query?.step_count || 1) + 1);

  const singlePropertyData = useSelector(
    (state) => state?.singleProperty?.singlePropertyData
  );

  const Loading = useSelector((state) => state?.singleProperty?.loading);

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
                  lastStageData={t["Property journey"]}
                />
              </Grid>
              <Box sx={{ mt: 3 }}>
                {/* <BaseStepper
                  steps={steps}
                  activeStep={activeStep}
                  isStepSkipped={isStepSkipped}
                  marginTop={"2vh"}
                /> */}
                <Stepper
                  activeStep={activeStep}
                  className="step-journey"
                  sx={{
                    marginTop: 2,
                    background: "#F2F5F6",
                    display: "inline-flex",
                    borderRadius: "100px",
                    "& .MuiStepConnector-line": {
                      display: "none",
                    },
                  }}
                >
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
                      <Step
                        key={label}
                        onClick={() => setActiveStep(index)}
                        {...stepProps}
                        sx={{
                          background: `${
                            activeStep > index
                              ? "#83DDB7"
                              : activeStep === index
                              ? "#B8D4FF"
                              : ""
                          }`,
                          clipPath: `${
                            activeStep !== steps.length &&
                            index === activeStep - 1
                              ? "polygon(0 0, 100% 0, 97% 16%, 91% 55%, 100% 100%, 0 100%, 0% 80%, 0% 20%)"
                              : 0
                          }`,
                          borderRadius: `${
                            index === 0
                              ? "100px 0 0 100px"
                              : activeStep !== steps.length &&
                                index === steps.length - 1
                              ? "100px 100px 100px 100px"
                              : activeStep === index
                              ? "100px"
                              : activeStep === steps.length &&
                                index === steps.length - 1
                              ? "0 100px 100px 0"
                              : 0
                          }  `,
                          py: 1,
                          pl: 2,
                          pr: 3,
                        }}
                      >
                        <StepLabel className="step-complete" {...labelProps}>
                          <Box
                            sx={{
                              display: {
                                xs: "none",
                                sm: "none",
                                md: "none",
                                lg: "inline",
                              },
                            }}
                          >
                            {label}
                          </Box>
                        </StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
                {activeStep === steps.length ? (
                  <DigitalNotaryFinalContent
                    singlePropertyData={singlePropertyData}
                  />
                ) : (
                  <Fragment>
                    {activeStep === 0 ? (
                      //   <Address handleNext={handleNext} />
                      <Announce
                        singlePropertyData={singlePropertyData}
                        handleNext={handleNext}
                        languageName={myValue.toString()}
                      />
                    ) : activeStep === 1 ? (
                      <Proposal
                        singlePropertyData={singlePropertyData}
                        handleNext={handleNext}
                        handleBack={handleBack}
                        languageName={myValue.toString()}
                      />
                    ) : activeStep === 2 ? (
                      <Contract
                        singlePropertyData={singlePropertyData}
                        handleNext={handleNext}
                        handleBack={handleBack}
                        Loading={Loading}
                        languageName={myValue.toString()}
                      />
                    ) : activeStep === 3 ? (
                      //   <PhotosAndVideos
                      //     handleNext={handleNext}
                      //     handleBack={handleBack}
                      //   />
                      // <CertificatesAndDocuments
                      //   singlePropertyData={singlePropertyData}
                      //   handleNext={handleNext}
                      // />
                      session?.user?.role === "admin" ? (
                        <CertificatesAndDocuments
                          singlePropertyData={singlePropertyData}
                          handleNext={handleNext}
                          languageName={myValue.toString()}
                          handleBack={handleBack}
                        />
                      ) : (
                        <BrokerCertificateAndDocument
                          singlePropertyData={singlePropertyData}
                          handleNext={handleNext}
                          languageName={myValue.toString()}
                          handleBack={handleBack}
                        />
                      )
                    ) : // <BrokerCertificateAndDocument handleNext={handleNext} />
                    activeStep === 4 ? (
                      <PreAnalise
                        singlePropertyData={singlePropertyData}
                        handleNext={handleNext}
                        languageName={myValue.toString()}
                        handleBack={handleBack}
                      />
                    ) : (
                      <DigitalNotary
                        singlePropertyData={singlePropertyData}
                        handleNext={handleNext}
                        languageName={myValue.toString()}
                        handleBack={handleBack}
                      />
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
                      {activeStep === 1 && (
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
                          {t["Come back"]}
                        </Button>
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
                      {/* {activeStep === steps.length - 1 && (
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
                      )} */}

                      {activeStep < 2 && (
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
                          {t["Next"]}
                        </Button>
                      )}
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

export async function getServerSideProps(context) {
  //* Session for SSG
  const session = await getSession(context);
  const cookies = context.req.cookies["language"] || "pt";
  //? If Not Logged In
  if (!session) {
    return {
      redirect: {
        destination: "/",
      },
      props: {
        session: null,
      },
    };
  }

  return {
    props: {
      session: session,
      language: cookies,
    },
  };
}
