import { useEffect, useRef, useState } from 'react';
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
}) => {
  const dispatch = useDispatch();

  const messagesListWrapperScroll = useRef(null);
  const scrollToBottom = () => {
    messagesListWrapperScroll?.current.scrollIntoView({ behavior: 'smooth' });
  };

  const [ws, setWs] = useState(new WebSocket(URL));

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
    };
    ws.send(JSON.stringify(message));
    setInputValue('');
  };

  useEffect(() => {
    ws.onopen = () => {
      console.log('Я ОТКРЫЛСЯ');
      if (!messages.length) {
        dispatch(getMessagesFromAPI(uid, chatId));
      }
    };

    ws.onmessage = e => {
      console.log('pff');
      dispatch(sendSessionMessage(JSON.parse(e.data)));
    };

    return () => {
      ws.onclose = () => {
        console.log('закрыли');
        dispatch(clearMessages());
      };
      setWs(new WebSocket(URL));
      dispatch(clearError());
      // ws.close();
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
};

export default MessagesList;
