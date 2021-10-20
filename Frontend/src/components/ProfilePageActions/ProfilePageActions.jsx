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

const ProfilePageActions = ({
  myUid,
  uid,
  userAvatar,
  myFriends,
  addToFriendsList,
  deleteFriend,
  rejectFriendRequestHandler,
}) => {
  const history = useHistory();
  return (
    <PageActions>
      <AvatarImageWrapper>
        <AvatarImage
          src={`${CURRENT_URL}/images/profile/${uid}/avatar/${userAvatar}`}
          height="300"
          alt="avatar"
        />
      </AvatarImageWrapper>
      <Divider />
      {myUid === uid && (
        <ListItemPageActions>
          <PageActionsEdit onClick={() => history.push(`/profile/${myUid}/edit`)}>
            Редактировать
          </PageActionsEdit>
        </ListItemPageActions>
      )}
      {myUid !== uid ? (
        myFriends?.friends_requstions?.find(request => request.uid === uid && !request.incoming) ? (
          <ListItemPageActions>
            <PageActionsButton deletebutton="true" onClick={() => rejectFriendRequestHandler()}>
              Отменить запрос
            </PageActionsButton>
          </ListItemPageActions>
        ) : myFriends?.user_friends.find(friend => friend.uid === uid) ? (
          <ListItemPageActions>
            <PageActionsButton deletebutton="true" onClick={() => deleteFriend()}>
              Удалить из друзей
            </PageActionsButton>
          </ListItemPageActions>
        ) : (
          <ListItemPageActions>
            <PageActionsButton addbutton="true" onClick={() => addToFriendsList()}>
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
};

export default ProfilePageActions;
