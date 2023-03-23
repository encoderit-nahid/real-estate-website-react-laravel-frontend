import Navbar from "../src/component/shared/Navbar/Navbar";
import Footer from "../src/component/shared/Footer/Footer";

import Head from "next/head";
import {
  Box,
  Button,
  Container,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import BaseStepper from "../src/component/reuseable/baseStepper/BaseStepper";
import { Fragment, useEffect, useState } from "react";
import PersonalData from "../src/component/brokerRegistration/personalData/PersonalData";
import AddressData from "../src/component/brokerRegistration/Address/AddressData";
import PerformanceData from "../src/component/brokerRegistration/performance/PerformanceData";
import Image from "next/image";
import stepFinish from "../public/Images/step_finish.png";
import BrokerRegistrationFooter from "../src/component/shared/Footer/BrokerRegistrationFooter";
import BaseModal from "../src/component/reuseable/baseModal/BaseModal";
import BrokerRegistrationSentModal from "../src/component/brokerRegistration/BrokerRegistrationSendModal/BrokerRegistrationSendModal";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { findStateData } from "../src/redux/state/actions";
import { useDispatch, useSelector } from "react-redux";
import { serialize } from "object-to-formdata";
import { registrationApi } from "../src/api";

const steps = ["Personal Data", "Address", "Performance"];

const validationSchema = Yup.object().shape({
  full_name: Yup.string().required("Full Name is required"),
  creci_number: Yup.string().required("CRECI number is required"),
  cpf_number: Yup.string().required("CPF number is required"),
  rg_number: Yup.string().required("RG number is required"),
  dob: Yup.string().required("Date of Birth number is required"),
  zip_code: Yup.string().required("Zip code number is required"),
  address: Yup.string().required("Address is required"),
  number: Yup.string().required("Number is required"),
  neighbourhood: Yup.string().required("Neighbourhood is required"),
  state: Yup.object().required("State is required"),
  city: Yup.string().required("City is required"),
});

const preferenceData = ["Location", "Sales", "Both"];
const aboutLokkanData = [
  "Refer a friend",
  "Facebook",
  "Instagram",
  "Linkedin",
  "News",
  "Partnership",
];

export default function BrokerRegistration({
  loginOpen,
  setLoginOpen,
  handleLoginOpen,
  handleLoginClose,
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const dispatch = useDispatch();
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

  const [actingPreferenceBtn, setActingPreferenceBtn] = useState(
    preferenceData[0]
  );
  const [aboutLokkanBtn, setAboutLokkanBtn] = useState(aboutLokkanData[0]);
  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const allValues = watch();
  console.log({ allValues });

  // console.log(previousFieldData);

  const onSubmit = async (data) => {
    const previousFieldData = JSON.parse(
      localStorage.getItem("broker_registration")
    );
    console.log(previousFieldData);
    // setLoading(true);
    console.log(data);
    const requireData = {
      additional_info: {
        full_name: data.full_name,
        creci_number: data.creci_number,
        cpf_number: data.cpf_number,
        rg_number: data.rg_number,
        dob: data.dob,
        social_name: data.social_name,
      },
      address: {
        zip_code: data.zip_code,
        address: data.address,
        number: data.number,
        neighbourhood: data.neighbourhood,
        add_on: data.add_on,
        city: data.city,
        state_id: data.state.id,
      },
      image: data.image,
      name: previousFieldData.name,
      email: previousFieldData.email,
      password: previousFieldData.password,
      role_id: previousFieldData.role_id,
      phone: previousFieldData.phone,
    };
    console.log(requireData);
    const formData = serialize(requireData, { indices: true });
    const [error, responseToken] = await registrationApi(formData);
    console.log({ responseToken });
    if (!error) {
      setSentModalOpen(true);
      if (!error) {
      }
    }
  };

  useEffect(() => {
    dispatch(findStateData());
  }, [dispatch]);

  const allStateData = useSelector((state) => state.state.stateData);
  console.log({ allStateData });

  return (
    <div>
      <Head>
        <title>Lokkan</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/negotiate.png" />
      </Head>

      <main className="section">
        <Navbar
          shape={false}
          loginOpen={loginOpen}
          setLoginOpen={setLoginOpen}
          handleLoginClose={handleLoginClose}
          handleLoginOpen={handleLoginOpen}
        />
        <Box>
          <Container maxWidth="md">
            <BaseStepper
              steps={steps}
              activeStep={activeStep}
              isStepSkipped={isStepSkipped}
              setActiveStep={setActiveStep}
              marginTop={"2vh"}
            />

            {activeStep === steps.length ? (
              <Container maxWidth="xs">
                <Fragment></Fragment>
              </Container>
            ) : (
              <Fragment>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {activeStep === 0 ? (
                    <PersonalData
                      handleNext={handleNext}
                      control={control}
                      errors={errors}
                      allValues={allValues}
                    />
                  ) : activeStep === 1 ? (
                    <AddressData
                      handleNext={handleNext}
                      handleBack={handleBack}
                      control={control}
                      errors={errors}
                      allValues={allValues}
                      allStateData={allStateData}
                    />
                  ) : (
                    <PerformanceData
                      handleNext={handleNext}
                      handleBack={handleBack}
                      handleOpen={handleOpen}
                      activeStep={activeStep}
                      steps={steps}
                      preferenceData={preferenceData}
                      aboutLokkanData={aboutLokkanData}
                      actingPreferenceBtn={actingPreferenceBtn}
                      setActingPreferenceBtn={setActingPreferenceBtn}
                      aboutLokkanBtn={aboutLokkanBtn}
                      setAboutLokkanBtn={setAboutLokkanBtn}
                    />
                  )}
                  <Grid container spacing={1} sx={{ mt: 2, mb: 5 }}>
                    <Grid item xs={6} sm={6} md={6}>
                      <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{
                          //   mr: 1,
                          //   border: "1px solid #002152",
                          //   borderRadius: "4px",
                          background: "#ffffff",
                          px: 2,
                          py: 1,
                          color: "#4B4B66",
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
                      {activeStep === 2 ? (
                        <Button
                          type="submit"
                          fullWidth
                          sx={{
                            background: "#00C1B4",
                            boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.08)",
                            borderRadius: "4px",
                            color: "#ffffff",
                            fontSize: "16px",
                            lineHeight: "22px",
                            fontWeight: "600",
                            //   mt: 3,
                            textTransform: "none",
                            py: 1,
                            "&:hover": {
                              background: "#00C1B4",
                              boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.08)",
                              borderRadius: "4px",
                              color: "#ffffff",
                              fontSize: "16px",
                              lineHeight: "22px",
                              fontWeight: "600",
                              // mt: 3,
                              textTransform: "none",
                              py: 1,
                            },
                          }}
                        >
                          Continue
                        </Button>
                      ) : (
                        <Button
                          onClick={handleNext}
                          fullWidth
                          sx={{
                            background: "#00C1B4",
                            boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.08)",
                            borderRadius: "4px",
                            color: "#ffffff",
                            fontSize: "16px",
                            lineHeight: "22px",
                            fontWeight: "600",
                            //   mt: 3,
                            textTransform: "none",
                            py: 1,
                            "&:hover": {
                              background: "#00C1B4",
                              boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.08)",
                              borderRadius: "4px",
                              color: "#ffffff",
                              fontSize: "16px",
                              lineHeight: "22px",
                              fontWeight: "600",
                              // mt: 3,
                              textTransform: "none",
                              py: 1,
                            },
                          }}
                        >
                          Continue
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </form>
              </Fragment>
            )}
          </Container>
          <BaseModal isShowing={sentModalOpen} isClose={handleClose}>
            <Tooltip title="Something">
              <>
                <BrokerRegistrationSentModal handleClose={handleClose} />
              </>
            </Tooltip>
          </BaseModal>
        </Box>
        <BrokerRegistrationFooter />
      </main>
    </div>
  );
}
