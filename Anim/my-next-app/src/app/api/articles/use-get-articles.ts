import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api-client";
import { articleQueryKeys } from "./article-query-keys";
import { Article } from "@/app/types/article";

const fetchArticles = async (): Promise<Article[]> => {
  const response = await apiClient.get("/cms/article/lists");
  return response.data.data;
};

export function useGetArticles() {
  return useQuery<Article[], Error>({
    queryKey: articleQueryKeys.all,
    queryFn: fetchArticles,
    staleTime: 1000 * 60 * 5,
  });
}
