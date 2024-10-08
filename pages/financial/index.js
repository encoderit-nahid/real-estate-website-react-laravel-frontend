import dynamic from "next/dynamic";
const ResponsiveDrawer = dynamic(
  () => import("@/component/sharedProposal/ResponsiveDrawer/ResponsiveDrawer"),
  {
    ssr: false,
  }
);
import Head from "next/head";
import Image from "next/image";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import homeImage from "../../public/Images/homeImage.jpg";
import { Button, Container, Grid, Stack } from "@mui/material";
import { useState } from "react";
import { useSession } from "next-auth/react";
import pt from "locales/pt";
import en from "locales/en";
import { useFieldArray, useForm } from "react-hook-form";
const BaseFilePicker = dynamic(
  () => import("@/component/reuseable/baseFilePicker/BaseFilePicker"),
  {
    ssr: false,
  }
);
const BaseDataTable = dynamic(
  () => import("@/component/reuseable/baseDataTable/BaseDataTable"),
  {
    ssr: false,
  }
);

const drawerWidth = 240;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Financial({ language }) {
  const [myValue, setMyValue] = useState(language || "pt");
  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "attachments",
  });
  const allValues = watch();

  const [files, setFiles] = useState([]);
  const [deletedContent, setDeletedContent] = useState([]);
  const [imageError, setImageError] = useState(false);
  const [imageErrorMessage, setImageErrorMessage] = useState("");
  const t = myValue === "en" ? en : pt;
  const { data: session } = useSession();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Head>
        <title>Lokkan - A imobiliária digital</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/negotiate.png" />
      </Head>

      <main>
        <Box sx={{ display: "flex" }}>
          <ResponsiveDrawer languageName={myValue.toString()} />
          <Box
            sx={{
              //   backgroundColor: "#f6f8fc",
              flexGrow: 1,
              background: "#F2F5F6",
              minHeight: "100vh",
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              paddingX: { xs: 0, sm: 0, md: 6, lg: 6, xl: 6 },
              paddingTop: { xs: 6, sm: 6, md: 6, lg: 8, xl: 3 },
              paddingBottom: { xs: 3, sm: 3, md: 3, lg: 4, xl: 3 },
            }}
          >
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Typography
                variant="p"
                sx={{
                  color: "#002152",
                  fontSize: "24px",
                  fontWeight: "700",
                  lineHeight: "32px",
                  ml: { xs: 4, sm: 4, md: 0, lg: 0, xl: 0 },
                  mt: { xs: 1, sm: 1, md: 0, lg: 0, xl: 0 },
                }}
              >
                {t["Financial"]}
              </Typography>
            </Grid>
            <Container maxWidth="xl">
              <Box sx={{ width: "100%" }}>
                <Box
                // sx={{ borderBottom: 1, borderColor: "divider" }}
                >
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    variant="scrollable"
                    sx={{
                      borderBottom: 1,
                      borderColor: "divider",
                    }}
                  >
                    <Tab
                      sx={{
                        fontWeight: "600",
                        textTransform: "none",
                        width: "100%",
                      }}
                      label={t["sales"]}
                      {...a11yProps(0)}
                    />
                    <Tab
                      sx={{
                        fontWeight: "600",
                        textTransform: "none",
                        width: "100%",
                      }}
                      label={t["Referral Credits"]}
                      {...a11yProps(1)}
                    />
                  </Tabs>
                </Box>

                <TabPanel value={value} index={0}>
                  <Box
                    sx={{
                      p: "16px",
                      borderRadius: "8px",
                      backgroundColor: "rgba(255, 255, 255)",
                      width: {
                        xs: "100%",
                        md: "50%",
                      },
                    }}
                  >
                    {/* 👇 */}

                    <Stack
                      direction={"row"}
                      sx={{
                        border: "1px solid #DBE1E5",
                        borderRadius: "8px",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={homeImage}
                        alt="home"
                        width={"120px"}
                        height={"108px"}
                        objectFit="cover"
                      />

                      <Box
                        sx={{
                          p: 2,
                        }}
                      >
                        <Stack direction={"row"} spacing={2}>
                          <Box
                            sx={{
                              px: 1,
                              color: "#7450F0",
                              backgroundColor: "#e3dcfc",
                              width: "fit-content",
                            }}
                          >
                            {t["sale"]}
                          </Box>
                          <Box
                            sx={{
                              px: 1,
                              color: "#114B32",
                              backgroundColor: "#ddf8ed",
                              width: "fit-content",
                            }}
                          >
                            {t["published"]}
                          </Box>
                        </Stack>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "#6C7A84",
                            mt: 1,
                          }}
                        >
                          8502 Preston Rd. Inglewood, <br /> Maine 98380
                        </Typography>
                      </Box>
                    </Stack>

                    {/* 👆 */}
                    <Stack direction={"row"} spacing={3} sx={{ mt: 1 }}>
                      <Box>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "#6C7A84",
                          }}
                        >
                          {t["sale value"]}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "20px",
                            color: "#1A1859",
                            mt: 1,
                          }}
                        >
                          R$7000,000.00
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "#6C7A84",
                          }}
                        >
                          {t["Commission"]}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "20px",
                            color: "#1A1859",
                            mt: 1,
                          }}
                        >
                          R$17,000.00
                        </Typography>
                      </Box>
                    </Stack>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        color: "#1A1859",
                        mt: 2,
                      }}
                    >
                      RPA
                    </Typography>
                    {files.length == 0 && (
                      <BaseFilePicker
                        control={control}
                        errors={errors}
                        files={files}
                        setFiles={setFiles}
                        setDeletedContent={setDeletedContent}
                        deletedContent={deletedContent}
                        imageError={imageError}
                        imageErrorMessage={imageErrorMessage}
                        fields={fields}
                        append={append}
                        remove={remove}
                        allValues={allValues}
                        languageName={myValue.toString()}
                        hideTitle
                        hideVideoPicker
                        hidePictureGrid
                        hideVideoGrid
                      />
                    )}
                    {files.length > 0 && (
                      <Box
                        sx={{
                          border: "1px solid #DBE1E5",
                          borderRadius: "8px",
                          p: 2,
                          mt: 1,
                        }}
                      >
                        <Box
                          sx={{
                            px: 1,
                            color: "#0362F0",
                            backgroundColor: "#E0F2FE",
                            width: "fit-content",
                            fontSize: "14px",
                          }}
                        >
                          RPA
                        </Box>
                        <Typography
                          sx={{
                            color: "#1A1859",
                            fontSize: "16px",
                            mt: 2,
                          }}
                        >
                          {files[0]?.name}
                        </Typography>
                        <Stack
                          direction={"row"}
                          spacing={1}
                          justifyContent={"flex-end"}
                          m={2}
                        >
                          <Stack direction={"row"} spacing={2}>
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => setFiles([])}
                            >
                              Delete
                            </Button>
                            <Button variant="contained" color="success">
                              To send
                            </Button>
                          </Stack>
                        </Stack>
                      </Box>
                    )}
                  </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <BaseDataTable
                    headers={[
                      "Nominated people",
                      "Amount",
                      "Amount received",
                      "Balance receivable",
                      "Nominees",
                    ]}
                  />
                </TabPanel>
              </Box>
            </Container>
          </Box>
        </Box>
      </main>
    </div>
  );
}
