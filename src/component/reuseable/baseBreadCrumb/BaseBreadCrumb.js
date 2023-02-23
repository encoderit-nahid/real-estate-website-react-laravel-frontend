import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function BasicBreadcrumbs({
  BreadcrumbsData,
  lastStageData,
  style,
}) {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb" sx={style}>
        {BreadcrumbsData?.map((data, index) => (
          <Link
            key={index}
            underline="hover"
            color="inherit"
            href={data.route}
            // href="/material-ui/getting-started/installation/"
          >
            {data.stage}
          </Link>
        ))}

        <Typography color="text.primary">{lastStageData}</Typography>
      </Breadcrumbs>
    </div>
  );
}
