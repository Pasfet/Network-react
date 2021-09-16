import { Button, TextField } from "@material-ui/core";
import style from './TextField.module.scss';
import PropTypes  from 'prop-types';

const TextFieldInputs = ({ sendMessage, valueInput, setValue }) => {
  return (
    <form onSubmit={sendMessage} noValidate className={style.form}>
      <TextField 
        id="filled-basic" 
        label="Message" 
        variant="filled" 
        value={valueInput} 
        onChange={setValue} 
        className={style.textarea} 
        autoFocus
      />
      <Button variant="contained" onClick={sendMessage} className={style.btn}>
        Send
      </Button>
    </form>
  )
};

TextFieldInputs.propsTypes = {
  sendMessage: PropTypes.func,
  valueInput: PropTypes.string,
  setValue: PropTypes.func
};

export default TextFieldInputs;