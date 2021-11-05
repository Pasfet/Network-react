import { Alert, Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const PostsForm = styled('form')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '30px',
});

export const PostsInput = styled(TextField)({
  maxWidth: '700px',
  width: '100%',
  borderRadius: '15px',
  marginRight: '15px',
});

export const FormButton = styled(Button)(({ theme }) => ({
  '&.MuiButton-root': {
    padding: '10px 20px',
    fontSize: '1.1rem',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: theme.palette.primary.contrastText,
      color: theme.palette.primary.main,
    },
    '@media(max-width: 850px)': {
      fontSize: '0.9rem',
    },
  },
}));

export const ErrorMessage = styled(Alert)({
  margin: '20px 0',
});
