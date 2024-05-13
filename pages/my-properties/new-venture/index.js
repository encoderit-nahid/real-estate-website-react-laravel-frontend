import dynamic from "next/dynamic";
import Head from "next/head";
import React, { Fragment, useMemo, useState } from "react";
import Image from "next/image";
import {
  Autocomplete,
  Button,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  Stack,
  TextField,
  TextareaAutosize,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/material";
const ResponsiveDrawer = dynamic(() =>
  import("@/component/sharedProposal/ResponsiveDrawer/ResponsiveDrawer")
);
const BasicBreadcrumbs = dynamic(() =>
  import("@/component/reuseable/baseBreadCrumb/BaseBreadCrumb")
);
import ventureImage from "../../../public/Images/certidoes.png";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useDropzone } from "react-dropzone";
import Link from "next/link";
import BaseTextField from "../../../src/component/reuseable/baseTextField/BaseTextField";
import { getSession } from "next-auth/react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import BaseTextArea from "../../../src/component/reuseable/baseTextArea/BaseTextArea";
import { useEffect } from "react";
const BaseModal = dynamic(() =>
  import("@/component/reuseable/baseModal/BaseModal")
);
import { serialize } from "object-to-formdata";
import { createProjectApi } from "../../../src/api";
import BaseAutocomplete from "../../../src/component/reuseable/baseAutocomplete/BaseAutocomplete";
import { Topic } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { findPropertyTypeData } from "../../../src/redux/propertyType/actions";
import { GetPhotoTypeData } from "../../../src/redux/photo/actions";

const NewVentureSentModal = dynamic(() =>
  import("@/component/new venture/NewVentureSentModal/NewVentureSentModal")
);
import en from "locales/en";
import pt from "locales/pt";
import BaseStepper from "@/component/reuseable/baseStepper/BaseStepper";
import PhotosAndVideos from "@/component/new property/PhotosAndVideos/PhotosAndVideos";
import Features from "@/component/new property/Features/Features";
import Address from "@/component/new venture/Address/Address";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("O nome da empresa é obrigatório"),
  description: Yup.string().required("A descrição é necessária"),
});

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "50px",
  borderWidth: 2,
  borderRadius: "4px",
  borderColor: "#DBE1E5",
  borderStyle: "dashed",
  backgroundColor: "#F2F5F6",
  color: "#c4c4c4",
  outline: "none",
  transition: "border .24s ease-in-out",
  width: "100%",
  marginTop: "2vh",
};

const activeStyle = {
  borderColor: "#f2f",
};

const acceptStyle = {
  borderColor: "#f8f",
};

const rejectStyle = {
  borderColor: "#f2f",
};

const drawerWidth = 240;

export default function NewVenture({ language, session }) {
  //   const [files, setFiles] = useState([]);
  //   console.log({ files });
  const [myValue, setMyValue] = useState(language || "pt");
  const t = myValue === "en" ? en : pt;
  const steps = [t["Address"], t["Features"], t["Photos and videos"]];
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [adType, setAdType] = useState("New");
  const [disableBtn, setDisableBtn] = useState(true);
  const [draftloading, setDraftLoading] = useState(false);

  const BreadCrumbsData = [
    { stage: t["Start"], route: "" },
    { stage: t["My Properties"], route: "my-properties" },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetPhotoTypeData("project"));
  }, [dispatch]);

  const photoType = useSelector((state) => state?.photoType?.photoTypeData);

  const Loading = useSelector((state) => state?.photoType?.loading);
  const {
    register,
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [deletedContent, setDeletedContent] = useState([]);
  const [featuretypes, setFeatureTypes] = useState([]);
  const [propertyType, setPropertyType] = useState("Residential");
  const [property_detail_id, setPropertyDetailId] = useState(1);

  const [imageError, setImageError] = useState(false);
  const [imageErrorMessage, setImageErrorMessage] = useState("");

  const [sentModalOpen, setSentModalOpen] = useState(false);
  const handleOpen = () => setSentModalOpen(true);
  const handleClose = () => setSentModalOpen(false);

  const onDrop = (acceptedFiles) => {
    acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    const allFiles = [...files, ...acceptedFiles];

    //save all files here

    setFiles(allFiles);
  };
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  const handleDelete = (index) => {
    const filterItem = files.filter((file, fileIndex) => fileIndex !== index);
    setFiles(filterItem);
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const allValues = watch();

  const onSubmit = async (data) => {
    if (files.length > 0) {
      setLoading(true);
      let newArr = [];
      files?.forEach((data, index) => {
        newArr.push({ file: data, title: allValues[`title_${index}`].slug });
      });

      const requireData = {
        name: data.name,
        description: data.description,
        images: newArr,
      };

      const formData = serialize(requireData, { indices: true });
      const [error, response] = await createProjectApi(formData);
      setLoading(false);
      if (!error) {
        setSentModalOpen(true);
      } else {
        const errors = error?.response?.data?.errors ?? {};
        Object.entries(errors).forEach(([name, messages]) => {
          setError(name, { type: "manual", message: messages[0] });
        });
      }
    } else {
      setImageError(true);
      setImageErrorMessage("O arquivo de imagem é obrigatório");
    }
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
  const { fields, append, remove } = useFieldArray({
    control,
    name: "videos",
  });
  return (
    <div>
      <Head>
        <title>Lokkan - A imobiliária digital</title>
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
                  lastStageData={t["new venture"]}
                />
              </Grid>
              <Box sx={{ mt: 3 }}>
                {/* 👇 */}
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
                            adType={adType}
                            setValue={setValue}
                            setAdType={setAdType}
                            propertyType={propertyType}
                            setPropertyType={setPropertyType}
                            property_detail_id={property_detail_id}
                            setPropertyDetailId={setPropertyDetailId}
                            languageName={myValue.toString()}
                            allValues={allValues}
                          />
                        ) : activeStep === 1 ? (
                          <Features
                            handleNext={handleNext}
                            handleBack={handleBack}
                            control={control}
                            errors={errors}
                            featuretypes={featuretypes}
                            setFeatureTypes={setFeatureTypes}
                            languageName={myValue.toString()}
                          />
                        ) : (
                          <PhotosAndVideos
                            handleNext={handleNext}
                            handleBack={handleBack}
                            control={control}
                            errors={errors}
                            files={files}
                            setFiles={setFiles}
                            videoFiles={videoFiles}
                            setVideoFiles={setVideoFiles}
                            setDeletedContent={setDeletedContent}
                            deletedContent={deletedContent}
                            imageError={imageError}
                            imageErrorMessage={imageErrorMessage}
                            fields={fields}
                            append={append}
                            // hideNextButton={true}
                            remove={remove}
                            allValues={allValues}
                            languageName={myValue.toString()}
                          />
                        )}
                        {/* 
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
                        </Grid> */}
                      </form>
                    </Fragment>
                  )}
                </Box>
                {/*👆 */}
                {/* <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <Image src={ventureImage} alt="venture" />
                    <Typography
                      variant="p"
                      sx={{
                        color: "#002152",
                        fontSize: "24px",
                        fontWeight: "700",
                        lineHeight: "32px",
                        ml: 1,
                      }}
                    >
                      {t["New venture"]}
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    sx={{ mt: 4 }}
                  >
                    <Controller
                      name="name"
                      control={control}
                      defaultValue={""}
                      render={({ field }) => (
                        <BaseTextField
                          size={"small"}
                          placeholder={t["Enterprise Name"]}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                          name={"name"}
                          value={field.value}
                        />
                      )}
                    />
                    <Typography
                      variant="inherit"
                      color="textSecondary"
                      sx={{ color: "#b91c1c", mt: 0.5 }}
                    >
                      {errors.name?.message}
                    </Typography>

                    <Controller
                      name="description"
                      control={control}
                      defaultValue={""}
                      render={({ field }) => (
                        <BaseTextArea
                          minRows={3}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                          name={"description"}
                          value={field.value}
                          style={{
                            marginTop: "1vh",
                            width: "100%",
                            
                            color: "rgba(0, 0, 0, 0.87)",
                            fontSize: "17px",
                            outlineColor: "#1976d2",
                            border: `1px solid silver`,
                            borderRadius: "5px",
                            padding: "0.4vh 1.4vh",
                          }}
                          placeholder={t["Description"]}
                        />
                      )}
                    />
                    <Typography
                      variant="inherit"
                      color="textSecondary"
                      sx={{ color: "#b91c1c", mt: 0.5 }}
                    >
                      {errors.description?.message}
                    </Typography>
                    <Typography
                      variant="p"
                      sx={{
                        color: "#1A1859",
                        fontSize: "16px",
                        lineHeight: "22px",
                        fontWeight: "400",
                        mt: 3,
                      }}
                    >
                      {`${t["Logo and images of the enterprise"]} (.png or .jpeg)`}
                    </Typography>

                    <Box {...getRootProps({ style })}>
                      <input {...getInputProps()} />
                      <Typography
                        variant="p"
                        sx={{
                          color: "#6C7A84",
                          fontSize: "14px",
                          fontWeight: "400",
                          lineHeight: "18px",
                          mt: 1,
                        }}
                      >
                        {t["drag and drop images here"]}
                      </Typography>
                      <Typography
                        variant="p"
                        sx={{
                          color: "#6C7A84",
                          fontSize: "14px",
                          fontWeight: "400",
                          lineHeight: "18px",
                          mt: 1,
                        }}
                      >
                        {t["or"]}
                      </Typography>
                      <Button
                        variant="contained"
                        sx={{
                          textTransform: "none",
                          mt: 1,
                          background: "#0362F0",
                          color: "#ffffff",
                          fontSize: "14px",
                          fontWeight: "600",
                          lineHeight: "18px",
                        }}
                      >
                        {t["select images"]}
                      </Button>
                      {imageError && (
                        <Typography
                          variant="inherit"
                          color="textSecondary"
                          sx={{ color: "#b91c1c" }}
                        >
                          {imageErrorMessage}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                  {files.length > 0 && (
                    <Grid container spacing={1} sx={{ mt: 3 }}>
                      {files.map((file, index) => (
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={4}
                          lg={3}
                          xl={3}
                          key={index}
                        >
                          <Box
                            sx={{
                              p: 2,
                              boxSizing: "border-box",
                              border: "1px solid #DBE1E5",
                              borderRadius: "6px",
                            }}
                          >
                            <Grid
                              container
                              direction="row"
                              justifyContent="flex-end"
                              alignItems="flex-start"
                            >
                              <DeleteOutlineOutlinedIcon
                                sx={{
                                  background: "#F44336",
                                  color: "#ffffff",
                                  borderRadius: "50%",
                                  height: "3vh",
                                  width: "3vh",
                                  paddingY: "3px",
                                }}
                                onClick={() => handleDelete(index)}
                              />
                            </Grid>
                            <Image
                              src={file.preview}
                              height={70}
                              width={100}
                              layout="responsive"
                              alt="file"
                            />
                         
                            {!Loading ? (
                              <Controller
                                name={`title_${index}`}
                                control={control}
                                defaultValue={photoType[0] || {}}
                                render={({ field }) => (
                                  <BaseAutocomplete
                                    options={photoType || []}
                                    getOptionLabel={(option) =>
                                      option.name || ""
                                    }
                                    sx={{ mt: 2 }}
                                    isOptionEqualToValue={(option, value) =>
                                      option.slug === value.slug
                                    }
                                    size={"small"}
                                    placeholder={"Convenient"}
                                    onChange={(e, v, r, d) => field.onChange(v)}
                                    value={field.value}
                                  />
                                )}
                              />
                            ) : (
                              <Grid
                                container
                                sx={{ height: "5vh" }}
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                              >
                                <CircularProgress />
                              </Grid>
                            )}
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                    sx={{ mt: 2 }}
                  >
                    <Link href="/my-properties">
                      <Button
                        variant="outlined"
                        sx={{
                          borderColor: "#002152",
                          fontSize: "16px",
                          fontWeight: "600",
                          color: "#002152",
                          textTransform: "none",
                          paddingX: 4,
                          paddingY: 0.6,
                          mr: 1,
                          "&:hover": {
                            borderColor: "#002152",
                            fontSize: "16px",
                            fontWeight: "600",
                            color: "#002152",
                            textTransform: "none",
                            paddingX: 4,
                            paddingY: 0.6,
                            mr: 1,
                          },
                        }}
                      >
                        {t["Cancel"]}
                      </Button>
                    </Link>
                    <Button
                      type="submit"
                      variant="outlined"
                      sx={{
                        background: "#34BE84",
                        boxShadow: "0px 4px 8px rgba(34, 148, 100, 0.32)",
                        borderRadius: "4px",
                        fontSize: "16px",
                        fontWeight: "600",
                        lineHeight: "22px",
                        textTransform: "none",
                        color: "#ffffff",
                        paddingX: 4,
                        paddingY: 1,
                        "&:hover": {
                          background: "#34BE84",
                          boxShadow: "0px 4px 8px rgba(34, 148, 100, 0.32)",
                          borderRadius: "4px",
                          fontSize: "16px",
                          fontWeight: "600",
                          lineHeight: "22px",
                          textTransform: "none",
                          color: "#ffffff",
                          paddingX: 4,
                          paddingY: 1,
                        },
                      }}
                    >
                      {loading && (
                        <CircularProgress size={22} color="inherit" />
                      )}
                      {!loading && t["Save"]}
                    </Button>
                  </Grid>
                </form> */}
              </Box>
            </Container>
            <BaseModal isShowing={sentModalOpen} isClose={handleClose}>
              <Tooltip title="Something">
                <>
                  <NewVentureSentModal
                    handleClose={handleClose}
                    languageName={myValue.toString()}
                  />
                </>
              </Tooltip>
            </BaseModal>
          </Box>
        </Box>
      </main>
    </div>
  );
}

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
];

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
