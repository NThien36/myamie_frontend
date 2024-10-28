import { placeData } from "@/assets/data/place.data";
import PlaceCard from "@/components/Cards/PlaceCard";
import CategoryContainer from "@/components/CategoryItem/CategoryContainer";
import FilterByCities from "@/components/Filters/FilterByCities";
import Pagination from "@/components/Pagination/Pagination";
import SearchBar from "@/components/SearchBar/SearchBar";
import Title from "@/components/Title/Title";

function Places() {
  return (
    <div className="mt-10">
      <Title
        subTitle="Hơn 300 địa điểm gần đâ"
        title="Các địa điểm mới nhất"
        description="Khám phá những địa điểm hấp dẫn, tận hưởng những trải nghiệm mới cùng những người bạn"
      />
      <SearchBar onSearch={() => "f"}>
        <FilterByCities onCitySelect={() => "f"} />
      </SearchBar>
      <CategoryContainer />
      <div className="mt-10">
        <p className="font-semibold text-base">Danh sách dịch vụ</p>
        <div className="grid grid-cols-4 gap-6 mt-4">
          {placeData.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </div>
      <Pagination currentPage={1} totalPage={10} onPageChange={() => "f"} />
    </div>
  );
}

export default Places;
