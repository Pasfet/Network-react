import { Button, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import style from './MessageAdd.module.scss';

const MessageAdd = ({ inputValue, setInputValue, sendMessage }) => {
  return (
    <form className={style.messageAddWrapper} onSubmit={sendMessage}>
      <TextField
        className={style.messageAddInput}
        label="Сообщение"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      <Button variant="contained" type="submit">
        Send
      </Button>
    </form>
  );
};

MessageAdd.propTypes = {
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
};

export default MessageAdd;
