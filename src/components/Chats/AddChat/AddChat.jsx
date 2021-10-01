import { Button, TextField } from '@mui/material';
import PropTypes from 'prop-types';

const AddChat = ({ inputValue, setInputValue, addChat }) => {
  return (
    <>
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
    </>
  );
};

AddChat.propsTypes = {
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired,
  addChat: PropTypes.func.isRequired,
};

export default AddChat;
