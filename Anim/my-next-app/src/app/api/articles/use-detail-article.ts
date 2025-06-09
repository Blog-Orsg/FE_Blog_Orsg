import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api-client";

const fetchArticleDetail = async (articleId: number) => {
  const response = await apiClient.get(`/cms/article/show/${articleId}`);
  console.log("API Response status:", response.status);

  if (!response) {
    throw new Error("Failed to fetch article details");
  }
  return response.data.data;
};

export function useDetailArticle(articleId: number | null) {
  return useQuery({
    queryKey: ["articleDetail", articleId],
    queryFn: () => {
      if (articleId === null) {
        return Promise.resolve(null);
      }
      return fetchArticleDetail(articleId);
    },
    enabled: articleId !== null,
    staleTime: 1000 * 60 * 5,
  });
}
