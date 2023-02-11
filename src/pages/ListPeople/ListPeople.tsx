import React, {useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';
import {AiOutlinePlusCircle} from 'react-icons/ai';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import TitleCard from '../../components/Title/TitleCard';
import {setPageRendering} from '../../redux/pageRendering/PageRenderingAction';
import {PageRender} from '../../types/page';
import {PersonInfo, PersonStatus} from '../../types/person';
import {ModalListState} from '../../types/typeGlobal';
import instance from '../../axiosInstance/axiosInstance';
import CustomPagination from '../../components/Pagination/Pagination';
import ModalAddPeople from '../../components/Modal/AddPeopleModal';
import {IFormAddPeople} from '../../types/form';
import CredentialCard from '../../components/CredentialCard/CredentialCard';
import {debounce} from 'lodash';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {RootState} from '../../redux/reduxStore';
// import {setCurrentListPeople} from '../../redux/person/PersonAction';
import {setTotal} from '../../redux/pagination/PaginationAction';
import {notify} from '../../helpers';

const ListPeople = () => {
	const listPeople: PersonInfo[] = useSelector((state: RootState) => state.person.listPeople);
	const [modalState, setModalState] = useState<ModalListState>(ModalListState.CLOSE);
	const [formAddPeople, setFormAddPeople] = useState<IFormAddPeople>({
		image: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
		phoneNumber: '',
		relationship: '',
		job: '',
		status: PersonStatus.LIVE,
		canCuocCongDan: '',
		name: '',
		address: '',
		gender: '',
	});
	const [page, setPage] = useState<number>(1);
	const total: number = useSelector((state: RootState) => state.pagination.total);
	const onChangePage = (page: number) => {
		setPage(page);
	};
	const dispatch = useDispatch();

	const handleShowAddPersonForm = () => {
		setModalState(ModalListState.ADD_PERSON);
	};

	const handleClose = () => {
		setModalState(ModalListState.CLOSE);
	};

	const navigate = useNavigate();

	const handleClickPersonCard = (id: number) => {
		console.log(id);
		navigate(`/personDetail/${id}`);
	};

	const renderListPeople = (listPeople: PersonInfo[]) => {
		return listPeople.map((person) => {
			console.log(listPeople);
			return (
				<CredentialCard
					id={+person.id!}
					name={`${person.name}`}
					image={person.image || ''}
					phoneNumber={person.phoneNumber}
					job={person.job}
					address={person.address}
					status={person.status}
					canCuocCongDan={person.canCuocCongDan}
					onClick={() => {
						person.id && handleClickPersonCard(+person.id);
					}}
				/>
			);
		});
	};

	const errSearch: string[] = useSelector((state: RootState) => state.errorSearch.currentErrorSearch);

	const [searchedOwner, setSearchedOwner] = useState<[]>();
	const [searchedOwnerError, setSearchedOwnerError] = useState<string[]>();

	const handleChangeAddPeople = debounce(async (event: any) => {
		setSearchedOwnerError([]);
		setSearchedOwner([]);
		if (event.target.name === 'cccdOwner' && event.target.value) {
			const res = await instance.get(`/congDan/search?cccd=${event.target.value}`);
			if (res.data.status) {
				setSearchedOwner(res.data.response);
				console.log('searchedOwner', searchedOwner);
			} else {
				setSearchedOwnerError([res.data.response]);
			}
		} else {
			setFormAddPeople({
				...formAddPeople,
				[event.target.name]: event.target.value,
			});
		}
	}, 1000);

	const handleChooseOwner = (event: any, owner: any) => {
		setFormAddPeople({
			...formAddPeople,
			address: owner.address,
		});
		setSearchedOwner([]);
	};

	const submitAddPeople = async (event: any) => {
		event.preventDefault();
		console.log(formAddPeople);

		const res = await instance.post('/congDan', formAddPeople);

		console.log(res.data);

		if (res.data.status) {
			handleClose();
			notify('Thêm công dân thành công', () => window.location.reload());
		}
	};

	const fetchPeople = async () => {
		const res = await instance.get(`/congDan/?page=${page}&pageSize=4`);
		if (res.data.status) {
			// dispatch(setCurrentListPeople(res.data.response));
			dispatch(setTotal(res.data.totalItems));
		} else {
			// dispatch(setCurrentListPeople([]));
		}
	};

	useEffect(() => {
		dispatch(setPageRendering(PageRender.LIST_CREDENTIAL));

		fetchPeople();
	}, [page]);

	return (
		<>
			<Container>
				<TitleCard title="Danh sách nhân khẩu">
					<AiOutlinePlusCircle style={{margin: '5vh 2vw', cursor: 'pointer'}} size={42} onClick={handleShowAddPersonForm} />
					<ModalAddPeople
						title="Thêm nhân khẩu"
						formAddPeople={formAddPeople}
						showModal={modalState === ModalListState.ADD_PERSON}
						submitAddPeople={submitAddPeople}
						handleChooseOwner={handleChooseOwner}
						handleChangeAddPeople={handleChangeAddPeople}
						handleClose={handleClose}
					></ModalAddPeople>
				</TitleCard>
				<div className="person-container">{renderListPeople(listPeople)}</div>
				<div className="d-flex justify-content-center mt-2">{!errSearch.length && <CustomPagination current={page} pageSize={4} total={total} onChangePage={onChangePage}></CustomPagination>}</div>
			</Container>
			<ToastContainer theme="colored" />
		</>
	);
};

export default ListPeople;
