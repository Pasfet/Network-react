import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { profileEditAction } from '../../actions/profileEditAction';
import { getProfile } from '../../store/ProfileReducer/selector';
import style from './Profile.module.scss';

const Profile = () => {
  const { profileEdit } = useSelector(getProfile, shallowEqual);
  const dispatch = useDispatch();
  const editProfile = useCallback(() => {
    dispatch(profileEditAction());
  }, [dispatch]);

  return (
    <div className={style.profileWrap}>
      Profile
      <input type="checkbox" checked={profileEdit} value={profileEdit} onChange={editProfile} />
      <span>{profileEdit ? 'edit' : 'edit?'}</span>
    </div>
  );
};

export default Profile;
