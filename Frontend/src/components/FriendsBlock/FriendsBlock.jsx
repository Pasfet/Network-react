import {
  FriendsBlockTitle,
  FriendBlockHeading,
  CountFriends,
  FriendsBlockItem,
  FriendsBlockLink,
  FriendsBlockMockFriends,
  FriendsBlockUserAvatar,
  FriendsBlockUserName,
  FriendsBlockList,
} from './FriendsBlockStyled';

import PropTypes from 'prop-types';
import { CURRENT_URL } from '../../store/types/authTypes';
import { memo } from 'react';

const FriendsBlock = ({ userFriends, uid }) => {
  return (
    <>
      <FriendBlockHeading>
        <FriendsBlockTitle>
          Друзья
          <CountFriends> {userFriends && userFriends.length} </CountFriends>
        </FriendsBlockTitle>
        <FriendsBlockLink to={`/profile/${uid}/friends`}>Все друзья</FriendsBlockLink>
      </FriendBlockHeading>
      <FriendsBlockList>
        {userFriends?.length ? (
          userFriends.slice(0, 6)?.map(friend => (
            <FriendsBlockItem key={friend.uid}>
              <FriendsBlockUserAvatar
                src={`${CURRENT_URL}/images?uid=${friend.uid}`}
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
      </FriendsBlockList>
    </>
  );
};

FriendsBlock.propsTypes = {
  userFriends: PropTypes.array.isRequired,
  uid: PropTypes.string.isRequired,
};

export default memo(FriendsBlock);
