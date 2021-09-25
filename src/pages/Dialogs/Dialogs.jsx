import Chats from '../../components/Chats/Chats';
import Messages from '../../components/Messages/Messages';
import style from './Dialogs.module.scss';
import { Route, Switch } from 'react-router-dom';
import Page404 from '../404/Page404';
import { shallowEqual, useSelector } from 'react-redux';
import { getChats } from '../../store/DialogsReducer/selector';

const Dialogs = () => {
  const chats = useSelector(getChats, shallowEqual);
  return (
    <div className={style.dialogsWrap}>
      <Chats className={style.chats} chatsList={chats} />

      <Switch>
        <Route exact path="/dialogs/404">
          <Page404 />
        </Route>
        <Route exact path="/dialogs/:id">
          <Messages className={style.messages} chats={chats} />
        </Route>
      </Switch>
    </div>
  );
};

export default Dialogs;
