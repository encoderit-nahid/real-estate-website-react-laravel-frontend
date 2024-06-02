import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useCurrentUser from "@/hooks/useCurrentUser";
import {
  MakeFavouriteApi,
  MakeFavouriteProjectApi,
  userDetailsApi,
} from "@/api";

const BaseFavoriteButton = ({
  handleLoginOpen,
  itemID,
  type = "property",
  bg = false,
}) => {
  const [propertyId, setPropertyId] = useState(null);

  const currentUser = useCurrentUser();

  const [favoriteList, setFavoriteList] = useState([]);
  console.log("🟥 ~ BaseFavoriteButton ~ favoriteList:", favoriteList);
  useEffect(() => {
    console.log("🟥 ~ useEffect ~ currentUser:", currentUser);
    if (type === "property") {
      if (currentUser?.wishList) {
        setFavoriteList(currentUser?.wishList.split(",").map(Number));
      }
    } else if (type === "project") {
      if (currentUser?.projectWishList) {
        console.log(
          "🟥 ~ useEffect ~ currentUser?.projectWishList:",
          currentUser?.projectWishList
        );
        setFavoriteList(currentUser?.projectWishList.split(",").map(Number));
      }
    }
  }, [currentUser]);

  const toggleFavorite = useCallback(async () => {
    if (!currentUser) {
      handleLoginOpen();
    } else {
      if (favoriteList?.includes(itemID)) {
        setFavoriteList(favoriteList.filter((id) => id !== itemID));
      } else {
        setFavoriteList([...favoriteList, itemID]);
      }
      if (type == "property") {
        const [error] = await MakeFavouriteApi(itemID);
        if (!error) {
          userDetailsApi();
        }
      } else if (type == "project") {
        const [error] = await MakeFavouriteProjectApi(itemID);
        if (!error) {
          userDetailsApi();
        }
      }
    }
  }, [itemID, favoriteList, currentUser, handleLoginOpen]);

  return (
    <Box sx={bg && { bgcolor: "#fff", borderRadius: "100%" }}>
      <IconButton
        aria-label="favorite"
        color="primary"
        onClick={toggleFavorite} // Handle click event
      >
        <FavoriteIcon
          sx={{
            color: `${favoriteList?.includes(itemID) ? "red" : "#878787"}`,
          }}
        />
      </IconButton>
    </Box>
  );
};

export default BaseFavoriteButton;
