import { Avatar, List, ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export const FriendBlockHeading = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const FriendsBlockTitle = styled('h3')({
  fontSize: '14px',
});

export const CountFriends = styled('span')({
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

export const FriendsBlockList = styled(List)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 50px)',
  gap: '10px',
  justifyContent: 'space-around',
  position: 'relative',
});

export const FriendsBlockItem = styled(ListItem)({
  display: 'flex',
  flexDirection: 'column',
});

export const FriendsBlockUserAvatar = styled(Avatar)({
  width: '70px',
  height: '70px',
});

export const FriendsBlockUserName = styled(Link)({
  color: '#000',
  marginTop: '5px',
  textTransform: 'capitalize',
  fontSize: '1rem',
  textAlign: 'center',
  '&:hover': {
    opacity: '.8',
  },
  '@media(max-width: 400px)': {
    fontSize: '0.8rem',
  },
});

export const FriendsBlockMockFriends = styled('p')({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
});
