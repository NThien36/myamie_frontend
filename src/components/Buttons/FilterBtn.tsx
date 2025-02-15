import { useEffect, useState } from "react";
import Button from "./Button";
import CustomModal from "../Modals/CustomModal";

interface FilterBtnProps {
  onActiveClick?: () => void;
  onInactiveClick?: () => void;
  children: React.ReactNode;
}

function FilterBtn({
  children,
  onActiveClick,
  onInactiveClick,
}: FilterBtnProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleActiveClick = () => {
    if (onActiveClick) {
      onActiveClick();
    }
    closeModal();
  };

  const handleInactiveClick = () => {
    if (onInactiveClick) {
      onInactiveClick();
    }
    closeModal();
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Clean up when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalIsOpen]);

  return (
    <>
      <Button
        id="filter-button"
        variant="ghost"
        className="flex items-center gap-2"
        onClick={openModal}
      >
        <i className="fa-solid fa-bars-filter"></i>
        <p>Bộ lọc</p>
      </Button>
      <CustomModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        title="Tất cả bộ lọc"
        saveButtonTitle="Xem kết quả"
        cancelButtonTitle="Xoá bộ lọc"
        className="w-11/12 md:w-1/2"
        onActiveClick={handleActiveClick}
        onInactiveClick={handleInactiveClick}
      >
        {children}
      </CustomModal>
    </>
  );
}

export default FilterBtn;
