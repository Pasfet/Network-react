import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import MessagesList from './MessagesList/MessagesList';
import { getChats } from '../../store/dialogsReducer/dialogsSelector';
import { sendMessageToAPI } from '../../actions/dialogsAction';

const MessagesContainer = () => {
  const chats = useSelector(getChats);
  const { uid, chatId } = useParams();
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const sendMessage = e => {
    e.preventDefault();
    dispatch(sendMessageToAPI(uid, chatId, inputValue));
    setInputValue('');
  };

  return (
    <MessagesList
      uid={uid}
      messages={chats[chatId]?.messages}
      inputValue={inputValue}
      setInputValue={setInputValue}
      sendMessage={sendMessage}
    />
  );
};

export default MessagesContainer;
