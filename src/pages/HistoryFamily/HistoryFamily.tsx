import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import instance from '../../axiosInstance/axiosInstance';
import CustomPagination from '../../components/Pagination/Pagination';
import TitleCard from '../../components/Title/TitleCard';
import { renderErrorMessage } from '../../helpers';
import { setPageRendering } from '../../redux/pageRendering/PageRenderingAction';
import { setTotal } from '../../redux/pagination/PaginationAction';
import { RootState } from '../../redux/reduxStore';
import { HistoryFamilyInfo } from '../../types/family';

const HistoryFamily = () => {
  const [historyFamily, setHistoryFamily] = useState();
  const [errHistory, setErrHistory] = useState<string[]>();
  const slug = useParams();
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(1);
  const total: number = useSelector(
    (state: RootState) => state.pagination.total,
  );
  const onChangePage = (page: number) => {
    setPage(page);
  };
  const renderHistoryFamily = (
    historyFamily: HistoryFamilyInfo[] | undefined,
  ) => {
    console.log(historyFamily);
    return historyFamily?.map((history, index) => {
      return (
        <tr>
          <td>{index + 1}</td>
          <td>{history.date}</td>
          <td>{history.status}</td>
          <td>{history.descriptions} </td>
        </tr>
      );
    });
  };

  const fetchHistoryFamily = async () => {
    console.log(slug);
    const res = await instance.get(
      `shkHistory/search?idHoKhau=${slug.idSHK}&pageSize=${10}&page=${page}`,
    );

    console.log(res.data);
    if (res.data.status) {
      setHistoryFamily(res.data.response);
      dispatch(setTotal(res.data.totalItems));
      console.log(historyFamily);
    } else {
      setErrHistory([res.data.response]);
    }
  };

  useEffect(() => {
    dispatch(setPageRendering(undefined));
    fetchHistoryFamily();
  }, [page]);
  return (
    <div>
      <Container>
        <TitleCard title="Lịch sử chỉnh sửa hộ khẩu"></TitleCard>

        {errHistory && renderErrorMessage(errHistory)}

        {!errHistory && (
          <Table responsive="lg" className="mt-2" bordered hover>
            <thead>
              <tr>
                <th>STT</th>
                <th>Ngày</th>
                <th>Trạng thái</th>
                <th>Nội dung</th>
              </tr>
            </thead>
            <tbody>{renderHistoryFamily(historyFamily)}</tbody>
          </Table>
        )}
        <div className="d-flex justify-content-center mt-2">
          <CustomPagination
            current={page}
            pageSize={10}
            total={total}
            onChangePage={onChangePage}
          ></CustomPagination>
        </div>
      </Container>
    </div>
  );
};

export default HistoryFamily;
