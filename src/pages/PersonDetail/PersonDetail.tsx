import React, {useEffect, useState} from 'react';
import {Button, Card, Form, Container, Row, Col} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import '../../assets/img/face-3.jpg';
import {setPageRendering} from '../../redux/pageRendering/PageRenderingAction';
import './PersonDetail.scss';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {RootState} from '../../redux/reduxStore';
import {editPersonAction} from '../../redux/person/PersonAction';
import {useNavigate, useParams} from 'react-router-dom';

const PersonDetail = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const slug = useParams();
	const listPeople = useSelector((state: RootState) => state.person.listPeople);
	const currentPerson = listPeople.find((p) => p.id === slug.id);

	const [formEditPerson, setFormEditPerson] = useState({
		image: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
		phoneNumber: currentPerson?.phoneNumber,
		relationship: currentPerson?.relationship,
		job: currentPerson?.job,
		status: currentPerson?.status,
		canCuocCongDan: currentPerson?.canCuocCongDan,
		name: currentPerson?.name,
		address: currentPerson?.address,
		gender: currentPerson?.gender,
		departmentDate: currentPerson?.departmentDate,
	});

	const submitUpdatePersonInfo = async (event: any) => {
		event.preventDefault();

		dispatch(
			editPersonAction({
				id: currentPerson?.id,
				person: {
					...currentPerson,
					...formEditPerson,
				},
			})
		);
		navigate(`/familyDetail/${currentPerson?.familyId}`);
	};

	const handleChangeEditPersonInfo = (event: any) => {
		setFormEditPerson({
			...formEditPerson,
			[event.target.name]: event.target.value,
		});
	};

	useEffect(() => {
		dispatch(setPageRendering(undefined));
	}, [dispatch]);
	return (
		<>
			<Container>
				<Row className="mb-3">
					<Col md="8" className="form-edit">
						<Card className="card-form-edit md-8">
							<Card.Header>
								<Card.Title className="title" as="h4">
									Ch???nh s???a th??ng tin
								</Card.Title>
							</Card.Header>
							<Card.Body>
								<Form>
									<Row>
										<Col className="pr-1" md="4">
											<Form.Group className="mb-3">
												<label className="mb-2">H??? v?? t??n</label>
												<Form.Control onChange={handleChangeEditPersonInfo} placeholder={formEditPerson?.name || 'H??? v?? t??n'} type="text" name="firstName"></Form.Control>
											</Form.Group>
										</Col>

										<Col className="pr-1" md="3">
											<Form.Group className="mb-3">
												<label className="mb-2">Gi???i t??nh</label>
												<Form.Control onChange={handleChangeEditPersonInfo} placeholder={formEditPerson?.gender ? formEditPerson.gender : 'Gi???i t??nh'} type="text" list="genders" name="gender"></Form.Control>
												<datalist id="genders">
													<option value="Nam" />
													<option value="N???" />
													<option value="Kh??c" />
												</datalist>
											</Form.Group>
										</Col>
									</Row>
									<Row>
										<Col md="6">
											<Form.Group className="mb-3">
												<label className="mb-2">C??n c?????c c??ng d??n</label>
												<Form.Control placeholder={formEditPerson?.canCuocCongDan ? formEditPerson.canCuocCongDan : 'C??n c?????c c??ng d??n'} type="text"></Form.Control>
											</Form.Group>
										</Col>
										<Col md="6">
											<Form.Group className="mb-3">
												<label className="mb-2">S??? ??i???n tho???i</label>
												<Form.Control onChange={handleChangeEditPersonInfo} placeholder={formEditPerson?.phoneNumber ? formEditPerson.phoneNumber : 'S??? ??i???n tho???i'} type="text" name="phoneNumber"></Form.Control>
											</Form.Group>
										</Col>
									</Row>
									<Row>
										<Col md="6">
											<Form.Group className="mb-3">
												<label className="mb-2">?????a ch???</label>
												<Form.Control placeholder={formEditPerson?.address ? formEditPerson.address : '?????a ch???'} type="text"></Form.Control>
											</Form.Group>
										</Col>
									</Row>
									<Row>
										<Col md="6">
											<Form.Group className="mb-3">
												<label className="mb-2">Ngh??? nghi???p</label>
												<Form.Control onChange={handleChangeEditPersonInfo} placeholder={formEditPerson?.job ? formEditPerson.job : 'Ngh??? nghi???p'} type="text" name="job"></Form.Control>
											</Form.Group>
										</Col>
									</Row>
									<Row>
										<Col md="6">
											<Form.Group className="mb-3">
												<label className="mb-2">T??nh tr???ng</label>
												<Form.Control
													onChange={handleChangeEditPersonInfo}
													placeholder={formEditPerson?.status ? formEditPerson.status : 'T??nh tr???ng'}
													type="text"
													list="status"
													name="status"
													disabled={formEditPerson.relationship === 'Ch??? h???'}
												></Form.Control>
												<datalist id="status">
													<option value="??ang c?? tr??" />
													<option value="T???m tr??" />
													<option value="T???m v???ng" />
													<option value="???? qua ?????i" />
												</datalist>
											</Form.Group>
										</Col>
										<Col md="6">
											<Form.Group className="mb-3">
												<label className="mb-2">Th???i gian chuy???n ??i/chuy???n ?????n/qua ?????i</label>
												<Form.Control onChange={handleChangeEditPersonInfo} value={formEditPerson?.departmentDate ? formEditPerson.departmentDate : 'Th???i gian chuy???n ??i/qua ?????i'} type="date" name="departmentTime"></Form.Control>
											</Form.Group>
										</Col>
									</Row>

									<Button className="btn-fill pull-right mt-2" type="button" variant="info" onClick={submitUpdatePersonInfo}>
										C???p nh???t th??ng tin
									</Button>
									<div className="clearfix"></div>
								</Form>
							</Card.Body>
						</Card>
					</Col>
					<Col md="4">
						<Card className="card-user-pic">
							<Card.Body>
								<div className="author">
									<img alt="..." className="avatar border-gray" src={formEditPerson?.image}></img>
									<h5 className="title mt-2">{formEditPerson?.name}</h5>
									<h5 className="title">{formEditPerson?.canCuocCongDan}</h5>
								</div>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
			<ToastContainer theme="colored" />
		</>
	);
};

export default PersonDetail;
