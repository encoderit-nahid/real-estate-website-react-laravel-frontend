import React, { useCallback, useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useCurrentUser from "@/hooks/useCurrentUser";
import { MakeFavouriteApi, userDetailsApi } from "@/api";

const BaseFavoriteButton = ({ handleLoginOpen, itemID }) => {
  const [propertyId, setPropertyId] = useState(null);

  const currentUser = useCurrentUser();

  const [favoriteList, setFavoriteList] = useState([]);
  useEffect(() => {
    if (currentUser?.wishList) {
      setFavoriteList(currentUser?.wishList.split(",").map(Number));
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
      const [error] = await MakeFavouriteApi(itemID);
      if (!error) {
        userDetailsApi();
      }
    }
  }, [itemID, favoriteList, currentUser, handleLoginOpen]);

  return (
    <IconButton
      aria-label="favorite"
      color="primary"
      onClick={toggleFavorite} // Handle click event
    >
      <FavoriteIcon
        sx={{
          color: `${favoriteList?.includes(itemID) ? "red" : "#cacbcc"}`,
        }}
      />
    </IconButton>
  );
};

export default BaseFavoriteButton;
