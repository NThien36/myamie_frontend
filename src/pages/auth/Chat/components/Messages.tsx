import { useCallback, useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import useSignalRConnection from "@/hooks/useSignalRConnection";
import { useGetMessages } from "@/services/message.service";
import { isMessageInCurrentChat } from "@/utils/messageUtils";
import { Message } from "@/models/message.interface";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { updateConversation } from "@/store/conversation/conversation.slice";
import { extractChatErrorMessage } from "@/utils/errorUtils";
import { getTimeFromDate } from "@/utils/dateTimeUtils";
import { getAvatarWithName } from "@/apis/account.api";

interface MessageProps {
  currentUserId: number;
  currentUserAvatar?: string;
  currentUserName?: string;
  otherUserId: number;
  otherUserName?: string;
  otherUserAvatar?: string;
}

function Messages({
  currentUserId,
  currentUserAvatar,
  currentUserName,
  otherUserId,
  otherUserAvatar,
  otherUserName,
}: MessageProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const connection = useSignalRConnection(currentUserId, otherUserId);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useGetMessages(otherUserId!);

  // Handle switching between users
  const handleUserChange = useCallback(async () => {
    setMessages([]); // Clear current messages
    queryClient.removeQueries({ queryKey: ["messages", otherUserId] }); // Reset query state

    // Refetch the messages for the new `otherUserId`
    try {
      const response = await refetch(); // Fetch first page for new user
      if (response?.data?.pages) {
        const newMessages = response.data.pages.flatMap(
          (page) => page.messages
        );
        setMessages(newMessages); // Replace with first page messages
      }
    } catch (error) {
      toast.error("Lỗi khi tải tin nhắn, thử lại sau");
    }
  }, [otherUserId, refetch, queryClient]);

  // Refetch and reset state when user changes
  useEffect(() => {
    handleUserChange();
  }, [handleUserChange]);

  // Handle SignalR message receiving
  useEffect(() => {
    if (!connection) return;

    const handleReceiveMessage = async (message: Message) => {
      const isCurrentChat = isMessageInCurrentChat(
        message,
        currentUserId,
        otherUserId
      );

      // 1. Add message to the current chat if applicable
      if (isCurrentChat) {
        setMessages((prevMessages) => {
          if (!prevMessages.some((msg) => msg.id === message.id)) {
            return [...prevMessages, message]; // Ensure unique messages
          }
          return prevMessages;
        });
      }

      // 2. Fetch avatar and name for the sender (if needed)
      let senderAvatar = "";
      let senderName = "Người dùng";
      if (message.senderId !== otherUserId) {
        try {
          const response = await getAvatarWithName(message.senderId);
          senderAvatar = response?.data?.avatar || "";
          senderName = response?.data?.name || "Người dùng";
        } catch (error) {
          console.error("Failed to fetch sender details:", error);
        }
      }

      // 3. Update Redux store with the conversation
      dispatch(
        updateConversation({
          ...message,
          avatar: senderAvatar || currentUserAvatar || "",
          name: senderName || currentUserName || "Người dùng",
          currentUserId,
        })
      );
    };

    connection.on("ReceiveMessage", handleReceiveMessage);
    return () => {
      connection.off("ReceiveMessage", handleReceiveMessage);
    };
  }, [connection, currentUserId, otherUserId]);

  // Append older messages from infinite query
  useEffect(() => {
    if (data?.pages) {
      const olderMessages = data.pages.flatMap((page) => page.messages);
      setMessages((prevMessages) => {
        const uniqueOlderMessages = olderMessages.filter(
          (msg) =>
            !prevMessages.some((existingMsg) => existingMsg.id === msg.id)
        );
        return [...uniqueOlderMessages, ...prevMessages];
      });
    }
  }, [data]);

  // Send message (Send)
  const sendMessage = async (content: string) => {
    if (connection && content.trim() && otherUserId) {
      try {
        const newMessage: Message = await connection.invoke(
          "SendMessage",
          otherUserId,
          content
        );
        // newMessage.sentAt = new Date().toLocaleTimeString([], {
        //   hour: "2-digit",
        //   minute: "2-digit",
        // });
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        // setMessages((prevMessages) => {
        //   if (!prevMessages.some((msg) => msg.id === newMessage.id)) {
        //     return [...prevMessages, newMessage];
        //   }
        //   return prevMessages;
        // });
        dispatch(
          updateConversation({
            ...newMessage,
            avatar: otherUserAvatar ?? "",
            name: otherUserName ?? "Người dùng",
            currentUserId,
          })
        );
      } catch (err) {
        const serverError = extractChatErrorMessage(err);
        toast.error(serverError);
      }
    } else {
      toast.error("Nội dung tin nhắn không được để trống");
    }
  };

  const loadMoreMessages = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <>
      <div className="h-full overflow-y-auto flex flex-col-reverse">
        <div className="p-2 space-y-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`group relative p-2 rounded-xl w-fit max-w-[37rem] ${
                msg.senderId === currentUserId
                  ? "ml-auto bg-primary-lighter"
                  : "bg-gray-200"
              }`}
            >
              <p data-testid="message-item">{msg.content}</p>
              <p className="hidden group-hover:block absolute right-0 bg-black bg-opacity-65 rounded-xl text-xs p-2 text-white -top-9 w-fit">
                {getTimeFromDate(msg.sentAt)}
              </p>
            </div>
          ))}
        </div>
        {hasNextPage && (
          <p
            className="text-xs mx-auto hover:underline mt-5 text-gray-500 hover:text-gray-700 font-medium hover:cursor-pointer"
            onClick={loadMoreMessages}
          >
            {isFetchingNextPage ? "Đang tải..." : "Tải thêm tin"}
          </p>
        )}
      </div>
      <ChatInput onSendMessage={sendMessage} />
    </>
  );
}

export default Messages;
