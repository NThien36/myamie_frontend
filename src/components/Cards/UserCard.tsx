import { User } from "@/models/user.interface";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import IconText from "../IconText/IconText";
import Button from "../Buttons/Button";
import {
  useAcceptFriend,
  useAddFriend,
  useCancelFriend,
  useRemoveFriend,
} from "@/services/friendship.service";
import { useSelector } from "react-redux";
import { accountIdSelector, isLoginSelector } from "@/store/auth/auth.selector";
import toast from "react-hot-toast";
import { FriendshipStatusEnum } from "@/models/app.interface";
import { useEffect, useState } from "react";

function UserCard({ user }: { user: User }) {
  const [friendStatus, setFriendStatus] = useState<FriendshipStatusEnum>(
    user.friendStatus
  );
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
    setFriendStatus(user.friendStatus);
  }, [user.friendStatus]);

  const handleAddFriend = async () => {
    if (!isLogin) {
      toast.error("Vui lòng đăng nhập để kết bạn");
      return;
    }

    await addFriend(user.id, {
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

    await cancelFriend(user.id, {
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

    await removeFriend(user.id, {
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

    await acceptFriend(user.id, {
      onSuccess: () => {
        setFriendStatus(FriendshipStatusEnum.ACCEPTED);
      },
    });
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
            aria-label="Kết bạn"
          >
            {isAddPending ? "Đang xử lý" : "Kết bạn"}
          </Button>
        );
      case FriendshipStatusEnum.PENDING:
        if (user.receiverId === currentUserId) {
          return (
            <Button
              onClick={handleAcceptFriend}
              disabled={isLoading}
              variant="outline"
              padding="px-4 py-1.5"
              aria-label="Kết bạn"
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
            aria-label="Huỷ lời mời"
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
            aria-label="Huỷ kết bạn"
          >
            {isRemovePending ? "Đang xử lý" : "Huỷ kết bạn"}
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="user-card flex flex-col justify-between p-4 border-2 rounded-lg relative bg-white">
      <div>
        <div className="flex items-center gap-3">
          <Avatar
            src={user.avatar}
            alt={user.name}
            size="size-12"
            hasBorder={false}
          />
          <Link
            to={`/user/${user.id}`}
            className="text-base font-medium hover:underline"
          >
            {user.name}
          </Link>
        </div>
        <p className="text-gray-500 line-clamp-3 lg:line-clamp-2 mt-2">
          {user.shortDescription}
        </p>
      </div>
      <div>
        <div className="flex flex-wrap gap-2 mt-4">
          {user.characteristics.map((characteristic, index) => (
            <span
              key={index}
              className="border-2 border-primary py-1 px-3 rounded-full"
            >
              {characteristic}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 lg:gap-10 justify-end mt-3">
          <div className="flex flex-wrap gap-3 sm:gap-8">
            {user.city && <IconText icon="fa-location-dot" text={user.city} />}
            <IconText icon="fa-compass" text={`${user.distance} km`} />
          </div>
          {renderFriendshipButton()}
        </div>
      </div>
    </div>
  );
}

export default UserCard;
