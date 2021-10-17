import { Divider } from '@mui/material';
import PropTypes from 'prop-types';
import FriendsBlock from '../../../components/FriendsBlock/FriendsBlock';
import ProfileAboutUser from '../../../components/ProfileAboutUser/ProfileAboutUser';
import ProfilePageActions from '../../../components/ProfilePageActions/ProfilePageActions';
import {
  BoxStyled,
  ProfileBar,
  ProfileMainContainer,
  ProfileUserName,
  ProfileUserStatus,
  ProfileWrapper,
  ProfileInputStatus,
  ErrorMessage,
} from './ProfileStyled';

const Profile = ({
  user,
  uid,
  userUid,
  error,
  openStatus,
  setOpenStatus,
  statusInput,
  setStatusInput,
  sendStatus,
}) => {
  return (
    <ProfileWrapper container spacing={2}>
      <ProfileBar item lg={2}>
        <BoxStyled>
          <ProfilePageActions userUid={userUid} uid={uid} />
        </BoxStyled>
        <BoxStyled>
          <FriendsBlock />
        </BoxStyled>
      </ProfileBar>
      <ProfileMainContainer item lg={8}>
        {error && <ErrorMessage> {error} </ErrorMessage>}

        <BoxStyled>
          <ProfileUserName>{user?.name}</ProfileUserName>
          {openStatus ? (
            <ProfileInputStatus
              value={statusInput}
              onChange={e => setStatusInput(e.target.value)}
              onBlur={() => sendStatus()}
              inputProps={{ 'data-testid': 'inputStatus' }}
            />
          ) : (
            <ProfileUserStatus onClick={() => uid === userUid && setOpenStatus(true)}>
              {statusInput ? statusInput : 'Установить статус'}
            </ProfileUserStatus>
          )}
          <Divider />
          <ProfileAboutUser about={user.about && user.about} />
        </BoxStyled>
      </ProfileMainContainer>
    </ProfileWrapper>
  );
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  error: PropTypes.string,
  uid: PropTypes.string,
  userUid: PropTypes.string,
  openStatus: PropTypes.bool,
  setOpenStatus: PropTypes.func,
  statusInput: PropTypes.string,
  setStatusInput: PropTypes.func,
  sendStatus: PropTypes.func,
};

export default Profile;
