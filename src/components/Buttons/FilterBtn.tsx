import { useEffect, useState } from "react";
import Button from "./Button";
import FilterModal from "../Modals/FilterModal";

interface FilterBtnProps {
  children: React.ReactNode;
}

function FilterBtn({ children }: FilterBtnProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

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
        variant="ghost"
        className="flex items-center gap-2"
        onClick={openModal}
      >
        <i className="fa-solid fa-bars-filter"></i>
        <p>Bộ lọc</p>
      </Button>
      <FilterModal isOpen={modalIsOpen} onClose={closeModal}>
        {children}
      </FilterModal>
    </>
  );
}

export default FilterBtn;
