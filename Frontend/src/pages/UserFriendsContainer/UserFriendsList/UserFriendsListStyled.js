import { Avatar, Grid, ListItemAvatar, Table, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

export const UserFriendsListWrapper = styled(Grid)({
  minHeight: '80vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const UserFriendsListBox = styled(Box)({});

export const UserFriendsListHeading = styled('h1')({
  marginBottom: '20px',
});

export const UserFriendsListHeadingName = styled('span')({
  textTransform: 'capitalize',
  marginLeft: '15px',
});

export const UserFriendsListTable = styled(Table)({
  minWidth: '300px',
});

export const UserFriendsListTableRow = styled(TableRow)({
  '& td:first-of-type': {
    width: '100px',
  },
});

export const UserFriendsListImgWrapper = styled(ListItemAvatar)({});

export const UserFriendsListAvatar = styled(Avatar)({
  width: '70px',
  height: '70px',
});

export const UserFriendsListName = styled(Link)({
  textTransform: 'capitalize',
  fontSize: '18px',
  color: '#000',
});
