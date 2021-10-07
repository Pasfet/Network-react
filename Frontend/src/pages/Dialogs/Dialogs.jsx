import { Route, Switch } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';

import { getChats } from '../../store/dialogsReducer/dialogsSelector';
import style from './Dialogs.module.scss';

import PrivateRoute from '../../HOC/PrivateRoute';
import Chats from '../../components/Chats/Chats';
import Page404 from '../404/Page404';
import MessagesContainer from '../../components/MessagesContainer/MessagesContainer';
import { getAuth } from '../../store/auth/authSelector';

const Dialogs = () => {
  const chats = useSelector(getChats, shallowEqual);
  const auth = useSelector(getAuth);

  return (
    <div className={style.dialogsWrap}>
      <Chats className={style.chats} chatsList={chats} />

      <Switch>
        <Route exact path="/dialogs/404">
          <Page404 />
        </Route>
        <PrivateRoute
          authenticated={auth}
          exact
          path="/dialogs/:uid/:chatId"
          className={style.messages}
        >
          <MessagesContainer />
        </PrivateRoute>
      </Switch>
    </div>
  );
};

export default Dialogs;
