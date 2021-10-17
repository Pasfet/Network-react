import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@material-ui/styles';

import {
  addChatToApi,
  deleteChatFromAPI,
  getChatsList,
  searchUsersChat,
} from '../../actions/dialogsActions';
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
import { clearError, clearSnack } from '../../actions/errorActions';

const ChatsWrapper = styled('div')({
  borderRadius: '10px',
  width: '30%',
  height: '100%',
  marginRight: 'auto',
  boxShadow: '5px 0px 5px 3px #f1f1f1',
  '@media(max-width: 1024px)': {
    width: '50%',
  },
  '@media(max-width: 768px)': {
    width: '100%',
  },
});

const AddChatWrapper = styled('div')({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-beetwen',
});

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

  const deleteChat = useCallback((uid, chatId) => {
    dispatch(deleteChatFromAPI(uid, chatId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    return () => {
      dispatch(clearError());
      dispatch(clearSnack());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce, open, error, isEmptyChats, uid]);

  return (
    <ChatsWrapper>
      <h2>Chats</h2>
      <AddChatWrapper>
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
      </AddChatWrapper>
      <ChatsList
        chatsList={chats}
        deleteChat={deleteChat}
        uid={uid}
        error={error?.type === 'chats' && error.message}
        isEmpty={isEmptyChats?.isEmpty && isEmptyChats.message}
      />
    </ChatsWrapper>
  );
};

export default ChatsContainer;
