import { getBusinessById, getBusinesses } from "@/apis/business.api";
import { BusinessesParams } from "@/models/business.interface";
import { useQuery } from "@tanstack/react-query";

export const useGetBusinesses = (params: BusinessesParams) => {
  return useQuery({
    queryKey: ["businesses", params],
    queryFn: () => getBusinesses(params),
  });
};

export const useGetBusinessById = (id: number) => {
  return useQuery({
    queryKey: ["business", id],
    queryFn: () => getBusinessById(id),
  });
};
