import { useEffect, useState, FC, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registration } from '../../actions/authActions';
import { clearError } from '../../actions/errorActions';
import { getError } from '../../store/errorReducer/errorSelectors';
import SignUp from './SignUp/SignUp';

const SignUpContainer: FC = () => {
  const dispatch = useDispatch();
  const error = useSelector(getError);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  const onSubmitHandler = (e: ChangeEvent<HTMLFormElement>): void => {
    dispatch(clearError());
    e.preventDefault();
    dispatch(registration({ name, email, password }));
  };

  useEffect((): () => void => {
    return () => dispatch(clearError());
  }, [dispatch]);

  return (
    <SignUp
      onSubmitHandler={onSubmitHandler}
      error={error?.type === 'error' && error.message}
      nameValue={name}
      setNameValue={setName}
      emailValue={email}
      setEmail={setEmail}
      passwordValue={password}
      repeatPasswordValue={repeatPassword}
      setPassword={setPassword}
      setRepeatPassword={setRepeatPassword}
    />
  );
};

export default SignUpContainer;
