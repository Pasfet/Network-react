import Pagination from '@mui/material/Pagination';
import PropTypes from 'prop-types';
import { memo } from 'react';

const PaginationComponent = ({ length, lastPage, changePageHandler, currentPage }) => {
  return (
    <>
      <div>Выведено на странице: {length}</div>
      <Pagination
        page={currentPage}
        count={lastPage ? lastPage : 1}
        color="primary"
        variant="outlined"
        onChange={(e, page) => changePageHandler(page)}
        sx={{ marginBottom: '20px' }}
      />
    </>
  );
};

PaginationComponent.propTypes = {
  countAnime: PropTypes.number,
  lastPage: PropTypes.number,
  changePageHandler: PropTypes.func.isRequired,
  currentPage: PropTypes.number,
};

export default memo(PaginationComponent);
