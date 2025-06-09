export const articleQueryKeys = {
  all: ["articles"],
  details: () => [...articleQueryKeys.all, "detail"],
  detail: (id: number) => [...articleQueryKeys.details(), id],
  pagination: (page: number) => [...articleQueryKeys.all, "pagination", page],
  infinite: () => [...articleQueryKeys.all, "infinite"],
};
