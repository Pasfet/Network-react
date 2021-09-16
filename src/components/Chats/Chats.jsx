import { List } from '@material-ui/core';
import PropTypes from 'prop-types';
import Chat from './Chat/Chat';
import style from './Chats.module.scss';

const Chats = ({ chats }) => {
  const chat = chats.map(chat => <Chat chat={chat} key={chat.id} />);
  return (
    <div className={style.chatsWrapper}>
      <h2>
        Chats
      </h2>
      <List>
        { chat }
      </List>
    </div>
  )
}

Chats.propsTypes = {
  chats: PropTypes.array.isRequired
}

export default Chats;