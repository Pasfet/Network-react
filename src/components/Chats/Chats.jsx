import { List, ListItem, ListItemText } from '@material-ui/core';
import { Button, ListItemButton, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import style from './Chats.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Chats = ({ chats, setChats }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInput = e => {
    setInputValue(e.target.value);
  }

  const addChat = () => {
    console.log(!inputValue);
    if (!inputValue) return;
    const newChat = {
      name: inputValue,
      messages: []
    };
    // Id будет генерироваться случайный позже REFACTOR
    setChats(prevState => ({
      ...prevState,
      [inputValue]: newChat
    }));

    setInputValue('');
  }

  const deleteChat = (id) => {
    setChats(prevState => {
      const newState = {...prevState};
      delete newState[id];
      return newState;
    });
  }

  return (
    <div className={style.chatsWrapper}>
      <h2>
        Chats
      </h2>
      <div className={style.addChat}>
        <TextField id="standard-basic" label="Add chat" variant="standard" sx={{width: '50%'}} value={inputValue} onChange={handleInput} />
        <Button variant="contained" onClick={addChat}>Add chat</Button>
      </div>
      <List>
        { 
        Object.keys(chats)?.map(id => (
          <ListItem divider key={chats[id].name} className={style.chatItemWrap}>
            <Link to={`/dialogs/${id}`} className={style.link}>
              <ListItemButton sx={{width: '100%'}}>
                <ListItemText primary={chats[id].name} />
              </ListItemButton>
            </Link>
            <Button variant="contained" color={'secondary'} onClick={() => deleteChat(id)}>Delete</Button>
          </ListItem>
          )) 
        }
      </List>
    </div>
  )
}

Chats.propsTypes = {
  chats: PropTypes.array.isRequired,
  setChats: PropTypes.func.isRequired,
}

export default Chats;