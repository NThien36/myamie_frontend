import { getFeedbacks } from "@/apis/feedback.api";
import { FeedbacksParams } from "@/models/feedback.interface";
import { useQuery } from "@tanstack/react-query";

export const useGetFeedbacks = (params: FeedbacksParams) => {
  return useQuery({
    queryKey: ["feedbacks", params],
    queryFn: () => getFeedbacks(params),
    staleTime: 60 * 1000,
  });
};
