import { getCities } from "@/apis/city.api";
import { useQuery } from "@tanstack/react-query";

export const useGetCities = () => {
  return useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
