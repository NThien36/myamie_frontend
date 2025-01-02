import { MessageResponse } from "./../models/message.interface";
import { ConversationResponse } from "@/models/message.interface";
import fetchAPI from "@/utils/fetchApi";
import { AxiosResponse } from "axios";

export const getConversations = async ({ pageParam = 1 }) => {
  const response: AxiosResponse<ConversationResponse> = await fetchAPI.request({
    url: "/Message/get-conversations",
    method: "get",
    params: {
      pageNumber: pageParam,
    },
  });
  return response.data;
};

export const getMessages = async ({
  otherUserId,
  pageNumber = 1,
}: {
  otherUserId: number;
  pageNumber?: number;
}) => {
  const response: AxiosResponse<MessageResponse> = await fetchAPI.request({
    url: "/Message/get-messages",
    method: "post",
    data: {
      otherUserId,
      pageNumber,
    },
  });
  return response.data;
};
