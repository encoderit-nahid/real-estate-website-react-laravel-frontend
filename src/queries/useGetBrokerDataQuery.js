import { apiInstance } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGetBrokerDataQuery = (params) => {
  return useQuery({
    queryKey: ["/get-broker"],
    // enabled: !!q,'
    keepPreviousData: true,
    staleTime: 0,
    // initialData: () => [],
    queryFn: async () => {
      return await apiInstance.get(`/users/index`, {
        params,
      });
    },
  });
};
