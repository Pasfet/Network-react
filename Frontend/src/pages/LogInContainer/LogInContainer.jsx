import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authorization } from '../../actions/authActions';
import { getError } from '../../store/errorReducer/errorSelectors';
import { clearError } from '../../actions/errorActions';
import LogIn from './LogIn/LogIn';
import { useEffect } from 'react';

const LogInContainer = () => {
  const dispatch = useDispatch();
  const error = useSelector(getError);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    return () => dispatch(clearError());
  }, [dispatch]);

  const onSubmitHandler = e => {
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
      error={error && error.message}
    />
  );
};

export default LogInContainer;
