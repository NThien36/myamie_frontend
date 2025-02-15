import ReactModal from "react-modal";
import "./modal.css";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

function ConfirmModal({
  isOpen,
  onClose,
  children,
  className,
}: ConfirmModalProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={` filter_modal ${className} `}
      overlayClassName="filter_modal_overlay"
    >
      <div className="p-10">
        <button
          onClick={onClose}
          className="absolute top-1.5 right-1.5 size-6 bg-gray-200 rounded-full"
        >
          <i className="fa fa-times"></i>
        </button>
        {children}
      </div>
    </ReactModal>
  );
}

export default ConfirmModal;
