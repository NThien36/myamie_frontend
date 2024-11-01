import { Conversation } from "@/models/chat.interface";
import { ROUTE_PATH } from "@/routes/route-path";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";

interface ConversationItemProps {
  conversation: Conversation;
}

function ConversationItem({ conversation }: ConversationItemProps) {
  return (
    <Link
      to={ROUTE_PATH.CHAT_DETAIL}
      className="w-fit flex gap-2 items-center hover:bg-primary-lighter px-2 py-3 rounded-md"
    >
      <Avatar src={conversation.avatar} alt="avatar" size="size-14" />
      <div className="hidden md:block w-full overflow-hidden mr-2">
        <div className="flex items-center justify-between">
          <p className="font-medium">{conversation.name}</p>
          <p className="text-xs text-gray-400">{conversation.sentAt}</p>
        </div>
        <p className="text-gray-600 truncate mt-0.5">{conversation.content}</p>
      </div>
    </Link>
  );
}

export default ConversationItem;
