import {
  BusinessDetailResponse,
  BusinessesParams,
  BusinessesResponse,
} from "@/models/business.interface";
import fetchAPI from "@/utils/fetchApi";
import { AxiosResponse } from "axios";

export const getBusinesses = async (params: BusinessesParams) => {
  const response: AxiosResponse<BusinessesResponse> = await fetchAPI.request({
    url: "/Business/get-all",
    method: "get",
    params,
  });

  return response.data;
};

export const getBusinessById = async (id: number) => {
  const response: AxiosResponse<BusinessDetailResponse> =
    await fetchAPI.request({
      url: `/Business/get-by-id/${id}`,
      method: "get",
    });

  return response.data;
};
