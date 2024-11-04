import { getPlaceById, getPlaces } from "@/apis/place.api";
import { PlacesParams } from "@/models/place.interface";
import { useQuery } from "@tanstack/react-query";

export const useGetPlaces = (params: PlacesParams) => {
  return useQuery({
    queryKey: ["places", params],
    queryFn: () => getPlaces(params),
    staleTime: 60 * 1000,
  });
};

export const useGetPlaceById = (id: number) => {
  return useQuery({
    queryKey: ["place", id],
    queryFn: () => getPlaceById(id),
    staleTime: 60 * 1000,
  });
};
