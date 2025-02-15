import {
  AddFeedbackParams,
  FeedbacksParams,
  FeedbacksResponse,
  ResponseFeedbackParams,
  UpdateFeedbackParams,
} from "@/models/feedback.interface";
import fetchAPI from "@/utils/fetchApi";
import { AxiosResponse } from "axios";

export const getFeedbacks = async (params: FeedbacksParams) => {
  const response: AxiosResponse<FeedbacksResponse> = await fetchAPI.request({
    url: "/Feedback/get-by-id",
    method: "get",
    params,
  });

  return response.data;
};

export const addFeedback = async (data: AddFeedbackParams) => {
  const response: AxiosResponse<string> = await fetchAPI.request({
    url: "/Feedback/add",
    method: "post",
    data: data,
  });

  return response.data;
};

export const updateFeedback = async (data: UpdateFeedbackParams) => {
  const response: AxiosResponse<string> = await fetchAPI.request({
    url: "/Feedback/update",
    method: "put",
    data: data,
  });

  return response.data;
};

export const deleteFeedback = async (id: number) => {
  const response: AxiosResponse<string> = await fetchAPI.request({
    url: "/Feedback/delete",
    method: "delete",
    data: { id },
  });

  return response.data;
};

export const responseFeedback = async (data: ResponseFeedbackParams) => {
  const response: AxiosResponse<string> = await fetchAPI.request({
    url: "/Feedback/response",
    method: "put",
    data: data,
  });

  return response.data;
};
