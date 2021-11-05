import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import MessagesList from './MessagesList/MessagesList';
import {
  getChats,
  getIsEmptyChats,
  getIsEmptyMessagesState,
  getMessagesFromStore,
} from '../../store/dialogsReducer/dialogsSelectors';
import { getMyName } from '../../store/profileReducer/profileSelectors';
import { getError } from '../../store/errorReducer/errorSelectors';
import {
  clearMessages,
  getChatsList,
  getMessagesFromAPI,
  isNotEmptyMessages,
  sendMessageToStore,
} from '../../actions/dialogsActions';
import { clearError, setError } from '../../actions/errorActions';
import MessageBar from './MessageBar/MessageBar';
import { WS_URL } from '../../store/types/authTypes';

const MessagesContainer = () => {
  const dispatch = useDispatch();

  const socket = useRef();

  const messages = useSelector(getMessagesFromStore);
  const userName = useSelector(getMyName);
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
    [uid, chatId, userName, inputValue, chats],
  );

  useEffect(() => {
    socket.current = new WebSocket(WS_URL);

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
      dispatch(isNotEmptyMessages());
      dispatch(sendMessageToStore(JSON.parse(e.data)));
    };

    socket.current.onerror = e => {
      dispatch(setError({ message: e.message, type: 'chats-ws' }));
    };

    return () => {
      socket.current.onclose = () => {
        socket.current.send(JSON.stringify({ event: 'leave', uidRoom: chats[chatId]?.roomId }));
        dispatch(clearMessages());
        dispatch(clearError());
      };
      socket.current.onclose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId, dispatch]);

  useEffect(() => {
    if (!isEmptyChats?.isEmpty) {
      dispatch(getChatsList(uid));
    }
    return () => {
      dispatch(clearMessages());
      dispatch(clearError());
    };
  }, [isEmptyChats, dispatch, uid]);

  return (
    <>
      <MessageBar chats={chats} chatId={chatId} />
      <MessagesList
        uid={uid}
        messages={messages}
        inputValue={inputValue}
        setInputValue={setInputValue}
        error={error && error.message}
        sendMessage={sendMessage}
        isEmpty={isEmptyMessages && isEmptyMessages.message}
      />
    </>
  );
};

export default MessagesContainer;
