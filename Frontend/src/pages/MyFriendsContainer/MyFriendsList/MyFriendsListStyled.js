import { Avatar, Grid, IconButton, ListItemAvatar, Table, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

export const MyFriendsListWrapper = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const MyFriendsListBox = styled(Box)({});

export const MyFriendsListHeading = styled('h1')({
  marginBottom: '20px',
});

export const MyFriendsListHeadingName = styled('span')({
  textTransform: 'capitalize',
  marginLeft: '15px',
});

export const MyFriendsListTable = styled(Table)({
  minWidth: '300px',
});

export const MyFriendsListTableRow = styled(TableRow)({
  '& td:first-of-type': {
    width: '100px',
  },
});

export const MyFriendsListImgWrapper = styled(ListItemAvatar)({});

export const MyFriendsListAvatar = styled(Avatar)({
  width: '70px',
  height: '70px',
});

export const MyFriendsListName = styled(Link)({
  textTransform: 'capitalize',
  fontSize: '18px',
  color: '#000',
});

export const MyFriendsDeleteButton = styled(IconButton)({});

export const MyFriendsAgreeRequstionsButton = styled(IconButton)({});

export const MyFriendsRejectRequstionsButton = styled(IconButton)({});
