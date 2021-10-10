import { memo, useEffect, useRef } from 'react';
import { Alert } from '@mui/material';
import PropTypes from 'prop-types';

import style from './MessagesList.module.scss';

import Message from '../Message/Message';
import MessageAdd from './MessageAdd/MessageAdd';
import { useDispatch } from 'react-redux';
import {
  clearMessages,
  getMessagesFromAPI,
  sendSessionMessage,
} from '../../../actions/dialogsAction';
import { clearError } from '../../../actions/errorAction';

const URL = 'ws://localhost:8999/';

const MessagesList = ({
  messages,
  inputValue,
  setInputValue,
  userName,
  uid,
  chatId,
  error,
  isEmpty,
  roomId,
}) => {
  const dispatch = useDispatch();

  const socket = useRef();
  const messagesListWrapperScroll = useRef(null);
  const scrollToBottom = () => {
    messagesListWrapperScroll?.current.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = e => {
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
      uidRoom: roomId,
    };
    socket.current.send(JSON.stringify(message));
    setInputValue('');
  };

  useEffect(() => {
    socket.current = new WebSocket(URL);

    socket.current.onopen = () => {
      console.log('Я клиент подключился');
      const connect = {
        event: 'connection',
        payload: null,
        uidRoom: roomId,
      };

      socket.current.send(JSON.stringify(connect));

      if (!messages.length) {
        console.log('ПОЛУЧАЕМ СООБЩЕНИЯ');
        dispatch(getMessagesFromAPI(uid, chatId));
      }
    };

    socket.current.onmessage = e => {
      dispatch(sendSessionMessage(JSON.parse(e.data)));
    };

    socket.current.onerror = () => {
      console.log('Ошибка');
    };

    return () => {
      socket.current.onclose = () => {
        console.log('Клиент закрылся');
        dispatch(clearMessages());
        dispatch(clearError());
      };
      socket.current.onclose();
    };
  }, [chatId]);

  useEffect(() => {
    scrollToBottom();
  });

  return (
    <div className={style.messagesWrapper}>
      <div className={style.messageList}>
        {messages?.map(message => (
          <Message key={message.id} message={message} uid={uid} />
        ))}
        {error?.type === 'messages' && <Alert severity="error"> {error.message} </Alert>}
        {isEmpty && <Alert severity="info"> {isEmpty} </Alert>}
        <div ref={messagesListWrapperScroll}></div>
      </div>
      <MessageAdd inputValue={inputValue} setInputValue={setInputValue} sendMessage={sendMessage} />
    </div>
  );
};

MessagesList.propsTypes = {
  uid: PropTypes.number.isRequired,
  messages: PropTypes.object.isRequired,
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  error: PropTypes.string,
  isEmpty: PropTypes.string,
  roomId: PropTypes.string,
};

export default memo(MessagesList);
