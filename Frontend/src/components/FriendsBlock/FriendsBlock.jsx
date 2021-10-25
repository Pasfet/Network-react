import {
  CountFirends,
  FreindsBlockTitle,
  FriendBlockHeading,
  FriendBlockList,
  FriendsBlockItem,
  FriendsBlockLink,
  FriendsBlockMockFriends,
  FriendsBlockUserAvatar,
  FriendsBlockUserName,
} from './FriendsBlockStyled';

import PropTypes from 'prop-types';
import { CURRENT_URL } from '../../store/types/authTypes';
import { memo } from 'react';

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
        {userFriends?.length ? (
          userFriends.slice(0, 6)?.map(friend => (
            <FriendsBlockItem key={friend.uid}>
              <FriendsBlockUserAvatar
                src={`${CURRENT_URL}/images/profile/${friend.uid}/avatar/${friend.avatar}`}
                alt="ava"
                width="70"
                height="70"
              />
              <FriendsBlockUserName to={`/profile/${friend.uid}`}>
                {friend.user_name}
              </FriendsBlockUserName>
            </FriendsBlockItem>
          ))
        ) : (
          <FriendsBlockMockFriends>Нет друзей</FriendsBlockMockFriends>
        )}
      </FriendBlockList>
    </>
  );
};

FriendsBlock.propsTypes = {
  userFriends: PropTypes.array.isRequired,
  uid: PropTypes.string.isRequired,
};

export default memo(FriendsBlock);
