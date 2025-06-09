import { TSFixMe, User } from "@/app/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userQueryKeys } from "./user-query-key";
import { toast } from "sonner";
import { apiClient } from "../api-client";

export const createUserFn = async (newUser: User) => {
  const response = await apiClient.post("/auth/register", newUser);
  return response.data;
};

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUserFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: userQueryKeys.all });
    },
    onSuccess: (data) => {
      toast.success("Account created successfully");
    },
    onError: (err, newUser, context?: TSFixMe) => {
      queryClient.setQueryData(userQueryKeys.all, context.previousUsers);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
    },
  });
}
