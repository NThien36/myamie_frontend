import {
  FriendshipsParams,
  FriendshipsResponse,
} from "@/models/friendship.interface";
import fetchAPI from "@/utils/fetchApi";
import { AxiosResponse } from "axios";

export const getFriendships = async (data: FriendshipsParams) => {
  const response: AxiosResponse<FriendshipsResponse> = await fetchAPI.request({
    url: "/Friendship/get-all",
    method: "get",
    params: data,
  });

  return response.data;
};

export const addFriend = async (id: number) => {
  const response: AxiosResponse<string> = await fetchAPI.request({
    url: "/Friendship/add-friend",
    method: "post",
    data: { id },
  });

  return response.data;
};

export const cancelFriend = async (id: number) => {
  const response: AxiosResponse<string> = await fetchAPI.request({
    url: "/Friendship/cancel-friend",
    method: "put",
    data: { id },
  });

  return response.data;
};

export const removeFriend = async (id: number) => {
  const response: AxiosResponse<string> = await fetchAPI.request({
    url: "/Friendship/remove-friend",
    method: "delete",
    data: { id },
  });

  return response.data;
};

export const acceptFriend = async (id: number) => {
  const response: AxiosResponse<string> = await fetchAPI.request({
    url: "/Friendship/accept-friend",
    method: "put",
    data: { id },
  });

  return response.data;
};
