import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authorization } from '../../actions/authActions';
import { getError } from '../../store/errorReducer/errorSelector';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      error={error?.type === 'login' || (error?.type === 'error' && error.message)}
    />
  );
};

export default LogInContainer;
