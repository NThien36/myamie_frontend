import {
  PlacesAdminParams,
  PlacesAdminResponse,
  UsersAdminParams,
  UsersAdminResponse,
} from "@/models/admin.interface";
import { AccountStatusEnum } from "@/models/app.interface";
import fetchAPI from "@/utils/fetchApi";
import { AxiosResponse } from "axios";

export const getUsersByAdmin = async (params: UsersAdminParams) => {
  const response: AxiosResponse<UsersAdminResponse> = await fetchAPI.request({
    url: "/AdminUser/get-all",
    method: "get",
    params,
  });

  return response.data;
};

export const updateUserStatus = async (
  id: number,
  status: AccountStatusEnum
) => {
  const response: AxiosResponse<string> = await fetchAPI.request({
    url: "/AdminUser/update-status",
    method: "put",
    data: { id, status },
  });

  return response.data;
};

export const updateUserPassword = async (id: number, password: string) => {
  const response: AxiosResponse<string> = await fetchAPI.request({
    url: "/AdminUser/update-password",
    method: "put",
    data: { id, password },
  });

  return response.data;
};

// ====== ADMIN PLACE ======
export const getPlacesByAdmin = async (params: PlacesAdminParams) => {
  const response: AxiosResponse<PlacesAdminResponse> = await fetchAPI.request({
    url: "/AdminPlace/get-all",
    method: "get",
    params,
  });

  return response.data;
};
