import {
  Button,
  Grid,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import Image from "next/image";
import proposeImage from "../../../../public/Images/proposal_modal.png";
import React from "react";

function ProposalStep() {
  return (
    <Typography sx={{ mt: 2, mb: 1 }}>
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
            backgroundColor: "#F2F5F6",
            color: "#002152",
            borderRadius: "56px",
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
        >
          Installments
        </Button>
      </Grid>
      <TextField
        fullWidth
        id="outlined-basic"
        placeholder="BRL Total Amount"
        variant="outlined"
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
    </Typography>
  );
}

export default ProposalStep;
