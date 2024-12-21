import {
  addFeedback,
  deleteFeedback,
  getFeedbacks,
  responseFeedback,
  updateFeedback,
} from "@/apis/feedback.api";
import { FeedbacksParams } from "@/models/feedback.interface";
import { FEEDBACK_QUERY_KEY } from "@/utils/constants";
import { handleMessageError } from "@/utils/errorUtils";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetFeedbacks = (params: FeedbacksParams) => {
  return useQuery({
    queryKey: [FEEDBACK_QUERY_KEY, params],
    queryFn: () => getFeedbacks(params),
  });
};

export const useAddFeedback = () => {
  return useMutation({
    mutationFn: addFeedback,
    onSuccess: () => {
      toast.success("Đánh giá thành công");
    },
    onError: (error) => {
      handleMessageError(error, "Xảy ra lỗi khi gửi đánh giá");
    },
  });
};

export const useUpdateFeedback = () => {
  return useMutation({
    mutationFn: updateFeedback,
    onSuccess: () => {
      toast.success("Cập nhật đánh giá thành công");
    },
    onError: (error) => {
      handleMessageError(error, "Xảy ra lỗi khi cập nhật đánh giá");
    },
  });
};

export const useDeleteFeedback = () => {
  return useMutation({
    mutationFn: deleteFeedback,
    onSuccess: () => {
      toast.success("Xoá đánh giá thành công");
    },
    onError: (error) => {
      handleMessageError(error, "Xảy ra lỗi khi xoá đánh giá");
    },
  });
};

export const useResponseFeedback = () => {
  return useMutation({
    mutationFn: responseFeedback,
    onSuccess: () => {
      toast.success("Phản hồi đánh giá thành công");
    },
    onError: (error) => {
      handleMessageError(error, "Xảy ra lỗi khi phản hồi đánh giá");
    },
  });
};
