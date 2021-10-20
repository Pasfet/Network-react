import {
  CountFirends,
  FreindsBlockTitle,
  FriendBlockHeading,
  FriendBlockList,
  FriendsBlockItem,
  FriendsBlockLink,
  FriendsBlockUserAvatar,
  FriendsBlockUserName,
} from './FriendsBlockStyled';

import PropTypes from 'prop-types';
import { CURRENT_URL } from '../../store/types/authTypes';

const FriendsBlock = ({ userFriends, uid }) => {
  return (
    <>
      <FriendBlockHeading>
        <FreindsBlockTitle>
          Друзья
          <CountFirends> {userFriends && userFriends.length} </CountFirends>
        </FreindsBlockTitle>
        <FriendsBlockLink to={`/profile/${uid}/friends`}>Все друзья</FriendsBlockLink>
      </FriendBlockHeading>
      <FriendBlockList>
        {userFriends?.length
          ? userFriends.slice(0, 6)?.map(friend => (
              <FriendsBlockItem key={friend.uid}>
                <FriendsBlockUserAvatar
                  src={`${CURRENT_URL}/images/profile/${friend.uid}/avatar/${friend.avatar}`}
                  alt="ava"
                  width="50"
                  height="50"
                />
                <FriendsBlockUserName to={`/profile/${friend.uid}`}>
                  {friend.user_name}
                </FriendsBlockUserName>
              </FriendsBlockItem>
            ))
          : 'Нет друзей'}
      </FriendBlockList>
    </>
  );
};

FriendsBlock.propsTypes = {
  userFriends: PropTypes.array.isRequired,
  uid: PropTypes.string.isRequired,
};

export default FriendsBlock;
