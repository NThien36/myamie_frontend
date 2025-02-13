import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import { Conversation } from "@/models/message.interface";
import { useSelector } from "react-redux";
import { accountIdSelector } from "@/store/auth/auth.selector";
import { getTimeFromDate } from "@/utils/dateTimeUtils";

interface ConversationItemProps {
  conversation: Conversation;
}

function ConversationItem({ conversation }: ConversationItemProps) {
  const currentUserId = useSelector(accountIdSelector);
  return (
    <Link
      to={`/chat/${conversation.id}`}
      className="conversation-item relative w-full flex gap-2 items-center hover:bg-primary-lighter px-2 py-3 rounded-md"
    >
      <Avatar src={conversation.avatar} alt="avatar" size="size-14" />
      <div className="hidden md:block w-full overflow-hidden mr-2">
        <div className="flex items-center justify-between">
          <p className="font-medium">{conversation.name}</p>
          <p className="text-xs text-gray-400">
            {getTimeFromDate(conversation.sentAt)}
          </p>
        </div>
        <p className="text-gray-600 truncate mt-0.5">
          {conversation.senderId === currentUserId ? "Bạn: " : ""}
          {conversation.content}
        </p>

        {conversation.senderId !== currentUserId &&
          conversation.isRead === false && (
            <div className="absolute right-6 top-10 text-primary">
              <i className="fa-solid fa-xs fa-circle"></i>
            </div>
          )}
      </div>
    </Link>
  );
}

export default ConversationItem;
