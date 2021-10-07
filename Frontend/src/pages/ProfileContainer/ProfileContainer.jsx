import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getError } from '../../store/errorReducer/errorSelector';
import { getUser } from '../../actions/profileAction';
import { getUserPage } from '../../store/profileReducer/profileSelector';
import Profile from './Profile/Profile';

const ProfileContainer = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserPage);
  const error = useSelector(getError);
  const { uid } = useParams();
  useEffect(() => {
    dispatch(getUser(uid));
  }, [dispatch, uid]);
  return <Profile user={user} error={error} />;
};

export default ProfileContainer;
