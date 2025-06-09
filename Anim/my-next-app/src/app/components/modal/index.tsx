import { useCardModal } from "@/app/hooks/useCardModal";
import { useParams } from "next/navigation";
import * as React from "react";
const CardModal = () => {
  const { id, isOpen, onClose } = useCardModal((state) => ({
    id: state.id,
    isOpen: state.isOpen,
    onClose: state.onClose,
  }));

  const params = useParams();

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-bold">Card Modal</h2>
        <p className="mt-2">Card ID: {id}</p>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CardModal;
