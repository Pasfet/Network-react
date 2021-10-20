import PropTypes from 'prop-types';
import { memo } from 'react';
import { styled } from '@material-ui/styles';

const BubbleWrapper = styled('div')({
  padding: '10px',
  display: 'flex',
  justifyContent: 'flex-end',
  flexDirection: 'column',
  alignSelf: 'flex-end',
  color: '#fff',
});

const InlineContainer = styled('div')(({ me }) => ({
  display: 'flex',
  flexDirection: me && 'row-reverse',
  alignSelf: me ? 'flex-end' : 'flex-start',
}));

const Bubble = styled('div')(({ me }) => ({
  minWidth: '60px',
  maxWidth: '380px',
  width: '100%',
  padding: '14px 18px',
  margin: '6px 8px',
  backgroundColor: me ? '#5b5377' : '#6c8ea4',
  borderRadius: '16px 16px 16px 0',
  border: me ? '1px solid #443f56' : '1px solid #54788e',
}));

const AuthorNameSpan = styled('span')(({ me }) => ({
  fontSize: '14px',
  color: 'grey',
  alignSelf: me ? 'flex-end' : 'flex-start',
}));

const Message = ({ message, uid }) => {
  return (
    <BubbleWrapper>
      <InlineContainer me={message?.authorId === uid ? true : false}>
        <Bubble me={message?.authorId === uid ? true : false}>{message?.text}</Bubble>
      </InlineContainer>
      <AuthorNameSpan me={message?.authorId === uid ? true : false}>
        {message?.authorName}
      </AuthorNameSpan>
    </BubbleWrapper>
  );
};

Message.propsTypes = {
  message: PropTypes.object.isRequired,
  uid: PropTypes.number.isRequired,
};

export default memo(Message);
