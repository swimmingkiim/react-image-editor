import React from "react";
import { Modal, Spinner } from "react-bootstrap";

interface ErrorModalProps {
    show: boolean;
    error: string;
    handleClose?: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ show, handleClose, error }) => {
    return (
        <Modal show={show} size="lg" centered>
            <Modal.Header closeButton onClick={handleClose}>
                <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                {error}
            </Modal.Body>
        </Modal>
    );
};

export default ErrorModal;