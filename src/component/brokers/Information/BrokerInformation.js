import dynamic from "next/dynamic";

const BaseShareButton = dynamic(
  () => import("@/component/reuseable/baseShareButton/BaseShareButton"),
  { ssr: false }
);
const BaseFavoriteButton = dynamic(
  () => import("@/component/reuseable/baseFavoriteButton/BaseFavoriteButton"),
  { ssr: false }
);
import BaseWhatsappButton from "@/component/reuseable/baseWhatsappButton/BaseWhatsappButton";
import { Grid, ListItemText, Rating, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { _imageURL } from "consts";
const myLoader = ({ src }) => {
  return `${_imageURL}/${src}`;
};
const BrokerInformation = ({
  singleBrokerData,
  query,
  handleLoginOpen,
  t,
  avgRating,
  totalRatingCount,
}) => {
  const { params } = query
  const [id] = params || []
  return (
    <>
      <Grid item xs={2}>
        <Stack direction="column" alignItems="center" justifyItems="center">
          <Image
            loader={myLoader}
            src={`${singleBrokerData.broker?.attachments[0]?.file_path}`}
            width={100}
            height={100}
            alt="broker image"
            style={{
              borderRadius: "100%",
            }}
            objectFit="cover"
            objectPosition={"center"}
          />
          <ListItemText
            primary={
              <Typography
                variant="body1"
                sx={{
                  fontSize: "16px",
                  fontWeight: 700,
                  lineHeight: "22px",
                  color: "#6C7A84",
                }}
              >
                {avgRating}{" "}
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "18px",
                    color: "#6C7A84",
                  }}
                >
                  ({totalRatingCount} {t["reviews"]})
                </span>
              </Typography>
            }
          />
          <Rating name="size-large" defaultValue={4} readOnly />
        </Stack>
      </Grid>
      <Grid item xs={10}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Stack direction={"column"} spacing={2}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#002152",
                    fontWeight: "700",
                    fontSize: "16px",
                    lineHeight: "22px",
                  }}
                >
                  {singleBrokerData.broker.name}
                </Typography>
                <BaseWhatsappButton />
              </Stack>
              <Stack direction="row" alignItems={"center"} spacing={1}>
                <BaseShareButton
                  base_url={`https://www.lokkan.site/brokers/${id}`}
                />

                <BaseFavoriteButton
                  handleLoginOpen={handleLoginOpen}
                  itemID={id}
                  type="broker"
                />
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="p"
              sx={{
                color: "#002152",
                fontWeight: "400",
                fontSize: "16px",
                lineHeight: "22px",
                letterSpacing: "0.5px",
              }}
            >
              Lorem ipsum dolor sit amet consectetur. Cursus amet mi vestibulum
              nunc urna. Posuere congue sit urna in mattis sem. Pregnant nibh
              turpis in tincidunt enim. Condimentum amet proin commodo interdum.
              Magnis quam congue sed.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={4}>
                <Stack direction="row" spacing={1}>
                  <EmailIcon color="primary" />
                  <Typography
                    variant="p"
                    sx={{
                      color: "#002152",
                      fontWeight: "400",
                      fontSize: "16px",
                      lineHeight: "22px",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {singleBrokerData.broker.email}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack direction="row" spacing={1}>
                  <PhoneEnabledIcon color="primary" />
                  <Typography
                    variant="p"
                    sx={{
                      color: "#002152",
                      fontWeight: "400",
                      fontSize: "16px",
                      lineHeight: "22px",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {singleBrokerData.broker.phone}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack direction="row" spacing={1}>
                  <TextSnippetIcon color="primary" />
                  <Typography
                    variant="p"
                    sx={{
                      color: "#002152",
                      fontWeight: "400",
                      fontSize: "16px",
                      lineHeight: "22px",
                      letterSpacing: "0.5px",
                    }}
                  >
                    CRECI {singleBrokerData.broker.additional_info.creci_number}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default BrokerInformation;
