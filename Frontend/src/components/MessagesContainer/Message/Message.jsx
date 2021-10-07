import style from './Message.module.scss';
import PropTypes from 'prop-types';

const Message = ({ message, uid }) => {
  return (
    <div className={style.bubbleWrapper}>
      <div
        className={`${style.inlineContainer} 
          ${message.authorId !== uid ? `${style.other}` : `${style.me}`}`}
      >
        <div
          className={`${
            message.authorId !== uid
              ? `${style.otherBubble} ${style.other}`
              : `${style.meBubble} ${style.me}`
          }`}
        >
          {message.text}
        </div>
      </div>
      <span className={`${message.authorId !== uid ? `${style.other}` : `${style.me}`}`}>
        {message.authorName}
      </span>
    </div>
  );
};

Message.propsTypes = {
  message: PropTypes.object.isRequired,
  uid: PropTypes.number.isRequired,
};

export default Message;
