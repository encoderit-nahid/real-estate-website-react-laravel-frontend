import React, { useCallback, useEffect, useState } from "react";
import { Box, Grid, Typography, Container, IconButton } from "@mui/material";
import houseImage from "../../../../public/Images/house.png";
import bed from "../../../../public/Images/bed.png";
import rule from "../../../../public/Images/rule.png";
import check from "../../../../public/Images/check.png";
import Image from "next/image";
import Footer from "../../shared/Footer/Footer";
import { _baseURL, _imageURL } from "../../../../consts";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import en from "locales/en";
import pt from "locales/pt";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { MakeFavouriteApi, userDetailsApi } from "@/api";
import { Data } from "@react-google-maps/api";
import { DataArrayRounded } from "@mui/icons-material";
import { useQueryClient } from "@tanstack/react-query";

function WishPropertyCard({
  shadow,
  marginTop,
  propertyInfo,
  languageName,
  loadingRefetch,
  refetch,
}) {
  const t = languageName === "en" ? en : pt;
  const myLoader = ({ src }) => {
    return `${_imageURL}/${src}`;
  };
  const queryClient = useQueryClient();

  const currentUser = useCurrentUser();

  const [favoriteList, setFavoriteList] = useState([]);
  useEffect(() => {
    if (currentUser?.wishList) {
      setFavoriteList(currentUser?.wishList.split(",").map(Number));
    }
  }, [currentUser]);

  const toggleFavorite = useCallback(
    async (event, itemId) => {
      event.preventDefault();
      setFavoriteList(favoriteList.filter((id) => id !== itemId));
      const [error, response] = await MakeFavouriteApi(itemId);
      if (!error) {
        await refetch();
        await userDetailsApi();
        await loadingRefetch();
      }
    },
    [favoriteList, setFavoriteList, refetch, loadingRefetch]
  );

  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "8px",
        pb: 3,
        boxShadow: shadow,
        marginTop: marginTop,
        cursor: "pointer",
        position: "relative", // Ensure the positioning context for absolute positioning of the favorite icon
      }}
    >
      <IconButton
        sx={{
          position: "absolute",
          bottom: { xs: 220, sm: 220, md: 200, lg: 190 },
          right: 0,
          zIndex: "1",
        }} // Position the favorite icon at the top right corner
        aria-label="favorite"
        color="primary" // Set the color of the icon
        onClick={(event) => toggleFavorite(event, propertyInfo?.id)} // Handle click event
      >
        <FavoriteIcon
          sx={{
            color: `red`,
          }}
        />
      </IconButton>
      <Box sx={{ width: "100%" }}>
        {/* <Image src={houseImage} layout="responsive" alt="house" /> */}
        <Image
          loader={myLoader}
          src={`${propertyInfo?.attachments[0]?.file_path}`}
          width={500}
          height={400}
          alt="house"
        />
      </Box>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        sx={{ pl: 3, pt: 2 }}
      >
        <Typography
          variant="p"
          sx={{ fontSize: "18px", fontWeight: "700", color: "#1A1859" }}
        >
          {propertyInfo?.address?.address}
        </Typography>
        <Typography
          variant="p"
          sx={{ fontSize: "16px", fontWeight: "400", color: "#1A1859" }}
        >
          {`${propertyInfo?.address?.city},${propertyInfo?.address?.state?.name}`}
        </Typography>
        <Typography
          variant="p"
          sx={{
            fontSize: "12px",
            fontWeight: "400",
            color: "#7C7C99",
            pt: 2,
          }}
        >
          {`${t["sale value"]}:`}
        </Typography>
        <Typography
          variant="p"
          sx={{ fontSize: "24px", fontWeight: "800", color: "#0E97F7" }}
        >
          <span
            style={{
              fontSize: "16px",
              fontWeight: "400",
              color: "#0E97F7",
            }}
          >
            R$
          </span>
          {` ${propertyInfo?.brl_rent}`}
        </Typography>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ pl: 3 }}
      >
        <Box>
          <Image src={bed} alt="bed" />
          <Typography
            variant="p"
            sx={{
              fontSize: "14px",
              fontWeight: "400",
              color: "#7C7C99",
              ml: "0.5vh",
            }}
          >
            {`${propertyInfo?.no_of_rooms} ${t["bedrooms"]}`}
          </Typography>
        </Box>
        <Box sx={{ pl: 1, pr: 1 }}>
          <Image src={rule} alt="rule" />
          <Typography
            variant="p"
            sx={{
              fontSize: "14px",
              fontWeight: "400",
              color: "#7C7C99",
              ml: "0.5vh",
            }}
          >
            {`${propertyInfo?.land_area}m²`}
          </Typography>
        </Box>
        <Box>
          <Image src={check} alt="rule" />
          <Typography
            variant="p"
            sx={{
              fontSize: "14px",
              fontWeight: "400",
              color: "#7C7C99",
              ml: "0.5vh",
            }}
          >
            {`${t[propertyInfo?.property_type]}`}
          </Typography>
        </Box>
      </Grid>
    </Box>
  );
}

export default WishPropertyCard;
