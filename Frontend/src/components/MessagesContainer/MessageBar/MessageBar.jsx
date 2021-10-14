import style from './MessageBar.module.scss';
import { PropTypes } from 'prop-types';

const MessageBar = ({ chats, chatId }) => {
  return <div className={style.messageBarWrapper}>{chats[chatId]?.chat_name}</div>;
};

MessageBar.propTypes = {
  chats: PropTypes.object,
  chatId: PropTypes.string.isRequired,
};

export default MessageBar;
