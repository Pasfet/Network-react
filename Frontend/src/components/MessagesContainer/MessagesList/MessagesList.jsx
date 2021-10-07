import PropTypes from 'prop-types';
import style from './MessagesList.module.scss';
import Message from '../Message/Message';
import MessageAdd from './MessageAdd/MessageAdd';

const MessagesList = ({ messages, inputValue, setInputValue, sendMessage, uid }) => {
  return (
    <div className={style.messagesWrapper}>
      <div className={style.messageList}>
        {messages?.map(message => (
          <Message key={message.id} message={message} uid={uid} />
        ))}
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
};

export default MessagesList;
