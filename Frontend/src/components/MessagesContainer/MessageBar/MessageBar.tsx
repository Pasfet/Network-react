import { styled } from '@material-ui/styles';
import { memo, FC } from 'react';
import { IMessageBarProps } from '../../../types/components';

const MessageBarWrapper = styled('div')({
  borderRadius: '20px',
  padding: '20px',
  boxShadow: '0px 0px 8px 3px #e9e9e9',
  maxHeight: '50px',
  maxWidth: '500px',
  width: '100%',
  height: '100%',
  marginBottom: '15px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  textTransform: 'capitalize',
  fontWeight: 600,
  fontSize: '18px',
});

const MessageBar: FC<IMessageBarProps> = ({ chats, chatId }) => {
  return <MessageBarWrapper>{chats[chatId]?.chat_name}</MessageBarWrapper>;
};

export default memo(MessageBar);
