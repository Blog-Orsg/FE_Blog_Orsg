/* eslint-disable */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api-client";
import { articleQueryKeys } from "./article-query-keys";
import { Article } from "@/app/types/article";

const editArticle = async (
  id: number,
  updatedData: Partial<Article>
): Promise<Article> => {
  const response = await apiClient.put(
    `/cms/article/update/${id}`,
    updatedData
  );
  return response.data;
};

export function useEditArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updatedData,
    }: {
      id: number;
      updatedData: Partial<Article>;
    }) => editArticle(id, updatedData),
    onMutate: async ({ id, updatedData }) => {
      await queryClient.cancelQueries({ queryKey: articleQueryKeys.all });
      const previousArticles = queryClient.getQueryData(articleQueryKeys.all);
      queryClient.setQueryData(articleQueryKeys.all, (old: any) =>
        old.map((article: any) =>
          article.id === id ? { ...article, ...updatedData } : article
        )
      );
      return { previousArticles };
    },
    onError: (err, { id }, context) => {
      queryClient.setQueryData(articleQueryKeys.all, context?.previousArticles);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: articleQueryKeys.all });
    },
  });
}
