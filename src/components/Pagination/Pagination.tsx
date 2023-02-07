import React, { useMemo } from 'react';
import { Pagination } from 'react-bootstrap';

interface IPaginationProps {
  current: number;
  total: number;
  pageSize: number;
  onChangePage: (page: number) => void;
}

function CustomPagination(props: IPaginationProps) {
  const { total, pageSize, current, onChangePage } = props;
  const maxPage = useMemo(() => {
    return Math.ceil(total / pageSize);
  }, [total, pageSize]);

  const onClickPage = (page: number) => {
    if (page === current) return;
    onChangePage(page);
  };
  const renderItem = () => {
    let items = [];
    for (let number = 1; number <= maxPage; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === current}
          onClick={(event) => onClickPage(number)}
        >
          {number}
        </Pagination.Item>,
      );
    }
    return items;
  };
  return <Pagination>{renderItem()}</Pagination>;
}

export default CustomPagination;
