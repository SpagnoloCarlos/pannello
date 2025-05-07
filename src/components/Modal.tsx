import { useModal } from "../context/ModalContext";
import CloseIcon from "./Icons/CloseIcon";

const Modal = () => {
  const { isOpen, content, closeModal } = useModal();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeModal}
        aria-hidden="true"
      />
      <div className="relative z-50 w-full max-w-lg p-6 mx-4 bg-gray-800 rounded-lg border border-gray-400">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-1 hover:bg-gray-700 rounded-full transition-colors cursor-pointer"
          aria-label="Cerrar modal"
        >
          <CloseIcon />
        </button>
        {content}
      </div>
    </div>
  );
};

export default Modal;
