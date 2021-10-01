import PropTypes from 'prop-types';
import style from './Chats.module.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addChatAction, deleteChatAction } from '../../actions/dialogsAction';
import AddChat from './AddChat/AddChat';
import ChatsList from './ChatsList/ChatsList';

const Chats = ({ chatsList }) => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const addChat = () => {
    dispatch(addChatAction(inputValue));
    setInputValue('');
  };

  const deleteChat = id => {
    dispatch(deleteChatAction(id));
  };

  return (
    <div className={style.chatsWrapper}>
      <h2>Chats</h2>
      <div className={style.addChat}>
        <AddChat inputValue={inputValue} setInputValue={setInputValue} addChat={addChat} />
      </div>
      <ChatsList chatsList={chatsList} deleteChat={deleteChat} />
    </div>
  );
};

Chats.propsTypes = {
  chatsList: PropTypes.array.isRequired,
};

export default Chats;
