import { styled } from '@material-ui/styles';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';
import { memo } from 'react';

const AddChatWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  marginTop: '20px',
});

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
    <AddChatWrapper>
      <Autocomplete
        open={openField}
        onOpen={() => onOpenField(true)}
        onClose={() => {
          onCloseField(false);
        }}
        limitTags={0}
        options={options}
        loading={loading}
        loadingText="Поиск..."
        onChange={(e, value, reason) => {
          if (reason !== 'clear') {
            addChat(value);
          }
        }}
        isOptionEqualToValue={(option, value) => option.user_name === value.user_name}
        getOptionLabel={option => option.user_name}
        noOptionsText={error}
        sx={{
          width: '100%',
          '& .MuiAutocomplete-endAdornment': { top: 'calc(50% - 20px) ' },
        }}
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
                  {loading && (
                    <CircularProgress color="inherit" size={20} sx={{ marginRight: '20px' }} />
                  )}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </AddChatWrapper>
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

export default memo(AddChat);
