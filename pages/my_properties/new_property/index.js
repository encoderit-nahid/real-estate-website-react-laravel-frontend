import Head from "next/head";
import Image from "next/image";
import { Button, Container, Grid, Tooltip, Typography } from "@mui/material";
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
import Link from "next/link";
import { getSession } from "next-auth/react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { findProjectsData } from "../../../src/redux/projects/actions";
import { findPropertyTypeData } from "../../../src/redux/propertyType/actions";

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

const validationSchema = Yup.object().shape({
  zip_code: Yup.string().required("Zip code is required"),
  address: Yup.string().required("Address is required"),
  number: Yup.string().required("Number is required"),
  neighbourhood: Yup.string().required("Neighbourhood is required"),
  complement: Yup.string().required("Complement is required"),
  city: Yup.string().required("City is required"),
  state: Yup.object().required("State is required"),
  project_id: Yup.object().required("Enterprise Name is required"),
  brl_rent: Yup.number().required("BRL rent is required"),
  condominium:Yup.number().required("Condominium is required"),
  brl_iptu:Yup.number().required("IPTU is required"),
  land_area:Yup.number().required("Land area is required"),
  property_area:Yup.number().required("Property area is required"),
  no_of_rooms:Yup.number().required("No of rooms is required"),
  no_of_suites:Yup.number().required("NO of suites is required"),
  no_of_bathrooms:Yup.number().required("NO of bathrooms is required"),
  no_of_parking_spaces:Yup.number().required("NO of parking spaces is required"),
  documnentation: Yup.object().required("Documentation is required"),
  registry:Yup.string().required("Registry office is required"),
  registartion_number: Yup.number().required("Registration number office is required"),
  owner_full_name: Yup.string().required("Owner Full Name is required"),
  owner_rg: Yup.string().required("Owner Rg is required"),
  owner_cpf: Yup.string().required("Owner cpf is required"),
  owner_spouse_full_name: Yup.string().required("Owner spouse full name is required"),
  owner_spouse_rg: Yup.string().required("Owner spouse RG is required"),
  owner_spouse_cpf: Yup.string().required("Owner spouse CPF is required"),
  owner_zip_code: Yup.string().required("Zip code is required"),
  owner_address: Yup.string().required("Address is required"),
  owner_number: Yup.string().required("Number is required"),
  owner_neighbourhood: Yup.string().required("Neighbourhood is required"),
  owner_complement: Yup.string().required("Complement is required"),
  owner_city: Yup.string().required("City is required"),
  owner_state: Yup.object().required("State is required"),
  owner_documnentation: Yup.object().required("Documentation is required"),
  owner_registry:Yup.string().required("Registry office is required"),
  owner_registartion_number: Yup.string().required("Registration number office is required"),
});

export default function NewProperty(props) {
 
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
     validationSchema
    ),
    defaultValues: {
      videos: [
        {
         url:""
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "videos",
  });
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [files, setFiles] = useState([]);
  const [imageError, setImageError] = useState(false);
  const [imageErrorMessage, setImageErrorMessage] = useState("");
 

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

  const onSubmit = async (data) => {
    console.log(data)
  }

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
                  setActiveStep={setActiveStep}
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
                      <Address handleNext={handleNext}  control={control}
                      errors={errors}  />
                    ) : activeStep === 1 ? (
                      <ValuesAndDescription
                        handleNext={handleNext}
                        handleBack={handleBack}
                        control={control}
                        errors={errors}
                      />
                    ) : activeStep === 2 ? (
                      <Features
                        handleNext={handleNext}
                        handleBack={handleBack}
                        control={control}
                        errors={errors}
                      />
                    ) : activeStep === 3 ? (
                      <PhotosAndVideos
                        handleNext={handleNext}
                        handleBack={handleBack}
                        control={control}
                        errors={errors}
                        files={files}
                        setFiles={setFiles}
                        imageError={imageError}
                        imageErrorMessage={imageErrorMessage}
                        fields={fields}
                        append={append}
                        remove={remove}
                      />
                    ) : (
                      <Owner handleNext={handleNext} handleBack={handleBack}  control={control}
                      errors={errors} />
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
