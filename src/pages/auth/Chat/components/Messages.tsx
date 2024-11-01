import { messageData } from "@/assets/data/chat.data";
import { Message } from "@/models/chat.interface";
import { useState } from "react";
import ChatInput from "./ChatInput";

interface MessageProps {
  currentUserId: number;
  otherUserId: number;
}

function Messages({ currentUserId, otherUserId }: MessageProps) {
  const [messages, setMessages] = useState<Message[]>(messageData);

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
              <p>{msg.content}</p>
              <p className="hidden group-hover:block absolute right-0 bg-black bg-opacity-65 rounded-xl text-xs p-2 text-white -top-9 w-fit">
                {msg.sentAt}
              </p>
            </div>
          ))}
        </div>
      </div>
      <ChatInput />
    </>
  );
}

export default Messages;
