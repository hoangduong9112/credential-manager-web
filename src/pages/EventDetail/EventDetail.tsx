import React, {useEffect, useState} from 'react';
import {Container, Modal, Table} from 'react-bootstrap';
import {AiOutlinePlusCircle} from 'react-icons/ai';
import {RiTimerFill} from 'react-icons/ri';
import {GrDocumentTxt, GrMoney} from 'react-icons/gr';
import FormUpdateDetailEvent from '../../components/Form/FormUpdateDetailEvent';
import ModalContent from '../../components/Modal/Modal';
import TitleCard from '../../components/Title/TitleCard';
import {EventFundingInfo, FamilyFundingInfo} from '../../types/eventFunding';
import {ModalListState} from '../../types/typeGlobal';
import {useParams} from 'react-router-dom';
import instance from '../../axiosInstance/axiosInstance';
import {FaMoneyBillWave} from 'react-icons/fa';
import {debounce} from 'lodash';
import {setPageRendering} from '../../redux/pageRendering/PageRenderingAction';
import {useDispatch} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {notify} from '../../helpers';

const EventDetail = () => {
	const [eventFundingPay, setEventFundingPay] = useState<EventFundingInfo>({
		id: 1,
		eventName: 'string',
		tongtien: 1,
		date: 'string',
		descriptions: 'string',
		listHKDG: [
			{
				address: '39 Dich Vong Cau Giay',
				tenChuHo: 'Le Hai Thanh',
				amount: 1,
				time: '15/10/2021',
			},
		],
	});
	const [eventFundingNotPay, setEventFundingNotPay] = useState<EventFundingInfo>({
		id: 1,
		eventName: 'string',
		tongtien: 1,
		date: 'string',
		descriptions: 'string',
		listHKDG: [
			{
				address: '39 Dich Vong Cau Giay',
				tenChuHo: 'Le Hai Thanh',
				amount: 1,
				time: '15/10/2021',
			},
		],
	});
	const [searchedFamily, setSearchedFamily] = useState<[]>();
	const [searchedFamilyError, setSearchedFamilyError] = useState<string[]>();
	const [disableButton, setDisableButton] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string[]>();

	const renderContributEventFunding = (eventFundingPayListFamily: FamilyFundingInfo[] | undefined) => {
		return eventFundingPayListFamily?.map((family, index) => {
			return (
				<tr>
					<td>{index + 1}</td>
					<td>{family.tenChuHo}</td>
					<td>{family.address}</td>
					<td>{family.time} </td>
					<td>{family.amount}</td>
				</tr>
			);
		});
	};
	const renderNotContributEventFunding = (eventFundingNotPayListFamily: FamilyFundingInfo[] | undefined) => {
		return eventFundingNotPayListFamily?.map((family, index) => {
			return (
				<tr>
					<td>{index + 1}</td>
					<td>{family.tenChuHo}</td>
					<td>{family.address}</td>
				</tr>
			);
		});
	};

	const [modalState, setModalState] = useState<ModalListState>(ModalListState.CLOSE);

	const handleShowEditFamilyForm = () => {
		setModalState(ModalListState.UPDATE_EVENT);
	};

	const handleClose = () => {
		setModalState(ModalListState.CLOSE);
	};

	const slug = useParams();

	const [formUpdateEvent, setFormUpdateEvent] = useState({
		hoKhau: {
			id: '000000002',
		},
		dongGop: {
			id: slug.id,
		},
		amount: 0,
		time: '',
		owner: '',
		address: '',
	});

	const handleUpdateEvent = debounce(async (event: any) => {
		setSearchedFamilyError([]);
		setSearchedFamily([]);
		if (event.target.name === 'amount') {
			if (Number(event.target.value) < 0) {
				setDisableButton(true);
				setErrorMessage(['Số tiền không được âm']);
			} else {
				setDisableButton(false);
				setErrorMessage([]);
			}
		}
		if (event.target.name === 'owner') {
			console.log('here');
			const res = await instance.get(`/hoKhau/search?lastname=${event.target.value}`);
			console.log(res.data);
			if (res.data.status) {
				setSearchedFamily(res.data.response);
			} else {
				setSearchedFamilyError([res.data.response]);
			}
		} else {
			setFormUpdateEvent({
				...formUpdateEvent,
				[event.target.name]: event.target.value,
			});
		}
	}, 1000);

	const submitUpdateEvent = async (event: any) => {
		event.preventDefault();

		const res = await instance.post(`/HKdongGop/add`, formUpdateEvent);

		if (res.data.status) {
			handleClose();
			notify('Thêm hộ đóng thành công', () => window.location.reload());
		}
	};

	const handleChooseFamily = (event: any, family: any) => {
		setFormUpdateEvent({
			...formUpdateEvent,
			hoKhau: {
				id: event.target.id,
			},
			owner: family.owner,
			address: family.address,
		});
		setSearchedFamily([]);
	};

	const fetchEventFundingPay = async () => {
		const pay = await instance.get(`/dongGop/${slug.id}/payment`);
		if (pay.status) {
			setEventFundingPay(pay.data.response);
		}
		const notPay = await instance.get(`/dongGop/${slug.id}/notpayment`);
		if (notPay.status) {
			setEventFundingNotPay(notPay.data.response);
		}
	};
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setPageRendering(undefined));
		fetchEventFundingPay();
		setEventFundingPay(eventFundingPay);
	}, []);

	return (
		<div>
			<Container>
				<TitleCard title="" />

				<div className="family-title">
					<div className="card-title-group">
						<div className="card-title">
							<GrMoney />
							<div className="card-content">: {eventFundingPay.eventName}</div>
						</div>
						<div className="card-title">
							<RiTimerFill />
							<div className="card-content">: {eventFundingPay.date}</div>
						</div>
						{!!eventFundingPay.mucphi && (
							<div className="card-title">
								<FaMoneyBillWave />
								<div className="card-content">: {eventFundingPay.mucphi} VNĐ</div>
							</div>
						)}
						{!!eventFundingPay.descriptions && (
							<div className="card-title">
								<GrDocumentTxt />
								<div className="card-content">Mô tả : {eventFundingPay.descriptions}</div>
							</div>
						)}
					</div>
				</div>

				<TitleCard title="Các hộ đã đóng tiền">
					<AiOutlinePlusCircle style={{margin: '5vh 2vw', cursor: 'pointer'}} size={42} onClick={handleShowEditFamilyForm} />
					<Modal show={modalState === ModalListState.UPDATE_EVENT} onHide={handleClose} backdrop="static" keyboard={false}>
						<ModalContent title="Thêm hộ đóng" handleClose={handleClose}>
							<FormUpdateDetailEvent
								formUpdateEvent={formUpdateEvent}
								errSearch={searchedFamilyError}
								searchedFamily={searchedFamily}
								handleUpdateEvent={handleUpdateEvent}
								submitUpdatevent={submitUpdateEvent}
								handleChooseFamily={handleChooseFamily}
								disableButton={disableButton}
								errorMessage={errorMessage}
							></FormUpdateDetailEvent>
						</ModalContent>
					</Modal>
				</TitleCard>

				<Table responsive="lg" className="mt-2" bordered hover>
					<thead>
						<tr>
							<th>STT</th>
							<th>Tên chủ hộ</th>
							<th>Địa chỉ hộ</th>
							<th>Thời gian thu</th>
							<th>Số tiền</th>
						</tr>
					</thead>
					<tbody>{renderContributEventFunding(eventFundingPay?.listHKDG)}</tbody>
					<tfoot>
						<tr>
							<td colSpan={4} style={{textAlign: 'center', fontWeight: 700}}>
								Tổng số tiền (VNĐ)
							</td>
							<td style={{fontWeight: 700}}>{eventFundingPay?.tongtien}</td>
						</tr>
					</tfoot>
				</Table>

				<TitleCard title="Các hộ chưa đóng tiền"></TitleCard>

				<Table responsive="lg" className="mt-2" bordered hover>
					<thead>
						<tr>
							<th>STT</th>
							<th>Tên chủ hộ</th>
							<th>Địa chỉ hộ</th>
						</tr>
					</thead>
					<tbody>{renderNotContributEventFunding(eventFundingNotPay?.listHKDG)}</tbody>
				</Table>
			</Container>
			<ToastContainer theme="colored" />
		</div>
	);
};

export default EventDetail;
