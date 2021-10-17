import { Divider } from '@mui/material';
import { useHistory } from 'react-router-dom';
import {
  AvatarImage,
  AvatarImageWrapper,
  ListItemPageActions,
  PageActions,
  PageActionsEdit,
} from './ProfilePageActionsStyled';
import PropTypes from 'prop-types';

const ProfilePageActions = ({ userUid, uid }) => {
  const history = useHistory();

  return (
    <PageActions>
      <AvatarImageWrapper>
        <AvatarImage src="https://html5css.ru/w3images/avatar2.png" height="300" alt="avatar" />
      </AvatarImageWrapper>
      <Divider />
      {userUid === uid && (
        <ListItemPageActions>
          <PageActionsEdit onClick={() => history.push(`/profile/${userUid}/edit`)}>
            Редактировать
          </PageActionsEdit>
        </ListItemPageActions>
      )}
    </PageActions>
  );
};

ProfilePageActions.propsTypes = {
  userUid: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
};

export default ProfilePageActions;
