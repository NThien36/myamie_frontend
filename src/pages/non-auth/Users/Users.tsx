import FilterBtn from "@/components/Buttons/FilterBtn";
import UserCard from "@/components/Cards/UserCard";
import CategoryContainer from "@/components/CategoryItem/CategoryContainer";
import FilterByDistance from "@/components/Filters/FilterByDistance";
import Loader from "@/components/Loader/Loader";
import NotFound from "@/components/PlaceholderPages/NotFound";
import Pagination from "@/components/Pagination/Pagination";
import Title from "@/components/Title/Title";
import { UsersParams } from "@/models/user.interface";
import { useGetUsers } from "@/services/user.service";
import { useEffect, useState } from "react";
import UnprovidedLocation from "@/components/PlaceholderPages/UnprovidedLocation";

function Users() {
  const [params, setParams] = useState<UsersParams>({
    pageNumber: 1,
    latitude: 0,
    longitude: 0,
  });
  const [tempDistance, setTempDistance] = useState<number | null>(5);

  useEffect(() => {
    // Fetch current location on mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setParams((prev) => ({ ...prev, latitude, longitude }));
      });
    }
  }, []);

  const { data, isLoading, isError } = useGetUsers(params);

  const updateParams = (newParams: UsersParams) => {
    setParams((prev) => ({ ...prev, ...newParams, pageNumber: 1 }));
  };

  const handleCategorySelect = (categoryId: number) =>
    updateParams({ categoryId });

  const handlePageChange = (pageNumber: number) =>
    setParams((prev) => ({ ...prev, pageNumber }));

  const handleDistanceChange = (distance: number) => setTempDistance(distance);

  const handleFilterApply = () => {
    updateParams({ distanceInKm: tempDistance ?? 5 });
  };

  const handleClearFilter = () => {
    if (tempDistance === null) return;

    setTempDistance(null);
    updateParams({ distanceInKm: 0 });
  };

  if (params.latitude === 0 || params.longitude === 0) {
    return <UnprovidedLocation />;
  }

  const pagination = data?.data.pagination;

  let content;
  if (isLoading) {
    content = <Loader />;
  } else if (isError) {
    content = <p className="error">Lỗi, vui lòng thử lại {data?.message}</p>;
  } else if (data?.data.users?.length === 0) {
    content = <NotFound type="user" />;
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
      <CategoryContainer onSelect={handleCategorySelect} />
      <div className="mt-10">
        <div className="flex justify-between items-end mb-4">
          <p className="font-semibold text-base">
            Danh sách {pagination?.totalCount} bạn gần đây
          </p>
          <FilterBtn
            onActiveClick={handleFilterApply}
            onInactiveClick={handleClearFilter}
          >
            <FilterByDistance onChange={handleDistanceChange} />
          </FilterBtn>
        </div>
        {content}
      </div>
      <Pagination
        currentPage={pagination?.currentPage ?? 1}
        totalPage={pagination?.totalPages ?? 1}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Users;
