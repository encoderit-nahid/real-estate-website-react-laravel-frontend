import { AccountCircle } from "@mui/icons-material";
import { Box, Button, Grid, Link, Typography } from "@mui/material";
import React from "react";

function PrivacyContent({ name }) {
  return (
    <Box
      sx={{
        px: { xs: 0, sm: 0, md: 2, lg: 2, xl: 2 },
        py: 5,
        background: "#ffffff",
        boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.08)",
        borderRadius: "8px",
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ px: 6 }}
      >
        <Typography
          variant="p"
          sx={{
            fontSize: "32px",
            fontWeight: "800",
            lineHeight: "38px",
            color: "#1A1859",
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="p"
          sx={{
            mt: 2,
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "20px",
            color: "#7C7C99",
          }}
        >
          Date of last change: 06/24/2022
        </Typography>

        <Typography
          variant="p"
          sx={{
            mt: 3,
            fontSize: "24px",
            fontWeight: "800",
            lineHeight: "26px",
            color: "#1A1859",
            textTransform: "none",
          }}
        >
          1. Introduction
        </Typography>

        <Typography
          variant="p"
          sx={{
            mt: 2,
            fontSize: "16px",
            fontWeight: "400",
            lineHeight: "26px",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mi iaculis
          just, egestas ultrices leo. Et arcu lacus, diam tellus. Mattis aliquet
          risus ipsum leo. Tempus ut habitant massa, nisl blandit auctor
          elementum. Interdum id massa nec amet odio pretium tempus dui
          pulvinar. Phasellus faucibus odio lacus, amet, just. Sollicitudin nisi
          lorem et lobortis enim est ultrices id sit. Ultrices integer proin sit
          risus.
          <br />
          <br />
          Montes, eget nisl ipsum nisl in nibh pulvinar laoreet. Vestibulum, ac,
          orci risus neque venenatis. Aliquam, egestas ornare felis luctus
          malesuada placerat. Dui tincidunt feugiat lorem eu. Ut urna nulla
          auctor elementum sed amet. Leo convallis nunc et feugiat molestie
          duis. Vestibulum facilisis tristique metus, diam mattis. Amet, turpis
          imperdiet nibh sollicitudin massa felis mattis. Egestas nullam magna
          volutpat non, auctor integer. Me, dolor a et vivera turpis proin. Mi,
          lacus arcu etiam nam dolor. Rhoncus vitae quam in magna eu nibh.
          Vestibulum, laoreet quam aenean porttitor facilisi id gravida
          facilisis. In venenatis volutpat quisque faucibus amet eu sed ac eget.
          Quis arcu, aliquam placerat est amet massa pellentesque enim. Nisl
          ipsum tortor semper arcu ut. Venenatis diam malesuada neque leo non
          sagittis, aliquet imperdiet. Pellentesque non odio turpis urna, felis,
          et. Proin eu etiam eu, turpis dignissim. Facilisis lacinia lectus
          ultricies facilisis quam commodo facilisis. Dolor qui turpis sodales
          proin dictum. Condimentum magna tempus vitae non nulla at et vivera
          scelerisque. Vivamus consequat massa consectetur at purus. In lacus,
          interdum orci, consectetur nibh sit. A mauris porttitor mi venenatis a
          neque, pellentesque sed semper. Sit sit turpis nisi cras amet dui.
          Tortor time, eros, even quisque ultrices sed lacus, quis netus.
        </Typography>
        <Typography
          variant="p"
          sx={{
            mt: 3,
            fontSize: "24px",
            fontWeight: "800",
            lineHeight: "26px",
            color: "#1A1859",
            textTransform: "none",
          }}
        >
          2. To whom it applies
        </Typography>
        <Typography
          variant="p"
          sx={{
            mt: 2,
            fontSize: "16px",
            fontWeight: "400",
            lineHeight: "26px",
          }}
        >
          Ultricies non odio quam enim sed eu, vestibulum morbi. Faucibus
          gravida donec pellentesque id. Ut sit tempor amet scelerisque. Amet
          phasellus blandit aenean lobortis mauris. Non, erat aenean suspendisse
          diam venenatis at lorem tincidunt. Et enim nisl nunc, posuere mauris
          eget velit eu. Morbi nunc vivera a, volutpat semper. Amet eget neque
          amet, vivera ultricies sapien just velit. Scelerisque a et adipiscing
          lacus proin ante ultrices velit id. Amet tellus amet malesuada laoreet
          non. Sollicitudin in nisi et pellentesque. Tristique ornare mi, vitae
          amet. Accumsan purus risus arcu sagittis ut mauris. Ultrices neque est
          ullamcorper ullamcorper massa. Sit volutpat eget enim nunc id aliquet
          scelerisque dolor. Tempor luctus cursus et morbi. Faucibus sed et
          egestas consequent vitae. Vulputate augue id tempor elit, lectus
          laoreet facilisis. Nunc, nullam lorem imperdiet in sociis. Odio lacus,
          natoque facilisi et risus ante a ornare. Adipiscing dignissim aliquam
          venenatis ac enim. Vivamus nulla porta donec senectus suspendisse
          gravida.
          <br />
          <br />
          Tincidunt vel risus, ate gravida morbi est. Ut sed est amet,
          adipiscing nunc est. Duis sit tellus faucibus duis amet aliquet leo
          scelerisque pulvinar. Blandit ridiculus elit commodo vulputate dolor
          nisl, vivera praesent varius. Vitae sollicitudin est elementum quis et
          laoreet. Venenatis dignissim elit elit, pretium sed malesuada augue.
          Nunc, fringilla amet, tristique blandit urna, egestas vestibulum. Amet
          amet pasta fringilla elementum cursus pasta. Malesuada auctor dolor
          vivera et.
        </Typography>
        <Typography
          variant="p"
          sx={{
            mt: 3,
            fontSize: "16px",
            fontWeight: "700",
            lineHeight: "20px",
            color: "#1A1859",
          }}
        >
          Read too
        </Typography>

        <Link
          sx={{
            mt: 2,
            color: "#7450F0",
            fontSize: "16px",
            fontWeight: "400",
            lineHeight: "20px",
          }}
        >
          Terms and conditions of use
        </Link>
        <Link
          sx={{
            mt: 1,
            color: "#7450F0",
            fontSize: "16px",
            fontWeight: "400",
            lineHeight: "20px",
          }}
        >
          User Manual
        </Link>
      </Grid>
    </Box>
  );
}

export default PrivacyContent;
