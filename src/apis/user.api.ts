import {
  UserDetailResponse,
  UsersParams,
  UsersResponse,
} from "@/models/user.interface";
import fetchAPI from "@/utils/fetchApi";
import { AxiosResponse } from "axios";

export const getUsers = async (params: UsersParams) => {
  const response: AxiosResponse<UsersResponse> = await fetchAPI.request({
    url: "/User/get-all",
    method: "get",
    params,
  });

  return response.data;
};

export const getUserById = async (id: number) => {
  const response: AxiosResponse<UserDetailResponse> = await fetchAPI.request({
    url: `/User/get-by-id?Id=${id}`,
    method: "get",
  });

  return response.data;
};
