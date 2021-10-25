import { IconButton, TextField } from '@mui/material';
import PropsTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { memo } from 'react';

const FormWrapper = styled('form')({
  position: 'relative',
  maxWidth: '300px',
  width: '100%',
});

const FormInput = styled(TextField)({
  '& .MuiOutlinedInput-input': {
    width: '100%',
    padding: '16px 60px 16px 16px',
  },
});

const FormButton = styled(IconButton)({
  '&.MuiIconButton-root': {
    position: 'absolute',
    top: '50%',
    right: 0,
    transform: 'translateY(-50%)',
  },
});

const SearchInput = ({ placeholder, changeHandler, onSubmit }) => {
  return (
    <FormWrapper onSubmit={onSubmit}>
      <FormInput
        variant={'outlined'}
        placeholder={placeholder}
        onChange={e => changeHandler(e.target.value)}
      />
      <FormButton type="submit">
        <SearchIcon />
      </FormButton>
    </FormWrapper>
  );
};

SearchInput.propsTypes = {
  placeholder: PropsTypes.string,
  margin: PropsTypes.string,
  changeHandler: PropsTypes.func,
  onSubmit: PropsTypes.func,
};

export default memo(SearchInput);
