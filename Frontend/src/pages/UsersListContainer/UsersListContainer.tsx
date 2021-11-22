import { useCallback, ChangeEvent, useState, useEffect, FC} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendRequestToFriendList } from '../../actions/profileActions';
import { getUsersList } from '../../actions/usersActions';
import { getMyFriends, getMyUid } from '../../store/profileReducer/profileSelectors';
import {
  getUsersListFromStore,
  getUsersListLastPage,
  getUsersListLength,
} from '../../store/usersReducer/usersSelectors';
import UsersList from './UsersList/UsersList';

const UsersListContainer: FC = () => {
  const dispatch = useDispatch();
  const myFriends = useSelector(getMyFriends);
  const usersList = useSelector(getUsersListFromStore);
  const usersListLength = useSelector(getUsersListLength);
  const usersListLastPage = useSelector(getUsersListLastPage);
  const myUid = useSelector(getMyUid);

  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const [searchValue, setSearchValue] = useState<string>('');

  const addToFriendsList = useCallback(
    (uid: string) => {
      dispatch(sendRequestToFriendList(myUid, uid));
    },
    [dispatch, myUid],
  );

  const submitHandler = useCallback(
    (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      setPage(1);
      dispatch(getUsersList(page, perPage, searchValue));
    },
    [searchValue, page, perPage, dispatch],
  );

  useEffect(() => {
    dispatch(getUsersList(page, perPage));
  }, [dispatch, page, perPage]);

  return (
    <UsersList
      myUid={myUid}
      myFriends={myFriends}
      users={usersList}
      usersListLength={usersListLength}
      setPage={setPage}
      setPerPage={setPerPage}
      page={page}
      perPage={perPage}
      lastPage={usersListLastPage}
      addToFriendsList={addToFriendsList}
      submitHandler={submitHandler}
      setSearchValue={setSearchValue}
    />
  );
};

export default UsersListContainer;
