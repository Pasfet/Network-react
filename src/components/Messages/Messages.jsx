import { memo, useEffect, useState, useRef } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import style from './Messages.module.scss';
import Message from './message/Message';
import TextFieldInputs from '../TextField/TextField';
import { sendMessageAction } from '../../actions/dialogsAction';

const Messages = ({ chats }) => {
  const { id } = useParams();
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const messagesListWrapperScroll = useRef(null);

  const sendMessage = e => {
    e.preventDefault();
    dispatch(sendMessageAction({ id: id, message: value, author: 'me' }));
    setValue('');
    scrollToBottom();
  };

  const scrollToBottom = () => {
    messagesListWrapperScroll?.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!chats[id]) {
      return <Redirect to="/dialogs/404" />;
    }
    scrollToBottom();

    if (
      chats[id].messages[chats[id].messages.length - 1]?.author === 'me' &&
      chats[id].messages.length !== 0
    ) {
      setTimeout(() => {
        dispatch(sendMessageAction({ id: id, message: 'successfully sent', author: 'bot' }));
        scrollToBottom();
      }, 1000);
    }
  }, [chats, dispatch, id]);

  if (!chats[id]) {
    return <Redirect to="/dialogs/404" />;
  }

  return (
    <div className={style.messagesWrapper}>
      <div className={style.messageList}>
        {chats[id].messages?.map(message => (
          <Message message={message} key={message.id} />
        ))}
        <div ref={messagesListWrapperScroll}></div>
      </div>
      <TextFieldInputs
        sendMessage={sendMessage}
        valueInput={value}
        setValue={e => setValue(e.target.value)}
      />
    </div>
  );
};

Messages.propsTypes = {
  chats: PropTypes.object.isRequired,
};

export default memo(Messages);
