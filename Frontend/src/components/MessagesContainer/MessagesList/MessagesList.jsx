import { memo, useEffect, useRef } from 'react';
import { Alert } from '@mui/material';
import PropTypes from 'prop-types';

import style from './MessagesList.module.scss';

import Message from '../Message/Message';
import MessageAdd from './MessageAdd/MessageAdd';

const MessagesList = ({
  messages,
  inputValue,
  setInputValue,
  uid,
  error,
  isEmpty,
  sendMessage,
}) => {
  const messagesListWrapperScroll = useRef(null);
  const scrollToBottom = () => {
    messagesListWrapperScroll?.current.scrollIntoView({ behavior: 'smooth' });
  };

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

export default memo(MessagesList);
