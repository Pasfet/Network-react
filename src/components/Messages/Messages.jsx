import Message from './message/Message';
import PropTypes from 'prop-types';
import style from './Messages.module.scss';

const Messages = ({ messagesList }) => {
  const msg = messagesList.map((message) => 
    <Message message={message} key={message.id} />
  );
  return (
    <div className={style.messagesWrapper}>
      {msg}
    </div>
  );
};

Messages.propsTypes = {
  messagesList: PropTypes.array
};

export default Messages;