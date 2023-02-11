import React, {useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';
import {AiOutlinePlusCircle} from 'react-icons/ai';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import instance from '../../axiosInstance/axiosInstance';
import EventFundingCard from '../../components/EventFundingCard/EventFundingCard';
import ModalAddEvent from '../../components/Modal/AddEventModal';
import Sidebar from '../../components/Navbar/Sidebar';
import CustomPagination from '../../components/Pagination/Pagination';
import TitleCard from '../../components/Title/TitleCard';
import {notify, renderErrorMessage} from '../../helpers';
import {setCurrentListEventFunding} from '../../redux/eventFunding/EventFundingAction';
import {setPageRendering} from '../../redux/pageRendering/PageRenderingAction';
import {setTotal} from '../../redux/pagination/PaginationAction';
import {RootState} from '../../redux/reduxStore';
import {EventFundingInfo} from '../../types/eventFunding';
import {PageRender} from '../../types/page';
import {ModalListState} from '../../types/typeGlobal';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListEventFunding = () => {
	const listEventFunding: EventFundingInfo[] = useSelector((state: RootState) => state.eventFunding.currentListEventFunding);
	const [modalState, setModalState] = useState<ModalListState>(ModalListState.CLOSE);
	const dispatch = useDispatch();

	const handleClose = () => {
		setModalState(ModalListState.CLOSE);
	};
	const [formAddEvent, setAddEvent] = useState({
		eventName: '',
		date: '',
		tongtien: 0,
		descriptions: '',
		mucphi: 0,
		listHKDG: [],
	});

	const errSearch: string[] = useSelector((state: RootState) => state.errorSearch.currentErrorSearch);

	const [page, setPage] = useState<number>(1);
	const total: number = useSelector((state: RootState) => state.pagination.total);

	const onChangePage = (page: number) => {
		setPage(page);
	};

	const handleChangeAddEvent = (event: any) => {
		setAddEvent({
			...formAddEvent,
			[event.target.name]: event.target.value,
		});
		console.log(formAddEvent);
	};

	const submitAddEvent = async (event: any) => {
		event.preventDefault();

		try {
			const res = await instance.post(`/dongGop/`, formAddEvent);

			if (res.data.status) {
				handleClose();
			}
		} catch (err) {
			alert(err);
		}
	};

	const fetchListEventFunding = async () => {
		const res = await instance.get(`/dongGop/?page=${page}&pageSize=6`);
		if (res.status) {
			dispatch(setCurrentListEventFunding(res.data.response));
			dispatch(setTotal(res.data.totalItems));
		}
	};

	useEffect(() => {
		dispatch(setPageRendering(PageRender.LIST_EVENT));

		fetchListEventFunding();
	}, [page]);

	const navigate = useNavigate();

	const renderListEventFunding = (listEventFunding: EventFundingInfo[]) => {
		return listEventFunding.map((eventFunding) => {
			return (
				<EventFundingCard
					key={eventFunding.id}
					eventName={eventFunding.eventName}
					tongtien={eventFunding.tongtien}
					date={eventFunding.date}
					descriptions={eventFunding.descriptions}
					mucphi={eventFunding.mucphi}
					onClick={() => {
						handleClickEventFundingCard(eventFunding.id);
					}}
				/>
			);
		});
	};

	const handleClickEventFundingCard = (eventId: number) => {
		navigate(`/fundingDetail/${eventId}`);
	};

	const handleShowAddEventForm = () => {
		setModalState(ModalListState.ADD_EVENT);
	};
	return (
		<>
			<Container>
				{/* <TitleCard title="Danh sách các quỹ đóng góp">
					<AiOutlinePlusCircle style={{margin: '5vh 2vw', cursor: 'pointer'}} size={42} onClick={handleShowAddEventForm} />
					<ModalAddEvent title="Thêm quỹ" showModal={modalState === ModalListState.ADD_EVENT} handleChangeAddEvent={handleChangeAddEvent} handleClose={handleClose} submitAddEvent={submitAddEvent}></ModalAddEvent>
				</TitleCard> */}
				<div className="list-family-container">
					{!errSearch.length && renderListEventFunding(listEventFunding)}
					{!!errSearch.length && renderErrorMessage(errSearch)}
				</div>

				<div className="d-flex justify-content-center mt-2">{!errSearch.length && <CustomPagination current={page} pageSize={6} total={total} onChangePage={onChangePage}></CustomPagination>}</div>
			</Container>
			<ToastContainer theme="colored" />
		</>
	);
};

export default ListEventFunding;
