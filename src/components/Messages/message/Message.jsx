import style from './Message.module.scss';

const Message = ({message}) => {
  return (
    <div className={style.bubbleWrapper}>
      <div className={style.inlineContainer + `${message.author !== 'me' ? `${style.other}` : `${style.me}`}`}>
        <div className={`${message.author !== 'me' ? `${style.otherBubble} ${style.other}` : `${style.meBubble} ${style.me}`}`}>
          {message.text}
        </div>
      </div>
      <span className={`${message.author !== 'me' ? `${style.other}` : `${style.me}`}`}>
        {message.author}
      </span>
    </div>
  );
};

export default Message;