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

import { CURRENT_URL } from '../../types/authTypes';
import { memo, FC } from 'react';
import {IFriendsBlockProps} from '../../types/components';

const FriendsBlock: FC<IFriendsBlockProps> = ({ userFriends, uid }) => {
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

export default memo(FriendsBlock);