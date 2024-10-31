import { noAvatar } from "@/assets/images";
import Avatar from "@/components/Avatar/Avatar";
import Messages from "./components/Messages";

function Chat() {
  return (
    <>
      <div className="flex justify-between border-b-2 p-3">
        <div className="flex gap-2 items-center">
          <Avatar
            src={noAvatar}
            alt="avatar"
            size="size-10"
            hasBorder={false}
          />
          <p className="text-base font-medium">Bùi Minh</p>
        </div>
      </div>
      <Messages currentUserId={1} otherUserId={2} />
    </>
  );
}

export default Chat;
