import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import trackImage from "../../../../public/Images/track.png";
import digitalImage from "../../../../public/Images/digital.png";
import fastImage from "../../../../public/Images/fast.png";
import Image from "next/image";
import BaseButton from "../../reuseable/button/BaseButton";

function BecomeBroker() {
  return (
    // <Grid
    //   container
    //   direction="column"
    //   justifyContent="center"
    //   alignItems="center"
    //   sx={{
    //     marginTop: 1,
    //     marginLeft: { xs: "0.5vh", sm: "0.5vh", md: 0, lg: 0, xl: 0 },
    //   }}
    // >
    //   <Grid
    //     container
    //     spacing={1}
    //     sx={{
    //       backgroundColor: "#ffffff",
    //       borderRadius: "6px",
    //       paddingX: { xs: 0, sm: 0, md: 0, lg: 4, xl: 4 },
    //       paddingY: 2.5,
    //       // marginLeft: { xs: "0.5vh", sm: "0.5vh" },
    //     }}
    //   >
    //     <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
    //       <Image src={trackImage} alt="track" />
    //     </Grid>
    //     <Grid item xs={12} sm={12} md={8} lg={9} xl={9}>
    //       <Grid
    //         container
    //         direction="column"
    //         justifyContent="center"
    //         alignItems="flex-start"
    //       >
    //         <Typography
    //           variant="p"
    //           sx={{ fontSize: "24px", fontWeight: "700", color: "#1A1859" }}
    //         >
    //           track everything online
    //         </Typography>
    //         <Typography
    //           variant="p"
    //           sx={{ fontSize: "18px", fontWeight: "400", color: "#7C7C99" }}
    //         >
    //           Announcements, schedules of visits and proposals all in the palm
    //           of your hands.
    //         </Typography>
    //       </Grid>
    //     </Grid>
    //   </Grid>

    //   <Grid
    //     container
    //     spacing={1}
    //     sx={{
    //       backgroundColor: "#ffffff",
    //       borderRadius: "6px",
    //       paddingX: 4,
    //       paddingY: 2.5,
    //       marginTop: 3,
    //     }}
    //   >
    //     <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
    //       <Image src={digitalImage} alt="track" />
    //     </Grid>
    //     <Grid item xs={12} sm={12} md={8} lg={9} xl={9}>
    //       <Grid
    //         container
    //         direction="column"
    //         justifyContent="center"
    //         alignItems="flex-start"
    //       >
    //         <Typography
    //           variant="p"
    //           sx={{ fontSize: "24px", fontWeight: "700", color: "#1A1859" }}
    //         >
    //           track everything online
    //         </Typography>
    //         <Typography
    //           variant="p"
    //           sx={{ fontSize: "18px", fontWeight: "400", color: "#7C7C99" }}
    //         >
    //           Announcements, schedules of visits and proposals all in the palm
    //           of your hands.
    //         </Typography>
    //       </Grid>
    //     </Grid>
    //   </Grid>
    //   <Grid
    //     container
    //     spacing={1}
    //     sx={{
    //       backgroundColor: "#ffffff",
    //       borderRadius: "6px",
    //       paddingX: 4,
    //       paddingY: 2.5,
    //       marginTop: 3,
    //     }}
    //   >
    //     <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
    //       <Image src={fastImage} alt="track" />
    //     </Grid>
    //     <Grid itemxs={12} sm={12} md={8} lg={9} xl={9}>
    //       <Grid
    //         container
    //         direction="column"
    //         justifyContent="center"
    //         alignItems="flex-start"
    //       >
    //         <Typography
    //           variant="p"
    //           sx={{ fontSize: "24px", fontWeight: "700", color: "#1A1859" }}
    //         >
    //           track everything online
    //         </Typography>
    //         <Typography
    //           variant="p"
    //           sx={{ fontSize: "18px", fontWeight: "400", color: "#7C7C99" }}
    //         >
    //           Announcements, schedules of visits and proposals all in the palm
    //           of your hands.
    //         </Typography>
    //       </Grid>
    //     </Grid>
    //   </Grid>
    //   <BaseButton
    //     name={"Be a Partner"}
    //     width={"100%"}
    //     fontSize={"24px"}
    //     margin={"4vh 0 0 0"}
    //   />
    // </Grid>

    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        marginTop: { xs: 12, sm: 12, md: 1, lg: 1, xl: 1 },
        marginLeft: { xs: "0.5vh", sm: "0.5vh", md: 0, lg: 0, xl: 0 },
      }}
    >
      <Grid
        container
        spacing={1}
        // sx={{
        //   backgroundColor: "#ffffff",
        //   borderRadius: "6px",
        //   paddingX: 4,
        //   paddingY: 2.5,
        //   marginTop: 3,
        // }}
      >
        <Grid item xs={12} sm={12} md={8} lg={9} xl={9}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Typography
              variant="p"
              sx={{ fontSize: "24px", fontWeight: "700", color: "#1A1859" }}
            >
              track everything online
            </Typography>
            <Typography
              variant="p"
              sx={{ fontSize: "18px", fontWeight: "400", color: "#7C7C99" }}
            >
              You will receive qualified Leads not only from your properties,
              but from all in your region, as well as scheduling visits,
              proposals, directly in your control panel.
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={1}
        // sx={{
        //   backgroundColor: "#ffffff",
        //   borderRadius: "6px",
        //   paddingX: 4,
        //   paddingY: 2.5,
        //   marginTop: 3,
        // }}
      >
        <Grid item xs={12} sm={12} md={8} lg={9} xl={9}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Typography
              variant="p"
              sx={{ fontSize: "24px", fontWeight: "700", color: "#1A1859" }}
            >
              track everything online
            </Typography>
            <Typography
              variant="p"
              sx={{ fontSize: "18px", fontWeight: "400", color: "#7C7C99" }}
            >
              You receive 70% of the commission negotiated with the property
              owner (raising and commission).
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={1}
        // sx={{
        //   backgroundColor: "#ffffff",
        //   borderRadius: "6px",
        //   paddingX: 4,
        //   paddingY: 2.5,
        //   marginTop: 3,
        // }}
      >
        <Grid item xs={12} sm={12} md={8} lg={9} xl={9}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Typography
              variant="p"
              sx={{ fontSize: "24px", fontWeight: "700", color: "#1A1859" }}
            >
              track everything online
            </Typography>
            <Typography
              variant="p"
              sx={{ fontSize: "18px", fontWeight: "400", color: "#7C7C99" }}
            >
              At Lokkan you are the owner of your business, you do not have a
              boss, you do not have to pay for the phone, ads, lawyers,
              documents and you still receive the highest commission on the
              market.
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={1}
        // sx={{
        //   backgroundColor: "#ffffff",
        //   borderRadius: "6px",
        //   paddingX: 4,
        //   paddingY: 2.5,
        //   marginTop: 3,
        // }}
      >
        <Grid item xs={12} sm={12} md={8} lg={9} xl={9}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Typography
              variant="p"
              sx={{ fontSize: "24px", fontWeight: "700", color: "#1A1859" }}
            >
              track everything online
            </Typography>
            <Typography
              variant="p"
              sx={{ fontSize: "18px", fontWeight: "400", color: "#7C7C99" }}
            >
              You will have access to Lokkans property database, which is made
              up of properties registered by owner, launches by land developers,
              builders and developers in several cities.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <BaseButton
          name={"Be a Partner"}
          width={"70%"}
          fontSize={"24px"}
          margin={"4vh 0 0 0"}
        />
      </Grid>
    </Grid>
  );
}

export default BecomeBroker;
