import { useState, useEffect, FC, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authorization } from '../../actions/authActions';
import { getError } from '../../store/errorReducer/errorSelectors';
import { clearError } from '../../actions/errorActions';
import LogIn from './LogIn/LogIn';

const LogInContainer: FC = () => {
  const dispatch = useDispatch();
  const error = useSelector(getError);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect((): () => void => {
    return () => dispatch(clearError());
  }, [dispatch]);

  const onSubmitHandler = (e: ChangeEvent<HTMLFormElement>): void => {
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
