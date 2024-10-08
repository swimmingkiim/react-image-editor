import React from "react";
import { Modal, Spinner } from "react-bootstrap";

interface LoadingModalProps {
  show: boolean;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ show }) => {
  return (
    <Modal show={show} size="sm" centered>
      <Modal.Body className="text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only"></span>
        </Spinner>
      </Modal.Body>
    </Modal>
  );
};

export default LoadingModal;
