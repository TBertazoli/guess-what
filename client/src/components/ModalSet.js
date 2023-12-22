import { Modal, Button } from "react-bootstrap";

export default function ModalSet(props) {
  const { setisOpen } = props;

  const onClose = () => {
    setisOpen(false);
  };

  return (
    <>
      <Modal>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, I need to change this text</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
