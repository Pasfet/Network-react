import Pagination from '@mui/material/Pagination';
import { memo, FC } from 'react';
import { IPaginationProps } from '../../types/components';

const PaginationComponent: FC<IPaginationProps> = ({ length, lastPage, changePageHandler, currentPage }) => {
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

export default memo(PaginationComponent);
