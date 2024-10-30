import { categoryData } from "@/assets/data/category";
import { cityData } from "@/assets/data/city";
import Button from "@/components/Buttons/Button";
import PlaceCard from "@/components/Cards/PlaceCard";
import Dropdown from "@/components/Dropdown/Dropdown";
import Input from "@/components/Input/Input";
import Textarea from "@/components/Input/Textarea";
import CustomModal from "@/components/Modals/CustomModal";
import { Place } from "@/models/place.interface";
import { useEffect, useState } from "react";

interface UserProfileProps {
  places: Place[];
}

function CheckinPlace({ places }: UserProfileProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Clean up when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="mx-10 mt-20">
      <div className="flex justify-between items-end">
        <p className="text-base font-medium">⭐ Nơi đã checkin ⭐</p>
        <Button
          variant="outline"
          className="text-xs font-medium"
          onClick={openModal}
        >
          Thêm địa điểm
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-5 mt-5">
        {places.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
      <CustomModal
        title="Thêm địa điểm mới"
        isOpen={isOpen}
        onClose={closeModal}
        saveButtonTitle="Thêm"
      >
        <Input label="Tên địa điểm" placeholder="Nhập tên địa điểm" />
        <Input label="Mô tả ngắn" placeholder="Nhập mô tả ngắn" />
        <Dropdown label="Loại địa điểm" options={cityData} />
        <Dropdown
          label="Thể loại (3)"
          options={categoryData}
          isMulti={true}
          isClearable={true}
          maxSelectItems={3}
        />
        <Input label="Địa chỉ" placeholder="Nhập địa chỉ" />
        <Textarea label="Mô tả chi tiết" placeholder="Nhập mô tả chi tiết" />
      </CustomModal>
    </div>
  );
}

export default CheckinPlace;
