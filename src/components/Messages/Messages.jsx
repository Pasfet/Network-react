import style from './Messages.module.scss';
import Message from './message/Message';
import TextFieldInputs from '../TextField/TextField';
import { memo, useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const Messages = ({ chats, setChats }) => {
  const {id} = useParams();
  const [value, setValue] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();
    const newMsg = {
        id: chats[id].messages.length + 1,
        text: value,
        author: 'me'
    };
    setValue('');
    setChats(prevState => ({...prevState, [id]: {
      ...prevState[id],
      messages: [...prevState[id].messages, newMsg]
    }}));
  };

  useEffect(() => {
    if (!chats[id]) {
      return <Redirect to="/dialogs/1/404" />;
    }

    if (chats[id].messages[chats[id].messages.length - 1]?.author === 'me' && chats[id].messages.length !== 0) {
      setTimeout(() => {
        const botMsg = {
          id: chats[id].messages.length + 1,
          text: 'successfully sent',
          author: 'bot'
        };
        setChats(prevState => ({
          ...prevState,
          [id]: {
            ...prevState[id],
            messages: [...prevState[id].messages, botMsg]
          }
        }));
      }, 1000)
    };
  }, [chats, id, setChats]);

  if (!chats[id]) {
    return <Redirect to="/dialogs/1/404" />;
  }

  return (
    <div className={style.messagesWrapper}>
      <div className={style.messageList}>
        {
          chats[id].messages?.map((message) => 
          <Message message={message} key={message.id} />
          )
        }
      </div>
      <TextFieldInputs sendMessage={sendMessage} valueInput={value} setValue={e => setValue(e.target.value)} />
    </div>
  );
};

Messages.propsTypes = {
  chats: PropTypes.object.isRequired,
  setChats: PropTypes.func.isRequired
};

export default memo(Messages);