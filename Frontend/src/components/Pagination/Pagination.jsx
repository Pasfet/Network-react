import Pagination from '@mui/material/Pagination';
import PropsTypes from 'prop-types';
import { memo } from 'react';

const PaginationComp = ({ countAnime, lastPage, changePageHandler, currentPage }) => {
  return (
    <>
      <div>Всего: {countAnime}</div>
      <Pagination
        page={currentPage}
        count={lastPage}
        color="secondary"
        variant="outlined"
        onChange={(e, page) => changePageHandler(page)}
      />
    </>
  );
};

Pagination.propsTypes = {
  countAnime: PropsTypes.number,
  lastPage: PropsTypes.number,
  changePageHandler: PropsTypes.func.isRequired,
  currentPage: PropsTypes.number,
};

export default memo(PaginationComp);
