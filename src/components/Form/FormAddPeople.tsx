import React from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/reduxStore';
import {FamilyInfo} from '../../types/family';
import {IFormAddPeople, IFormAddPeopleTamTru} from '../../types/form';

interface IFormAddPeopleProps {
	family?: FamilyInfo;
	formAddPeople: IFormAddPeople | IFormAddPeopleTamTru;
	handleChangeAddPeople: (event: any) => void;
	submitAddPeople: (event: any) => void;
	handleChooseOwner?: (event: any, owner: any) => void;
}

export const renderSearchOwner = (listOwner: [], handleChooseOwner?: (event: any, owner: any) => void) => {
	return listOwner.map((owner: any) => {
		if (handleChooseOwner)
			return (
				<>
					<div onClick={(e) => handleChooseOwner(e, owner)} className="alert alert-success" style={{width: '100%', cursor: 'pointer'}} role="alert" id={owner.id}>
						Họ tên Chủ hộ : {owner.firstName} {owner.lastName}
						<br />
						Địa chỉ : {owner.address}
					</div>
				</>
			);
		else {
			return <></>;
		}
	});
};

const FormAddPeople = (props: IFormAddPeopleProps) => {
	const listPeople = useSelector((state: RootState) => state.person.listPeople);
	const ownerName = listPeople.find((p) => p.id === props.family?.ownerId)?.name;
	return (
		<div>
			<Form className="add-member-form" onSubmit={props.submitAddPeople}>
				<Row className="mb-3">
					<Form.Group as={Col}>
						<Form.Label>Tên</Form.Label>
						<Form.Control placeholder="Họ và Tên" onChange={props.handleChangeAddPeople} name="name" />
					</Form.Group>
					<Form.Group as={Col}>
						<label className="mb-2">Giới tính</label>
						<Form.Control name="gender" placeholder="Giới tính" type="text" list="gender" onChange={props.handleChangeAddPeople}></Form.Control>
						<datalist id="gender">
							<option value="Nam" />
							<option value="Nữ" />
							<option value="Khác" />
						</datalist>
					</Form.Group>
				</Row>

				<Row className="mb-3">
					<Form.Group as={Col}>
						<Form.Label>Số CCCD/ Mã định danh</Form.Label>
						<Form.Control placeholder="Căn cước công dân" onChange={props.handleChangeAddPeople} name="canCuocCongDan" />
					</Form.Group>
					<Form.Group as={Col}>
						<Form.Label>Số điện thoại</Form.Label>
						<Form.Control placeholder="Số điện thoại" onChange={props.handleChangeAddPeople} name="phoneNumber" />
					</Form.Group>
				</Row>
				<Row className="mb-3">
					<Form.Group as={Col}>
						<Form.Label>Ngày sinh</Form.Label>
						<Form.Control placeholder="Ngày sinh" type="date" onChange={props.handleChangeAddPeople} name="dateOfBirth" />
					</Form.Group>
					<Form.Group as={Col}>
						<Form.Label>Nghề nghiệp</Form.Label>
						<Form.Control placeholder="Nghề nghiệp" onChange={props.handleChangeAddPeople} name="job" />
					</Form.Group>
				</Row>
				<Row>
					<Form.Group as={Col} className="mb-3">
						<Form.Label>Địa chỉ</Form.Label>
						<Form.Control placeholder={props.formAddPeople.address ? props.formAddPeople.address : 'Địa chỉ'} onChange={props.handleChangeAddPeople} name="address" />
					</Form.Group>
					<Form.Group as={Col}>
						<Form.Label>Tên chủ hộ</Form.Label>
						<Form.Control readOnly placeholder={ownerName} name="nameOwner" />
					</Form.Group>
				</Row>

				<Row className="mb-3">
					<Form.Group as={Col}>
						<Form.Label>Quan hệ với chủ hộ</Form.Label>
						<Form.Control placeholder="Quan hệ với chủ hộ" onChange={props.handleChangeAddPeople} name="relationship" />
					</Form.Group>
				</Row>

				<Row>
					<Col md="6">
						<Form.Group className="mb-3">
							<label className="mb-2">Tình trạng</label>
							<Form.Control onChange={props.handleChangeAddPeople} placeholder="Tình trạng" type="text" list="status" name="status"></Form.Control>
							<datalist id="status">
								<option value="Đang cư trú" />
								<option value="Tạm trú" />
								<option value="Tạm vắng" />
								<option value="Đã qua đời" />
							</datalist>
						</Form.Group>
					</Col>
					<Col md="6">
						<Form.Group as={Col}>
							<Form.Label>Ngày tạm trú/tạm vắng/qua đời</Form.Label>
							<Form.Control placeholder="Thời gian" type="date" onChange={props.handleChangeAddPeople} name="departmentDate" />
						</Form.Group>
					</Col>
				</Row>

				<p style={{fontStyle: 'italic', fontSize: 12}}>*Nhập căn cước công dân chủ hộ để thực hiện tìm kiếm thông tin nhanh hơn</p>
				<div className="button-add">
					<Button style={{width: '20%'}} variant="primary" type="submit">
						Thêm
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default FormAddPeople;
