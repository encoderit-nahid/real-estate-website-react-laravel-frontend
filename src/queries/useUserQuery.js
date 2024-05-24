import { apiInstance } from "@/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useUserUpdateMutation = (page) => {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    // queryClient.invalidateQueries([
    //   "/get-all-property",
    //   { status: "new", page: page, per_page: 9 },
    // ]);

    queryClient.invalidateQueries(["/count-property"]);
  };
  return useMutation({
    onSuccess,
    mutationKey: "/user-update",
    mutationFn(body) {
      return apiInstance.post(`users/update`, body);
    },
  });
};
