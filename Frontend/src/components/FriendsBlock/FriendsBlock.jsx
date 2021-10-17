import {
  CountFirends,
  FirendsBlockUserAvatarWrap,
  FreindsBlockTitle,
  FriendBlockHeading,
  FriendBlockList,
  FriendsBlockItem,
  FriendsBlockLink,
  FriendsBlockUserAvatar,
  FriendsBlockUserName,
} from './FriendsBlockStyled';

const FriendsBlock = () => {
  return (
    <>
      <FriendBlockHeading>
        <FreindsBlockTitle>
          Друзья
          <CountFirends>6</CountFirends>
        </FreindsBlockTitle>
        <FriendsBlockLink to="#">Все друзья</FriendsBlockLink>
      </FriendBlockHeading>
      <FriendBlockList>
        <FriendsBlockItem>
          <FirendsBlockUserAvatarWrap>
            <FriendsBlockUserAvatar
              src="https://html5css.ru/w3images/avatar2.png"
              alt="ava"
              width="50"
              height="50"
            />
          </FirendsBlockUserAvatarWrap>
          <FriendsBlockUserName>Name</FriendsBlockUserName>
        </FriendsBlockItem>
      </FriendBlockList>
    </>
  );
};

export default FriendsBlock;
