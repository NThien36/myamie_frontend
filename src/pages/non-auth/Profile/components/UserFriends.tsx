import FriendCard from "@/components/Cards/FriendCard";
import Loader from "@/components/Loader/Loader";
import Pagination from "@/components/Pagination/Pagination";
import { FriendshipsParams } from "@/models/friendship.interface";
import { useGetFriendships } from "@/services/friendship.service";
import { useState } from "react";

function UserFriends() {
  const [params, setParams] = useState<FriendshipsParams>({ pageNumber: 1 });

  const { data, isLoading, isError } = useGetFriendships(params);
  const friends = data?.data.friends;
  const pagination = data?.data.pagination;

  const handlePageChange = (pageNumber: number) => {
    setParams((prev) => ({ ...prev, pageNumber }));
  };

  let content;
  if (isLoading) {
    content = <Loader />;
  } else if (isError) {
    content = <p className="error">Lỗi, vui lòng thử lại</p>;
  } else if (data?.data.friends?.length === 0) {
    content = <p>Chưa có bạn bè</p>;
  } else {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {friends?.map((friend) => (
          <FriendCard
            key={friend.id}
            friendId={friend.otherId}
            status={friend.status}
            receiverId={friend.receiverId}
            avatar={friend.avatar}
            name={friend.name}
          />
        ))}
      </div>
    );
  }

  return (
    <>
      {content}
      <Pagination
        currentPage={pagination?.currentPage ?? 1}
        totalPage={pagination?.totalPages ?? 1}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default UserFriends;
