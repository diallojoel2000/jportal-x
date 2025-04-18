import { useState, useImperativeHandle, createContext } from "react";
import { Modal, Button } from "react-bootstrap";

const ModalContext = createContext();

export const useModalContext = () => {
  const ctx = useContext(ModalContext);
  return ctx;
};
const PageModal = ({ ref }) => {
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
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default PageModal;
