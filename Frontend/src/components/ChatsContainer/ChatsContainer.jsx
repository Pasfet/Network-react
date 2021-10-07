import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import style from './Chats.module.scss';
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
import { getSearchChats } from '../../store/dialogsReducer/dialogsSelector';
import { getError } from '../../store/errorReducer/errorSelector';
import { getUid } from '../../store/profileReducer/profileSelector';
import { clearError } from '../../actions/errorAction';

const ChatsContainer = ({ chatsList }) => {
  const history = useHistory();
  const searchChatsList = useSelector(getSearchChats);
  const error = useSelector(getError);
  const uid = useSelector(getUid);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const debounce = useDebounce(inputValue, 1000);
  const [loading, setLoading] = useState(false);

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
    if (open) {
      setLoading(true);
      if (debounce) {
        dispatch(searchUsersChat(debounce, uid));
        if (error) {
          setLoading(false);
        }
      }
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce, open, error]);

  useEffect(() => {
    return () => dispatch(clearError());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          error={error}
        />
      </div>
      <ChatsList chatsList={chatsList} deleteChat={deleteChat} uid={uid} />
    </div>
  );
};

ChatsContainer.propsTypes = {
  chatsList: PropTypes.array.isRequired,
};

export default ChatsContainer;
