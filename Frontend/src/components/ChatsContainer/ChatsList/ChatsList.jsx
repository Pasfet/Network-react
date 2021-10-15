import { List, ListItem, ListItemText } from '@material-ui/core';
import { Alert, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';

import { styled } from '@material-ui/styles';

const ChatItemWrap = styled(ListItem)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const LinkStyled = styled(Link)({
  width: '100%',
  fontSize: '24px',
  color: '#000',
});

const ChatsList = ({ chatsList, deleteChat, uid, error, isEmpty }) => {
  return (
    <>
      <List>
        {error && <Alert severity="error"> {error} </Alert>}
        {isEmpty && <Alert severity="info"> {isEmpty} </Alert>}
        {chatsList &&
          Object.keys(chatsList)?.map(id => (
            <ChatItemWrap divider key={chatsList[id].chat_id}>
              <LinkStyled to={`/dialogs/${uid}/${chatsList[id].chat_id}`}>
                <ListItemButton sx={{ width: '100%' }}>
                  <ListItemText primary={chatsList[id].chat_name} />
                </ListItemButton>
              </LinkStyled>
              <IconButton
                aria-label="delete"
                size="large"
                onClick={() => deleteChat(uid, id)}
                data-testid="deleteChatButton"
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </ChatItemWrap>
          ))}
      </List>
    </>
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
