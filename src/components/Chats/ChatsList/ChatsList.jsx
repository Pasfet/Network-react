import { List, ListItem, ListItemText } from '@material-ui/core';
import { Button, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import style from './ChatsList.module.scss';

const ChatsList = ({ chatsList, deleteChat }) => {
  return (
    <List>
      {Object.keys(chatsList)?.map(id => (
        <ListItem divider key={chatsList[id].name} className={style.chatItemWrap}>
          <Link to={`/dialogs/${id}`} className={style.link}>
            <ListItemButton sx={{ width: '100%' }}>
              <ListItemText primary={chatsList[id].name} />
            </ListItemButton>
          </Link>
          <Button variant="contained" color={'secondary'} onClick={() => deleteChat(id)}>
            Delete
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

ChatsList.propsTypes = {
  chatsList: PropTypes.array.isRequired,
  deleteChat: PropTypes.func,
};

export default ChatsList;
