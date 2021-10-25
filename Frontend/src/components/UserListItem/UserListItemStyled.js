import { Avatar, ListItemAvatar, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export const UserListItemRow = styled(TableRow)({
  '& td:first-of-type': {
    width: '100px',
  },
});

export const UserListItemImgWrapper = styled(ListItemAvatar)({});

export const UserListItemAvatar = styled(Avatar)({
  width: '70px',
  height: '70px',
});

export const UserListItemName = styled(Link)({
  textTransform: 'capitalize',
  fontSize: '18px',
  color: '#000',
});
