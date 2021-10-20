import { List, ListItem, ListItemButton } from '@mui/material';
import { styled } from '@mui/material/styles';

const maxHeightAvatar = '300px';

export const PageActions = styled(List)({});

export const ListItemPageActions = styled(ListItem)({});

export const PageActionsEdit = styled(ListItemButton)(({ theme }) => ({
  '&.MuiListItemButton-root': {
    padding: '8px 40px',
    backgroundColor: `${theme.palette.primary.main}`,
    border: '1px solid transparent',
    color: '#fff',
    transition: theme.transitions.create(['backgroundColor', 'color', 'border'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
    '&:hover': {
      backgroundColor: `${theme.palette.primary.contrastText}`,
      color: `${theme.palette.primary.main}`,
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
}));

export const PageActionsButton = styled(
  ListItemButton,
  {},
)(({ theme, addbutton, deletebutton }) => ({
  '&.MuiListItemButton-root': {
    padding: '8px 20px',
    border: '1px solid transparent',
    color: '#fff',
    transition: theme.transitions.create(['backgroundColor', 'color', 'border'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(deletebutton === 'true' && {
      backgroundColor: `${theme.palette.grey[400]}`,
      '&:hover': {
        backgroundColor: `${theme.palette.grey[500]}`,
        color: `${theme.palette.primary.contrastText}`,
        border: `1px solid ${theme.palette.grey[400]}`,
      },
    }),
    ...(addbutton === 'true' && {
      backgroundColor: `${theme.palette.primary.main}`,
      '&:hover': {
        backgroundColor: `${theme.palette.primary.contrastText}`,
        color: `${theme.palette.primary.main}`,
        border: `1px solid ${theme.palette.primary.main}`,
      },
    }),
  },
}));

export const AvatarImageWrapper = styled(ListItem)({
  width: '100%',
  maxHeight: maxHeightAvatar,
  height: '100%',
});

export const AvatarImage = styled('img')({
  width: 'inherit',
  height: 'inherit',
});
