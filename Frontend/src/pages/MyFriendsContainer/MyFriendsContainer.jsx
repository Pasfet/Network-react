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
import { getError } from '../../store/errorReducer/errorSelectors';
import { getMyFriends, getMyUid } from '../../store/profileReducer/profileSelectors';
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

  const confirmRequestToFriendsList = useCallback(
    recipientUid => {
      dispatch(addToFriendsList(myUid, recipientUid));
    },
    [dispatch, myUid],
  );

  const rejectFriendRequestHandler = useCallback(
    recipientUid => {
      dispatch(rejectFriendRequest(myUid, recipientUid));
    },
    [dispatch, myUid],
  );

  const deleteFriend = useCallback(
    recipientUid => {
      dispatch(deleteFriendFromFriendsList(myUid, recipientUid));
    },
    [dispatch, myUid],
  );

  useEffect(() => {
    dispatch(getMyFriendsList(myUid));

    return () => dispatch(clearError());
  }, [dispatch, myUid]);

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
