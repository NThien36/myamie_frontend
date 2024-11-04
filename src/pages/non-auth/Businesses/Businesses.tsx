import BusinessCard from "@/components/Cards/BusinessCard";
import CategoryContainer from "@/components/CategoryItem/CategoryContainer";
import FilterByCities from "@/components/Filters/FilterByCities";
import Loader from "@/components/Loader/Loader";
import NotFound from "@/components/NotFound/NotFound";
import Pagination from "@/components/Pagination/Pagination";
import SearchBar from "@/components/SearchBar/SearchBar";
import Title from "@/components/Title/Title";
import { BusinessesParams } from "@/models/business.interface";
import { useGetBusinesses } from "@/services/business.service";
import { useState } from "react";

function Businesses() {
  const [params, setParams] = useState<BusinessesParams>({ pageNumber: 1 });

  const { data, isLoading, isError } = useGetBusinesses(params);

  let content;
  const pagination = data?.data.pagination;

  if (isLoading) {
    content = <Loader />;
  } else if (isError) {
    content = <p className="error">Lỗi, vui lòng thử lại</p>;
  } else if (data?.data.businesses?.length === 0) {
    content = <NotFound type="business" />;
  } else {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.data.businesses?.map((business) => (
          <BusinessCard key={business.id} business={business} />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-10">
      <Title
        subTitle="Hơn 1202 dịch vụ gần đây"
        title="Các dịch vụ nổi bật"
        description="Những dịch vụ uy tín và phổ biến gần vị trí của bạn, dễ dàng lựa chọn và trải nghiệm những dịch vụ tốt nhất"
      />
      <SearchBar onSearch={() => "f"}>
        <FilterByCities onCitySelect={() => "f"} />
      </SearchBar>
      <CategoryContainer />
      <div className="mt-10">
        <p className="font-semibold text-base mb-4">
          Danh sách {pagination?.totalCount} địa điểm
        </p>
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

export default Businesses;
