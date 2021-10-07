import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registration } from '../../actions/authActions';
import { clearError } from '../../actions/errorAction';
import { getError } from '../../store/errorReducer/errorSelector';
import SignUp from './SignUp/SignUp';

const SignUpContainer = () => {
  const dispatch = useDispatch();
  const error = useSelector(getError);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const onSubmitHandler = e => {
    dispatch(clearError());
    e.preventDefault();
    dispatch(registration({ name, email, password }));
  };

  return (
    <SignUp
      onSubmitHandler={onSubmitHandler}
      error={error}
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
