import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import React, { Fragment, useMemo, useState } from "react";
import BaseFilePicker from "../reuseable/baseFilePicker/BaseFilePicker";
import { useFieldArray, useForm } from "react-hook-form";
import homeImage from "../../../public/Images/homeImage.jpg";
import en from "locales/en";
import pt from "locales/pt";
import { useGetFinancialQuery } from "@/queries/useGetFinancialQuery";
import { useSession } from "next-auth/react";
import { formatBrazilianCurrency } from "@/utils/useUtilities";
import { _imageURL } from "consts";
import { useMakePaymentMutation } from "@/queries/useMakePaymentMutation";
import { serialize } from "object-to-formdata";

function FinancialElement({ language, financialInfo, refetch }) {
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
  const [myValue, setMyValue] = useState(language || "pt");

  const t = myValue === "en" ? en : pt;

  const [files, setFiles] = useState([]);
  const [deletedContent, setDeletedContent] = useState([]);
  const [imageError, setImageError] = useState(false);
  const [imageErrorMessage, setImageErrorMessage] = useState("");

  console.log({ files });

  const { data: session } = useSession();

  const [sendLoading, setSendLoading] = useState(false);
  const mutation = useMakePaymentMutation();
  const handleMakePayment = () => {
    setSendLoading(true);
    const requireData = {
      property_id: financialInfo?.contract?.property_id,
      document: files[0],
    };
    const body = serialize(requireData, { indices: true });
    mutation.mutate(body, {
      onError(error) {
        toast.error("Falha ao efetuar pagamento");
        setSendLoading(false);
      },
      onSuccess: async (data) => {
        setSendLoading(false);
        refetch();
      },
    });
  };

  const myLoader = ({ src }) => {
    console.log("🟥 ~ myLoader ~ src:", src);
    if (
      src ==
      "https://broadbits.com/wp-content/themes/ryse/assets/images/no-image/No-Image-Found-400x264.png"
    ) {
      return src;
    }
    return `${_imageURL}/${src}`;
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const financialStatus = financialInfo?.commissions[0]?.status || "unpaid";
  const mediaName = financialInfo?.commissions[0]?.media[0]?.name;

  const calculateData = useMemo(() => {
    let brokerComission = 0;
    let lokkanComission = 0;
    let referrerComission = 0;

    financialInfo?.commissions?.forEach((data) => {
      if (data?.user_type === "broker") {
        brokerComission = data?.commission_amount;
      }
      if (data?.user_type === "admin") {
        lokkanComission = data?.commission_amount;
      }
      if (data?.user_type === "referrer") {
        referrerComission = data?.commission_amount;
      }
    });

    return {
      brokerComission,
      lokkanComission,
      referrerComission,
    };
  }, [financialInfo]);

  console.log({ calculateData });

  return (
    <Box
      sx={{
        p: "16px",
        borderRadius: "8px",
        backgroundColor: "rgba(255, 255, 255)",
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
          loader={myLoader}
          src={`${
            financialInfo?.attachments?.find(
              (attachment) => attachment.title == "cover_photo"
            )?.file_path ||
            "https://broadbits.com/wp-content/themes/ryse/assets/images/no-image/No-Image-Found-400x264.png"
          }`}
          width={300}
          height={200}
          alt="house"
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
            {financialInfo?.address?.address}, <br />{" "}
            {financialInfo?.address?.city}
          </Typography>
        </Box>
      </Stack>
      {session?.user?.role === "buyer" && (
        <Box>
          <Stack
            direction={isSmallScreen ? "column" : "row"} // Stack direction changes based on screen size
            justifyContent={isSmallScreen ? "center" : "space-between"}
            spacing={isSmallScreen ? 2 : 3} // Increase spacing for smaller screens
            sx={{ mt: 1 }}
          >
            <Box sx={{ width: "50%" }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#6C7A84",
                }}
              >
                valor de venda
              </Typography>
              <Typography
                sx={{
                  fontSize: "20px",
                  color: "#1A1859",
                  mt: 1,
                }}
              >
                {formatBrazilianCurrency(
                  financialInfo?.contract?.total_amount || 0
                )}
              </Typography>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#6C7A84",
                }}
              >
                Valor da propriedade
              </Typography>
              <Typography
                sx={{
                  fontSize: "20px",
                  color: "#1A1859",
                  mt: 1,
                }}
              >
                {formatBrazilianCurrency(financialInfo?.brl_rent || 0)}
              </Typography>
            </Box>
          </Stack>

          <Stack
            direction={isSmallScreen ? "column" : "row"}
            justifyContent={isSmallScreen ? "center" : "space-between"}
            spacing={isSmallScreen ? 2 : 3}
            sx={{ mt: 1 }}
          >
            <Box sx={{ width: "50%" }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#6C7A84",
                }}
              >
                Valor pago
              </Typography>
              <Typography
                sx={{
                  fontSize: "20px",
                  color: "#1A1859",
                  mt: 1,
                }}
              >
                {formatBrazilianCurrency(
                  (+financialInfo?.contract?.total_amount || 0) -
                    (+financialInfo?.contract?.remaining_amount || 0)
                )}
              </Typography>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#6C7A84",
                }}
              >
                Valor restante
              </Typography>
              <Typography
                sx={{
                  fontSize: "20px",
                  color: "#1A1859",
                  mt: 1,
                }}
              >
                {formatBrazilianCurrency(
                  financialInfo?.contract?.remaining_amount || 0
                )}
              </Typography>
            </Box>
          </Stack>
        </Box>
      )}
      {session?.user?.role === "broker" && (
        <Box>
          <Stack
            direction={isSmallScreen ? "column" : "row"} // Stack direction changes based on screen size
            justifyContent={isSmallScreen ? "center" : "space-between"}
            spacing={isSmallScreen ? 2 : 3} // Increase spacing for smaller screens
            sx={{ mt: 1 }}
          >
            <Box sx={{ width: "50%" }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#6C7A84",
                }}
              >
                valor de venda
              </Typography>
              <Typography
                sx={{
                  fontSize: "20px",
                  color: "#1A1859",
                  mt: 1,
                }}
              >
                {formatBrazilianCurrency(
                  financialInfo?.contract?.total_amount || 0
                )}
              </Typography>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#6C7A84",
                }}
              >
                Comissão
              </Typography>
              <Typography
                sx={{
                  fontSize: "20px",
                  color: "#1A1859",
                  mt: 1,
                }}
              >
                {formatBrazilianCurrency(calculateData?.brokerComission)}
              </Typography>
            </Box>
          </Stack>
        </Box>
      )}
      {session?.user?.role === "owner" && (
        <Box>
          <Stack
            direction={isSmallScreen ? "column" : "row"} // Stack direction changes based on screen size
            justifyContent={isSmallScreen ? "center" : "space-between"}
            spacing={isSmallScreen ? 2 : 3} // Increase spacing for smaller screens
            sx={{ mt: 1 }}
          >
            <Box sx={{ width: "50%" }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#6C7A84",
                }}
              >
                Valor de venda
              </Typography>
              <Typography
                sx={{
                  fontSize: "20px",
                  color: "#1A1859",
                  mt: 1,
                }}
              >
                {formatBrazilianCurrency(
                  financialInfo?.contract?.total_amount || 0
                )}
              </Typography>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#6C7A84",
                }}
              >
                Valor recebido do comprador
              </Typography>
              <Typography
                sx={{
                  fontSize: "20px",
                  color: "#1A1859",
                  mt: 1,
                }}
              >
                {formatBrazilianCurrency(
                  financialInfo?.contract?.received_amount || 0
                )}
              </Typography>
            </Box>
          </Stack>

          <Stack
            direction={isSmallScreen ? "column" : "row"}
            justifyContent={isSmallScreen ? "center" : "space-between"}
            spacing={isSmallScreen ? 2 : 3}
            sx={{ mt: 1 }}
          >
            <Box sx={{ width: "50%" }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#6C7A84",
                }}
              >
                Valor da comissão
              </Typography>
              <Typography
                sx={{
                  fontSize: "20px",
                  color: "#1A1859",
                  mt: 1,
                }}
              >
                {formatBrazilianCurrency(
                  (+financialInfo?.contract?.total_amount * 6) / 100 || 0
                )}
              </Typography>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#6C7A84",
                }}
              >
                Valor restante
              </Typography>
              <Typography
                sx={{
                  fontSize: "20px",
                  color: "#1A1859",
                  mt: 1,
                }}
              >
                {formatBrazilianCurrency(
                  financialInfo?.contract?.remaining_amount || 0
                )}
              </Typography>
            </Box>
          </Stack>
        </Box>
      )}
      {session?.user?.role === "admin" && (
        <Box>
          <Stack
            direction={isSmallScreen ? "column" : "row"} // Stack direction changes based on screen size
            justifyContent={isSmallScreen ? "center" : "space-between"}
            spacing={isSmallScreen ? 2 : 3} // Increase spacing for smaller screens
            sx={{ mt: 1 }}
          >
            <Box sx={{ width: "50%" }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#6C7A84",
                }}
              >
                Valor de venda
              </Typography>
              <Typography
                sx={{
                  fontSize: "20px",
                  color: "#1A1859",
                  mt: 1,
                }}
              >
                {formatBrazilianCurrency(
                  financialInfo?.contract?.total_amount || 0
                )}
              </Typography>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#6C7A84",
                }}
              >
                Valor recebido
              </Typography>
              <Typography
                sx={{
                  fontSize: "20px",
                  color: "#1A1859",
                  mt: 1,
                }}
              >
                {formatBrazilianCurrency(
                  financialInfo?.contract?.received_amount || 0
                )}
              </Typography>
            </Box>
          </Stack>

          <Stack
            direction={isSmallScreen ? "column" : "row"}
            justifyContent={isSmallScreen ? "center" : "space-between"}
            spacing={isSmallScreen ? 2 : 3}
            sx={{ mt: 1 }}
          >
            <Box sx={{ width: "50%" }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#6C7A84",
                }}
              >
                Valor do proprietário
              </Typography>
              <Typography
                sx={{
                  fontSize: "20px",
                  color: "#1A1859",
                  mt: 1,
                }}
              >
                {formatBrazilianCurrency(
                  (+financialInfo?.contract?.total_amount * 6) / 100 || 0
                )}
              </Typography>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#6C7A84",
                }}
              >
                Valor restante
              </Typography>
              <Typography
                sx={{
                  fontSize: "20px",
                  color: "#1A1859",
                  mt: 1,
                }}
              >
                {formatBrazilianCurrency(
                  financialInfo?.contract?.remaining_amount || 0
                )}
              </Typography>
            </Box>
          </Stack>
          <Stack
            direction={isSmallScreen ? "column" : "row"}
            justifyContent={isSmallScreen ? "center" : "space-between"}
            spacing={isSmallScreen ? 2 : 3}
            sx={{ mt: 1 }}
          >
            <Box sx={{ width: "50%" }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#6C7A84",
                }}
              >
                Comissão do corretor
              </Typography>
              <Typography
                sx={{
                  fontSize: "20px",
                  color: "#1A1859",
                  mt: 1,
                }}
              >
                {formatBrazilianCurrency(calculateData?.brokerComission)}
              </Typography>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#6C7A84",
                }}
              >
                Comissão lokkan
              </Typography>
              <Typography
                sx={{
                  fontSize: "20px",
                  color: "#1A1859",
                  mt: 1,
                }}
              >
                {formatBrazilianCurrency(calculateData?.lokkanComission)}
              </Typography>
            </Box>
          </Stack>
          <Stack
            direction={isSmallScreen ? "column" : "row"}
            justifyContent={isSmallScreen ? "center" : "space-between"}
            spacing={isSmallScreen ? 2 : 3}
            sx={{ mt: 1 }}
          >
            <Box sx={{ width: "50%" }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#6C7A84",
                }}
              >
                Comissão de referência
              </Typography>
              <Typography
                sx={{
                  fontSize: "20px",
                  color: "#1A1859",
                  mt: 1,
                }}
              >
                {formatBrazilianCurrency(calculateData?.referrerComission)}
              </Typography>
            </Box>
          </Stack>
        </Box>
      )}
      {((files.length === 0 &&
        session?.user?.role === "admin" &&
        financialStatus !== "paid") ||
        (files.length === 0 &&
          session?.user?.role === "broker" &&
          financialStatus !== "paid")) && (
        <Fragment>
          <Typography
            sx={{
              fontSize: "16px",
              color: "#1A1859",
              mt: 2,
            }}
          >
            RPA
          </Typography>

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
        </Fragment>
      )}
      {files?.length > 0 && financialStatus !== "paid" && (
        <Box
          sx={{
            border: "1px solid #DBE1E5",
            borderRadius: "8px",
            p: 2,
            mt: 2,
            mb: 6,
            height: "20vh",
          }}
        >
          <Box
            sx={{
              px: 1,
              color: "#0362F0",
              backgroundColor: "#E0F2FE",
              width: "fit-content",
              fontSize: "14px",
              mb: 2,
            }}
          >
            RPA
          </Box>
          <Typography
            variant="body1"
            sx={{
              color: "#1A1859",
              fontSize: "16px",
              mt: 2,
            }}
          >
            {files[0].name}
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
                disabled={sendLoading}
                onClick={() => setFiles(null)}
              >
                Excluir
              </Button>
              <Button
                variant="contained"
                color="success"
                disabled={sendLoading}
                onClick={handleMakePayment}
              >
                {sendLoading && <CircularProgress size={22} color="inherit" />}
                {!sendLoading && "Para enviar"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      )}
      {financialStatus === "paid" && (
        <Box
          sx={{
            border: "1px solid #DBE1E5",
            borderRadius: "8px",
            p: 2,
            mt: 2,
            mb: 6,
            height: "20vh",
          }}
        >
          <Box
            sx={{
              px: 1,
              color: "#0362F0",
              backgroundColor: "#E0F2FE",
              width: "fit-content",
              fontSize: "14px",
              mb: 2,
            }}
          >
            RPA
          </Box>
          <Typography
            variant="body1"
            sx={{
              color: "#1A1859",
              fontSize: "16px",
              mt: 2,
            }}
          >
            {mediaName}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default FinancialElement;
