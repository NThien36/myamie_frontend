import { getConversations, getMessages } from "@/apis/message.api";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetConversations = () => {
  return useInfiniteQuery({
    queryKey: ["conversations"],
    queryFn: getConversations,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.pageNumber + 1 : undefined;
    },
  });
};

export const useGetMessages = (otherUserId: number) => {
  return useInfiniteQuery({
    queryKey: ["messages", otherUserId],
    queryFn: ({ pageParam = 1 }) =>
      getMessages({ otherUserId, pageNumber: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.pageNumber + 1 : undefined;
    },
  });
};
