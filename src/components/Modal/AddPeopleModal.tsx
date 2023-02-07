import React from 'react';
import { Modal } from 'react-bootstrap';
import { IFormAddPeople, IFormAddPeopleTamTru } from '../../types/form';
import FormAddPeople from '../Form/FormAddPeople';
interface AddPeopleModalProps {
  title: string;
  children?: any;
  showModal: boolean;
  handleClose: () => void;
  handleChangeAddPeople: (event: any) => void;
  submitAddPeople: (event: any) => void;
  formAddPeople: IFormAddPeople | IFormAddPeopleTamTru;
  searchedOwnerError: any;
  searchedOwner: any;
  handleChooseOwner?: (event: any, owner: any) => void;
}

const ModalAddPeople = (props: AddPeopleModalProps) => {
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
          <FormAddPeople
            handleChooseOwner={props.handleChooseOwner}
            searchedOwner={props.searchedOwner}
            searchedOwnerError={props.searchedOwnerError}
            formAddPeople={props.formAddPeople}
            handleChangeAddPeople={props.handleChangeAddPeople}
            submitAddPeople={props.submitAddPeople}
          ></FormAddPeople>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalAddPeople;
