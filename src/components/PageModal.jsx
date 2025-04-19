import { useState, useImperativeHandle } from "react";
import { Modal } from "react-bootstrap";

const PageModal = ({ ref, title, children }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useImperativeHandle(ref, () => {
    return {
      showModal() {
        handleShow();
      },
      closeModal() {
        handleClose();
      },
    };
  });

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </div>
  );
};
export default PageModal;
