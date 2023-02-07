import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Modal } from 'react-bootstrap';
import FamilyCard from '../../components/FamilyCard/FamilyCard';
import './ListFamily.scss';
import TitleCard from '../../components/Title/TitleCard';
import { FamilyInfo } from '../../types/family';
import { useDispatch, useSelector } from 'react-redux';
import { setPageRendering } from '../../redux/pageRendering/PageRenderingAction';
import { PageRender } from '../../types/page';
import { useNavigate } from 'react-router-dom';
import {
  setCurrentFamily,
  setCurrentListFamily,
} from '../../redux/family/FamilyAction';
import ModalContent from '../../components/Modal/Modal';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { ModalListState } from '../../types/typeGlobal';
import instance from '../../axiosInstance/axiosInstance';
//import { debounce } from 'lodash';
import { PersonInfo } from '../../types/person';
import { RootState } from '../../redux/reduxStore';
import { notify, renderErrorMessage } from '../../helpers';
import CustomPagination from '../../components/Pagination/Pagination';
import { setCurrentErrorSearch } from '../../redux/errorSearch/ErrorSearchAction';
import { debounce } from 'lodash';
import { setTotal } from '../../redux/pagination/PaginationAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListFamily = () => {
  const listFamily: FamilyInfo[] = useSelector(
    (state: RootState) => state.family.currentListFamily,
  );
  const errSearch: string[] = useSelector(
    (state: RootState) => state.errorSearch.currentErrorSearch,
  );
  const [err, setErr] = useState<string[]>([]);
  const [ownerSearched, setOwnerSearched] = useState<PersonInfo | null>();
  const [modalState, setModalState] = useState<ModalListState>(
    ModalListState.CLOSE,
  );
  const [formAddFamily, setFormAddFamily] = useState({
    address: '',
    ownerId: '',
  });
  const [page, setPage] = useState<number>(1);
  const total: number = useSelector(
    (state: RootState) => state.pagination.total,
  );
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
    if (event.target.name === 'address') {
      setFormAddFamily({
        ...formAddFamily,
        [event.target.name]: event.target.value,
      });
    }
    if (event.target.name === 'ownerPersonalId') {
      const cccd = event.target.value;
      handleGetOwnerByCCCD(cccd);
    }

    console.log(formAddFamily);
  }, 500);

  const handleClickFamilyCard = (familyId: string) => {
    dispatch(setCurrentFamily(findFamily(listFamily, familyId)));

    navigate(`/familyDetail/${familyId}`);
  };

  const submitAddFamily = async (event: any) => {
    event.preventDefault();

    try {
      const res = await instance.post('/hoKhau', formAddFamily);

      if (!res.data.status) {
        setErr([...err, res.data.response]);
      } else {
        handleClose();
        notify('Thêm hộ gia đình thành công', () => window.location.reload());
      }
    } catch (err) {
      alert(err);
    }
  };

  const renderListFamily = (listFamily: FamilyInfo[]) => {
    return listFamily.map((family) => {
      return (
        <FamilyCard
          id={family.id}
          address={family.address}
          soTVien={family.soTVien}
          contact={family.contact}
          owner={family.owner}
          onClick={() => handleClickFamilyCard(family.id)}
        />
      );
    });
  };

  const handleGetOwnerByCCCD = async (ownerCCCD: string) => {
    try {
      const res = await instance.get(
        `/congDan/search?cccd=${ownerCCCD}&sortD=1&sortBy=firstName&page=1`,
      );
      setOwnerSearched(res.data.response[0]);
      setFormAddFamily({
        ...formAddFamily,
        ownerId: res.data.response[0].id,
      });
      console.log(res.data.response[0].id);
    } catch (err) {
      setOwnerSearched(null);
      console.log(err);
    }
  };

  const fetchFamily = async () => {
    try {
      const res = await instance.get(`/hoKhau?page=${page}&pageSize=6`);
      if (res.data.status) {
        dispatch(setCurrentListFamily(res.data.response));
        dispatch(setTotal(res.data.totalItems));
      } else {
        dispatch(setCurrentErrorSearch([res.data.response]));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    //call api here to get list family
    dispatch(setPageRendering(PageRender.LIST_FAMILY));

    fetchFamily();
  }, [page]);

  return (
    <>
      <Container>
        <TitleCard title="Danh sách các hộ gia đình">
          <AiOutlinePlusCircle
            style={{ margin: '5vh 2vw', cursor: 'pointer' }}
            size={42}
            onClick={handleShowAddFamilyForm}
          />
          <Modal
            show={modalState === ModalListState.ADD_FAMILY}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <ModalContent title="Thêm hộ gia đình" handleClose={handleClose}>
              <Form className="add-member-form" onSubmit={submitAddFamily}>
                {!!err.length && renderErrorMessage(err)}
                <Form.Group className="mb-3">
                  <Form.Label>Địa chỉ</Form.Label>
                  <Form.Control
                    placeholder="Địa chỉ"
                    onChange={handleChangeAddFamily}
                    name="address"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Tên chủ hộ</Form.Label>
                  <Form.Control
                    placeholder={
                      !!ownerSearched
                        ? `${ownerSearched?.firstName} ${ownerSearched?.lastName} `
                        : 'Tên chủ hộ'
                    }
                    name="nameOwner"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Số căn cước công dân chủ hộ</Form.Label>
                  <Form.Control
                    placeholder="Số căn cước công dân chủ hộ"
                    onChange={handleChangeAddFamily}
                    name="ownerPersonalId"
                  />
                </Form.Group>
                <p style={{ fontStyle: 'italic', fontSize: 12 }}>
                  *Nhập căn cước công dân để thực hiện tìm kiếm thông tin nhanh
                  hơn
                </p>

                <div className="button-add">
                  <Button
                    style={{ width: '20%' }}
                    variant="primary"
                    type="submit"
                  >
                    Thêm
                  </Button>
                </div>
              </Form>
            </ModalContent>
          </Modal>
        </TitleCard>
        <div className="list-family-container">
          {!errSearch.length && renderListFamily(listFamily)}
          {!!errSearch.length && renderErrorMessage(errSearch)}
        </div>
        <div className="d-flex justify-content-center mt-2">
          {!errSearch.length && (
            <CustomPagination
              current={page}
              pageSize={6}
              total={total}
              onChangePage={onChangePage}
            ></CustomPagination>
          )}
        </div>
      </Container>
      <ToastContainer theme="colored" />
    </>
  );
};

export default ListFamily;
