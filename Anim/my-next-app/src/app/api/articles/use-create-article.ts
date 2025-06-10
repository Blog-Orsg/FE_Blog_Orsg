// eslint-disable-next-line @typescript-eslint/no-explicit-any

import { Article, TSFixMe } from "@/app/types/article";
import { apiClient } from "../api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { articleQueryKeys } from "./article-query-keys";
import { toast } from "sonner";

const CreateArticleFn = async (newArticle: Article) => {
  const response = await apiClient.post("/cms/article/store", newArticle);
  return response.data;
};

export function useCreateArticle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CreateArticleFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: articleQueryKeys.all });
    },
    onSuccess: () => {
      toast.success("Article created successfully");
    },
    onError: (err, newArticle, context?: TSFixMe) => {
      queryClient.setQueryData(articleQueryKeys.all, context.previousArticles);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: articleQueryKeys.all });
    },
  });
}
