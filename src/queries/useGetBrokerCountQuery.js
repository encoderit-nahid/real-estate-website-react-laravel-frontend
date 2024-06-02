import { apiInstance } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGetBrokerCountQuery = () => {
  return useQuery({
    queryKey: ["/count-broker"],
    refetchOnMount: true,
    // retry: 2,
    refetchOnWindowFocus: true,
    staleTime: 0,
    queryFn: async () => {
      return await apiInstance.get(`/users/broker-count`);
    },
  });
};