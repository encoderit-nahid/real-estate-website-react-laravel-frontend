import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  TextareaAutosize,
  Tooltip,
  Typography,
} from "@mui/material";
import loginImage from "../../../../public/Images/login.png";
import React from "react";
import Image from "next/image";
import BaseButton from "../../reuseable/button/BaseButton";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import rentImage from "../../../../public/Images/rentImage.png";
import avatar from "../../../../public/Images/AvatarPendant.png";
import { useState } from "react";
import BaseModal from "../../reuseable/baseModal/BaseModal";
import SendModal from "../toSendModal/SendModal";
import BaseOutlinedCurrencyInput from "../../reuseable/baseOutlinedCurrencyInput/BaseOutlinedCurrencyInput";
import BaseTextField from "../../reuseable/baseTextField/BaseTextField";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSession } from "next-auth/react";
import { createProposalApi } from "../../../api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  // top:{xs:"80%"},
  transform: "translate(-50%, -50%)",
  width: { xs: "80%", sm: "80%", md: "60%", lg: "25%", xl: "25%" },
  bgcolor: "#ffffff",
  // border: "2px solid #000",
  boxShadow: "none",
  borderRadius: "12px",
  maxHeight: "85vh",
  overflowY: "scroll",
  px: 0,
  py: 1,
};

const validationSchemaCash = Yup.object().shape({
  total_amount: Yup.number().required("BRL amount is required"),
});

const validationSchemaInstallment = Yup.object().shape({
  total_amount: Yup.number().required("Name is required"),
  cash_amount: Yup.number().required("Cash Value is required"),
  payment_per_installment: Yup.number().required("Term Value is required"),
  no_of_installment: Yup.number().required(
    "Number of Installments is required"
  ),
});

function CounterProposalModal({
  handleCounterProposalClose,
  proposalData,
  propertyData,
}) {
  //to_send_modal
  const { data: session } = useSession();
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const handleSendModalOpen = () => setSendModalOpen(true);
  const handleSendModalClose = () => setSendModalOpen(false);

  const [cash, setCash] = useState(true);
  const [installment, setInstallment] = useState(false);
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

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    const allData = {
      ...data,
      user_id: session?.user?.userId,
      payment_type: (cash && "cash") || (installment && "installment"),
      property_id: propertyData?.id,
      proposal_type: "counter",
    };

    console.log({ allData });
    const [error, response] = await createProposalApi(allData);
    setLoading(false);
    if (!error) {
      setSendModalOpen(true);
    } else {
      const errors = error?.response?.data?.errors ?? {};
      console.log({ errors });
      Object.entries(errors).forEach(([name, messages]) => {
        setError(name, { type: "manual", message: messages[0] });
      });
    }
  };

  return (
    <Box sx={style}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 2, px: 2 }}
      >
        <Typography
          variant="p"
          sx={{
            color: "#1A1859",
            fontSize: "24px",
            lineHeight: "32px",
            fontWeight: "700",
          }}
        >
          Counter Proposal
        </Typography>
        <CloseIcon onClick={handleCounterProposalClose} />
      </Grid>

      <Box
        sx={{ mt: 1, background: "#F2F5F6", mx: 2, py: 2, borderRadius: "4px" }}
      >
        <List
        // sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <ListItem sx={{ margin: 0, paddingY: "1px" }}>
            <ListItemAvatar>
              <Avatar>
                <Image src={avatar} alt="avatar" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  variant="p"
                  sx={{
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "#1A1859",
                    lineHeight: "18px",
                  }}
                >
                  {proposalData?.user?.name}
                </Typography>
              }
            />
          </ListItem>
        </List>

        <Divider sx={{ mx: 2 }} />
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ px: 2, py: 1 }}
        >
          <Typography
            variant="p"
            sx={{
              color: "#1A1859",
              fontSize: "14px",
              lineHeight: "28px",
              fontWeight: "400",
            }}
          >
            Value:
          </Typography>
          <Typography
            variant="p"
            sx={{
              color: "#1A1859",
              fontSize: "14px",
              lineHeight: "28px",
              fontWeight: "700",
            }}
          >
            {`BRL ${proposalData?.total_amount}`}
          </Typography>
        </Grid>
        <Divider sx={{ mx: 2 }} />
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ px: 2, py: 1 }}
        >
          <Typography
            variant="p"
            sx={{
              color: "#1A1859",
              fontSize: "14px",
              lineHeight: "28px",
              fontWeight: "400",
            }}
          >
            Proposal type:
          </Typography>
          <Typography
            variant="p"
            sx={{
              color: "#1A1859",
              fontSize: "14px",
              lineHeight: "28px",
              fontWeight: "400",
            }}
          >
            {proposalData?.payment_type}
          </Typography>
        </Grid>
      </Box>
      <Box sx={{ mt: 1 }}>
        <Typography
          variant="p"
          sx={{
            color: "#000000",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "18px",

            px: 2,
          }}
        >
          Counter proposal information
        </Typography>
      </Box>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        sx={{ my: 2, mx: 2 }}
      >
        <Button
          sx={{
            textTransform: "none",
            padding: "3px 6px",
            backgroundColor: cash ? "#0362F0" : "#F2F5F6",
            color: cash ? "#ffffff" : "#002152",
            borderRadius: "56px",
            "&: hover": {
              padding: "3px 6px",
              backgroundColor: "#0362F0",
              color: "#ffffff",
              borderRadius: "56px",
            },
          }}
          onClick={() => {
            setInstallment(false);
            setCash(true);
          }}
        >
          In Cash
        </Button>
        <Button
          sx={{
            textTransform: "none",
            padding: "3px 6px",
            backgroundColor: installment ? "#0362F0" : "#F2F5F6",
            color: installment ? "#ffffff" : "#002152",
            borderRadius: "56px",
            ml: 1,
            "&: hover": {
              padding: "3px 6px",
              backgroundColor: "#0362F0",
              color: "#ffffff",
              borderRadius: "56px",
            },
          }}
          onClick={() => {
            setInstallment(true);
            setCash(false);
          }}
        >
          Installments
        </Button>
      </Grid>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mx: 2 }}>
          <Controller
            name="total_amount"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextField
                size={"small"}
                placeholder={"BRL Total Amount"}
                variant={"outlined"}
                type={"number"}
                name={"total_amount"}
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.total_amount?.message}
          </Typography>
          {installment && (
            <Box>
              <Controller
                name="cash_amount"
                control={control}
                render={({ field }) => (
                  <BaseTextField
                    size={"small"}
                    placeholder={"R$ Cash value"}
                    type={"number"}
                    sx={{ mt: 2 }}
                    variant={"outlined"}
                    name={"cash_amount"}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                  />
                )}
              />
              <Typography
                variant="inherit"
                color="textSecondary"
                sx={{ color: "#b91c1c" }}
              >
                {errors.cash_amount?.message}
              </Typography>
              <Controller
                name="payment_per_installment"
                control={control}
                render={({ field }) => (
                  <BaseTextField
                    size={"small"}
                    placeholder={"R$ Term value"}
                    type={"number"}
                    sx={{ mt: 2 }}
                    variant={"outlined"}
                    name={"payment_per_installment"}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                  />
                )}
              />
              <Typography
                variant="inherit"
                color="textSecondary"
                sx={{ color: "#b91c1c" }}
              >
                {errors.payment_per_installment?.message}
              </Typography>
              <Controller
                name="no_of_installment"
                control={control}
                render={({ field }) => (
                  <BaseTextField
                    size={"small"}
                    placeholder={"R$ Number of installments"}
                    type={"number"}
                    sx={{ mt: 2 }}
                    variant={"outlined"}
                    name={"no_of_installment"}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                  />
                )}
              />
              <Typography
                variant="inherit"
                color="textSecondary"
                sx={{ color: "#b91c1c" }}
              >
                {errors.no_of_installment?.message}
              </Typography>
            </Box>
          )}

          <Controller
            name="observation"
            control={control}
            render={({ field }) => (
              <TextareaAutosize
                aria-label="minimum height"
                minRows={4}
                placeholder="Observation"
                value={field.value}
                name={"observation"}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
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
            )}
          />

          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-end"
            sx={{ mt: 2, px: 2, pb: 3 }}
          >
            <Button
              onClick={handleCounterProposalClose}
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
              Cancel
            </Button>
            <Button
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
              type="submit"
              // onClick={handleSendModalOpen}
            >
              {loading && <CircularProgress size={22} color="inherit" />}
              {!loading && "To send"}
            </Button>
          </Grid>
        </Box>
      </form>
      {/* {cash && (
        <Box sx={{ mx: 2, mt: 2 }}>
          <BaseOutlinedCurrencyInput
            placeholder={"Value of the counter proposal"}
            label={"Value of the counter proposal"}
            size={"small"}
          />
          <BaseTextField
            sx={{ width: "100%", mt: 2 }}
            size={"small"}
            placeholder={"Comment"}
            label={"Comment"}
          />
        </Box>
      )}
      {installment && (
        <Box sx={{ mx: 2 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <BaseOutlinedCurrencyInput
                placeholder={"Value of the counter proposal"}
                label={"Value of the counter proposal"}
                size={"small"}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <BaseOutlinedCurrencyInput
                placeholder={"Cash Value"}
                label={"Cash Value"}
                size={"small"}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <BaseOutlinedCurrencyInput
                placeholder={"Amount Paid In Installments"}
                label={"Amount Paid In Installments"}
                size={"small"}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <BaseTextField
                sx={{ width: "100%" }}
                size={"small"}
                type={"number"}
                placeholder={"Number Of Installments"}
                label={"Number Of Installments"}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <BaseTextField
                sx={{ width: "100%" }}
                size={"small"}
                placeholder={"Comments"}
                label={"Comments"}
              />
            </Grid>
          </Grid>
        </Box>
      )}
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
        sx={{ mt: 2, px: 2, pb: 3 }}
      >
        <Button
          onClick={handleCounterProposalClose}
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
          Cancel
        </Button>
        <Button
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
          onClick={handleSendModalOpen}
        >
          To send
        </Button>
      </Grid> */}
      <BaseModal isShowing={sendModalOpen} isClose={handleSendModalClose}>
        <Tooltip title="Something">
          <>
            <SendModal handleSendModalClose={handleSendModalClose} />
          </>
        </Tooltip>
      </BaseModal>
    </Box>
  );
}

export default CounterProposalModal;
