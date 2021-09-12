import Message from './message/Message';

const Messages = (props) => {
  const msg = props.messagesList.map((message) => 
    <Message message={message} key={message.id} />
  );
  return (
    <div className="message">
      {msg}
    </div>
  );
};

export default Messages;