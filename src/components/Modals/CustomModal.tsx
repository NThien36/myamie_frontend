import ReactModal from "react-modal";
import IconBtn from "../Buttons/IconBtn";
import Button from "../Buttons/Button";
import { isPending } from "@reduxjs/toolkit";

interface CustomModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onActiveClick?: () => void;
  onInactiveClick?: () => void;
  children: React.ReactNode;
  saveButtonTitle?: string;
  cancelButtonTitle?: string;
  className?: string;
  isPending?: boolean;
}

function CustomModal({
  title,
  isOpen,
  onClose,
  children,
  saveButtonTitle = "Lưu",
  cancelButtonTitle = "Huỷ bỏ",
  className = "w-1/2",
  onActiveClick,
  onInactiveClick,
  isPending = false,
}: CustomModalProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={` filter_modal ${className} `}
      overlayClassName="filter_modal_overlay"
    >
      <div className="p-3.5 relative border-b">
        <p className="text-center font-medium text-sm">{title}</p>
        <IconBtn
          onClick={onClose}
          className="absolute top-2.5 right-2.5"
          icon="fa-xmark"
        />
      </div>
      <div className="p-5 overflow-y-auto h-full flex flex-col gap-3">
        {children}
      </div>
      <div className="p-3 flex justify-between border-t">
        <Button
          variant="ghost"
          onClick={onInactiveClick}
          padding="py-1.5 px-2.5"
        >
          {cancelButtonTitle}
        </Button>
        <Button
          id="filter-button-save"
          disabled={isPending}
          onClick={onActiveClick}
          padding="py-1.5 px-2.5"
        >
          {isPending ? "Đang " + saveButtonTitle + "..." : saveButtonTitle}
        </Button>
      </div>
    </ReactModal>
  );
}

export default CustomModal;
