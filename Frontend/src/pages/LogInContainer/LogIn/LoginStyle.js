import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Alert, Button, List, ListItem } from '@mui/material';

import { styled } from '@mui/material/styles';

export const ButtonStyled = styled(Button)({
  padding: '8px 15px !important',
  borderRadius: '5px !important',
  color: '#000 !important',
  '&:hover': {
    color: '#fff !important',
  },
});

export const ListStyled = styled(List)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const ListItemStyled = styled(ListItem)({
  justifyContent: 'space-around !important',
});

export const LoginWrapper = styled('div')({
  height: '90vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '@media(max-width: 550px)': {
    padding: '15px',
  },
});

export const ValidatorFormStyled = styled(
  ValidatorForm,
  {},
)(() => ({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '400px',
  width: '100%',
}));

export const ErrorStyled = styled(Alert)({
  margin: '20px 0',
});

export const LoginInputStyled = styled(
  TextValidator,
  {},
)(() => ({
  width: '100%',
  margin: '20px 0',
}));
