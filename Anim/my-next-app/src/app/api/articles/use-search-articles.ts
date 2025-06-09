import { useQuery } from "@tanstack/react-query";

const searchArticles = async (
  query: string,
  page: number,
  pageSize: number
) => {
  const response = await fetch(
    `/cms/article/search?query=${encodeURIComponent(
      query
    )}&page=${page}&pageSize=${pageSize}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }
  return response.json();
};
export function useSearchArticles(
  query: string,
  page: number,
  pageSize: number
) {
  return useQuery({
    queryKey: ["searchArticles", query, page, pageSize],
    queryFn: () => searchArticles(query, page, pageSize),
    staleTime: 1000 * 60 * 5,
  });
}
