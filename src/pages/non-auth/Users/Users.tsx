import FilterBtn from "@/components/Buttons/FilterBtn";
import UserCard from "@/components/Cards/UserCard";
import CategoryContainer from "@/components/CategoryItem/CategoryContainer";
import FilterByDistance from "@/components/Filters/FilterByDistance";
import Loader from "@/components/Loader/Loader";
import NotFound from "@/components/NotFound/NotFound";
import Pagination from "@/components/Pagination/Pagination";
import Title from "@/components/Title/Title";
import { UsersParams } from "@/models/user.interface";
import { useGetUsers } from "@/services/user.service";
import { useState } from "react";

function Users() {
  const [params, setParams] = useState<UsersParams>({
    pageNumber: 1,
    latitude: 16.046094935025476,
    longitude: 108.24336285930981,
  });

  const { data, isLoading, isError } = useGetUsers(params);

  let content;
  const pagination = data?.data.pagination;

  console.log(data);

  if (isLoading) {
    content = <Loader />;
  } else if (isError) {
    content = <p className="error">Lỗi, vui lòng thử lại {data?.message}</p>;
  } else if (data?.data.users?.length === 0) {
    content = <NotFound />;
  } else {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data?.data.users?.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-10">
      <Title
        subTitle="Hơn 4200 bạn bè gần đây"
        title="Tìm bạn bè quanh đây"
        description="Kết nối với những người bạn mới, khám phá các địa điểm và trải nghiệm dịch vụ tuyệt vời cùng nhau"
      />
      <CategoryContainer />
      <div className="mt-10">
        <div className="flex justify-between items-end mb-4">
          <p className="font-semibold text-base">
            Danh sách {pagination?.totalCount} bạn gần đây
          </p>
          <FilterBtn>
            <FilterByDistance />
          </FilterBtn>
        </div>
        {content}
      </div>
      <Pagination
        currentPage={pagination?.currentPage ?? 1}
        totalPage={pagination?.totalPages ?? 1}
        onPageChange={() => "f"}
      />
    </div>
  );
}

export default Users;
