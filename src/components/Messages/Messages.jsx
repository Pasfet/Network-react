import Message from './message/Message';

const Messages = ({ messagesList }) => {
  const msg = messagesList.map((message) => 
    <Message message={message} key={message.id} />
  );
  return (
    <div className="message">
      {msg}
    </div>
  );
};

export default Messages;