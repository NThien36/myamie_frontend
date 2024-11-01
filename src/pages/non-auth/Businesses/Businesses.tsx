import { businessData } from "@/assets/data/business.data";
import BusinessCard from "@/components/Cards/BusinessCard";
import CategoryContainer from "@/components/CategoryItem/CategoryContainer";
import FilterByCities from "@/components/Filters/FilterByCities";
import Pagination from "@/components/Pagination/Pagination";
import SearchBar from "@/components/SearchBar/SearchBar";
import Title from "@/components/Title/Title";

function Businesses() {
  return (
    <div className="mt-10">
      <Title
        subTitle="Hơn 300 dịch vụ gần đây"
        title="Các dịch vụ nổi bật"
        description="Những dịch vụ uy tín và phổ biến gần vị trí của bạn, dễ dàng lựa chọn và trải nghiệm những dịch vụ tốt nhất"
      />
      <SearchBar onSearch={() => "f"}>
        <FilterByCities onCitySelect={() => "f"} />
      </SearchBar>
      <CategoryContainer />
      <div className="mt-10">
        <p className="font-semibold text-base">Danh sách dịch vụ</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
          {businessData.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      </div>
      <Pagination currentPage={1} totalPage={10} onPageChange={() => "f"} />
    </div>
  );
}

export default Businesses;
