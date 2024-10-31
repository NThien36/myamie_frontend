import { categoryData } from "@/assets/data/category";
import { cityData } from "@/assets/data/city";
import Button from "@/components/Buttons/Button";
import PlaceCard from "@/components/Cards/PlaceCard";
import Dropdown from "@/components/Dropdown/Dropdown";
import Input from "@/components/Input/Input";
import Textarea from "@/components/Input/Textarea";
import CustomModal from "@/components/Modals/CustomModal";
import ImagesUpload from "@/components/ImagesUpload/ImagesUpload";
import { Place } from "@/models/place.interface";
import { useEffect, useState } from "react";
import UpsertPlace from "@/components/Forms/UpsertPlace";

interface UserProfileProps {
  places: Place[];
  name: string;
}

function CheckinPlace({ places, name }: UserProfileProps) {
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
        <p className="text-base font-medium">⭐ Nơi {name} đã checkin ⭐</p>
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
        <UpsertPlace />
      </CustomModal>
    </div>
  );
}

export default CheckinPlace;
