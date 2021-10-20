import { useSelector } from 'react-redux';
import { getUserProfile } from '../../store/profileReducer/profileSelector';
import UserFriendsList from './UserFriendsList/UserFriendsList';

const UserFriendsContainer = () => {
  const user = useSelector(getUserProfile);
  return <UserFriendsList user={user} />;
};

export default UserFriendsContainer;
