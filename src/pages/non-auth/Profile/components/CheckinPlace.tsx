import Button from "@/components/Buttons/Button";
import CustomModal from "@/components/Modals/CustomModal";
import { useEffect, useState } from "react";
import UpsertPlace from "@/components/Forms/UpsertPlace";
import UserPlaces from "./UserPlaces";

interface UserProfileProps {
  name: string;
  id: number;
}

function CheckinPlace({ name, id }: UserProfileProps) {
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
      <UserPlaces id={id} />
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
