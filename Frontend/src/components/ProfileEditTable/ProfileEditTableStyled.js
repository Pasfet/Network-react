import {
  Alert,
  Grid,
  List,
  ListItem,
  ListItemButton,
  TextField,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';

export const ErrorMessage = styled(Alert)({
  margin: '20px',
});

export const ProfileEditWrapper = styled(Grid)({
  minHeight: '90vh',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const ProfileEditHeading = styled('h1')({
  marginBottom: '20px',
});

export const ProfileEditBox = styled(Box)({});

export const ProfileEditList = styled(List)({});

export const ProfileEditItem = styled(ListItem)({
  '&.MuiListItem-root': {
    justifyContent: 'center',
  },
  '&.MuiListItem-root:last-child': {
    width: '50%',
    margin: '0 auto',
  },
});

export const ProfileEditText = styled(ListItemText)({
  marginRight: '20px',
});

export const ProfileEditInput = styled(TextField)({
  '& .MuiOutlinedInput-input': {
    padding: '5px 15px',
  },
});

export const ProfileEditSave = styled(ListItemButton)(({ theme }) => ({
  '&.MuiListItemButton-root': {
    backgroundColor: theme.palette.primary.main,
    transition: theme.transitions.easing.easeIn,
    color: '#fff',
    borderRadius: '5px',
    padding: '5px 15px',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
}));
