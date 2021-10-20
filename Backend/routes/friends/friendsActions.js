const getUserFriends = (usersList, req) => {
  const {users} = usersList;
  const {uid} = req.params;

  if (!users[uid]) return null;

  const userFriends = {
    friends_requstions: users[uid].friends_requstions,
    user_friends: users[uid].user_friends,
  }

  return userFriends;
}

const sendRequestToFriendsList = (usersList, req) => {
  const {users} = usersList;
  const {senderUid, recipientUid} = req.body;

  const findRequest = users[senderUid].friends_requstions.find(req => req.uid === recipientUid);

  if (findRequest) return null;

  const senderRequestsList = [{user_name: users[recipientUid].user_name, avatar: users[recipientUid].avatar, uid: recipientUid, incoming: false}, ...users[senderUid].friends_requstions];
  const recipientRequestsList = [{user_name: users[senderUid].user_name, avatar: users[senderUid].avatar, uid: senderUid, incoming: true}, ...users[recipientUid].friends_requstions];

  const newUsersList = {
    users: {
      ...users,
      [senderUid]: {
        ...users[senderUid],
        friends_requstions: senderRequestsList,
      },
      [recipientUid]: {
        ...users[recipientUid],
        friends_requstions: recipientRequestsList,
      }
    }
  };

  return JSON.stringify(newUsersList, null, 2);
}

const deleteRequest = (usersList, req) => {
  const {users} = usersList;
  const {senderUid, recipientUid} = req.body;

  if (!users[senderUid] || !users[recipientUid]) return null;

  const senderRequestsList = users[senderUid].friends_requstions.filter(req => req.uid !== recipientUid);
  const recipientRequestsList = users[recipientUid].friends_requstions.filter(req => req.uid !== senderUid);

  const newUsersList = {
    users: {
      ...users,
      [senderUid]: {
        ...users[senderUid],
        friends_requstions: senderRequestsList
      },
      [recipientUid]: {
        ...users[recipientUid],
        friends_requstions: recipientRequestsList
      }
    }
  };

  return JSON.stringify(newUsersList, null, 2)
}

const addToFriendsList = (usersList, req) => {
  const {users} = usersList;
  const {senderUid, recipientUid} = req.body;

  const findFriend = users[senderUid].user_friends.find(friend => friend.uid === recipientUid);

  if (findFriend) return null;

  const senderRequestsList = users[senderUid].friends_requstions.filter(req => req.uid !== recipientUid);
  const recipientRequestsList = users[recipientUid].friends_requstions.filter(req => req.uid !== senderUid);
  const senderFriendsList = [{user_name: users[recipientUid].user_name, avatar: users[recipientUid].avatar, uid: users[recipientUid].uid}, ...users[senderUid].user_friends];
  const recipientFriendsList = [{user_name: users[senderUid].user_name, avatar: users[senderUid].avatar, uid: users[senderUid].uid}, ...users[recipientUid].user_friends];

  const newUsersList = {
    users: {
      ...users,
      [senderUid]: {
        ...users[senderUid],
        friends_requstions: senderRequestsList,
        user_friends: senderFriendsList,
      },
      [recipientUid]: {
        ...users[recipientUid],
        friends_requstions: recipientRequestsList,
        user_friends: recipientFriendsList
      }
    }
  };

  return JSON.stringify(newUsersList, null, 2)
}

const deleteFromFriendsList = (usersList, req) => {
  const {users} = usersList;
  const {senderUid, recipientUid} = req.body;

  const findFriends = users[senderUid].user_friends.find(friend => friend.uid === recipientUid);

  if (!findFriends) return null;

  const senderFriendsList = users[senderUid].user_friends.filter(friend => friend.uid !== recipientUid);
  const recipientFriendsList = users[recipientUid].user_friends.filter(friend => friend.uid !== senderUid);

  const newUsersList = {
    users: {
      ...users,
      [senderUid]: {
        ...users[senderUid],
        user_friends: senderFriendsList
      },
      [recipientUid]: {
        ...users[recipientUid],
        user_friends: recipientFriendsList
      }
    }
  };

  return JSON.stringify(newUsersList, null, 2);
}

module.exports = {
  getUserFriends,
  sendRequestToFriendsList,
  deleteRequest,
  addToFriendsList,
  deleteFromFriendsList
}