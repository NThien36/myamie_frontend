import Button from "@/components/Buttons/Button";
import PlaceCard from "@/components/Cards/PlaceCard";
import CustomModal from "@/components/Modals/CustomModal";
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
    <div className="mx-5 lg:mx-10 mt-20">
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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-5">
        {places.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
      <CustomModal
        title="Thêm địa điểm mới"
        isOpen={isOpen}
        onClose={closeModal}
        saveButtonTitle="Thêm"
        className="w-11/12 lg:w-1/2"
      >
        <UpsertPlace />
      </CustomModal>
    </div>
  );
}

export default CheckinPlace;
