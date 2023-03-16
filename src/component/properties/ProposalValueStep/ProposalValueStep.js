import {
  Box,
  Button,
  Grid,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import PropertyCard from "../PropertyCard/PropertyCard";
import Image from "next/image";
import proposeImage from "../../../../public/Images/proposal_modal.png";
import BaseTextField from "../../reuseable/baseTextField/BaseTextField";

function ProposalValueStep() {
  const [cash, setCash] = useState(true);
  const [installment, setInstallment] = useState(false);
  return (
    <Box sx={{ mt: 4 }}>
      <PropertyCard />
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
              backgroundColor: "#0362F0",
              color: "#ffffff",
              borderRadius: "56px",
            }}
            onClick={() => {
              setCash(true);
              setInstallment(false);
            }}
          >
            In Cash
          </Button>
          <Button
            sx={{
              textTransform: "none",
              padding: "3px 6px",
              backgroundColor: "#F2F5F6",
              color: "#002152",
              borderRadius: "56px",
              ml: 1,
            }}
            onClick={() => {
              setCash(false);
              setInstallment(true);
            }}
          >
            Installments
          </Button>
        </Grid>
        {cash && (
          <Box>
            <BaseTextField
              sx={{ width: "70%" }}
              placeholder={"BRL Total Amount"}
              type={"number"}
            />
            <TextareaAutosize
              aria-label="minimum height"
              minRows={4}
              placeholder="Observation"
              //   value={field.value}
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
          </Box>
        )}
        {installment && (
          <Box>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <BaseTextField
                  placeholder={"BRL Total Amount"}
                  type={"number"}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <BaseTextField placeholder={"R$ Cash Value"} type="number" />
              </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <BaseTextField placeholder={"R$ Term Value"} type={"number"} />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <BaseTextField
                  placeholder={"Number of Installments"}
                  type={"number"}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={4}
                  placeholder="Observation"
                  //   value={field.value}
                  style={{
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
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default ProposalValueStep;
