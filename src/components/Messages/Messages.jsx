import Message from './message/Message';
import PropTypes from 'prop-types';
import style from './Messages.module.scss';

const Messages = ({ messagesList }) => {
  return (
    <div className={style.messagesWrapper}>
      {messagesList?.map((message) => 
        <Message message={message} key={message.id} />
      )}
    </div>
  );
};

Messages.propsTypes = {
  messagesList: PropTypes.array
};

export default Messages;