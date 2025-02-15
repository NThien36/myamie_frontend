import { getCategories } from "@/apis/category.api";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
