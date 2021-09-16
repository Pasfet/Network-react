import style from './App.module.scss';
import { useState, useEffect } from 'react';
import Messages from './components/Messages/Messages';
import TextFieldInputs from './components/TextField/TextField';
import Chats from './components/Chats/Chats';

const App = () => {
  const [messageslist, setMessageList] = useState([]);
  const [chats, setChats] = useState([
    { id: Date.now(), name: 'Test' },
    { id: Date.now(), name: 'Mike' },
  ]);
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const sendMassage = (e) => {
    e.preventDefault();
    setMessageList([...messageslist, {
      id: messageslist.length + 1,
      text: value,
      author: 'me'
    }]);
    setValue('');
  };

  useEffect(() => {
    if (messageslist[messageslist.length - 1]?.author === 'me' && messageslist.length !== 0) {
      setTimeout(() => {
        setMessageList([...messageslist, {
          id: messageslist.length + 1,
          text: 'successfully sent',
          author: 'bot'
        }]);
      }, 1000)
    };
  }, [messageslist]);

  return (
    <div className={style.App}>
      <Chats chats={chats} />
      <Messages messagesList={messageslist} />
      <TextFieldInputs sendMessage={sendMassage} valueInput={value} setValue={handleChange} />
    </div>
  );
}

export default App;
