import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';

import style from './AddChat.module.scss';

const AddChat = ({
  inputValue,
  setInputValue,
  addChat,
  openField,
  onOpenField,
  onCloseField,
  options,
  loading,
  error,
}) => {
  return (
    <div className={style.addChatWrapper}>
      <Autocomplete
        className={style.addChatForm}
        open={openField}
        onOpen={() => onOpenField(true)}
        onClose={() => {
          onCloseField(false);
        }}
        limitTags={0}
        options={options}
        loading={loading}
        loadingText="Поиск..."
        openText="Введите имя пользователя"
        onChange={(e, value, reason) => {
          if (reason !== 'clear') {
            addChat(value);
          }
        }}
        isOptionEqualToValue={(option, value) => option.user_name === value.user_name}
        getOptionLabel={option => option.user_name}
        noOptionsText={error}
        renderInput={params => (
          <TextField
            {...params}
            label="Поиск"
            onChange={e => setInputValue(e.target.value)}
            value={inputValue}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading && <CircularProgress color="inherit" size={20} />}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </div>
  );
};

AddChat.propsTypes = {
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired,
  addChat: PropTypes.func.isRequired,
  openField: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onOpenField: PropTypes.func.isRequired,
  onCloseField: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

export default AddChat;
