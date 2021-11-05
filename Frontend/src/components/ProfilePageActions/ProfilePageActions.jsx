import { Divider } from '@mui/material';
import { useHistory } from 'react-router-dom';
import {
  AvatarImage,
  AvatarImageWrapper,
  ListItemPageActions,
  PageActions,
  PageActionsButton,
  PageActionsEdit,
} from './ProfilePageActionsStyled';
import PropTypes from 'prop-types';
import { CURRENT_URL } from '../../store/types/authTypes';
import { memo } from 'react';

const ProfilePageActions = ({
  myUid,
  uid,
  myFriends,
  addToFriendsList,
  deleteFriend,
  rejectFriendRequestHandler,
  setOpenDialog,
}) => {
  const history = useHistory();
  return (
    <PageActions>
      <AvatarImageWrapper>
        <AvatarImage src={`${CURRENT_URL}/images?uid=${uid}`} height="300" alt="avatar" />
      </AvatarImageWrapper>
      <Divider />
      {myUid === uid && (
        <>
          <ListItemPageActions>
            <PageActionsEdit onClick={() => history.push(`/profile/${myUid}/edit`)}>
              Редактировать
            </PageActionsEdit>
          </ListItemPageActions>
          <ListItemPageActions>
            <PageActionsEdit onClick={() => setOpenDialog(true)}>
              Загрузить аватарку
            </PageActionsEdit>
          </ListItemPageActions>
        </>
      )}
      {myUid !== uid ? (
        myFriends?.friends_requstions?.find(request => request.uid === uid && !request.incoming) ? (
          <ListItemPageActions>
            <PageActionsButton deletebutton={'true'} onClick={() => rejectFriendRequestHandler()}>
              Отменить запрос
            </PageActionsButton>
          </ListItemPageActions>
        ) : myFriends?.user_friends.find(friend => friend.uid === uid) ? (
          <ListItemPageActions>
            <PageActionsButton deletebutton={'true'} onClick={() => deleteFriend()}>
              Удалить из друзей
            </PageActionsButton>
          </ListItemPageActions>
        ) : (
          <ListItemPageActions>
            <PageActionsButton addbutton={'true'} onClick={() => addToFriendsList()}>
              Добавить в друзья
            </PageActionsButton>
          </ListItemPageActions>
        )
      ) : (
        ''
      )}
    </PageActions>
  );
};

ProfilePageActions.propsTypes = {
  myUid: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  userAvatar: PropTypes.string.isRequired,
  myFriends: PropTypes.array,
  addToFriendsList: PropTypes.func.isRequired,
  deleteFriend: PropTypes.func,
  rejectFriendRequestHandler: PropTypes.func,
  setOpenDialog: PropTypes.func,
};

export default memo(ProfilePageActions);
