const createFriendsRequstions = (usersList, uid) => ({
  uid,
  user_name: usersList[uid].user_name,
  avatar: usersList[uid].avatar,
});

const copyAddFriendsRequstion = (usersList, uid, addUserUid) => {
  const friendsRequstionsSender = createFriendsRequstions(usersList, addUserUid)
  const friendsRequstionsRecipient = createFriendsRequstions(usersList, uid);
  return {
    ...usersList,
    [uid]: {
      ...usersList[uid],
      friends_requstions: [{...friendsRequstionsSender, incoming: false}, ...usersList[uid].friends_requstions]
    },
    [addUserUid]: {
      ...usersList[addUserUid],
      friends_requstions: [{...friendsRequstionsRecipient, incoming: true}, ...usersList[addUserUid].friends_requstions]
    }
  }
}

const copyWithAgreeFriendRequest = (usersList, uid, addUserUid) => {
  const friendsSender = createFriendsRequstions(usersList, addUserUid)
  const friendsRecipient = createFriendsRequstions(usersList, uid);
  return {
    ...usersList,
    [uid]: {
      ...usersList[uid],
      friends_requstions: usersList[uid].friends_requstions.filter(req => req.uid !== addUserUid),
      user_friends: [friendsSender, ...usersList[uid].user_friends]
    },
    [addUserUid]: {
      ...usersList[addUserUid],
      friends_requstions: usersList[addUserUid].friends_requstions.filter(req => req.uid === addUserUid),
      user_friends: [friendsRecipient, ...usersList[addUserUid].user_friends]
    }
  }
}

const copyWithoutRequest = (usersList, uid, deleteUid) => ({
  ...usersList,
  [uid]: {
    ...usersList[uid],
    friends_requstions: usersList[uid].friends_requstions.filter(req => req.uid !== deleteUid)
  },
  [deleteUid]: {
    ...usersList[deleteUid],
    friends_requstions: usersList[deleteUid].friends_requstions.filter(req => req.uid === deleteUid)
  }
})

const copyWithoutDeletedFriend = (usersList, uid, deleteUid) => ({
  ...usersList,
  [uid]: {
    ...usersList[uid],
    user_friends: usersList[uid].user_friends.filter(req => req.uid !== deleteUid)
  },
  [deleteUid]: {
    ...usersList[deleteUid],
    user_friends: usersList[deleteUid].user_friends.filter(req => req.uid === deleteUid)
  }
})

module.exports = {
  copyAddFriendsRequstion,
  copyWithAgreeFriendRequest,
  copyWithoutRequest,
  copyWithoutDeletedFriend
}