import Head from "next/head";
import Image from "next/image";
import { Button, Container, Grid, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/material";
import ResponsiveDrawer from "../../../src/component/sharedProposal/ResponsiveDrawer/ResponsiveDrawer";
import logo from "../../../public/Images/logo.png";
import BasicBreadcrumbs from "../../../src/component/reuseable/baseBreadCrumb/BaseBreadCrumb";
import BaseStepper from "../../../src/component/reuseable/baseStepper/BaseStepper";
import { Fragment, useState } from "react";
import ProposalValueStep from "../../../src/component/properties/ProposalValueStep/ProposalValueStep";
import BuyerDataStep from "../../../src/component/properties/BuyerDataStep/BuyerDataStep";
import BaseModal from "../../../src/component/reuseable/baseModal/BaseModal";
import ProposalSentModal from "../../../src/component/properties/ProposalSentModal/ProposalSentModal";
import Link from "next/link";
import { getSession } from "next-auth/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const drawerWidth = 240;

const validationSchemaCash = Yup.object().shape({
  total_amount: Yup.string().required("BRL amount is required"),
  name: Yup.string().required("Full name is required"),
  rg: Yup.string().required("RG  is required"),
  cpf: Yup.string().required("CPF is required"),
  zip_code: Yup.string().required("Zip code is required"),
  address: Yup.string().required("Address is required"),
  number: Yup.string().required("Number is required"),
  neighbourhood: Yup.string().required("Neighborhood is required"),
  complement: Yup.string().required("Complement is required"),
  city: Yup.string().required("city is required"),
  state: Yup.object().required("State is required"),
});

const validationSchemaInstallment = Yup.object().shape({
  total_amount: Yup.string().required("Name is required"),
  cash_amount: Yup.number().required("Cash Value is required"),
  payment_per_installment: Yup.number().required("Term Value is required"),
  no_of_installment: Yup.number().required(
    "Number of Installments is required"
  ),
  name: Yup.string().required("Full name is required"),
  rg: Yup.string().required("RG  is required"),
  cpf: Yup.string().required("CPF is required"),
  zip_code: Yup.string().required("Zip code is required"),
  address: Yup.string().required("Address is required"),
  number: Yup.string().required("Number is required"),
  neighbourhood: Yup.string().required("Neighbourhood is required"),
  complement: Yup.string().required("Complement is required"),
  city: Yup.string().required("city is required"),
  state: Yup.object().required("State is required"),
});

const BreadCrumbsData = [
  { stage: "Start", route: "" },
  { stage: "My properties", route: "" },
];

const steps = ["Proposal Values", "Buyer Data"];
export default function IncludeProposal(props) {
  const [cash, setCash] = useState(true);
  const [installment, setInstallment] = useState(false);
  const [maritalStatus, setMaritalStatus] = useState("Married");

  const {
    register,
    watch,
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      cash ? validationSchemaCash : validationSchemaInstallment
    ),
  });

  const allValues = watch();
  console.log({ allValues });

  const [loading, setLoading] = useState(false);

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

  const onSubmit = async (data) => {
    console.log(data);
  };

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
                  lastStageData={"Proposal"}
                />
              </Grid>
              <Box sx={{ mt: 3 }}>
                <BaseStepper
                  steps={steps}
                  activeStep={activeStep}
                  isStepSkipped={isStepSkipped}
                  marginTop={"2vh"}
                  setActiveStep={setActiveStep}
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                      {activeStep === 0 ? (
                        <ProposalValueStep
                          handleNext={handleNext}
                          cash={cash}
                          setCash={setCash}
                          installment={installment}
                          setInstallment={setInstallment}
                          control={control}
                          errors={errors}
                        />
                      ) : (
                        <BuyerDataStep
                          handleNext={handleNext}
                          handleBack={handleBack}
                          control={control}
                          errors={errors}
                          setMaritalStatus={setMaritalStatus}
                          maritalStatus={maritalStatus}
                          setValue={setValue}
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
                        {activeStep !== 0 && (
                          <Grid container spacing={1} sx={{ mt: 2, mb: 5 }}>
                            <Grid item xs={6} sm={6} md={6}>
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
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <Button
                                type="submit"
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
                                  boxShadow:
                                    "0px 4px 8px rgba(81, 51, 182, 0.32)",
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
                                    boxShadow:
                                      "0px 4px 8px rgba(81, 51, 182, 0.32)",
                                  },
                                }}
                              >
                                Submit proposal
                              </Button>
                            </Grid>
                          </Grid>
                        )}

                        {activeStep === 0 && (
                          <Grid container spacing={1} sx={{ mt: 2, mb: 5 }}>
                            <Grid item xs={6} sm={6} md={6}>
                              <Link href="/my_properties">
                                <Button
                                  color="inherit"
                                  // disabled={activeStep === 0}

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
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <Button
                                onClick={handleNext}
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
                                  boxShadow:
                                    "0px 4px 8px rgba(81, 51, 182, 0.32)",
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
                                    boxShadow:
                                      "0px 4px 8px rgba(81, 51, 182, 0.32)",
                                  },
                                }}
                              >
                                Next
                              </Button>
                            </Grid>
                          </Grid>
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
                      </Grid>
                    </form>
                  </Fragment>
                )}
              </Box>
              <BaseModal isShowing={sentModalOpen} isClose={handleClose}>
                <Tooltip title="Something">
                  <>
                    <ProposalSentModal handleClose={handleClose} />
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
    },
  };
}
