import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../../assets/img/face-3.jpg';
import instance from '../../axiosInstance/axiosInstance';
import { setPageRendering } from '../../redux/pageRendering/PageRenderingAction';
import './PersonDetail.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../../helpers';

const PersonDetail = () => {
  const [formEditPerson, setFormEditPerson] = useState({
    id: 0,
    image:
      'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
    phoneNumber: '',
    job: '',
    relationship: '',
    status: '',
    canCuocCongDan: '',
    address: '',
    dateOfBirth: '',
    firstName: '',
    gender: '',
    lastName: '',
    idSHKSoHuu: '',
    specialNotes: 'Không',
    departmentTime: '',
  });
  const slug = useParams();

  const submitUpdatePersonInfo = async () => {
    const res = await instance.put('/congDan', formEditPerson);

    if (res.data.status) {
      notify('Cập nhật thông tin công dân thành công', () =>
        window.location.reload(),
      );

      // alert('Cập nhật thông tin thành công');
    }
  };

  const handleChangeEditPersonInfo = (event: any) => {
    setFormEditPerson({
      ...formEditPerson,
      [event.target.name]: event.target.value,
    });
  };

  const fetchPersonInfo = async () => {
    const res = await instance.get(`congDan/${slug.id}`);
    console.log(res.data);
    if (res.status) {
      setFormEditPerson(res.data.response);
      console.log(formEditPerson);
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageRendering(undefined));
    fetchPersonInfo();
  }, []);
  return (
    <>
      <Container>
        <Row className="mb-3">
          <Col md="8" className="form-edit">
            <Card className="card-form-edit md-8">
              <Card.Header>
                <Card.Title className="title" as="h4">
                  Chỉnh sửa thông tin
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group className="mb-3">
                        <label className="mb-2">Họ</label>
                        <Form.Control
                          onChange={handleChangeEditPersonInfo}
                          placeholder={
                            formEditPerson?.firstName
                              ? formEditPerson.firstName
                              : 'Họ'
                          }
                          type="text"
                          name="firstName"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="5">
                      <Form.Group className="mb-3">
                        <label className="mb-2">Tên</label>
                        <Form.Control
                          onChange={handleChangeEditPersonInfo}
                          placeholder={
                            formEditPerson?.lastName
                              ? formEditPerson.lastName
                              : 'Tên'
                          }
                          type="text"
                          name="lastName"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="3">
                      <Form.Group className="mb-3">
                        <label className="mb-2">Giới tính</label>
                        <Form.Control
                          onChange={handleChangeEditPersonInfo}
                          placeholder={
                            formEditPerson?.gender
                              ? formEditPerson.gender
                              : 'Giới tính'
                          }
                          type="text"
                          list="genders"
                          name="gender"
                        ></Form.Control>
                        <datalist id="genders">
                          <option value="Nam" />
                          <option value="Nữ" />
                          <option value="Khác" />
                        </datalist>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group className="mb-3">
                        <label className="mb-2">Căn cước công dân</label>
                        <Form.Control
                          readOnly
                          placeholder={
                            formEditPerson?.canCuocCongDan
                              ? formEditPerson.canCuocCongDan
                              : 'Căn cước công dân'
                          }
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group className="mb-3">
                        <label className="mb-2">Số điện thoại</label>
                        <Form.Control
                          onChange={handleChangeEditPersonInfo}
                          placeholder={
                            formEditPerson?.phoneNumber
                              ? formEditPerson.phoneNumber
                              : 'Số điện thoại'
                          }
                          type="text"
                          name="phoneNumber"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group className="mb-3">
                        <label className="mb-2">Địa chỉ</label>
                        <Form.Control
                          readOnly
                          placeholder={
                            formEditPerson?.address
                              ? formEditPerson.address
                              : 'Địa chỉ'
                          }
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group className="mb-3">
                        <label className="mb-2">Số sổ hộ khẩu</label>
                        <Form.Control
                          readOnly
                          placeholder={
                            formEditPerson?.idSHKSoHuu
                              ? formEditPerson.idSHKSoHuu
                              : 'Số sổ hộ khẩu'
                          }
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group className="mb-3">
                        <label className="mb-2">Nghề nghiệp</label>
                        <Form.Control
                          onChange={handleChangeEditPersonInfo}
                          placeholder={
                            formEditPerson?.job
                              ? formEditPerson.job
                              : 'Nghề nghiệp'
                          }
                          type="text"
                          name="job"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group className="mb-3">
                        <label className="mb-2">Quan hệ với chủ hộ</label>
                        <Form.Control
                          readOnly
                          placeholder={
                            formEditPerson?.relationship
                              ? formEditPerson.relationship
                              : 'Quan hệ với chủ hộ'
                          }
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group className="mb-3">
                        <label className="mb-2">Tình trạng</label>
                        <Form.Control
                          readOnly
                          onChange={handleChangeEditPersonInfo}
                          placeholder={
                            formEditPerson?.status
                              ? formEditPerson.status
                              : 'Tình trạng'
                          }
                          type="text"
                          list="status"
                          name="status"
                          disabled={formEditPerson.relationship === 'Chủ hộ'}
                        ></Form.Control>
                        <datalist id="status">
                          <option value="Đang cư trú" />
                          <option value="Đã chuyển đi" />
                          <option value="Qua đời" />
                        </datalist>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group className="mb-3">
                        <label className="mb-2">
                          Thời gian chuyển đi/qua đời
                        </label>
                        <Form.Control
                          readOnly
                          onChange={handleChangeEditPersonInfo}
                          value={
                            formEditPerson?.departmentTime
                              ? formEditPerson.departmentTime
                              : 'Thời gian chuyển đi/qua đời'
                          }
                          type="date"
                          name="departmentTime"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button
                    className="btn-fill pull-right mt-2"
                    type="button"
                    variant="info"
                    onClick={submitUpdatePersonInfo}
                  >
                    Cập nhật thông tin
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
                  <img
                    alt="..."
                    className="avatar border-gray"
                    src={formEditPerson?.image}
                  ></img>
                  <h5 className="title mt-2">
                    {formEditPerson?.firstName} {formEditPerson?.lastName}
                  </h5>
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
