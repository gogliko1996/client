import React from "react";
import Modal from "react-modal";
import { DetealsModalProps } from "./DetealsModal.props";

const customStyles = {
  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const DetealsModal: React.FC<DetealsModalProps> = (props) => {
  const { isOpen = false, onClose, children } = props;

  function closeModal() {
    if (onClose) {
      onClose(false);
    }
  }

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
       {children}
      </Modal>
    </div>
  );
};
