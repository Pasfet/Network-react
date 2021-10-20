import { Avatar, List, ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export const FriendBlockHeading = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const FreindsBlockTitle = styled('h3')({
  fontSize: '14px',
});

export const CountFirends = styled('span')({
  marginLeft: '10px',
  fontSize: '12px',
  color: '#000',
  opacity: 0.7,
});

export const FriendsBlockLink = styled(Link)({
  color: '#000',
  '&:hover': {
    opacity: 0.7,
  },
});

export const FriendBlockList = styled(List)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 50px)',
  gap: '10px',
  justifyContent: 'space-around',
});

export const FriendsBlockItem = styled(ListItem)({
  display: 'flex',
  flexDirection: 'column',
});

export const FriendsBlockUserAvatar = styled(Avatar)({
  width: '50px',
  height: '50px',
});

export const FriendsBlockUserName = styled(Link)({
  color: '#000',
  marginTop: '5px',
});
