// export interface Message {
//   id: number;
//   content: string;
//   sentAt: string;
//   senderId: number;
//   receiverId?: number;
//   isRead?: boolean;
// }

import { MessageStatusEnum } from "./app.interface";

export interface ConversationParams {
  pageNumber: number;
}

export interface Conversation {
  id: number;
  name: string;
  avatar: string;
  content: string;
  sentAt: string;
  senderId: number;
  isRead: boolean;
}

export interface ConversationResponse {
  conversations: Conversation[];
  hasMore: boolean;
  pageNumber: number;
}

export interface MessageParams {
  otherUserId: number;
  pageNumber: number;
}

export interface Message {
  id: number;
  content: string;
  sentAt: string;
  status: MessageStatusEnum;
  senderId: number;
  receiverId: number;
}

export interface MessageResponse {
  messages: Message[];
  hasMore: boolean;
  pageNumber: number;
}
