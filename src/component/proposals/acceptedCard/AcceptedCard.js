import {
  Avatar,
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import cardMedia from "../../../../public/Images/pendant.png";
import CheckIcon from "@mui/icons-material/Check";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

function AcceptedCard() {
  return (
    <Box
      sx={{
        background: "#ffffff",
        boxShadow: "0px 4px 8px rgba(0, 33, 82, 0.08)",
        borderRadius: "8px",
        paddingBottom: 2,
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Image src={cardMedia} layout="responsive" alt="pendant" />
      </Box>

      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Box sx={{ pl: 2, mt: 2 }}>
          <Button
            sx={{
              textTransform: "none",
              background: "rgba(116, 80, 240, 0.2)",
              borderRadius: "2px",
              padding: "2px 8px",
              color: "#7450F0",
              fontSize: "14px",
              lineHeight: "18px",
              fontWeight: "400",
              mr: 1,
            }}
          >
            rent
          </Button>
          <Button
            sx={{
              textTransform: "none",
              background: "#FFF7E6",
              borderRadius: "2px",
              padding: "2px 8px",
              color: "#229464",
              fontSize: "14px",
              lineHeight: "18px",
              fontWeight: "400",
              ml: "3px",
            }}
          >
            proposal accepted
          </Button>
        </Box>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ pl: 2, mt: 2 }}
      >
        <Typography
          variant="p"
          sx={{
            color: "#1A1859",
            fontSize: "24px",
            fontWeight: "700",
            lineHeight: "32px",
          }}
        >
          BRL 4570.00
        </Typography>
        <Typography
          variant="p"
          sx={{
            color: "#1A1859",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "18px",
            mt: 1,
          }}
        >
          8502 Preston Rd. Inglewood, Maine 98380
        </Typography>
      </Grid>

      <Box sx={{ mt: 1, px: 2 }}>
        <Button sx={{ display: "flex", textTransform: "none" }}>
          <CheckIcon sx={{ color: "#34BE84" }} />
          <Typography
            variant="h5"
            sx={{
              color: "#34BE84",
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "18px",
            }}
          >
            Announcement
          </Typography>
        </Button>
        <Button sx={{ display: "flex", textTransform: "none" }}>
          <CheckIcon sx={{ color: "#34BE84" }} />
          <Typography
            variant="h5"
            sx={{
              color: "#34BE84",
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "18px",
            }}
          >
            Proposal
          </Typography>
        </Button>
        <Button sx={{ display: "flex", textTransform: "none" }}>
          <CheckIcon sx={{ color: "#34BE84" }} />
          <Typography
            variant="h5"
            sx={{
              color: "#34BE84",
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "18px",
            }}
          >
            Contract
          </Typography>
        </Button>
        <Button sx={{ display: "flex", textTransform: "none" }}>
          <CheckIcon sx={{ color: "#34BE84" }} />
          <Typography
            variant="h5"
            sx={{
              color: "#34BE84",
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "18px",
            }}
          >
            Certificates and documents
          </Typography>
        </Button>
        <Button sx={{ display: "flex", textTransform: "none" }}>
          <FiberManualRecordIcon
            sx={{ color: "#9FAAB1", height: "2vh", width: "2vh" }}
          />
          <Typography
            variant="h5"
            sx={{
              color: "#9FAAB1",
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "18px",
              ml: 1,
            }}
          >
            Pre-analysis
          </Typography>
        </Button>
        <Button sx={{ display: "flex", textTransform: "none" }}>
          <FiberManualRecordIcon
            sx={{ color: "#9FAAB1", height: "2vh", width: "2vh" }}
          />
          <Typography
            variant="h5"
            sx={{
              color: "#9FAAB1",
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "18px",
              ml: 1,
            }}
          >
            Digital notery
          </Typography>
        </Button>
      </Box>
      <Grid container spacing={1} sx={{ px: 2, mt: 1 }}>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <Button
            fullWidth
            sx={{
              color: "#FFFFFF",
              fontSize: "14px",
              lineHeight: "18px",
              fontWeight: "600",

              background: "#0362F0",
              borderRadius: "4px",

              textTransform: "none",
              "&:hover": {
                color: "#FFFFFF",
                fontSize: "14px",
                lineHeight: "18px",
                fontWeight: "600",
                background: "#0362F0",
                borderRadius: "4px",

                textTransform: "none",
              },
            }}
          >
            Go to the journey
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <Link href="/property_journey">
            <Button
              fullWidth
              sx={{
                color: "#FFFFFF",
                fontSize: "14px",

                lineHeight: "18px",
                fontWeight: "600",
                background: "#7450F0",
                borderRadius: "4px",

                textTransform: "none",

                "&:hover": {
                  color: "#FFFFFF",
                  fontSize: "14px",

                  lineHeight: "18px",
                  fontWeight: "600",
                  background: "#7450F0",
                  borderRadius: "4px",

                  textTransform: "none",
                },
              }}
            >
              Generate contact
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AcceptedCard;
