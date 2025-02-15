import PlaceCard from "@/components/Cards/PlaceCard";
import CategoryContainer from "@/components/CategoryItem/CategoryContainer";
import FilterByCities from "@/components/Filters/FilterByCities";
import Loader from "@/components/Loader/Loader";
import NotFound from "@/components/PlaceholderPages/NotFound";
import Pagination from "@/components/Pagination/Pagination";
import SearchBar from "@/components/SearchBar/SearchBar";
import Title from "@/components/Title/Title";
import { PlacesParams } from "@/models/place.interface";
import { useGetPlaces } from "@/services/place.service";
import { useState } from "react";

function Places() {
  const [params, setParams] = useState<PlacesParams>({ pageNumber: 1 });
  const [tempCityId, setTempCityId] = useState<number | null>(null);

  const { data, isLoading, isError } = useGetPlaces(params);

  const pagination = data?.data.pagination;

  const updateParams = (newParams: PlacesParams) => {
    setParams((prev) => ({ ...prev, ...newParams, pageNumber: 1 }));
  };

  const handleSearch = (searchTerm: string) => updateParams({ searchTerm });

  const handleCategorySelect = (categoryId: number) =>
    updateParams({ categoryId });

  const handlePageChange = (pageNumber: number) =>
    setParams((prev) => ({ ...prev, pageNumber }));

  const handleCitySelect = (cityId: number) => setTempCityId(cityId); // Update tempCityId only

  const handleClearFilter = () => {
    if (tempCityId === null) return; // Do nothing if tempCityId is null

    setTempCityId(null); // Clear tempCityId
    updateParams({ cityId: 0 }); // Reset cityId in params
  };

  const handleCityFilterApply = () => {
    updateParams({ cityId: tempCityId ?? 0 }); // Apply tempCityId to params
  };

  let content;
  if (isLoading) {
    content = <Loader />;
  } else if (isError) {
    content = <p className="error">Lỗi, vui lòng thử lại</p>;
  } else if (data?.data.places?.length === 0) {
    content = <NotFound type="place" />;
  } else {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.data.places?.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-10">
      <Title
        subTitle="Hơn 2256 địa điểm gần đâ"
        title="Các địa điểm mới nhất"
        description="Khám phá những địa điểm hấp dẫn, tận hưởng những trải nghiệm mới cùng những người bạn"
      />
      <SearchBar
        onSearch={handleSearch}
        onActiveClick={handleCityFilterApply}
        onInactiveClick={handleClearFilter}
      >
        <FilterByCities
          currentCityId={tempCityId}
          onCitySelect={handleCitySelect}
          onClear={() => setTempCityId(null)}
        />
      </SearchBar>
      <CategoryContainer onSelect={handleCategorySelect} />
      <div className="mt-10">
        <p className="font-semibold text-base mb-4">
          Danh sách {pagination?.totalCount} dịch vụ
        </p>
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

export default Places;
