import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import style from './Chats.module.scss';
import {
  addChatToApi,
  deleteChatFromAPI,
  getChatsList,
  searchUsersChat,
} from '../../actions/dialogsAction';
import AddChat from './AddChat/AddChat';
import ChatsList from './ChatsList/ChatsList';
import useDebounce from '../../hooks/debounce/debounce';
import {
  getChats,
  getSearchChats,
  getIsEmptyChats,
} from '../../store/dialogsReducer/dialogsSelector';
import { getError } from '../../store/errorReducer/errorSelector';
import { getUid } from '../../store/profileReducer/profileSelector';
import { clearError } from '../../actions/errorAction';

const ChatsContainer = () => {
  const dispatch = useDispatch();
  const chats = useSelector(getChats);
  const isEmptyChats = useSelector(getIsEmptyChats);
  const searchChatsList = useSelector(getSearchChats);
  const error = useSelector(getError);
  const uid = useSelector(getUid);
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounce = useDebounce(inputValue, 1000);

  const addChat = useCallback(
    user => {
      dispatch(addChatToApi(uid, user));
      setInputValue('');
    },
    [dispatch, uid],
  );

  const deleteChat = useCallback(
    (uid, chatId) => {
      dispatch(deleteChatFromAPI(uid, chatId));
    },
    [dispatch],
  );

  useEffect(() => {
    if (error?.code === 2) {
      setLoading(false);
      return;
    }
    if (!isEmptyChats?.isEmpty) {
      dispatch(getChatsList(uid));
    }
    if (open) {
      setLoading(true);
      if (debounce && error?.code !== 2) {
        dispatch(searchUsersChat(debounce, uid));
        setLoading(false);
        return;
      }
    } else {
      setLoading(false);
    }
    return () => dispatch(clearError());
  }, [debounce, open, error, isEmptyChats, dispatch, uid]);

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
          error={error?.code === 2 && error.message}
        />
      </div>
      <ChatsList
        chatsList={chats}
        deleteChat={deleteChat}
        uid={uid}
        error={error?.type === 'chats' && error.message}
        isEmpty={isEmptyChats?.isEmpty && isEmptyChats.message}
      />
    </div>
  );
};

export default ChatsContainer;
