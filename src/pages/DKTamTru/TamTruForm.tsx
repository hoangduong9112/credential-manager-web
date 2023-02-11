import React, {useEffect, useState} from 'react';
import {Row, Form, Button, Col} from 'react-bootstrap';
import moment from 'moment';
import './TamTruForm.scss';
import instance from '../../axiosInstance/axiosInstance';
import {debounce} from 'lodash';
import {renderSearchFamily} from '../../components/Form/FormUpdateDetailEvent';
import {renderErrorMessage} from '../../helpers';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setPageRendering} from '../../redux/pageRendering/PageRenderingAction';

const TamTruForm = () => {
	const [familySearched, setFamilySearched] = useState<[]>();
	const [errSearched, setErrSearched] = useState<string[]>([]);
	const [form, setForm] = useState({
		phoneNumber: '',
		firstName: '',
		lastName: '',
		address: '',
		dateOfBirth: '',
		gender: '',
		job: '',
		canCuocCongDan: '',

		status: 'Tạm trú',
		relationship: '',
		idSHK: '',
		addressTamTru: '',
		image: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
		nameOwner: '',
	});
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setPageRendering(undefined));
	}, []);

	const handleChooseFamily = (event: any, family: any) => {
		setForm({
			...form,
			idSHK: family.id,
			nameOwner: family.owner,
			addressTamTru: family.address,
		});
		setFamilySearched([]);
	};
	const notify = () =>
		toast.success('Đăng ký tạm trú thành công', {
			autoClose: 3000,
			onClose: () => navigate(`/familyDetail/${form.idSHK}`),
		});

	const handleSubmit = async () => {
		const res = await instance.post('/congDan', form);

		console.log(res.data);
		if (res.data.status) {
			notify();
		}
	};

	const handleChange = debounce(async (event: any) => {
		if (event.target.name === 'ownerCccd') {
			const res = await instance.get(`/hoKhau/search?cccd=${event.target.value}`);
			if (res.data.status) {
				setFamilySearched(res.data.response);
				setErrSearched([]);
			} else {
				setErrSearched([res.data.response]);
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
				<h3>Thông tin đăng ký tạm trú</h3>
			</div>
			<div className="content">
				<Form className="mb-3">
					<Row className="mb-3">
						<Form.Group as={Col} controlId="formGridName">
							<Form.Label>Họ</Form.Label>
							<Form.Control type="text" name="firstName" placeholder="Nhập họ" onChange={handleChange} />
						</Form.Group>
						<Form.Group as={Col} controlId="formGridName">
							<Form.Label>Tên</Form.Label>
							<Form.Control type="text" name="lastName" placeholder="Nhập tên" onChange={handleChange} />
						</Form.Group>

						<Form.Group as={Col} controlId="formGrid">
							<Form.Label>Ngày sinh</Form.Label>
							<Form.Control type="date" placeholder="Chọn ngày sinh" name="dateOfBirth" max={moment(new Date()).format('YYYY-MM-DD')} onChange={handleChange} />
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
						<Form.Control name="canCuocCongDan" placeholder="Nhập số CMND/CCCD" onChange={handleChange} />
					</Form.Group>

					<Form.Group className="mb-3" controlId="formGridID">
						<Form.Label>Số điện thoại liên hệ</Form.Label>
						<Form.Control name="phoneNumber" placeholder="Nhập số điện thoại (nếu có)" onChange={handleChange} />
					</Form.Group>

					<Row className="mb-3">
						<Form.Group as={Col} controlId="formGridPlace">
							<Form.Label>Tôn giáo:</Form.Label>
							<Form.Control placeholder="Nhập tôn giáo" onChange={handleChange} />
						</Form.Group>

						<Form.Group as={Col} controlId="formGridAddress">
							<Form.Label>Nghề nghiệp:</Form.Label>
							<Form.Control name="job" placeholder="Nhập nghề nghiệp" onChange={handleChange} />
						</Form.Group>
					</Row>

					<Form.Group className="mb-3" controlId="formGridPlace">
						<Form.Label>Quê quán</Form.Label>
						<Form.Control placeholder="Nhập quê quán" onChange={handleChange} />
					</Form.Group>

					<Form.Group className="mb-3" controlId="formGridAddress">
						<Form.Label>Địa chỉ thường trú</Form.Label>
						<Form.Control placeholder="Nhập địa chỉ thường trú" onChange={handleChange} />
					</Form.Group>

					<Form.Group className="mb-3" controlId="formGridAddress">
						<Form.Label>Địa chỉ tạm trú</Form.Label>
						<Form.Control readOnly placeholder={form.addressTamTru ? form.addressTamTru : 'Nhập địa chỉ tạm trú'} onChange={handleChange} />
					</Form.Group>

					<Row className="mb-3">
						<Form.Group as={Col} controlId="formGridAddress">
							<Form.Label>Họ và tên chủ hộ</Form.Label>
							<Form.Control placeholder={form.nameOwner ? form.nameOwner : 'Nhập họ và tên chủ hộ'} onChange={handleChange} />
						</Form.Group>

						<Form.Group as={Col} controlId="formGridAddress">
							<Form.Label>Quan hệ với chủ hộ</Form.Label>
							<Form.Control placeholder="Nhập quan hệ với chủ hộ" name="relationship" onChange={handleChange} />
						</Form.Group>

						<Form.Group as={Col} controlId="formGridAddress">
							<Form.Label>Số CMND của chủ hộ</Form.Label>
							<Form.Control placeholder="Nhập số cmnd của chủ hộ" name="ownerCccd" onChange={handleChange} />
							<p
								style={{
									fontStyle: 'italic',
									fontSize: 12,
								}}
							>
								*Nhập CCCD để thực hiện tìm kiếm thông tin nhanh hơn
							</p>
						</Form.Group>
					</Row>
					{!!familySearched && renderSearchFamily(familySearched, handleChooseFamily)}
					{!!errSearched && renderErrorMessage(errSearched)}
					<Form.Group className="mb-3" controlId="formGridAddress">
						<Form.Label>Nội dung đề nghị đăng ký tạm trú</Form.Label>
						<Form.Control as="textarea" placeholder="Nhập nội dung đề nghị" onChange={handleChange} />
					</Form.Group>

					<Button variant="primary" onClick={handleSubmit}>
						Gửi
					</Button>
				</Form>
				<ToastContainer theme="colored" />
			</div>
		</div>
	);
};

export default TamTruForm;
