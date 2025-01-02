import { Message } from "@/models/message.interface";

/**
 * Checks if the message is part of the current chat.
 */
export const isMessageInCurrentChat = (
  message: Message,
  currentUserId: number,
  otherUserId: number
): boolean => {
  return (
    (message.senderId === otherUserId &&
      message.receiverId === currentUserId) ||
    (message.receiverId === otherUserId && message.senderId === currentUserId)
  );
};
