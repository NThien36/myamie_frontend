import {
  acceptFriend,
  addFriend,
  getFriendships,
  removeFriend,
} from "@/apis/friendship.api";
import { FriendshipsParams } from "@/models/friendship.interface";
import { FRIENDSHIP_QUERY_KEY } from "@/utils/constants";
import { handleMessageError } from "@/utils/errorUtils";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetFriendships = (params: FriendshipsParams) => {
  return useQuery({
    queryKey: [FRIENDSHIP_QUERY_KEY, params],
    queryFn: () => getFriendships(params),
  });
};

export const useAddFriend = () => {
  return useMutation({
    mutationFn: addFriend,
    onSuccess: () => {
      toast.success("Đã gửi lời mời kết bạn");
    },
    onError: (error) => {
      handleMessageError(error, "Xảy ra lỗi khi gửi lời mời kết bạn");
    },
  });
};

export const useCancelFriend = () => {
  return useMutation({
    mutationFn: removeFriend,
    onSuccess: () => {
      toast.success("Đã huỷ lời mời kết bạn");
    },
    onError: (error) => {
      handleMessageError(error, "Xảy ra lỗi khi huỷ lời mời kết bạn");
    },
  });
};

export const useRemoveFriend = () => {
  return useMutation({
    mutationFn: removeFriend,
    onSuccess: () => {
      toast.success("Đã xoá bạn bè");
    },
    onError: (error) => {
      handleMessageError(error, "Xảy ra lỗi khi xoá bạn bè");
    },
  });
};

export const useAcceptFriend = () => {
  return useMutation({
    mutationFn: acceptFriend,
    onSuccess: () => {
      toast.success("Đã chấp nhận lời mời kết bạn");
    },
    onError: (error) => {
      handleMessageError(error, "Xảy ra lỗi khi chấp nhận lời mời kết bạn");
    },
  });
};
