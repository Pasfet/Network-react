import { Grid, Table } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';

export const UserFriendsListWrapper = styled(Grid)({
  minHeight: '80vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const UserFriendsListBox = styled(Box)({});

export const UserFriendsListHeading = styled('h1')({
  marginBottom: '20px',
  '@media (max-width: 580px)': {
    fontSize: '22px',
  },
  '@media (max-width: 480px)': {
    fontSize: '18px',
  },
  '@media (max-width: 370px)': {
    fontSize: '16px',
  },
});

export const UserFriendsListHeadingName = styled('span')({
  textTransform: 'capitalize',
  marginLeft: '15px',
});

export const UserFriendsListTable = styled(Table)({
  minWidth: '300px',
});
