import ReactModal from "react-modal";
import "./modal.css";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function ConfirmModal({ isOpen, onClose, children }: ConfirmModalProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="filter_modal"
      overlayClassName="filter_modal_overlay"
    >
      <div className="p-10">{children}</div>
    </ReactModal>
  );
}

export default ConfirmModal;
