import { memo, useEffect, useRef, FC } from 'react';
import { Alert } from '@mui/material';

import { styled } from '@material-ui/styles';

import Message from '../Message/Message';
import MessageAdd from './MessageAdd/MessageAdd';
import { IMessageListProps } from '../../../types/components';

const MessagesListWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '20px',
  padding: '20px',
  boxShadow: '0px 0px 8px 3px #e9e9e9',
  maxHeight: '700px',
  maxWidth: '500px',
  width: '100%',
  height: '100%',
});

const MessageListStyled = styled('div')({
  overflowY: 'auto',
  width: '100%',
  height: '100%',
});

const MessagesList: FC<IMessageListProps> = ({
  messages,
  inputValue,
  setInputValue,
  uid,
  error,
  isEmpty,
  sendMessage,
}) => {
  const messagesListWrapperScroll = useRef<any>(null);
  const scrollToBottom = (): void => {
    messagesListWrapperScroll?.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  });

  return (
    <MessagesListWrapper>
      <MessageListStyled>
        {messages?.map(message => (
          <Message key={message.id} message={message} uid={uid} />
        ))}
        {error && <Alert severity="error"> {error} </Alert>}
        {isEmpty && <Alert severity="info"> {isEmpty} </Alert>}
        <div ref={messagesListWrapperScroll}></div>
      </MessageListStyled>
      <MessageAdd inputValue={inputValue} setInputValue={setInputValue} sendMessage={sendMessage} />
    </MessagesListWrapper>
  );
};

export default memo(MessagesList);
