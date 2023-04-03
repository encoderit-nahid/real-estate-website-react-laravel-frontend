import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import Image from "next/image";
import proposeImage from "../../../../public/Images/proposal_modal.png";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import BaseTextField from "../../reuseable/baseTextField/BaseTextField";
import { createProposalApi } from "../../../api";
import { useSession } from "next-auth/react";

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

function ProposalStep({
  skipped,
  setSkipped,
  activeStep,
  setActiveStep,
  singlePropertyId,
}) {
  // const handleNext = () => {
  //   let newSkipped = skipped;
  //   if (isStepSkipped(activeStep)) {
  //     newSkipped = new Set(newSkipped.values());
  //     newSkipped.delete(activeStep);
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped(newSkipped);
  // };

  const { data: session } = useSession();
  console.log({ session });
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

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
  const amount = localStorage.getItem("brl") || "";

  // useEffect(() => {
  //   amount && setValue("total_amount", amount);
  // }, [amount, setValue]);

  const onSubmit = async (data) => {
    const conditions = localStorage.getItem("condition") || null;
    console.log(conditions);
    setLoading(true);
    const allData = {
      ...data,
      user_id: session?.user?.userId,
      payment_type: (cash && "cash") || (installment && "installment"),
      property_id: singlePropertyId,
      proposal_type: "general",
      condition: conditions !== null && conditions,
    };

    console.log({ allData });
    const [error, response] = await createProposalApi(allData);
    setLoading(false);
    if (!error) {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
      localStorage.removeItem("brl");
      localStorage.removeItem("condition");
    } else {
      const errors = error?.response?.data?.errors ?? {};
      console.log({ errors });
      Object.entries(errors).forEach(([name, messages]) => {
        setError(name, { type: "manual", message: messages[0] });
      });
    }
  };

  return (
    <Box sx={{ mt: 2, mb: 1 }}>
      <Button sx={{ display: "flex" }}>
        <Image src={proposeImage} alt="proposeImage" />

        <Typography
          variant="p"
          sx={{
            fontSize: "24px",
            fontWeight: 700,
            color: "#002152",

            textTransform: "none",
          }}
        >
          Proposal values
        </Typography>
      </Button>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        sx={{ my: 2 }}
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
        <Box>
          <Controller
            name="total_amount"
            control={control}
            defaultValue={amount}
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
          {/* <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors?.observation?.message}
          </Typography> */}
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ mt: 1 }}
          >
            <Button
              type="submit"
              sx={{
                background: "#7450F0",
                borderRadius: "4px",
                width: {
                  xs: "50%",
                  sm: "50%",
                  md: "50%",
                  lg: "50%",
                  xl: "40%",
                  xxl: "30%",
                },
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
              {loading && <CircularProgress size={22} color="inherit" />}
              {!loading && "Submit Proposal"}
            </Button>
          </Grid>
        </Box>
      </form>
    </Box>
  );
}

export default ProposalStep;
