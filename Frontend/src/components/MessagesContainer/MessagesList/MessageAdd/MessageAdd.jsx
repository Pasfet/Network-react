import { Button, TextField } from '@mui/material';
import PropTypes from 'prop-types';

import { styled } from '@material-ui/styles';

const MessageAddWrapper = styled('form')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  marginTop: '30px',
});

const MessageFieldInput = styled(TextField)({
  width: '60%',
  marginLeft: '10px',
});

const ButtonStyled = styled(Button)({
  padding: '8px 15px',
  borderRadius: '5px',
  fontSize: '14px',
  '&:hover': {
    color: '#fff',
  },
});

const MessageAdd = ({ inputValue, setInputValue, sendMessage }) => {
  return (
    <MessageAddWrapper onSubmit={sendMessage}>
      <MessageFieldInput
        label="Сообщение"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      <ButtonStyled variant="contained" type="submit">
        Send
      </ButtonStyled>
    </MessageAddWrapper>
  );
};

MessageAdd.propTypes = {
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
};

export default MessageAdd;
