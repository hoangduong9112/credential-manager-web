import React from 'react';
import { Modal } from 'react-bootstrap';
import FormAddEvent from '../Form/FormAddEvent';
interface EventModalProps {
  title: string;
  children?: any;
  showModal: boolean;
  handleClose: () => void;
  handleChangeAddEvent: (event: any) => void;
  submitAddEvent: (event: any) => void;
}

const ModalAddEvent = (props: EventModalProps) => {
  return (
    <div>
      <Modal
        show={props.showModal}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormAddEvent
            handleChangeAddEvent={props.handleChangeAddEvent}
            submitAddEvent={props.submitAddEvent}
          ></FormAddEvent>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalAddEvent;
