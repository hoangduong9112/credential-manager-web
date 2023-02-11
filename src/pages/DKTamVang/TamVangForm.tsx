import React, {useState, useEffect} from 'react';
import {Row, Form, Button, Col} from 'react-bootstrap';
import moment from 'moment';
import './TamVangForm.scss';
import {useDispatch} from 'react-redux';
import {setPageRendering} from '../../redux/pageRendering/PageRenderingAction';
import {debounce} from 'lodash';
import instance from '../../axiosInstance/axiosInstance';
import {renderSearchPeople} from '../FamilyDetail/FamilyDetail';
import {notify, renderErrorMessage} from '../../helpers';
import {ToastContainer} from 'react-toastify';
import {useNavigate} from 'react-router-dom';

const TamVangForm = () => {
	const [searchedPeopleError, setSearchedPeopleError] = useState<string[]>();
	const [searchedPeople, setSearchedPeople] = useState<[]>();
	const [form, setForm] = useState({
		phoneNumber: '',
		firstName: '',
		lastName: '',
		address: '',
		dateOfBirth: '',
		gender: '',
		job: '',
		canCuocCongDan: '',

		status: 'Tạm vắng',
		relationship: '',
		idSHK: '',
		addressTamTru: '',
		image: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
		startTime: '',
		endTime: '',
	});

	const handleChoosePerson = (event: any, people: any) => {
		setForm((form) => ({
			...form,
			...people,
			soHoKhau: {
				id: people.idSHK,
			},
		}));
		setSearchedPeople([]);
	};

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(setPageRendering(undefined));
	}, []);

	const handleSubmit = async () => {
		const res = await instance.post(`/khaiBaoTamVang`, form);
		console.log(res.data.status);
		if (res.data.status) {
			console.log(`/familyDetail/${form.idSHK}`);
			notify('Đăng ký tạm vắng thành công', () => navigate(`/familyDetail/${form.idSHK}`));
		}
	};

	const handleChange = debounce(async (event: any) => {
		if (event.target.name === 'cccd') {
			const res = await instance.get(`/congDan/search?cccd=${event.target.value}`);
			console.log(res);
			if (res.data.status) {
				setSearchedPeople(res.data.response);
				setSearchedPeopleError([]);
			} else {
				setSearchedPeopleError([res.data.response]);
				setSearchedPeople([]);
			}
		}
		setForm({
			...form,
			[event.target.name]: event.target.value,
		});
	}, 1000);

	return (
		<div className="insert">
			<div className="title">
				<h3>Thông tin đăng ký tạm vắng</h3>
				<p style={{fontStyle: 'italic', fontSize: 12, textAlign: 'center'}}>*Nhập CCCD để thực hiện tìm kiếm thông tin nhanh hơn</p>
			</div>
			<div className="content">
				<Form className="mb-3">
					<Row className="mb-3">
						<Form.Group as={Col} controlId="formGridName">
							<Form.Label>Họ</Form.Label>
							<Form.Control type="text" placeholder={form.firstName ? form.firstName : 'Họ'} name="firstName" onChange={handleChange} />
						</Form.Group>
						<Form.Group as={Col} controlId="formGridName">
							<Form.Label>Họ</Form.Label>
							<Form.Control type="text" placeholder={form.lastName ? form.lastName : 'Tên'} name="lastName" onChange={handleChange} />
						</Form.Group>

						<Form.Group as={Col} controlId="formGrid">
							<Form.Label>Ngày sinh:</Form.Label>
							<Form.Control type="date" placeholder={form.dateOfBirth ? form.dateOfBirth : 'Chọn ngày sinh'} max={moment(new Date()).format('YYYY-MM-DD')} name="dateOfBirth" onChange={handleChange} />
						</Form.Group>

						<Row as={Col}>
							<Form.Label>Giới tính:</Form.Label>
							<Form.Group as={Col} className="mb-3" id="formGridMale">
								<Form.Check
									type="checkbox"
									name="gender"
									label="Nam"
									checked={form.gender === 'Nam'}
									onClick={(e) => {
										setForm({...form, gender: 'Nam'});
									}}
								/>
							</Form.Group>

							<Form.Group as={Col} className="mb-3" id="formGridFemale">
								<Form.Check
									type="checkbox"
									name="gender"
									label="Nữ"
									checked={form.gender === 'Nữ'}
									onClick={(e) => {
										setForm({...form, gender: 'Nữ'});
									}}
								/>
							</Form.Group>
						</Row>
					</Row>

					<Form.Group className="mb-3" controlId="formGridID">
						<Form.Label>Số CMND/CCCD:</Form.Label>
						<Form.Control placeholder="Nhập số CMND/CCCD" name="cccd" onChange={handleChange} />
					</Form.Group>
					{searchedPeople && renderSearchPeople(searchedPeople, handleChoosePerson)}
					{searchedPeopleError && renderErrorMessage(searchedPeopleError)}

					<Form.Group className="mb-3" controlId="formGridID">
						<Form.Label>Số điện thoại liên hệ</Form.Label>
						<Form.Control placeholder={form.phoneNumber ? form.phoneNumber : 'Nhập số điện thoại (nếu có)'} onChange={handleChange} />
					</Form.Group>

					<Form.Group className="mb-3" controlId="formGridPlace">
						<Form.Label>Quê quán</Form.Label>
						<Form.Control placeholder="Nhập quê quán" />
					</Form.Group>

					<Form.Group className="mb-3" controlId="formGridAddress">
						<Form.Label>Địa chỉ thường trú</Form.Label>
						<Form.Control placeholder={form.address ? form.address : 'Địa chỉ thường trú'} name="address" onChange={handleChange} />
					</Form.Group>

					<Form.Group className="mb-3" controlId="formGridAddress">
						<Form.Label>Nơi ở hiện tại</Form.Label>
						<Form.Control name="address" placeholder={form.address ? form.address : 'Nơi ở hiện tại'} />
					</Form.Group>

					<Row className="mb-3">
						<Form.Group as={Col} controlId="formGrid">
							<Form.Label>Tạm vắng từ ngày:</Form.Label>
							<Form.Control type="date" placeholder="Chọn ngày bắt đầu" name="startTime" onChange={handleChange} />
						</Form.Group>

						<Form.Group as={Col} controlId="formGrid">
							<Form.Label>đến ngày:</Form.Label>
							<Form.Control type="date" name="endTime" placeholder="Chọn ngày kết thúc" onChange={handleChange} />
						</Form.Group>
					</Row>
					<Form.Group className="mb-3" controlId="formGridAddress">
						<Form.Label>Lý do tạm vắng:</Form.Label>
						<Form.Control placeholder="Nhập nội dung lý do tạm vắng" onChange={handleChange} />
					</Form.Group>

					<Form.Group className="mb-3" controlId="formGridAddress">
						<Form.Label>Địa chỉ nơi đến:</Form.Label>
						<Form.Control placeholder="Nhập địa chỉ nơi đến" onChange={handleChange} />
					</Form.Group>

					<Button variant="primary" onClick={handleSubmit}>
						Gửi
					</Button>
				</Form>
			</div>
			<ToastContainer theme="colored" />
		</div>
	);
};

export default TamVangForm;
