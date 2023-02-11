import React, {useEffect, useState} from 'react';
import {Button, Container, Form, Modal} from 'react-bootstrap';
import FamilyCard from '../../components/FamilyCard/FamilyCard';
import './ListFamily.scss';
import TitleCard from '../../components/Title/TitleCard';
import {FamilyInfo} from '../../types/family';
import {useDispatch, useSelector} from 'react-redux';
import {setPageRendering} from '../../redux/pageRendering/PageRenderingAction';
import {PageRender} from '../../types/page';
import {useNavigate} from 'react-router-dom';
import ModalContent from '../../components/Modal/Modal';
import {AiOutlinePlusCircle} from 'react-icons/ai';
import {ModalListState} from '../../types/typeGlobal';
import {RootState} from '../../redux/reduxStore';
import CustomPagination from '../../components/Pagination/Pagination';
import {debounce} from 'lodash';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {addFamilyAction} from '../../redux/family/FamilyAction';

const ListFamily = () => {
	const listFamily = useSelector((state: RootState) => state.family.listFamily);
	const listPeople = useSelector((state: RootState) => state.person.listPeople);

	const [modalState, setModalState] = useState<ModalListState>(ModalListState.CLOSE);
	const [formAddFamily, setFormAddFamily] = useState<FamilyInfo>({
		id: Math.random().toString(),
		address: '',
		soTVien: 0,
		contact: '',
		ownerId: '',
		absentNumber: 0,
	});
	const [page, setPage] = useState<number>(1);
	const total: number = useSelector((state: RootState) => state.pagination.total);
	const onChangePage = (page: number) => {
		setPage(page);
	};

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const findFamily = (listFamily: FamilyInfo[], familyId: string) => {
		const foundFamily = listFamily.filter((family) => family.id === familyId);
		return foundFamily[0];
	};

	const handleShowAddFamilyForm = () => {
		setModalState(ModalListState.ADD_FAMILY);
	};

	const handleClose = () => {
		setModalState(ModalListState.CLOSE);
	};

	const handleChangeAddFamily = debounce((event: any) => {
		setFormAddFamily({
			...formAddFamily,
			[event.target.name]: event.target.value,
		});
	}, 500);

	const handleClickFamilyCard = (familyId: string) => {
		navigate(`/familyDetail/${familyId}`);
	};

	const submitAddFamily = async (event: any) => {
		event.preventDefault();
		dispatch(addFamilyAction(formAddFamily));
		navigate(`/family`);
	};

	const renderListFamily = (listFamily: FamilyInfo[]) => {
		return listFamily.map((family) => {
			const ownerName = listPeople.find((person) => person.id === family.ownerId)?.name;

			return <FamilyCard id={family.id} address={family.address} soTVien={family.soTVien} contact={family.contact} ownerName={ownerName || ''} onClick={() => family.id && handleClickFamilyCard(family.id)} />;
		});
	};

	useEffect(() => {
		dispatch(setPageRendering(PageRender.LIST_FAMILY));
	}, []);

	return (
		<>
			<Container>
				<TitleCard title="Danh sách các hộ gia đình">
					<AiOutlinePlusCircle style={{margin: '5vh 2vw', cursor: 'pointer'}} size={42} onClick={handleShowAddFamilyForm} />
					<Modal show={modalState === ModalListState.ADD_FAMILY} onHide={handleClose} backdrop="static" keyboard={false}>
						<ModalContent title="Thêm hộ gia đình" handleClose={handleClose}>
							<Form className="add-member-form" onSubmit={submitAddFamily}>
								<Form.Group className="mb-3">
									<Form.Label>Địa chỉ</Form.Label>
									<Form.Control placeholder="Địa chỉ" onChange={handleChangeAddFamily} name="address" />
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Label>Tên chủ hộ</Form.Label>
									<Form.Control placeholder="Tên chủ hộ" onChange={handleChangeAddFamily} name="owner" />
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Label>Số thành viên</Form.Label>
									<Form.Control placeholder="Số thành viên" onChange={handleChangeAddFamily} name="soTVien" />
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Label>Liên hệ</Form.Label>
									<Form.Control placeholder="Liên hệ" onChange={handleChangeAddFamily} name="contact" />
								</Form.Group>
								<p style={{fontStyle: 'italic', fontSize: 12}}>*Nhập căn cước công dân để thực hiện tìm kiếm thông tin nhanh hơn</p>

								<div className="button-add">
									<Button style={{width: '20%'}} variant="primary" type="submit">
										Thêm
									</Button>
								</div>
							</Form>
						</ModalContent>
					</Modal>
				</TitleCard>
				<div className="list-family-container">{renderListFamily(listFamily)}</div>
				<div className="d-flex justify-content-center mt-2">{<CustomPagination current={page} pageSize={6} total={total} onChangePage={onChangePage}></CustomPagination>}</div>
			</Container>
			<ToastContainer theme="colored" />
		</>
	);
};

export default ListFamily;
