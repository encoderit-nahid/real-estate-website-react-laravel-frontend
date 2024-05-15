import { apiInstance } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useMakeFavouriteQuery = (propertyId) => {
  return useQuery({
    queryKey: ["/make-favourite"],
    enabled: !!propertyId,
    keepPreviousData: false,

    // cacheTime: 0,
    // staleTime: 0,

    staleTime: 0,
    queryFn: async () => {
      return await apiInstance.get(`property/wishlist/${propertyId}`);
    },
  });
};
