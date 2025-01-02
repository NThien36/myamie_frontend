import { FriendshipStatusEnum } from "@/models/app.interface";
import Avatar from "../Avatar/Avatar";
import Button from "../Buttons/Button";
import { useSelector } from "react-redux";
import { accountIdSelector, isLoginSelector } from "@/store/auth/auth.selector";
import { useEffect, useState } from "react";
import {
  useAcceptFriend,
  useAddFriend,
  useCancelFriend,
  useRemoveFriend,
} from "@/services/friendship.service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type FriendCardProps = {
  friendId: number;
  avatar: string;
  name: string;
  status: FriendshipStatusEnum;
  receiverId: number;
};

function FriendCard({
  friendId,
  avatar,
  name,
  status,
  receiverId,
}: FriendCardProps) {
  const navigate = useNavigate();
  const [friendStatus, setFriendStatus] =
    useState<FriendshipStatusEnum>(status);
  const isLogin = useSelector(isLoginSelector);
  const currentUserId = useSelector(accountIdSelector);
  const { isPending: isAddPending, mutateAsync: addFriend } = useAddFriend();
  const { isPending: isRemovePending, mutateAsync: removeFriend } =
    useRemoveFriend();
  const { isPending: isCancelPending, mutateAsync: cancelFriend } =
    useCancelFriend();
  const { isPending: isAcceptPending, mutateAsync: acceptFriend } =
    useAcceptFriend();

  // Reset the state when the component unmounts
  useEffect(() => {
    setFriendStatus(friendStatus);
  }, [friendStatus]);

  const handleAddFriend = async () => {
    if (!isLogin) {
      toast.error("Vui lòng đăng nhập để kết bạn");
      return;
    }

    await addFriend(friendId, {
      onSuccess: () => {
        setFriendStatus(FriendshipStatusEnum.PENDING);
      },
    });
  };

  const handleCancelFriend = async () => {
    if (!isLogin) {
      toast.error("Vui lòng đăng nhập để huỷ lời mời");
      return;
    }

    await cancelFriend(friendId, {
      onSuccess: () => {
        setFriendStatus(FriendshipStatusEnum.NONE);
      },
    });
  };

  const handleRemoveFriend = async () => {
    if (!isLogin) {
      toast.error("Vui lòng đăng nhập để huỷ kết bạn");
      return;
    }

    await removeFriend(friendId, {
      onSuccess: () => {
        setFriendStatus(FriendshipStatusEnum.NONE);
      },
    });
  };

  const handleAcceptFriend = async () => {
    if (!isLogin) {
      toast.error("Vui lòng đăng nhập để chấp nhận lời mời");
      return;
    }

    await acceptFriend(friendId, {
      onSuccess: () => {
        setFriendStatus(FriendshipStatusEnum.ACCEPTED);
      },
    });
  };

  const handleNavigateToChat = () => {
    navigate(`/chat/${friendId}`);
  };

  const renderFriendshipButton = () => {
    const isLoading =
      isAddPending || isRemovePending || isCancelPending || isAcceptPending;

    switch (friendStatus) {
      case FriendshipStatusEnum.NONE:
        return (
          <Button
            onClick={handleAddFriend}
            disabled={isLoading}
            variant="outline"
            padding="px-4 py-1.5"
          >
            {isAddPending ? "Đang xử lý" : "Kết bạn"}
          </Button>
        );
      case FriendshipStatusEnum.PENDING:
        if (receiverId === currentUserId) {
          return (
            <Button
              onClick={handleAcceptFriend}
              disabled={isLoading}
              variant="outline"
              padding="px-4 py-1.5"
            >
              {isAddPending ? "Đang xử lý" : "Chấp nhận"}
            </Button>
          );
        }
        return (
          <Button
            onClick={handleCancelFriend}
            disabled={isLoading}
            variant="ghost"
            padding="px-4 py-1.5"
          >
            {isCancelPending ? "Đang xử lý" : "Huỷ lời mời"}
          </Button>
        );
      case FriendshipStatusEnum.ACCEPTED:
        return (
          <Button
            onClick={handleRemoveFriend}
            disabled={isLoading}
            variant="ghost"
            padding="px-4 py-1.5"
          >
            {isRemovePending ? "Đang xử lý" : "Huỷ kết bạn"}
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="border-2 bg-white rounded-md p-3 flex flex-col gap-2 relative">
      <div className="flex flex-wrap gap-2 items-center">
        <Avatar
          src={avatar}
          alt="Friend avatar"
          size="size-12"
          className="inline"
        />
        <p className="font-semibold">{name}</p>
      </div>
      <div className="flex gap-2 flex-wrap">
        {friendStatus === FriendshipStatusEnum.ACCEPTED && (
          <Button
            onClick={handleNavigateToChat}
            variant="outline"
            padding="px-4 py-1.5"
          >
            Nhắn tin
          </Button>
        )}

        {renderFriendshipButton()}
      </div>
    </div>
  );
}

export default FriendCard;
