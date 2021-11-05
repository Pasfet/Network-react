import { Grid, Table } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';

export const MyFriendsListWrapper = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const MyFriendsListBox = styled(Box)({});

export const MyFriendsListHeading = styled('h1')({
  marginBottom: '20px',
  fontSize: '1.5rem',
});

export const MyFriendsListHeadingName = styled('span')({
  textTransform: 'capitalize',
  marginLeft: '15px',
});

export const MyFriendsListTable = styled(Table)({
  minWidth: '300px',
});
