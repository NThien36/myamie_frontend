import { conversationData } from "@/assets/data/chat.data";
import ConversationItem from "@/components/ConversationItem/ConversationItem";

function Conversations() {
  return (
    <>
      {conversationData.map((conversation: any) => (
        <ConversationItem key={conversation.id} conversation={conversation} />
      ))}
    </>
  );
}

export default Conversations;
