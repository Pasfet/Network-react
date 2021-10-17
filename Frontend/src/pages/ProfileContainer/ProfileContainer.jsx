import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getError } from '../../store/errorReducer/errorSelector';
import { getUser, setStatus } from '../../actions/profileActions';
import { getUserPage, getUid } from '../../store/profileReducer/profileSelector';
import Profile from './Profile/Profile';
import { clearError } from '../../actions/errorActions';

const ProfileContainer = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserPage);
  const error = useSelector(getError);
  const userUid = useSelector(getUid);
  const { uid } = useParams();
  const [openStatus, setOpenStatus] = useState(false);
  const [statusInput, setStatusInput] = useState('');

  const sendStatus = () => {
    setOpenStatus(false);
    if (statusInput) {
      dispatch(setStatus(statusInput, userUid));
    }
  };

  useEffect(() => {
    dispatch(getUser(uid));
    setStatusInput(user.status);
    return () => {
      dispatch(clearError());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid, user.status]);

  return (
    <Profile
      user={user}
      uid={uid}
      userUid={userUid}
      error={error?.type === 'profile' || error?.type === 'error' ? error.message : ''}
      openStatus={openStatus}
      setOpenStatus={setOpenStatus}
      statusInput={statusInput}
      setStatusInput={setStatusInput}
      sendStatus={sendStatus}
    />
  );
};

export default ProfileContainer;
