import { Alert, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const DialogButton = styled(Button)(({ theme }) => ({
  '&.MuiButton-root': {
    padding: '8px 15px',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '5px',
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.contrastText,
    },
  },
}));

export const UploadButton = styled(DialogButton)(({ theme }) => ({
  '&.MuiButton-root': {
    width: '100%',
    marginTop: '10px',
    backgroundColor: theme.palette.grey[600],
  },
}));

export const SendButton = styled(DialogButton)(({ theme }) => ({
  '&.MuiButton-root': {
    backgroundColor: theme.palette.success.main,
  },
}));

export const Input = styled('input')({
  display: 'none',
});

export const InfoFile = styled(Alert)({
  margin: '10px 0',
});
