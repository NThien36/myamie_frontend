export interface Conversation {
  id: number;
  name: string;
  avatar: string;
  content: string;
  sentAt: string;
  senderId: number;
  isRead: boolean;
}

export interface Message {
  id: number;
  content: string;
  sentAt: string;
  status: "SENT" | "DELIVERED" | "READ" | "RECALLED";
  senderId: number;
}
