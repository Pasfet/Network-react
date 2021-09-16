import { ListItem, ListItemText } from '@material-ui/core';
import PropTypes from 'prop-types';

const Chat = ({ chat }) => {
  return (
    <ListItem divider={true}>
      <ListItemText primary={chat.name} />
    </ListItem>
  );
}

Chat.propsTypes = {
  chat: PropTypes.object.isRequired
}

export default Chat;