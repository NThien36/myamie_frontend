import Avatar from "@/components/Avatar/Avatar";
import Messages from "./components/Messages";
import { useParams } from "react-router-dom";
import { useGetAvatarWithName } from "@/services/account.service";
import { useSelector } from "react-redux";
import { accountIdSelector } from "@/store/auth/auth.selector";

function Chat() {
  const { id } = useParams();
  const currentUserId = useSelector(accountIdSelector);

  const { data, isLoading, isError } = useGetAvatarWithName(Number(id));

  if (currentUserId === Number(id) || Number(id) === 1) {
    return <p className="error mt-10">Không thể chat với chính mình</p>;
  }

  const avatar = data?.data.avatar;
  const name = data?.data.name;

  let content;
  if (isLoading) {
    content = <p>Đang tải...</p>;
  } else if (isError) {
    return <p className="error mt-10">Lỗi, vui lòng thử lại</p>;
  } else {
    content = (
      <>
        <div
          data-testid="chat-detail"
          className="flex justify-between border-b-2 p-3"
        >
          <div className="flex gap-2 items-center">
            <Avatar
              src={avatar}
              alt="avatar"
              size="size-10"
              hasBorder={false}
            />
            <p className="text-base font-medium">{name}</p>
          </div>
        </div>
        <Messages
          currentUserId={currentUserId}
          otherUserId={Number(id)}
          otherUserAvatar={avatar}
          otherUserName={name}
        />
      </>
    );
  }

  return <>{content}</>;
}

export default Chat;
