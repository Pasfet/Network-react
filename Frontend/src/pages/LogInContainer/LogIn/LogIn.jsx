import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  ButtonStyled,
  ErrorStyled,
  ListItemStyled,
  ListStyled,
  LoginInputStyled,
  LoginWrapper,
  ValidatorFormStyled,
} from './LoginStyle';

const createInputs = (
  label,
  changeHandler,
  name,
  type,
  value,
  validators,
  errorMsg,
  inputProps,
) => (
  <LoginInputStyled
    variant="standard"
    label={label}
    onChange={e => changeHandler(e.target.value)}
    name={name}
    type={type}
    value={value}
    validators={validators}
    errorMessages={errorMsg}
    inputProps={inputProps}
  />
);

const LogIn = ({ onSubmitHandler, setEmail, emailValue, setPassword, passwordValue, error }) => {
  const history = useHistory();
  return (
    <LoginWrapper>
      <ValidatorFormStyled onSubmit={onSubmitHandler} data-testid="loginForm">
        <h2>LOG IN</h2>
        {error && <ErrorStyled severity="error">{error}</ErrorStyled>}
        {createInputs(
          'Email',
          setEmail,
          'email',
          'email',
          emailValue,
          ['required', 'isEmail'],
          ['Это поле обязательно', 'Email введен не верно'],
          { 'data-testid': 'emailInput' },
        )}
        {createInputs(
          'Password',
          setPassword,
          'password',
          'password',
          passwordValue,
          ['required'],
          ['Это поле обязательно', 'Пароль введен не верно'],
          { 'data-testid': 'passwordInput' },
        )}
        <ListStyled>
          <ListItemStyled>
            <ButtonStyled type="submit" variant="contained">
              Log in
            </ButtonStyled>
          </ListItemStyled>
          <ListItemStyled>
            <ButtonStyled
              variant="contained"
              color="secondary"
              onClick={() => history.push('/signup')}
            >
              Sign Up
            </ButtonStyled>
          </ListItemStyled>
        </ListStyled>
      </ValidatorFormStyled>
    </LoginWrapper>
  );
};

LogIn.propsTypes = {
  onSubmitHandler: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
  emailValue: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  passwordValue: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
};

export default LogIn;
