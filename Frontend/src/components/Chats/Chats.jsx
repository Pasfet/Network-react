import PropTypes from 'prop-types';
import style from './Chats.module.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  addChatToApi,
  clearSearchChats,
  deleteChatFromApi,
  getChatsList,
  searchUsersChat,
} from '../../actions/dialogsAction';
import AddChat from './AddChat/AddChat';
import ChatsList from './ChatsList/ChatsList';
import useDebounce from '../../hooks/debounce/debounce';
import { useEffect } from 'react';
import { getSearchChats } from '../../store/dialogsReducer/dialogsSelector';
import { getUid } from '../../store/profileReducer/profileSelector';

const Chats = ({ chatsList }) => {
  const history = useHistory();
  const searchChatsList = useSelector(getSearchChats);
  const uid = useSelector(getUid);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const debounce = useDebounce(inputValue, 1000);
  const loading = open && searchChatsList.length === 0;

  const addChat = user => {
    dispatch(addChatToApi(uid, user));
    setInputValue('');
  };

  const deleteChat = (uid, chatId) => {
    dispatch(deleteChatFromApi(uid, chatId));
    history.push('/dialogs');
  };

  useEffect(() => {
    dispatch(clearSearchChats());
    dispatch(getChatsList(uid));
    if (debounce) {
      dispatch(searchUsersChat(debounce));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce]);

  return (
    <div className={style.chatsWrapper}>
      <h2>Chats</h2>
      <div className={style.addChat}>
        <AddChat
          inputValue={debounce}
          setInputValue={setInputValue}
          addChat={addChat}
          openField={open}
          loading={loading}
          onOpenField={setOpen}
          onCloseField={setOpen}
          options={searchChatsList}
        />
      </div>
      <ChatsList chatsList={chatsList} deleteChat={deleteChat} uid={uid} />
    </div>
  );
};

Chats.propsTypes = {
  chatsList: PropTypes.array.isRequired,
};

export default Chats;
