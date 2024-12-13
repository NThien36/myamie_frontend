import {
  PlaceDetailResponse,
  PlacesParams,
  PlacesResponse,
  UpsertPlaceParams,
} from "@/models/place.interface";
import fetchAPI from "@/utils/fetchApi";
import createFormData from "@/utils/formatDataUtils";
import { AxiosResponse } from "axios";

export const getPlaces = async (params: PlacesParams) => {
  const response: AxiosResponse<PlacesResponse> = await fetchAPI.request({
    url: "/Place/get-all",
    method: "get",
    params,
  });

  return response.data;
};

export const getPlaceById = async (id: number) => {
  const response: AxiosResponse<PlaceDetailResponse> = await fetchAPI.request({
    url: `/Place/get-by-id?Id=${id}`,
    method: "get",
  });

  return response.data;
};

export const createPlace = async (data: UpsertPlaceParams) => {
  const formData = createFormData(data);

  const response: AxiosResponse<string> = await fetchAPI.request({
    url: "/Place/add",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    method: "post",
    data: formData,
  });

  return response.data;
};

export const updatePlace = async (data: UpsertPlaceParams) => {
  const formData = createFormData(data);

  const response: AxiosResponse<string> = await fetchAPI.request({
    url: "/Place/update",
    method: "put",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });

  return response.data;
};

export const deletePlace = async (id: number) => {
  const response: AxiosResponse<string> = await fetchAPI.request({
    url: "/Place/delete",
    method: "delete",
    data: { id },
  });

  return response.data;
};
