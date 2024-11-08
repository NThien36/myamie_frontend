import {
  PlaceDetailResponse,
  PlacesParams,
  PlacesResponse,
} from "@/models/place.interface";
import fetchAPI from "@/utils/fetchApi";
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
