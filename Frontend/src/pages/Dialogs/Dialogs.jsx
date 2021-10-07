import { shallowEqual, useSelector } from 'react-redux';

import { getChats } from '../../store/dialogsReducer/dialogsSelector';
import style from './Dialogs.module.scss';

import PrivateRoute from '../../HOC/PrivateRoute';
import Chats from '../../components/ChatsContainer/ChatsContainer';

import MessagesContainer from '../../components/MessagesContainer/MessagesContainer';
import { getAuth } from '../../store/auth/authSelector';

const Dialogs = () => {
  const chats = useSelector(getChats, shallowEqual);
  const auth = useSelector(getAuth);

  return (
    <div className={style.dialogsWrap}>
      <Chats className={style.chats} chatsList={chats} />

      <PrivateRoute
        authenticated={auth}
        exact
        path="/dialogs/:uid/:chatId"
        className={style.messages}
      >
        <MessagesContainer />
      </PrivateRoute>
    </div>
  );
};

export default Dialogs;
