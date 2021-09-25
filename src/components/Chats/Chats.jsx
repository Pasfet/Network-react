import { List, ListItem, ListItemText } from '@material-ui/core';
import { Button, ListItemButton, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import style from './Chats.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addChatAction, deleteChatAction } from '../../actions/dialogsAction';

const Chats = ({ chatsList }) => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const addChat = () => {
    dispatch(addChatAction(inputValue));
    setInputValue('');
  };

  const deleteChat = id => {
    dispatch(deleteChatAction(id));
  };

  return (
    <div className={style.chatsWrapper}>
      <h2>Chats</h2>
      <div className={style.addChat}>
        <TextField
          id="standard-basic"
          label="Add chat"
          variant="standard"
          sx={{ width: '50%' }}
          value={inputValue}
          onChange={e => {
            setInputValue(e.target.value);
          }}
        />
        <Button variant="contained" onClick={addChat}>
          Add chat
        </Button>
      </div>
      <List>
        {Object.keys(chatsList).map(id => (
          <ListItem divider key={chatsList[id].name} className={style.chatItemWrap}>
            <Link to={`/dialogs/${id}`} className={style.link}>
              <ListItemButton sx={{ width: '100%' }}>
                <ListItemText primary={chatsList[id].name} />
              </ListItemButton>
            </Link>
            <Button
              variant="contained"
              color={'secondary'}
              onClick={() => deleteChat(chatsList[id].id)}
            >
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

Chats.propsTypes = {
  chatsList: PropTypes.array.isRequired,
};

export default Chats;
