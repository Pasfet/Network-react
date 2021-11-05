import { TableCell, TableContainer, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ProfileAboutContainer = styled(TableContainer)({
  marginTop: '10px',
});

export const TableRowTitle = styled(TableCell)({
  fontSize: '1.1rem',
  '@media(max-width: 650px)': {
    fontSize: '0.9rem',
  },
});

export const ProfileAboutRow = styled(TableRow)({
  '& td:first-of-type': {
    width: '300px',
    '@media(max-width: 600px)': {
      width: '150px',
    },
  },
});
