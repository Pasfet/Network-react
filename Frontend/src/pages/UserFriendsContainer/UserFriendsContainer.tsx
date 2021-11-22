import { useEffect, useCallback, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../../actions/errorActions';
import { sendRequestToFriendList } from '../../actions/profileActions';
import { getMyUid, getUserProfile } from '../../store/profileReducer/profileSelectors';
import UserFriendsList from './UserFriendsList/UserFriendsList';

const UserFriendsContainer: FC = () => {
  const user = useSelector(getUserProfile);
  const dispatch = useDispatch();
  const myUid = useSelector(getMyUid);

  const addToFriendsList = useCallback(
    (uid: string) => {
      dispatch(sendRequestToFriendList(myUid, uid));
    },
    [dispatch, myUid],
  );

  useEffect((): () => void => {
    return () => dispatch(clearError());
  }, [dispatch]);

  return <UserFriendsList user={user} addToFriendsList={addToFriendsList} />;
};

export default UserFriendsContainer;
