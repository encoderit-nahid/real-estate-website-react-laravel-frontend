import Head from "next/head";
import Image from "next/image";
import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
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
import Link from "next/link";
import { getSession, useSession } from "next-auth/react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { findProjectsData } from "../../../src/redux/projects/actions";
import { findPropertyTypeData } from "../../../src/redux/propertyType/actions";
import { propertyCreateApi, propertyUpdateApi } from "../../../src/api";
import { serialize } from "object-to-formdata";
import { useRouter } from "next/router";
import { findSinglePropertyData } from "../../../src/redux/singleProperty/actions";
import en from "locales/en";
import pt from "locales/pt";

const drawerWidth = 240;

export default function NewProperty({ language }) {
  const { data: session } = useSession();

  const { query } = useRouter();

  const [myValue, setMyValue] = useState(language || "pt");
  const t = myValue === "en" ? en : pt;

  const BreadCrumbsData = [
    { stage: t["Start"], route: "" },
    { stage: t["My Properties"], route: "my_properties" },
  ];

  const otherSteps = [
    t["Address"],
    t["Values and description"],
    t["Features"],
    t["Photos and videos"],
    t["Owner"],
  ];

  const ownerSteps = [
    t["Address"],
    t["Values and description"],
    t["Features"],
    t["Photos and videos"],
  ];

  const steps = session?.user?.role === "owner" ? ownerSteps : otherSteps;

  const validationSchema = Yup.object().shape({
    zip_code: Yup.string().required(t["Zip code is required"]),
    address: Yup.string().required(t["Address is required"]),
    number: Yup.string().required(t["Number is required"]),
    neighbourhood: Yup.string().required(t["Neighbourhood is required"]),
    // complement: Yup.string().required("Complement is required"),
    city: Yup.string().required(t["City is required"]),
    state: Yup.object().required(t["State is required"]),
    brl_rent: Yup.number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required(t["BRL rent is required"]),
    condominium: Yup.number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required(t["Condominium is required"]),
    brl_iptu: Yup.number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required(t["IPTU is required"]),
    land_area: Yup.number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required(t["Land area is required"]),
    property_area: Yup.number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required(t["Property area is required"]),
    no_of_rooms: Yup.number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required(t["No of rooms is required"]),
    no_of_suites: Yup.number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required(t["NO of suites is required"]),
    no_of_bathrooms: Yup.number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required(t["NO of bathrooms is required"]),
    no_of_parking_spaces: Yup.number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required(t["NO of parking spaces is required"]),

    documentation: Yup.object().required("Documentation is required"),
    registry: Yup.string().required("Registry office is required"),
    registration_number: Yup.number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required("Registration number office is required"),

    // owner_name: Yup.string().required(t["Owner Full Name is required"]),
    // owner_rg: Yup.string().required(t["Owner Rg is required"]),
    // owner_cpf: Yup.string().required(t["Owner cpf is required"]),
    // owner_spouse_name: Yup.string().required(
    //   t["Owner spouse full name is required"]
    // ),
    // owner_spouse_rg: Yup.string().required(t["Owner spouse RG is required"]),
    // owner_spouse_cpf: Yup.string().required(t["Owner spouse CPF is required"]),
    // owner_zip_code: Yup.string().required(t["Owner Zip code is required"]),
    // owner_address: Yup.string().required(t["Owner Address is required"]),
    // owner_number: Yup.number()
    //   .transform((value) => (Number.isNaN(value) ? null : value))
    //   .nullable()
    //   .required(t["Owner Number is required"]),
    // owner_neighbourhood: Yup.string().required(
    //   t["Owner Neighbourhood is required"]
    // ),

    // owner_city: Yup.string().required(t["Owner City is required"]),
    // owner_state: Yup.object().required(t["Owner State is required"]),
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findSinglePropertyData(query?.property_id));
  }, [dispatch, query?.property_id]);
  const singleData = useSelector(
    (state) => state?.singleProperty?.singlePropertyData
  );

  const {
    register,
    watch,
    control,
    setError,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      videos: [
        {
          url: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "videos",
  });
  const [loading, setLoading] = useState(false);
  const [draftloading, setDraftLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [featuretypes, setFeatureTypes] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [adType, setAdType] = useState(1);
  const [propertyType, setPropertyType] = useState(1);
  const [property_detail_id, setPropertyDetailId] = useState(1);
  const [files, setFiles] = useState([]);
  const [imageError, setImageError] = useState(false);
  const [imageErrorMessage, setImageErrorMessage] = useState("");
  const [ErrorsData, setErrorsData] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState({});
  const [maritalStatus, setMaritalStatus] = useState("Married");
  const [sentModalOpen, setSentModalOpen] = useState(false);
  const [action, setAction] = useState("");
  const handleOpen = () => setSentModalOpen(true);
  const handleClose = () => setSentModalOpen(false);

  useEffect(() => {
    if (files?.length > 0) {
      delete errors?.images;
    }
  }, [files, errors]);

  useEffect(() => {
    if (documents?.length > 0) {
      delete errors?.document_files;
    }
  });

  useEffect(() => {
    if (query?.property_id) {
      setAdType(
        singleData?.ad_type?.charAt(0).toUpperCase() +
          singleData?.ad_type?.slice(1)
      );
      setPropertyType(
        singleData?.property_type?.charAt(0).toUpperCase() +
          singleData?.property_type?.slice(1)
      );
      setDocuments(singleData?.documents);
      setPropertyDetailId(+singleData?.property_detail_id);
      setDocuments(singleData?.documents);
      setValue("project_id", singleData?.project);
      setValue("zip_code", singleData?.address?.zip_code);
      setValue("address", singleData?.address?.address);
      setValue("number", singleData?.address?.number),
        setValue("neighbourhood", singleData?.address?.neighbourhood);
      setValue("complement", singleData?.address?.complement);
      setValue("city", singleData?.address?.city);
      setValue("complement", singleData?.address?.complement);
      setValue("state", singleData?.address?.state);
      setValue("brl_rent", singleData?.brl_rent);
      setValue("brl_iptu", singleData?.brl_iptu);
      setValue("condominium", singleData?.condominium);
      setValue("land_area", singleData?.land_area);
      setValue("property_area", singleData?.property_area);
      setValue("no_of_rooms", singleData?.no_of_rooms);
      setValue("no_of_suites", singleData?.no_of_suites);
      setValue("no_of_bathrooms", singleData?.no_of_bathrooms);
      setValue("no_of_parking_spaces", singleData?.no_of_parking_spaces);

      let selectFeatures = [];
      singleData?.features?.forEach((data) => {
        selectFeatures.push(data.id);
      });
      setFeatureTypes(selectFeatures);
      let allSelectImages = singleData?.attachments?.filter(
        (data) => data?.file_type === "image"
      );

      setFiles(allSelectImages);

      let allSelectVideos = singleData?.attachments?.filter(
        (data) => data?.file_type === "url"
      );

      const urlEditData = allSelectVideos?.map((info) => {
        return {
          url: info?.file_path,
        };
      });
      setValue("videos", urlEditData);
      setValue("owner_name", singleData?.property_owner?.name);
      setValue("owner_rg", singleData?.property_owner?.rg);
      setValue("owner_cpf", singleData?.property_owner?.cpf);
      setValue("owner_spouse_name", singleData?.property_owner?.spouse_name);
      setValue("owner_spouse_rg", singleData?.property_owner?.spouse_rg);
      setValue("owner_spouse_cpf", singleData?.property_owner?.spouse_cpf);
      setValue("owner_zip_code", singleData?.property_owner?.address?.zip_code);
      setValue("owner_address", singleData?.property_owner?.address?.address);
      setValue("owner_number", singleData?.property_owner?.address?.number);
      setValue(
        "owner_neighbourhood",
        singleData?.property_owner?.address?.neighbourhood
      );
      setValue("owner_city", singleData?.property_owner?.address?.city);
      setValue("owner_state", singleData?.property_owner?.address?.state);
      setValue(
        "owner_complement",
        singleData?.property_owner?.address?.complement
      );
      // setValue(
      //   "owner_registry",
      //   singleData?.property_owner?.registry[0]?.registry_office
      // );
      // setValue(
      //   "owner_registration_number",
      //   +singleData?.property_owner?.registry[0]?.registry_number
      // );
      // setValue("owner_documentation", {
      //   label: singleData?.property_owner?.registry[0]?.title,
      //   year: "2009",
      // });

      setValue("registry", singleData?.registry?.[0]?.registry_office);
      setValue(
        "registration_number",
        +singleData?.registry?.[0]?.registry_number
      );
      setValue("documentation", {
        label: singleData?.registry?.[0]?.title,
        year: "2009",
      });
    }
  }, [query?.property_id, setValue, singleData]);

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

  const omitEmpties = (obj) => {
    return Object.entries(obj).reduce((carry, [key, value]) => {
      if (![null, undefined, "", [], {}].includes(value)) {
        carry[key] = value;
      }
      return carry;
    }, {});
  };

  const allValues = watch();

  const onSubmit = async (data) => {
    action === "new" ? setLoading(true) : setDraftLoading(true);

    // if (files.length > 0 && featuretypes.length > 0) {
    let newArr = [];
    files?.forEach((data, index) => {
      if (data instanceof File) {
        newArr.push({ file: data, title: allValues[`title_${index}`].slug });
      }
    });

    const newDocuments = documents?.filter((data) => data instanceof File);

    const firstPartData = omitEmpties({
      user_id: +session?.user?.userId,
      project_id: data?.project_id?.id && +data?.project_id?.id,
      property_id: query?.property_id,
      property_detail_id: +property_detail_id,
      ad_type: adType.toLocaleLowerCase(),
      property_type: propertyType.toLocaleLowerCase(),
      condominium: data?.condominium,
      brl_rent: data?.brl_rent,
      brl_iptu: data?.brl_iptu,
      land_area: data?.land_area,
      property_area: data?.property_area,
      no_of_rooms: data?.no_of_rooms,
      no_of_suites: data?.no_of_suites,
      no_of_bathrooms: data?.no_of_bathrooms,
      no_of_parking_spaces: data?.no_of_parking_spaces,
      features: featuretypes,
      // deprecated_images: singleData?.attachments?.map((data) => data.id),
      // status: action,
      document_files: newDocuments,
      content_url: data?.videos[0]?.url !== "" ? data?.videos : null,
      images: newArr,
      // documents: "",
      // registry: "",
      // registration_number: "",
    });

    const addressData = omitEmpties({
      zip_code: data?.zip_code,
      address: data?.address,
      city: data?.city,
      state_id: data?.state?.id,
      number: data?.number,
      neighbourhood: data?.neighbourhood,
      complement: data?.complement,
    });

    const registryData = omitEmpties({
      registry_office: data?.registry,
      registry_number: data?.registration_number,
      document_title: data?.documentation?.label,
    });

    const ownerData = omitEmpties({
      maritalStatus: maritalStatus,
      name: data?.owner_name,
      rg: data?.owner_rg,
      cpf: data?.owner_cpf,
      spouse_name: data?.owner_spouse_name,
      spouse_rg: data?.owner_spouse_rg,
      spouse_cpf: data?.owner_spouse_cpf,
    });

    const ownerDataAddress = omitEmpties({
      zip_code: data?.owner_zip_code,
      address: data?.owner_address,
      city: data?.owner_city,
      state_id: data?.owner_state?.id,
      number: data?.number,
      neighbourhood: data?.neighbourhood,
      complement: data?.complement,
    });

    // const ownerRegistryData = omitEmpties({
    //   registry_office: data?.owner_registry,
    //   registry_number: data?.owner_registration_number,
    //   document_title: data?.owner_documnentation?.label,
    // });
    const requireData = omitEmpties({
      ...firstPartData,
      registry_data: registryData,
      address: addressData,
      owner_datas:
        session?.user?.role !== "owner"
          ? {
              ...ownerData,
              address: ownerDataAddress,
            }
          : null,
    });

    const formData = serialize(requireData, { indices: true });
    if (query?.property_id) {
      const [error, response] = await propertyUpdateApi(formData);
      setLoading(false);
      setDraftLoading(false);
      if (!error) {
        setSentModalOpen(true);
      } else {
        const errors = error?.response?.data?.errors ?? {};
        Object.entries(errors).forEach(([name, messages]) => {
          setError(name, { type: "manual", message: messages[0] });
        });
      }
    } else {
      const [error, response] = await propertyCreateApi(formData);
      setLoading(false);
      setDraftLoading(false);
      if (!error) {
        setSentModalOpen(true);
      } else {
        const errors = error?.response?.data?.errors ?? {};
        Object.entries(errors).forEach(([name, messages]) => {
          setError(name, { type: "manual", message: messages[0] });
        });
      }
    }
  };

  const [single, setSingle] = useState(false);
  const [married, setMarried] = useState(true);

  const [disableBtn, setDisableBtn] = useState(true);
  useEffect(() => {
    if (
      allValues?.owner_name != null &&
      allValues?.owner_cpf != null &&
      allValues?.owner_rg != null &&
      allValues?.owner_zip_code != null &&
      allValues?.owner_address != null &&
      allValues?.owner_number != null &&
      allValues?.owner_neighbourhood != null &&
      allValues?.owner_city != null &&
      allValues?.owner_state != null
    ) {
      setDisableBtn(false);
    }
    if (
      allValues?.owner_name === "" ||
      allValues?.owner_cpf === "" ||
      allValues?.owner_rg === "" ||
      allValues?.owner_zip_code === "" ||
      allValues?.owner_address === "" ||
      allValues?.owner_number === "" ||
      allValues?.owner_neighbourhood === "" ||
      allValues?.owner_city === "" ||
      allValues?.owner_state === ""
    ) {
      setDisableBtn(true);
    }
  }, [allValues]);

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
                  lastStageData={t["New property"]}
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                      {activeStep === 0 ? (
                        <Address
                          handleNext={handleNext}
                          control={control}
                          errors={errors}
                          documents={documents}
                          setDocuments={setDocuments}
                          adType={adType}
                          setAdType={setAdType}
                          propertyType={propertyType}
                          setPropertyType={setPropertyType}
                          property_detail_id={property_detail_id}
                          setPropertyDetailId={setPropertyDetailId}
                          languageName={myValue.toString()}
                          allValues={allValues}
                        />
                      ) : activeStep === 1 ? (
                        <ValuesAndDescription
                          tipoVenda={property_detail_id}
                          handleNext={handleNext}
                          handleBack={handleBack}
                          control={control}
                          errors={errors}
                          allValues={allValues}
                          languageName={myValue.toString()}
                        />
                      ) : activeStep === 2 ? (
                        <Features
                          handleNext={handleNext}
                          handleBack={handleBack}
                          control={control}
                          errors={errors}
                          featuretypes={featuretypes}
                          setFeatureTypes={setFeatureTypes}
                          languageName={myValue.toString()}
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
                          allValues={allValues}
                          languageName={myValue.toString()}
                        />
                      ) : (
                        <Owner
                          handleNext={handleNext}
                          handleBack={handleBack}
                          control={control}
                          errors={errors}
                          maritalStatus={maritalStatus}
                          setMaritalStatus={setMaritalStatus}
                          languageName={myValue.toString()}
                          setSingle={setSingle}
                          single={single}
                          married={married}
                          setMarried={setMarried}
                        />
                      )}
                      {/* {errors && (
                        <Stack sx={{ width: "100%", mt: 2 }} spacing={2}>
                          {Object.keys(errors).map((key, index) => (
                            <Alert key={index} severity="error">
                              {errors[key].message}
                            </Alert>
                          ))}
                        </Stack>
                      )} */}
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
                        {activeStep === steps.length - 1 && (
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
                            {t["come back"]}
                          </Button>
                        )}
                        {/* {activeStep === 0 && (
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
                              {t["Cancel"]}
                            </Button>
                          </Link>
                        )} */}

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
                          <Box>
                            <Button
                              type="submit"
                              disabled={
                                session?.user?.role !== "owner" && disableBtn
                              }
                              onClick={() => setAction("draft")}
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
                              {draftloading && (
                                <CircularProgress size={22} color="inherit" />
                              )}
                              {!draftloading && t["Save as draft"]}
                            </Button>
                            <Button
                              type="submit"
                              disabled={
                                session?.user?.role !== "owner" && disableBtn
                              }
                              onClick={() => setAction("new")}
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
                              {loading && (
                                <CircularProgress size={22} color="inherit" />
                              )}
                              {!loading && t["Submit approval"]}
                            </Button>
                          </Box>
                        )}
                        {/* {activeStep !== steps.length - 1 && (
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
                                boxShadow:
                                  "0px 4px 8px rgba(81, 51, 182, 0.32)",
                              },
                            }}
                          >
                            {t["Next"]}
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
                    <PropertySubmittedModal
                      handleClose={handleClose}
                      languageName={myValue.toString()}
                    />
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
