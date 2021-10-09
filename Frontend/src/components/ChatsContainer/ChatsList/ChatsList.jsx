import { List, ListItem, ListItemText } from '@material-ui/core';
import { Alert, Button, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import style from './ChatsList.module.scss';

const ChatsList = ({ chatsList, deleteChat, uid, error, isEmpty }) => {
  return (
    <List>
      {error && <Alert severity="error"> {error} </Alert>}
      {isEmpty && <Alert severity="info"> {isEmpty} </Alert>}
      {chatsList &&
        Object.keys(chatsList)?.map(id => (
          <ListItem divider key={chatsList[id].chat_id} className={style.chatItemWrap}>
            <Link to={`/dialogs/${uid}/${chatsList[id].chat_id}`} className={style.link}>
              <ListItemButton sx={{ width: '100%' }}>
                <ListItemText primary={chatsList[id].chat_name} />
              </ListItemButton>
            </Link>
            <Button variant="contained" color={'secondary'} onClick={() => deleteChat(uid, id)}>
              Delete
            </Button>
          </ListItem>
        ))}
    </List>
  );
};

ChatsList.propsTypes = {
  chatsList: PropTypes.object.isRequired,
  uid: PropTypes.number.isRequired,
  deleteChat: PropTypes.func,
  error: PropTypes.string,
  isEmpty: PropTypes.string,
};

export default ChatsList;
