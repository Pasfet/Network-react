import { useState } from 'react';
import Chats from '../../components/Chats/Chats';
import Messages from '../../components/Messages/Messages';
import style from './Dialogs.module.scss';
import { Route, Switch } from 'react-router-dom';
import Page404 from '../404/Page404';

const Dialogs = () => {
  const [chats, setChats] = useState({
    c1: {
      name: 'Mike',
      messages: []
    },
    c2: {
      name: 'Anna',
      messages: []
    }
  });
  return (
    <div className={style.dialogsWrap}>
      <Chats className={style.chats} chats={chats} setChats={setChats} />

      <Switch>
        <Route exact path="/dialogs/:id">
          <Messages className={style.messages} chats={chats} setChats={setChats} />
        </Route>
        <Route path="/dialogs/:id/404">
          <Page404 />
        </Route>
      </Switch>
    </div>
  );
};

export default Dialogs;