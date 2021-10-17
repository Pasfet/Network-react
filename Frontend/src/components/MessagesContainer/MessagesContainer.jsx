import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import MessagesList from './MessagesList/MessagesList';
import {
  getChats,
  getIsEmptyChats,
  getIsEmptyMessagesState,
  getMessagesFromStore,
} from '../../store/dialogsReducer/dialogsSelector';
import { getUserName } from '../../store/profileReducer/profileSelector';
import { getError } from '../../store/errorReducer/errorSelector';
import { clearMessages, getChatsList, getMessagesFromAPI } from '../../actions/dialogsActions';
import { clearError, setError } from '../../actions/errorActions';
import MessageBar from './MessageBar/MessageBar';

const URL = 'ws://localhost:8999/';

const MessagesContainer = () => {
  const dispatch = useDispatch();
  const socket = useRef();
  const messages = useSelector(getMessagesFromStore);
  const userName = useSelector(getUserName);
  const isEmptyChats = useSelector(getIsEmptyChats);
  const chats = useSelector(getChats);
  const error = useSelector(getError);
  const isEmptyMessages = useSelector(getIsEmptyMessagesState);
  const { uid, chatId } = useParams();
  const [inputValue, setInputValue] = useState('');

  const sendMessage = useCallback(
    e => {
      e.preventDefault();
      const message = {
        event: 'chat-message',
        payload: {
          uid,
          authorId: uid,
          chatId,
          authorName: userName,
          text: inputValue,
        },
        uidRoom: chats[chatId]?.roomId,
      };
      socket.current.send(JSON.stringify(message));
      setInputValue('');
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputValue],
  );

  useEffect(() => {
    socket.current = new WebSocket(URL);

    socket.current.onopen = () => {
      const connect = {
        event: 'connection',
        payload: null,
        uidRoom: chats[chatId]?.roomId,
      };
      socket.current.send(JSON.stringify(connect));

      if (!messages.length) {
        dispatch(getMessagesFromAPI(uid, chatId));
      }
    };

    socket.current.onmessage = e => {
      dispatch(getMessagesFromAPI(uid, chatId));
    };

    socket.current.onerror = e => {
      dispatch(setError({ message: e.message, type: 'chats-ws' }));
    };

    return () => {
      socket.current.onclose = () => {
        dispatch(clearMessages());
        dispatch(clearError());
      };
      socket.current.onclose();
      dispatch(clearMessages());
      dispatch(clearError());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);

  useEffect(() => {
    if (!isEmptyChats?.isEmpty) {
      dispatch(getChatsList(uid));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEmptyChats]);

  return (
    <>
      <MessageBar chats={chats} chatId={chatId} />
      <MessagesList
        uid={uid}
        messages={messages}
        inputValue={inputValue}
        setInputValue={setInputValue}
        error={error}
        sendMessage={sendMessage}
        isEmpty={isEmptyMessages && isEmptyMessages.message}
      />
    </>
  );
};

export default MessagesContainer;
