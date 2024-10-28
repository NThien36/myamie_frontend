import { userData } from "@/assets/data/user.data";
import FilterBtn from "@/components/Buttons/FilterBtn";
import UserCard from "@/components/Cards/UserCard";
import CategoryContainer from "@/components/CategoryItem/CategoryContainer";
import FilterByDistance from "@/components/Filters/FilterByDistance";
import Pagination from "@/components/Pagination/Pagination";
import Title from "@/components/Title/Title";

function Users() {
  return (
    <div className="mt-10">
      <Title
        subTitle="Hơn 4200 bạn bè gần đây"
        title="Tìm bạn bè quanh đây"
        description="Kết nối với những người bạn mới, khám phá các địa điểm và trải nghiệm dịch vụ tuyệt vời cùng nhau"
      />
      <CategoryContainer />
      <div className="mt-10">
        <div className="flex justify-between items-end">
          <p className="font-semibold text-base">Danh sách dịch vụ</p>
          <FilterBtn>
            <FilterByDistance />
          </FilterBtn>
        </div>
        <div className="grid grid-cols-2 gap-6 mt-4">
          {userData.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
      <Pagination currentPage={1} totalPage={10} onPageChange={() => "f"} />
    </div>
  );
}

export default Users;
