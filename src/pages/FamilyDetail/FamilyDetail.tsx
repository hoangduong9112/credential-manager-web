import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Container, Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import {
  BsFillHouseFill,
  BsFillPeopleFill,
  BsFillPersonFill,
  BsTelephoneFill,
} from 'react-icons/bs';
import { FaPencilAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import instance from '../../axiosInstance/axiosInstance';
import ModalAddPeople from '../../components/Modal/AddPeopleModal';
import ModalContent from '../../components/Modal/Modal';
import TitleCard from '../../components/Title/TitleCard';
import { renderErrorMessage } from '../../helpers';
import { setCurrentFamily } from '../../redux/family/FamilyAction';
import { RootState } from '../../redux/reduxStore';
import { IFormAddPeople } from '../../types/form';
import { PersonInfo, PersonStatus } from '../../types/person';
import { ModalListState } from '../../types/typeGlobal';
import './FamilyDetail.scss';
import PersonCardFamilyMember from '../../components/FamilyMemberCard/FamilyMemberCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setPageRendering } from '../../redux/pageRendering/PageRenderingAction';

interface formEditFamily {
  address: string;
  contact: string;
  nameOwner: string;
  ownerCccd: string;
  ownerId?: number;
  members: PersonInfo[];
}

export const renderSearchPeople = (
  listPeople: [],
  handleChoosePerson: (event: any, person: any) => void,
) => {
  return listPeople.map((person: any) => {
    return (
      <>
        <div
          onClick={(e) => handleChoosePerson(e, person)}
          className="alert alert-success"
          style={{ width: '100%', cursor: 'pointer' }}
          role="alert"
          id={person.id}
        >
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

  const currentFamily = useSelector(
    (state: RootState) => state.family.currentFamily,
  );
  const [listPeople, setListPeople] = useState<PersonInfo[]>([]);
  const [listTamTruPeople, setListTamTruPeople] = useState<PersonInfo[]>([]);
  const [searchedPeopleError, setSearchedPeopleError] = useState<string[]>();
  const [searchedPeople, setSearchedPeople] = useState<[]>();
  const [formEditFamily, setFormEditFamily] = useState<formEditFamily>({
    address: '',
    contact: '',
    nameOwner: '',
    ownerCccd: '',
    ownerId: 0,
    members: [],
  });

  const [formAddPeople, setFormAddPeople] = useState<IFormAddPeople>({
    image:
      'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
    phoneNumber: '',
    relationship: '',
    job: '',
    status: PersonStatus.LIVE,
    canCuocCongDan: undefined,
    firstName: '',
    lastName: '',
    address: '',
    dateOfBirth: '',
    gender: '',
    specialNotes: '',
    owner: '',
    idSHK: slug.id as string,
  });

  const handleChoosePerson = (event: any, people: any) => {
    const contact = people.phoneNumber;
    const nameOwner = `${people.firstName} ${people.lastName}`;
    if (contact !== formEditFamily.contact) {
      setFormEditFamily((formEditFamily) => ({
        ...formEditFamily,
        contact,
      }));
    }
    if (nameOwner !== formEditFamily.nameOwner) {
      setFormEditFamily((formEditFamily) => ({
        ...formEditFamily,
        nameOwner,
      }));
    }
    setFormEditFamily((formEditFamily) => ({
      ...formEditFamily,
      ownerId: event.target.id,
    }));
    setSearchedPeople([]);
  };

  const handleChangeEditFamily = debounce(async (event: any) => {
    if (event.target.name === 'relationship') {
      if (event.target.value === 'Chủ hộ') {
        console.log(event.target.id);
        setFormEditFamily((formEditFamily) => ({
          ...formEditFamily,
          ownerId: Number(event.target.id),
        }));
      }
      const newMembersWithRelationship = formEditFamily.members.map(
        (member) => {
          if (member.id === Number(event.target.id)) {
            return {
              ...member,
              relationship: event.target.value,
            };
          }
          return member;
        },
      );
      setFormEditFamily((formEditFamily) => ({
        ...formEditFamily,
        members: newMembersWithRelationship,
      }));
    }
    if (event.target.name === 'ownerCccd') {
      const ownerCccd = event.target.value;
      const res = await instance.get(
        `/congDan/search?cccd=${ownerCccd}&sortD=1&sortBy=firstName&page=1`,
      );
      console.log(res.data);
      if (res.data.status) {
        setSearchedPeople(res.data.response);
      } else {
        setSearchedPeopleError([res.data.response]);
      }
    }
    if (event.target.name === 'address') {
      setFormEditFamily({
        ...formEditFamily,
        [event.target.name]: event.target.value,
      });
    }
  }, 1000);
  const notifyUpdateFamilyInfo = () =>
    toast.success('Cập nhật thông tin hộ gia đình thành công', {
      autoClose: 2000,
      onClose: () => window.location.reload(),
    });
  const notifyAddPeople = () =>
    toast.success('Thêm thành viên thành công', {
      autoClose: 2000,
      onClose: () => window.location.reload(),
    });
  const submitEditFamily = async (event: any) => {
    event.preventDefault();
    console.log(formEditFamily);

    const res = await instance.put('/hoKhau', {
      ...formEditFamily,
      id: currentFamily.id,
    });

    console.log(res.data);
    if (res.data.status) {
      notifyUpdateFamilyInfo();
    }
  };
  const navigate = useNavigate();

  const handleClickPersonCard = (id: number) => {
    navigate(`/personDetail/${id}`);
  };

  const renderListPeople = (listPeople: PersonInfo[]) => {
    return listPeople.map((person) => {
      return (
        <PersonCardFamilyMember
          id={person.id}
          name={`${person.firstName} ${person.lastName}`}
          image={person.image}
          phoneNumber={person.phoneNumber}
          relationship={person.relationship}
          job={person.job}
          status={person.status}
          onClick={() => {
            handleClickPersonCard(person.id);
          }}
          handleChangeRelationship={handleChangeEditFamily}
        />
      );
    });
  };

  const [modalState, setModalState] = useState<ModalListState>(
    ModalListState.CLOSE,
  );

  const handleShowEditFamilyForm = () => {
    setModalState(ModalListState.EDIT_FAMILY_INFO);
  };

  const handleClose = () => {
    setModalState(ModalListState.CLOSE);
  };

  const fetchListFamilyMember = async () => {
    const res = await instance.get(`/hoKhau/${slug.id}`);
    const memberWithIdAndRelationship = res.data.response.members.map(
      (member: any) => {
        if (member.relationship === 'Chủ hộ') {
          setFormEditFamily((formEditFamily) => ({
            ...formEditFamily,
            ownerId: member.id,
          }));
        }
        return {
          id: member.id,
          relationship: member.relationship,
        };
      },
    );
    setListPeople(
      res.data.response.members.filter(
        (member: any) => member.status !== 'Tạm trú',
      ),
    );
    setListTamTruPeople(
      res.data.response.members.filter(
        (member: any) => member.status === 'Tạm trú',
      ),
    );
    setFormEditFamily((formEditFamily) => ({
      ...formEditFamily,
      members: memberWithIdAndRelationship,
      address: res.data.response.address,
    }));
    dispatch(setCurrentFamily(res.data.response));
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

  const [searchedOwner, setSearchedOwner] = useState<[]>();
  const [searchedOwnerError, setSearchedOwnerError] = useState<string[]>();

  const submitAddPeople = async (event: any) => {
    event.preventDefault();

    const res = await instance.post('/congDan', formAddPeople);

    if (res.data.status) {
      notifyAddPeople();
    }

    handleClose();
  };

  useEffect(() => {
    dispatch(setPageRendering(undefined));
    fetchListFamilyMember();
  }, []);

  return (
    <Container>
      <TitleCard title="Chi tiết hộ gia đình">
        <FaPencilAlt
          style={{ margin: '5vh 2vw', cursor: 'pointer' }}
          size={28}
          onClick={handleShowEditFamilyForm}
        />
        <Modal
          show={modalState === ModalListState.EDIT_FAMILY_INFO}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <ModalContent
            title="Chỉnh sửa thông tin hộ gia đình"
            handleClose={handleClose}
          >
            {searchedPeopleError && renderErrorMessage(searchedPeopleError)}
            <Form className="edit-family-form">
              <Form.Group className="mb-3">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                  onChange={handleChangeEditFamily}
                  name="address"
                  placeholder="Địa chỉ"
                />
              </Form.Group>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Tên chủ hộ mới</Form.Label>
                  <Form.Control
                    onChange={handleChangeEditFamily}
                    name="nameOwner"
                    placeholder={
                      formEditFamily.nameOwner
                        ? formEditFamily.nameOwner
                        : 'Tên'
                    }
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Căn cước công dân chủ hộ mới</Form.Label>
                  <Form.Control
                    onChange={handleChangeEditFamily}
                    name="ownerCccd"
                    placeholder={
                      formEditFamily.ownerCccd
                        ? formEditFamily.ownerCccd
                        : 'Căn cước công dân'
                    }
                  />
                </Form.Group>
              </Row>
              {searchedPeople &&
                renderSearchPeople(searchedPeople, handleChoosePerson)}

              <Form.Group className="mb-3">
                <Form.Label>Liên hệ (số điện thoại chủ hộ mới)</Form.Label>
                <Form.Control
                  placeholder={
                    formEditFamily.contact ? formEditFamily.contact : 'Liên hệ'
                  }
                  name="contact"
                  onChange={handleChangeEditFamily}
                />
              </Form.Group>
              <p style={{ fontStyle: 'italic', fontSize: 12 }}>
                *Nhập căn cước công dân để thực hiện tìm kiếm thông tin nhanh
                hơn
              </p>
              <p style={{ fontStyle: 'italic', fontSize: 12 }}>
                *Nếu thay đổi chủ hộ hãy sửa quan hệ của các thành viên khác
              </p>

              <div className="button-add">
                <Button
                  onClick={() => {
                    handleClose();
                  }}
                  style={{ width: '20%' }}
                  variant="primary"
                  type="button"
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
            <div className="card-content">
              Địa chỉ : {currentFamily.address}
            </div>
          </div>
          <div className="card-title">
            <BsFillPersonFill />
            <div className="card-content">
              Tên chủ hộ : {currentFamily.owner}
            </div>
          </div>
          <div className="card-title">
            <BsFillPeopleFill />
            <div className="card-content">
              Số lượng thành viên : {currentFamily.soTVien}
            </div>
          </div>
          <div className="card-title">
            <BsTelephoneFill />
            <div className="card-content">
              Liên hệ : {currentFamily.contact}
            </div>
          </div>
        </div>
      </div>
      <Button
        onClick={() => {
          navigate(`/history/${slug.id}`);
        }}
        className="btn-success"
      >
        {' '}
        Lịch sử chỉnh sửa sổ hộ khẩu{' '}
      </Button>
      <TitleCard title="Thành viên">
        <AiOutlinePlusCircle
          style={{ margin: '5vh 2vw', cursor: 'pointer' }}
          size={42}
          onClick={handleShowAddPersonForm}
        />
        <ModalAddPeople
          title="Thêm thành viên"
          searchedOwner={searchedOwner}
          searchedOwnerError={searchedOwnerError}
          formAddPeople={formAddPeople}
          showModal={modalState === ModalListState.ADD_PERSON}
          submitAddPeople={submitAddPeople}
          handleChangeAddPeople={handleChangeAddPeople}
          handleClose={handleClose}
        ></ModalAddPeople>
      </TitleCard>
      <div className="person-container">{renderListPeople(listPeople)}</div>
      {!!listTamTruPeople.length && (
        <>
          <TitleCard title="Thành viên tạm trú" />
          <div className="person-container">
            {renderListPeople(listTamTruPeople)}
          </div>
        </>
      )}

      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          height: '6vh',
        }}
      >
        <Button
          onClick={submitEditFamily}
          style={{ width: '15%' }}
          variant="primary"
          type="submit"
        >
          Lưu thông tin
        </Button>
      </div>
      <ToastContainer theme="colored" />
    </Container>
  );
};

export default FamilyDetail;
