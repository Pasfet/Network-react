import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../../actions/errorActions';
import {
  addToFriendsList,
  deleteFriendFromFriendsList,
  getMyFriendsList,
  rejectFriendRequest,
} from '../../actions/profileActions';
import { getError } from '../../store/errorReducer/errorSelector';
import { getMyFriends, getMyUid } from '../../store/profileReducer/profileSelector';
import MyFriendsList from './MyFriendsList/MyFriendsList';

const MyFriendsContainer = () => {
  const dispatch = useDispatch();

  const myUid = useSelector(getMyUid);
  const myFriends = useSelector(getMyFriends);
  const error = useSelector(getError);

  const [tabsValue, setTabsValue] = useState('1');

  const handleChange = (event, newValue) => {
    setTabsValue(newValue);
  };

  const confirmRequestToFriendsList = useCallback(recipientUid => {
    dispatch(addToFriendsList(myUid, recipientUid));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rejectFriendRequestHandler = useCallback(recipientUid => {
    dispatch(rejectFriendRequest(myUid, recipientUid));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteFriend = useCallback(recipientUid => {
    dispatch(deleteFriendFromFriendsList(myUid, recipientUid));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getMyFriendsList(myUid));

    return () => dispatch(clearError());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MyFriendsList
      myFriends={myFriends && myFriends}
      tabsValue={tabsValue}
      setTabsValue={handleChange}
      confirmRequestToFriendsList={confirmRequestToFriendsList}
      rejectFriendRequestHandler={rejectFriendRequestHandler}
      deleteFriend={deleteFriend}
      error={error && error.message}
    />
  );
};

export default MyFriendsContainer;
