import ReactModal from "react-modal";
import Button from "../Buttons/Button";
import IconBtn from "../Buttons/IconBtn";
import "./modal.css";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function FilterModal({ isOpen, onClose, children }: FilterModalProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="filter_modal w-1/2"
      overlayClassName="filter_modal_overlay"
    >
      <div className="p-3.5 relative border-b">
        <p className="text-center font-medium text-sm">Tất cả bộ lọc</p>
        <IconBtn
          onClick={onClose}
          className="absolute top-2.5 right-2.5"
          icon="fa-xmark"
        />
      </div>
      <div className="p-5 overflow-y-auto h-full flex flex-col gap-3 mb-2">
        {children}
      </div>
      <div className="p-3 flex justify-between border-t">
        <Button variant="ghost" padding="py-1.5 px-2.5">
          Xoá tất cả
        </Button>
        <Button padding="py-1.5 px-2.5">Xem kết quả</Button>
      </div>
    </ReactModal>
  );
}

export default FilterModal;
