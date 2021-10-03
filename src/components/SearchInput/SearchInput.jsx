import TextField from '@mui/material/TextField';
import PropsTypes from 'prop-types';

const SearchInput = ({ placeholder, margin, changeHandler }) => {
  return (
    <TextField
      variant={'outlined'}
      margin={margin}
      placeholder={placeholder}
      onChange={e => changeHandler(e.target.value)}
    />
  );
};

SearchInput.propsTypes = {
  placeholder: PropsTypes.string,
  margin: PropsTypes.string,
  changeHandler: PropsTypes.func,
};

export default SearchInput;
