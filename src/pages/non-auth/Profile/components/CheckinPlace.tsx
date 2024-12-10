import Button from "@/components/Buttons/Button";
import CustomModal from "@/components/Modals/CustomModal";
import { useEffect, useRef, useState } from "react";
import CreatePlace from "@/components/Forms/CreatePlace";
import UserPlaces from "./UserPlaces";
import { useSelector } from "react-redux";
import { accountIdSelector } from "@/store/auth/auth.selector";

interface UserProfileProps {
  name: string;
  id: number;
}

function CheckinPlace({ name, id }: UserProfileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const createPlaceRef = useRef<{ submit: () => void } | null>(null); // Ref for CreatePlace
  const curUserId = useSelector(accountIdSelector);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const handleCreateSubmit = () => {
    if (createPlaceRef.current?.submit) {
      createPlaceRef.current.submit(); // Trigger form submission
    }
  };

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
        {
          // Only show add place button if the current user is viewing their own profile
          curUserId === id && (
            <Button
              variant="outline"
              className="text-xs font-medium"
              onClick={openModal}
            >
              Thêm địa điểm
            </Button>
          )
        }
      </div>
      <UserPlaces id={id} />
      <CustomModal
        title="Thêm địa điểm mới"
        isOpen={isOpen}
        onClose={closeModal}
        isPending={isPending}
        saveButtonTitle="Thêm"
        className="w-11/12 lg:w-1/2"
        onActiveClick={handleCreateSubmit} // Handle save button click
      >
        <CreatePlace
          ref={createPlaceRef}
          setIsPending={setIsPending}
          onCloseModal={closeModal}
        />{" "}
        {/* Pass ref to CreatePlace */}
      </CustomModal>
    </div>
  );
}

export default CheckinPlace;
