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

const LogIn = ({ onSubmitHandler, setEmail, emailValue, setPassword, passwordValue, error }) => {
  const history = useHistory();
  return (
    <LoginWrapper>
      <ValidatorFormStyled onSubmit={onSubmitHandler} data-testid="loginForm">
        <h2>LOG IN</h2>
        {error && <ErrorStyled severity="error">{error}</ErrorStyled>}
        <LoginInputStyled
          variant="standard"
          label="Email"
          onChange={e => setEmail(e.target.value)}
          name="email"
          type="email"
          value={emailValue}
          validators={['required', 'isEmail']}
          errorMessages={['Это поле обязательно', 'Email введен не верно']}
          inputProps={{ 'data-testid': 'emailInput' }}
        />
        <LoginInputStyled
          autoComplete="off"
          variant="standard"
          label="Password"
          onChange={e => setPassword(e.target.value)}
          name="password"
          type="password"
          value={passwordValue}
          validators={['required']}
          errorMessages={['Это поле обязательно', 'Пароль введен не верно']}
          inputProps={{ 'data-testid': 'passwordInput' }}
        />
        <ListStyled>
          <ListItemStyled>
            <ButtonStyled
              variant="contained"
              color="secondary"
              onClick={() => history.push('/signup')}
            >
              Sign Up
            </ButtonStyled>
          </ListItemStyled>
          <ListItemStyled>
            <ButtonStyled type="submit" variant="contained">
              Log in
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
