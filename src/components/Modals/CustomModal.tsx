import ReactModal from "react-modal";
import IconBtn from "../Buttons/IconBtn";
import Button from "../Buttons/Button";

interface CustomModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  saveButtonTitle?: string;
  cancelButtonTitle?: string;
}

function CustomModal({
  title,
  isOpen,
  onClose,
  children,
  saveButtonTitle = "Lưu",
  cancelButtonTitle = "Huỷ bỏ",
}: CustomModalProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="filter_modal w-1/2"
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
        <Button variant="ghost" onClick={onClose} padding="py-1.5 px-2.5">
          {cancelButtonTitle}
        </Button>
        <Button padding="py-1.5 px-2.5">{saveButtonTitle}</Button>
      </div>
    </ReactModal>
  );
}

export default CustomModal;
