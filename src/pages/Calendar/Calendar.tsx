import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import {AiOutlineMinusCircle, AiOutlinePlusCircle} from 'react-icons/ai';
import {useDispatch, useSelector} from 'react-redux';
import ModalAddEvent from '../../components/Modal/AddEventModal';
import TitleCard from '../../components/Title/TitleCard';
import {setPageRendering} from '../../redux/pageRendering/PageRenderingAction';
import {RootState} from '../../redux/reduxStore';
import {PageRender} from '../../types/page';
import {ModalListState} from '../../types/typeGlobal';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {editFamilyAction} from '../../redux/family/FamilyAction';
import {FamilyInfo} from '../../types/family';
import Aws from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const Calendar = () => {
	const listFamily = useSelector((state: RootState) => state.family.listFamily);
	const listPeople = useSelector((state: RootState) => state.person.listPeople);

	const [modalState, setModalState] = useState<ModalListState>(ModalListState.CLOSE);
	const dispatch = useDispatch();

	const handleClose = () => {
		setModalState(ModalListState.CLOSE);
	};
	const [formAddEvent, setAddEvent] = useState({
		eventName: '',
		date: '',
		descriptions: '',
		place: '',
		time: '',
	});

	const [page, setPage] = useState<number>(1);

	const handleChangeAddEvent = (event: any) => {
		setAddEvent({
			...formAddEvent,
			[event.target.name]: event.target.value,
		});
	};

	const submitAddEvent = async (event: any) => {
		event.preventDefault();
		const params = {
			Message: `Bạn có thư mời tham gia cuộc họp ${formAddEvent.eventName} của tổ dân phố KIUKIU được diễn ra tại ${formAddEvent.place} vào ngày ${formAddEvent.date} lúc ${formAddEvent.time}. Lưu ý: ${formAddEvent.descriptions}` /* required */,
			TopicArn: process.env.AWS_TOPIC_ARN || 'arn:aws:sns:ap-southeast-1:432590225625:HDtest',
		};

		const sns = new Aws.SNS({
			accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'AKIAWJODDADM7VJPSL7J',
			secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET || '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',
			region: 'ap-southeast-1',
		});

		try {
			sns.publish(params, () => {});
		} catch (err) {
			console.log(err);
		}

		handleClose();
	};

	const changeAbsent = (family: FamilyInfo, flag: number) => {
		if (flag === 0 && family.absentNumber === 0) {
			return;
		}

		dispatch(
			editFamilyAction({
				id: family.id!,
				family: {
					...family,
					absentNumber: flag === 1 ? family.absentNumber! + 1 : family.absentNumber! - 1,
				},
			})
		);
	};
	useEffect(() => {
		dispatch(setPageRendering(PageRender.LIST_EVENT));
	}, [dispatch, page]);

	const handleShowAddEventForm = () => {
		setModalState(ModalListState.ADD_EVENT);
	};
	return (
		<>
			<Container>
				<TitleCard title="Quản lý lịch họp">
					<AiOutlinePlusCircle style={{margin: '5vh 2vw', cursor: 'pointer'}} size={42} onClick={handleShowAddEventForm} />
					<ModalAddEvent title="Thêm lịch họp" showModal={modalState === ModalListState.ADD_EVENT} handleChangeAddEvent={handleChangeAddEvent} handleClose={handleClose} submitAddEvent={submitAddEvent}></ModalAddEvent>
				</TitleCard>
				<Row>
					<Col md="4">{'ID Hộ gia đình'}</Col>
					<Col md="4">{'Tên chủ hộ'}</Col>
					<Col md="4">{'Số lần vắng'}</Col>
				</Row>
				{listFamily.map((family) => {
					const owner = listPeople.find((p) => p.id === family.ownerId);
					return (
						<Row style={{marginTop: '10px', height: '40px'}}>
							<Col md="4" style={{paddingLeft: '50px'}}>
								{family.id}
							</Col>
							<Col md="4" style={{paddingLeft: '20px'}}>
								{owner?.name}
							</Col>
							<Col md="4" style={{paddingLeft: '30px'}}>
								<AiOutlineMinusCircle
									style={{paddingLeft: '4px', paddingRight: '4px', cursor: 'pointer'}}
									size={20}
									onClick={() => {
										changeAbsent(family, 0);
									}}
								/>
								{family.absentNumber}
								<AiOutlinePlusCircle
									style={{paddingLeft: '4px', paddingRight: '4px', cursor: 'pointer'}}
									size={20}
									onClick={() => {
										changeAbsent(family, 1);
									}}
								/>
							</Col>
						</Row>
					);
				})}
			</Container>
			<ToastContainer theme="colored" />
		</>
	);
};

export default Calendar;
