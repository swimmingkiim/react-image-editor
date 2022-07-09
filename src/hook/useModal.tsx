import React, { useState } from "react";

const useModal = () => {
  const [displayModal, setDisplayModal] = useState<boolean>(false);

  const openModal = () => {
    setDisplayModal(true);
  };

  const closeModal = () => {
    setDisplayModal(false);
  };

  return {
    displayModal,
    openModal,
    closeModal,
  };
};

export default useModal;
