import { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import MessagesList from './MessagesList/MessagesList';
import {
  getIsEmptyMessagesState,
  getMessagesFromStore,
} from '../../store/dialogsReducer/dialogsSelector';
// import { clearMessages, getMessagesFromAPI, sendSessionMessage } from '../../actions/dialogsAction';
import { getUserName } from '../../store/profileReducer/profileSelector';
// import { clearError } from '../../actions/errorAction';
import { getError } from '../../store/errorReducer/errorSelector';

// const URL = 'ws://localhost:8999/';

const MessagesContainer = () => {
  // const dispatch = useDispatch();
  const messages = useSelector(getMessagesFromStore);
  const userName = useSelector(getUserName);
  const error = useSelector(getError);
  const isEmptyMessages = useSelector(getIsEmptyMessagesState);
  const { uid, chatId } = useParams();
  const [inputValue, setInputValue] = useState('');

  // const [ws, setWs] = useState(new WebSocket(URL));

  // const sendMessage = e => {
  //   e.preventDefault();
  //   const message = {
  //     event: 'chat-message',
  //     payload: {
  //       uid,
  //       authorId: uid,
  //       chatId,
  //       authorName: userName,
  //       text: inputValue,
  //     },
  //   };
  //   ws.send(JSON.stringify(message));
  //   setInputValue('');
  // };

  // useEffect(() => {
  //   ws.onopen = () => {
  //     if (!messages.length) {
  //       dispatch(getMessagesFromAPI(uid, chatId));
  //     }
  //   };

  //   ws.onmessage = e => {
  //     dispatch(sendSessionMessage(JSON.parse(e.data)));
  //   };

  //   return () => {
  //     ws.onclose = () => {
  //       console.log('закрыли');
  //       dispatch(clearMessages());
  //     };
  //     dispatch(clearError());
  //     ws.close();
  //   };
  // }, []);

  return (
    <MessagesList
      uid={uid}
      messages={messages}
      inputValue={inputValue}
      setInputValue={setInputValue}
      userName={userName}
      error={error}
      chatId={chatId}
      isEmptyMessages={isEmptyMessages && isEmptyMessages.message}
    />
  );
};

export default MessagesContainer;
