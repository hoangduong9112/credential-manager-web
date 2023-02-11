import {debounce} from 'lodash';
import React, {useEffect, useState} from 'react';
import {Container, Modal, Button, Form, Row, Col} from 'react-bootstrap';
import {AiOutlinePlusCircle} from 'react-icons/ai';
import {BsFillHouseFill, BsFillPeopleFill, BsFillPersonFill, BsTelephoneFill} from 'react-icons/bs';
import {FaPencilAlt} from 'react-icons/fa';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import ModalAddPeople from '../../components/Modal/AddPeopleModal';
import ModalContent from '../../components/Modal/Modal';
import TitleCard from '../../components/Title/TitleCard';
import {RootState} from '../../redux/reduxStore';
import {IFormAddPeople} from '../../types/form';
import {PersonInfo} from '../../types/person';
import {ModalListState} from '../../types/typeGlobal';
import './FamilyDetail.scss';
import PersonCardFamilyMember from '../../components/FamilyMemberCard/FamilyMemberCard';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {setPageRendering} from '../../redux/pageRendering/PageRenderingAction';
import {deleteFamilyAction, editFamilyAction} from '../../redux/family/FamilyAction';
import {addPersonAction} from '../../redux/person/PersonAction';

interface formEditFamily {
	address?: string;
	contact?: string;
	ownerId?: string;
}

export const renderSearchPeople = (listPeople: [], handleChoosePerson: (event: any, person: any) => void) => {
	return listPeople.map((person: any) => {
		return (
			<>
				<div onClick={(e) => handleChoosePerson(e, person)} className="alert alert-success" style={{width: '100%', cursor: 'pointer'}} role="alert" id={person.id}>
					Họ và tên : {person.firstName} {person.lastName} <br />
					Số căn cước công dân : {person.canCuocCongDan}
				</div>
			</>
		);
	});
};
const FamilyDetail = () => {
	const dispatch = useDispatch();
	let slug = useParams();
	const listFamily = useSelector((state: RootState) => state.family.listFamily);
	const listPeople = useSelector((state: RootState) => state.person.listPeople);
	const listCurrentPeople = listPeople.filter((p) => p?.familyId === slug.id);

	const currentFamily = listFamily.find((family) => family.id === slug.id);
	const owner = listPeople.find((p) => p.id === currentFamily?.ownerId);

	const [listTamTruPeople, setListTamTruPeople] = useState<PersonInfo[]>([]);
	const [formEditFamily, setFormEditFamily] = useState<formEditFamily>({
		address: currentFamily?.address,
		contact: currentFamily?.contact,
		ownerId: currentFamily?.ownerId,
	});
	const navigate = useNavigate();

	const [formAddPeople, setFormAddPeople] = useState<IFormAddPeople>({
		image: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
		phoneNumber: '',
		relationship: '',
		job: '',
		status: '',
		canCuocCongDan: '',
		name: '',
		address: '',
		gender: '',
		departmentDate: '',
	});

	const handleChangeEditFamily = debounce((event: any) => {
		setFormEditFamily({
			...formEditFamily,
			[event.target.name]: event.target.value,
		});
	}, 500);

	const submitEditFamily = async (event: any) => {
		event.preventDefault();
		currentFamily?.id &&
			dispatch(
				editFamilyAction({
					id: currentFamily?.id,
					family: {
						...currentFamily,
						...formEditFamily,
					},
				})
			);
	};

	const deleteFamily = async (event: any) => {
		slug.id && dispatch(deleteFamilyAction(slug.id));
		navigate(`/family`);
	};

	const handleClickPersonCard = (id: number) => {
		navigate(`/personDetail/${id}`);
	};

	const renderListPeople = (listPeople: PersonInfo[]) => {
		return listPeople.map((person) => {
			return (
				<PersonCardFamilyMember
					id={person.id}
					name={person.name}
					familyId={person.familyId}
					image={person.image || ''}
					relationship={person.relationship}
					job={person.job}
					status={person.status}
					onClick={() => {
						person.id && handleClickPersonCard(+person.id);
					}}
				/>
			);
		});
	};

	const [modalState, setModalState] = useState<ModalListState>(ModalListState.CLOSE);

	const handleShowEditFamilyForm = () => {
		setModalState(ModalListState.EDIT_FAMILY_INFO);
	};

	const handleClose = () => {
		setModalState(ModalListState.CLOSE);
	};

	const handleShowAddPersonForm = () => {
		setModalState(ModalListState.ADD_PERSON);
	};

	const handleChangeAddPeople = (event: any) => {
		setFormAddPeople({
			...formAddPeople,
			[event.target.name]: event.target.value,
		});
	};

	const submitAddPeople = async (event: any) => {
		event.preventDefault();
		console.log('add people', currentFamily?.soTVien);
		dispatch(
			addPersonAction({
				...formAddPeople,
				id: Math.random().toString(),
				familyId: currentFamily?.id,
			})
		);
		dispatch(
			editFamilyAction({
				id: currentFamily?.id,
				family: {
					...currentFamily,
					soTVien: currentFamily?.soTVien! + 1,
				},
			})
		);
		navigate(`/familyDetail/${currentFamily?.id}`);
	};

	useEffect(() => {
		dispatch(setPageRendering(undefined));
	}, [dispatch]);

	return (
		<Container>
			<TitleCard title="Chi tiết hộ gia đình">
				<FaPencilAlt style={{margin: '5vh 2vw', cursor: 'pointer'}} size={28} onClick={handleShowEditFamilyForm} />
				<Button onClick={deleteFamily} style={{backgroundColor: 'red', marginLeft: '600px'}}>
					Xóa hộ gia đình
				</Button>
				<Modal show={modalState === ModalListState.EDIT_FAMILY_INFO} onHide={handleClose} backdrop="static" keyboard={false}>
					<ModalContent title="Chỉnh sửa thông tin hộ gia đình" handleClose={handleClose}>
						<Form className="edit-family-form" onSubmit={submitEditFamily}>
							<Form.Group className="mb-3">
								<Form.Label>Địa chỉ</Form.Label>
								<Form.Control onChange={handleChangeEditFamily} name="address" placeholder={currentFamily?.address || 'Địa chỉ'} />
							</Form.Group>
							<Row className="mb-3">
								<Form.Group as={Col}>
									<Form.Label>ID chủ hộ mới</Form.Label>
									<Form.Control onChange={handleChangeEditFamily} name="ownerId" placeholder={currentFamily?.ownerId || 'ID'} />
								</Form.Group>
							</Row>

							<Form.Group className="mb-3">
								<Form.Label>Liên hệ (Email chủ hộ mới)</Form.Label>
								<Form.Control placeholder={currentFamily?.contact || 'Liên hệ'} name="contact" onChange={handleChangeEditFamily} />
							</Form.Group>

							<p style={{fontStyle: 'italic', fontSize: 12}}>*Nếu thay đổi chủ hộ hãy sửa quan hệ của các thành viên khác</p>

							<div className="button-add">
								<Button
									onClick={() => {
										handleClose();
									}}
									style={{width: '20%'}}
									variant="primary"
									type="submit"
								>
									Xong
								</Button>
							</div>
						</Form>
					</ModalContent>
				</Modal>
			</TitleCard>
			<div className="family-title">
				<div className="card-title-group">
					<div className="card-title">
						<BsFillHouseFill />
						<div className="card-content">Địa chỉ : {currentFamily?.address}</div>
					</div>
					<div className="card-title">
						<BsFillPersonFill />
						<div className="card-content">Tên chủ hộ : {owner?.name}</div>
					</div>
					<div className="card-title">
						<BsFillPeopleFill />
						<div className="card-content">Số lượng thành viên : {currentFamily?.soTVien}</div>
					</div>
					<div className="card-title">
						<BsTelephoneFill />
						<div className="card-content">Liên hệ : {currentFamily?.contact}</div>
					</div>
				</div>
			</div>

			<TitleCard title="Thành viên">
				<AiOutlinePlusCircle style={{margin: '5vh 2vw', cursor: 'pointer'}} size={42} onClick={handleShowAddPersonForm} />
				<ModalAddPeople
					family={currentFamily}
					title="Thêm thành viên"
					formAddPeople={formAddPeople}
					showModal={modalState === ModalListState.ADD_PERSON}
					submitAddPeople={submitAddPeople}
					handleChangeAddPeople={handleChangeAddPeople}
					handleClose={handleClose}
				></ModalAddPeople>
			</TitleCard>
			<div className="person-container">{renderListPeople(listCurrentPeople)}</div>
			{!!listTamTruPeople.length && (
				<>
					<TitleCard title="Thành viên tạm trú" />
					<div className="person-container">{renderListPeople(listTamTruPeople)}</div>
				</>
			)}

			<div
				style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'flex-end',
					height: '6vh',
				}}
			></div>
			<ToastContainer theme="colored" />
		</Container>
	);
};

export default FamilyDetail;
