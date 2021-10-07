import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessagesList from './MessagesList/MessagesList';
import { getChats } from '../../store/dialogsReducer/dialogsSelector';
import { useParams } from 'react-router';
import { sendMessageToAPI } from '../../actions/dialogsAction';
// import { getMessagesAPI } from '../../actions/dialogsAction';

const MessagesContainer = () => {
  const chats = useSelector(getChats);
  const dispatch = useDispatch();
  const { uid, chatId } = useParams();
  const [inputValue, setInputValue] = useState('');

  const sendMessage = e => {
    e.preventDefault();
    dispatch(sendMessageToAPI(uid, chatId, inputValue));
    setInputValue('');
  };
  // console.log(uid, chatId);
  // useEffect(() => {
  //   if (messages.length === 0) {
  //     dispatch(getMessagesAPI(uid, chatId));
  //   }
  // }, [messages]);

  // const messagesListWrapperScroll = useRef(null);

  // const sendMessage = e => {
  //   e.preventDefault();
  //   // dispatch(sendMessageAction({ id: uid, message: value, author: 'me' }));
  //   setValue('');
  //   scrollToBottom();
  // };

  // const scrollToBottom = () => {
  //   messagesListWrapperScroll?.current.scrollIntoView({ behavior: 'smooth' });
  // };

  // useEffect(() => {
  //   if (!chats[uid]) {
  //     return <Redirect to="/dialogs/404" />;
  //   }
  //   dispatch(botMessage(uid, chats));
  //   scrollToBottom();
  // }, [chats, dispatch, uid]);

  // if (!chats[uid]) {
  //   return <Redirect to="/dialogs/404" />;
  // }

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
