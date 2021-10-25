import { TableContainer, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ProfileAboutContainer = styled(TableContainer)({
  marginTop: '10px',
});

export const ProfileAboutRow = styled(TableRow)({
  '& td:first-of-type': {
    width: '300px',
  },
});
