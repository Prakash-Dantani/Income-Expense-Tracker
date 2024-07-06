// useModal.ts
import { useState } from "react";

interface ModalState {
  modalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useModal = (initialState: boolean = false): ModalState => {
  const [modalOpen, setModalOpen] = useState<boolean>(initialState);

  const openModal = (): void => {
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
  };

  return { modalOpen, openModal, closeModal };
};

export default useModal;
