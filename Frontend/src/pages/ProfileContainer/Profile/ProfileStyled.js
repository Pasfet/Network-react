import { Alert, Box, Grid, TextField } from '@mui/material';

import { styled } from '@mui/material/styles';

export const ErrorMessage = styled(Alert)({
  marginBottom: '20px',
});

export const ProfileWrapper = styled(Grid)({
  minHeight: '90vh',
  padding: '15px',
});

export const ProfileBar = styled(Grid)({});

export const ProfileMainContainer = styled(Grid)({});

export const BoxStyled = styled(Box)({
  boxShadow: '0 0 4px 0px #cbcbcb',
  padding: '10px',
  borderRadius: '10px',
  marginBottom: '10px',
});

export const ProfileUserName = styled('h1')({
  fontSize: '18px',
  fontWeight: '600',
  textTransform: 'capitalize',
  marginBottom: '10px',
});

export const ProfileUserStatus = styled('span')({
  display: 'inline-block',
  color: '#000',
  opacity: 0.7,
  marginBottom: '10px',
  width: '100%',
  padding: '5px 0',
  '&:hover': {
    backgroundColor: '#e2e2e2',
    cursor: 'pointer',
  },
});

export const ProfileInputStatus = styled(TextField)({
  width: '50%',
  display: 'flex',
  '& .MuiOutlinedInput-input': {
    padding: '5px 10px ',
    fontSize: '14px',
  },
});
