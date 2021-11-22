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
import { CURRENT_URL } from '../../types/authTypes';
import { memo, FC } from 'react';
import { IProfilePageActionsProps } from '../../types/components';

const ProfilePageActions: FC<IProfilePageActionsProps> = ({
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
        myFriends?.friends_requisitions?.find(request => request.uid === uid && !request.incoming) ? (
          <ListItemPageActions>
            <PageActionsButton className="deleteButton" onClick={() => rejectFriendRequestHandler()}>
              Отменить запрос
            </PageActionsButton>
          </ListItemPageActions>
        ) : myFriends?.user_friends.find(friend => friend.uid === uid) ? (
          <ListItemPageActions>
            <PageActionsButton className="deleteButton" onClick={() => deleteFriend()}>
              Удалить из друзей
            </PageActionsButton>
          </ListItemPageActions>
        ) : (
          <ListItemPageActions>
            <PageActionsButton className="addButton" onClick={() => addToFriendsList()}>
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

export default memo(ProfilePageActions);
