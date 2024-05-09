import { userDetailsApi } from "@/api";
import { useState, useEffect } from "react";

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const wishList = localStorage.getItem("wishList");

  useEffect(() => {
    // Simulate fetching current user from an API
    const fetchCurrentUser = async () => {
      const [error, response] = await userDetailsApi();
      if (!error) {
        localStorage.setItem("wishList", response?.data?.wishlists);
        localStorage.setItem("user", JSON.stringify(response?.data?.user));
      }
    };

    if (token && !user) {
      fetchCurrentUser();
    }
    const LoggedInUser = JSON.parse(user);
    setCurrentUser({ ...LoggedInUser, wishList });
    // Cleanup function (optional)
    return () => {
      // Cleanup logic if needed
    };
  }, [user, wishList, token]); // Empty dependency array ensures this effect runs only once

  return currentUser;
};

export default useCurrentUser;
