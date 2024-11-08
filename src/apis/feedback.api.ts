import {
  FeedbacksParams,
  FeedbacksResponse,
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
