/* eslint-disable */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api-client";
import { articleQueryKeys } from "./article-query-keys";

const deleteArticle = async (id: number): Promise<void> => {
  await apiClient.delete(`/cms/article/${id}`);
};

export function useDeleteArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteArticle,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: articleQueryKeys.all });
      const previousArticles = queryClient.getQueryData(articleQueryKeys.all);
      queryClient.setQueryData(articleQueryKeys.all, (old: any) =>
        old.filter((article: any) => article.id !== id)
      );
      return { previousArticles };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(articleQueryKeys.all, context?.previousArticles);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: articleQueryKeys.all });
    },
  });
}
