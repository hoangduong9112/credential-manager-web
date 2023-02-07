import React from 'react';
import { Button, Form } from 'react-bootstrap';

interface FormAddEventProps {
  handleChangeAddEvent: (event: any) => void;
  submitAddEvent: (event: any) => void;
}

const FormAddEvent = (props: FormAddEventProps) => {
  return (
    <div>
      <div>
        <Form className="add-member-form" onSubmit={props.submitAddEvent}>
          <Form.Group className="mb-3">
            <Form.Label>Tên quỹ</Form.Label>
            <Form.Control
              placeholder="Tên"
              name="eventName"
              onChange={props.handleChangeAddEvent}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mức phí</Form.Label>
            <Form.Control
              placeholder="Mức phí (VNĐ)"
              name="mucphi"
              onChange={props.handleChangeAddEvent}
            />
          </Form.Group>

          <Form.Group controlId="formGrid">
            <Form.Label>Thời gian thu</Form.Label>
            <Form.Control
              type="date"
              name="date"
              placeholder="Chọn ngày bắt đầu"
              // max={today}
              onChange={props.handleChangeAddEvent}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Mô tả"
              name="descriptions"
              onChange={props.handleChangeAddEvent}
            />
          </Form.Group>

          <div className="button-add">
            <Button style={{ width: '20%' }} variant="primary" type="submit">
              Thêm
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default FormAddEvent;
