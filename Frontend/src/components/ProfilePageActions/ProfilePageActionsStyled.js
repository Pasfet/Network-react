import { List, ListItem, ListItemButton } from '@mui/material';
import { styled } from '@mui/material/styles';

const maxHeightAvatar = '300px';

export const PageActions = styled(List)({});

export const ListItemPageActions = styled(ListItem)({});

export const PageActionsEdit = styled(ListItemButton)(({ theme }) => ({
  padding: '8px 40px !important',
  backgroundColor: `${theme.palette.primary.main} !important`,
  border: '1px solid transparent !important',
  color: '#fff !important',
  '&:hover': {
    backgroundColor: `${theme.palette.primary.contrastText} !important`,
    color: `${theme.palette.primary.main} !important`,
    border: `1px solid ${theme.palette.primary.main} !important`,
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
