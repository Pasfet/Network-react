import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Alert, Button, List } from '@mui/material';

import { styled } from '@mui/material/styles';

export const ButtonStyled = styled(Button)(() => ({
  padding: '8px 15px',
  borderRadius: '5px',
  color: '#fff',
}));

export const SignUpWrapper = styled('div')({
  height: '90vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '@media (max-width: 550px)': {
    padding: '15px',
  },
});

export const SignUpForm = styled(
  ValidatorForm,
  {},
)(() => ({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '400px',
  width: '100%',
}));

export const ErrorStyled = styled(Alert)({
  marging: '20px 0',
});

export const SignUpInput = styled(
  TextValidator,
  {},
)(() => ({
  width: '100%',
  margin: '20px 0',
}));

export const SignUpList = styled(List)({
  display: 'flex',
  alignItems: 'center',
});
