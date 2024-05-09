import { apiInstance } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useMakeFavouriteQuery = (propertyId) => {
  return useQuery({
    queryKey: ["/make-favourite"],
    enabled: !!propertyId,
    staleTime: 0,
    queryFn: async () => {
      return await apiInstance.get(`property/wishlist/${propertyId}`);
    },
  });
};
