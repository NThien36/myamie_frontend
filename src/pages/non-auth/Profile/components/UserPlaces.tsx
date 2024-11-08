import PlaceCard from "@/components/Cards/PlaceCard";
import Loader from "@/components/Loader/Loader";
import Pagination from "@/components/Pagination/Pagination";
import { PlacesParams } from "@/models/place.interface";
import { useGetPlaces } from "@/services/place.service";
import { useState } from "react";

interface UserPlacesProps {
  id: number;
}

function UserPlaces({ id }: UserPlacesProps) {
  const [params, setParams] = useState<PlacesParams>({
    pageNumber: 1,
    userId: id,
  });

  const { data, isLoading, isError } = useGetPlaces(params);

  let content;
  const pagination = data?.data.pagination;

  if (isLoading) {
    content = <Loader />;
  } else if (isError) {
    content = <p className="error">Lỗi, vui lòng thử lại {data?.message}</p>;
  } else if (data?.data.places?.length === 0) {
    content = (
      <p className="font-medium text-center">Chưa checkin địa điểm nào</p>
    );
  } else {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {data?.data.places.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-5">
      {content}
      <Pagination
        currentPage={pagination?.currentPage ?? 1}
        totalPage={pagination?.totalPages ?? 1}
        onPageChange={() => "f"}
      />
    </div>
  );
}

export default UserPlaces;
