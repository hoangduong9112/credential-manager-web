import React from 'react';
import {Button, Form} from 'react-bootstrap';

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
						<Form.Label>Tên cuộc họp</Form.Label>
						<Form.Control placeholder="Tên cuộc họp" name="eventName" onChange={props.handleChangeAddEvent} />
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Ghi chú</Form.Label>
						<Form.Control placeholder="Ghi chú" name="description" onChange={props.handleChangeAddEvent} />
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Địa điểm</Form.Label>
						<Form.Control placeholder="Đỉa điểm" name="place" onChange={props.handleChangeAddEvent} />
					</Form.Group>

					<Form.Group controlId="formGrid">
						<Form.Label></Form.Label>
						<Form.Control type="date" name="date" placeholder="Chọn ngày tổ chức" onChange={props.handleChangeAddEvent} />
					</Form.Group>

					<Form.Group controlId="formGrid">
						<Form.Label></Form.Label>
						<Form.Control type="time" name="time" placeholder="Thời gian" onChange={props.handleChangeAddEvent} />
					</Form.Group>

					<div className="button-add">
						<Button style={{width: '20%'}} variant="primary" type="submit">
							Thêm
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default FormAddEvent;
