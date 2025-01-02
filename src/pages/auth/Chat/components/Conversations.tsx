import ConversationItem from "@/components/ConversationItem/ConversationItem";
import Loader from "@/components/Loader/Loader";
import { useGetConversations } from "@/services/message.service";
import { conversationsSelector } from "@/store/conversation/conversation.selector";
import {
  addConversations,
  setConversations,
} from "@/store/conversation/conversation.slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Conversations() {
  const dispatch = useDispatch();
  const conversations = useSelector(conversationsSelector) || [];
  // const [conversations, setConversations] = useState<Conversation[]>([]);
  const {
    data,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    error,
  } = useGetConversations();

  useEffect(() => {
    if (data?.pages?.length) {
      const allConversations = data.pages
        .map((page) => page.conversations)
        .flat();
      const latestPage = data.pages.length;
      if (latestPage === 1) {
        dispatch(setConversations(allConversations));
      } else {
        dispatch(addConversations(allConversations));
      }
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p className="error">{error.message}</p>;
  }

  return (
    <>
      {conversations.length > 0 &&
        conversations.map((conversation) => (
          <ConversationItem key={conversation.id} conversation={conversation} />
        ))}
      {hasNextPage && (
        <p
          className="text-xs mx-auto hover:underline text-gray-500 hover:text-gray-700 font-medium hover:cursor-pointer w-fit"
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage ? "Đang tải..." : "Xem thêm"}
        </p>
      )}
      {conversations.length === 0 && (
        <p className="text-gray-500 mx-auto text-xs w-fit">
          Không có cuộc trò chuyện nào
        </p>
      )}
    </>
  );
}

export default Conversations;
