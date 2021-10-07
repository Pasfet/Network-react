import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authorization } from '../../actions/authActions';
import { getError } from '../../store/errorReducer/errorSelector';
import { clearError } from '../../actions/errorAction';
import LogIn from './LogIn/LogIn';

const LogInContainer = () => {
  const dispatch = useDispatch();
  const error = useSelector(getError);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = e => {
    dispatch(clearError());
    e.preventDefault();
    dispatch(authorization({ email, password }));
  };
  return (
    <LogIn
      onSubmitHandler={onSubmitHandler}
      setEmail={setEmail}
      emailValue={email}
      setPassword={setPassword}
      passwordValue={password}
      error={error}
    />
  );
};

export default LogInContainer;
