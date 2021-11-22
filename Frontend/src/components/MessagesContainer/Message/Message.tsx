import { memo, FC } from 'react';
import { styled } from '@material-ui/styles';
import { IMessageProps } from '../../../types/components';

const BubbleWrapper = styled('div')({
  padding: '10px',
  display: 'flex',
  justifyContent: 'flex-end',
  flexDirection: 'column',
  alignSelf: 'flex-end',
  color: '#fff',
});

const InlineContainer = styled('div')(() => ({
  display: 'flex',
  alignSelf: 'flex-start',
  '&.me': {
    flexDirection: 'row-reverse',
    alignSelf: 'flex-end'
  }
}));

const Bubble = styled('div')(() => ({
  minWidth: '60px',
  maxWidth: '380px',
  width: '100%',
  padding: '14px 18px',
  margin: '6px 8px',
  backgroundColor: '#6c8ea4',
  borderRadius: '16px 16px 16px 0',
  border:  '1px solid #54788e',
  '&.me': {
    backgroundColor: '#5b5377',
    borderRadius: '16px 16px 0 16px',
    border: '1px solid #443f56'
  }
}));

const AuthorNameSpan = styled('span')(() => ({
  fontSize: '14px',
  color: 'grey',
  alignSelf: 'flex-start',
  '&.me': {
    alignSelf: 'flex-end'
  }
}));

const Message: FC<IMessageProps> = ({ message, uid }) => {
  return (
    <BubbleWrapper>
      <InlineContainer className={`${message?.authorId === uid && 'me'}`}>
        <Bubble className={`${message?.authorId === uid && 'me'}`}>{message?.text}</Bubble>
      </InlineContainer>
      <AuthorNameSpan className={`${message?.authorId === uid && 'me'}`}>
        {message?.authorName}
      </AuthorNameSpan>
    </BubbleWrapper>
  );
};

export default memo(Message);
