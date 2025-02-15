import {
  createPlace,
  deletePlace,
  getPlaceById,
  getPlaces,
  updatePlace,
} from "@/apis/place.api";
import { PlacesParams } from "@/models/place.interface";
import { PLACE_QUERY_KEY } from "@/utils/constants";
import { handleMessageError } from "@/utils/errorUtils";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetPlaces = (params: PlacesParams) => {
  return useQuery({
    queryKey: [PLACE_QUERY_KEY, params],
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

export const useCreatePlace = () => {
  return useMutation({
    mutationFn: createPlace,
    onSuccess: () => {
      toast.success("Thêm địa điểm thành công");
    },
    onError: (error) => {
      handleMessageError(error, "Xảy ra lỗi khi thêm địa điểm");
    },
  });
};

export const useUpdatePlace = () => {
  return useMutation({
    mutationFn: updatePlace,
    onSuccess: () => {
      toast.success("Cập nhật địa điểm thành công");
    },
    onError: (error) => {
      handleMessageError(error, "Xảy ra lỗi khi cập nhật địa điểm");
    },
  });
};

export const useDeletePlace = () => {
  return useMutation({
    mutationFn: deletePlace,
    onSuccess: () => {
      toast.success("Xoá địa điểm thành công");
    },
    onError: (error) => {
      handleMessageError(error, "Xảy ra lỗi khi xoá địa điểm");
    },
  });
};
