import style from './App.module.scss';
import { useState, useEffect } from 'react';
import Message from './components/Messages/Messages';
import Button from "./components/Button/Button";

const App = () => {
  const [messageslist, setMessageList] = useState([]);
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const sendMassage = () => {
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
    <div className="App">
      <Message messagesList={messageslist} />
      <div className={style.actions}>
        <textarea className={style.textarea} value={value} onChange={handleChange}></textarea>
        <Button onClick={sendMassage} />
      </div>
    </div>
  );
}

export default App;
