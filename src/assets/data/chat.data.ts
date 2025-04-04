import { MessageStatusEnum } from "@/models/app.interface";
import { Conversation, Message } from "@/models/message.interface";

export const conversationData: Conversation[] = [
  {
    id: 1,
    name: "Emma Johnson",
    avatar: "https://i.pravatar.cc/150?img=32",
    content: "Hey, are you coming to the meeting tomorrow?",
    sentAt: "2024-10-31T10:30:00",
    senderId: 2,
    isRead: true,
  },
  {
    id: 2,
    name: "Liam Smith",
    avatar: "https://i.pravatar.cc/150?img=25",
    content: "Can you check the document I sent?",
    sentAt: "2024-10-31T09:15:00",
    senderId: 3,
    isRead: false,
  },
  {
    id: 3,
    name: "Sophia Williams",
    avatar: "https://i.pravatar.cc/150?img=12",
    content: "Just completed the report. Let me know your thoughts.",
    sentAt: "2024-10-31T08:45:00",
    senderId: 4,
    isRead: true,
  },
  {
    id: 4,
    name: "James Brown",
    avatar: "https://i.pravatar.cc/150?img=50",
    content: "Are we still on for the lunch meeting?",
    sentAt: "2024-10-31T07:30:00",
    senderId: 5,
    isRead: false,
  },
  {
    id: 5,
    name: "Olivia Miller",
    avatar: "https://i.pravatar.cc/150?img=28",
    content: "Looking forward to our project discussion later!",
    sentAt: "2024-10-31T06:20:00",
    senderId: 6,
    isRead: true,
  },
  {
    id: 6,
    name: "Noah Wilson",
    avatar: "https://i.pravatar.cc/150?img=7",
    content: "Can you send me the presentation file?",
    sentAt: "2024-10-30T18:55:00",
    senderId: 7,
    isRead: false,
  },
  {
    id: 7,
    name: "Ava Moore",
    avatar: "https://i.pravatar.cc/150?img=11",
    content: "It was great catching up today!",
    sentAt: "2024-10-30T15:45:00",
    senderId: 8,
    isRead: true,
  },
  {
    id: 8,
    name: "Noah Wilson",
    avatar: "https://i.pravatar.cc/150?img=7",
    content: "Can you send me the presentation file?",
    sentAt: "2024-10-30T18:55:00",
    senderId: 7,
    isRead: false,
  },
  {
    id: 9,
    name: "Ava Moore",
    avatar: "https://i.pravatar.cc/150?img=11",
    content: "It was great catching up today!",
    sentAt: "2024-10-30T15:45:00",
    senderId: 8,
    isRead: true,
  },
];

export const messageData: Message[] = [
  {
    id: 1,
    content:
      "Hey! How have you been?Hey! How have you beenHey! How have you beenHey! How have you beenHey! How have you been",
    sentAt: "2024-10-31",
    status: MessageStatusEnum.READ,
    senderId: 1,
    receiverId: 2,
  },
  {
    id: 2,
    content: "Hi! I've been good, thanks. How about you?",
    sentAt: "2024-10-31",
    status: MessageStatusEnum.READ,
    senderId: 2,
    receiverId: 1,
  },
  {
    id: 3,
    content: "I'm doing well! Are you free for a call later?",
    sentAt: "2024-10-31",
    status: MessageStatusEnum.READ,
    senderId: 1,
    receiverId: 2,
  },
  {
    id: 4,
    content: "Yes, sure. What time works for you?",
    sentAt: "2024-10-31",
    status: MessageStatusEnum.READ,
    senderId: 2,
    receiverId: 1,
  },
  {
    id: 5,
    content: "How about 3 PM?",
    sentAt: "2024-10-31",
    status: MessageStatusEnum.READ,
    senderId: 1,
    receiverId: 2,
  },
  {
    id: 6,
    content: "Sounds good to me!",
    sentAt: "2024-10-31",
    status: MessageStatusEnum.READ,
    senderId: 2,
    receiverId: 1,
  },
  {
    id: 7,
    content:
      "Oh wait, I just realized I haveit, I just realized I havit, I just realized I havit, I just realized I havit, I just realized I havit, I just realized I havit, I just realized I havit, I just realized I hav another meeting.",
    sentAt: "2024-10-31",
    status: MessageStatusEnum.READ,
    senderId: 1,
    receiverId: 2,
  },
  {
    id: 8,
    content: "No worries! Just let me know a time that works.",
    sentAt: "2024-10-31",
    status: MessageStatusEnum.READ,
    senderId: 2,
    receiverId: 1,
  },
  {
    id: 9,
    content: "No worries! Just let me know a time that works.",
    sentAt: "2024-10-31",
    status: MessageStatusEnum.READ,
    senderId: 2,
    receiverId: 1,
  },
];
