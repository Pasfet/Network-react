import { shallowEqual, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

import { getChats } from '../../store/dialogsReducer/dialogsSelector';
import style from './Dialogs.module.scss';

import PrivateRoute from '../../HOC/PrivateRoute';
import ChatsContainer from '../../components/ChatsContainer/ChatsContainer';

import MessagesContainer from '../../components/MessagesContainer/MessagesContainer';
import { getAuth } from '../../store/auth/authSelector';

const Dialogs = () => {
  const chats = useSelector(getChats, shallowEqual);
  const auth = useSelector(getAuth);
  return (
    <div className={style.dialogsWrap}>
      <PrivateRoute authenticated={auth} exact path="/dialogs/:uid/" className={style.chats}>
        <ChatsContainer chatsList={chats} />
      </PrivateRoute>

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
