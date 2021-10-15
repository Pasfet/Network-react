import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { ListItem } from '@mui/material';
import PropTypes from 'prop-types';
import {
  ButtonStyled,
  ErrorStyled,
  SignUpForm,
  SignUpInput,
  SignUpList,
  SignUpWrapper,
} from './SignUpStyle';

const SignUp = ({
  onSubmitHandler,
  nameValue,
  setNameValue,
  emailValue,
  setEmail,
  passwordValue,
  repeatPasswordValue,
  setPassword,
  setRepeatPassword,
  error,
}) => {
  const history = useHistory();
  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', value => {
      if (value !== passwordValue) {
        return false;
      } else {
        return true;
      }
    });
    return () => ValidatorForm.removeValidationRule('isPasswordMatch');
  }, [passwordValue]);

  return (
    <SignUpWrapper>
      <SignUpForm onSubmit={onSubmitHandler}>
        <h2>SIGN UP</h2>
        {error && <ErrorStyled severity="error">{error}</ErrorStyled>}
        <SignUpInput
          variant="standard"
          label="Введите Имя"
          onChange={e => setNameValue(e.target.value)}
          name="name"
          type="text"
          value={nameValue}
          validators={['required', 'isString', 'trim']}
          errorMessages={['Это поле обязательно']}
          inputProps={{ 'data-testid': 'nameInput' }}
        />
        <SignUpInput
          variant="standard"
          label="Введите Email"
          onChange={e => setEmail(e.target.value)}
          name="email"
          type="email"
          value={emailValue}
          validators={['required', 'isEmail', 'trim']}
          errorMessages={['Это поле обязательно', 'Email введен не верно']}
          inputProps={{ 'data-testid': 'emailInput' }}
        />
        <SignUpInput
          autoComplete="off"
          variant="standard"
          label="Введите пароль"
          onChange={e => setPassword(e.target.value)}
          name="password"
          type="password"
          value={passwordValue}
          validators={['required', 'minStringLength:8', 'trim']}
          errorMessages={['Это поле обязательно', 'Пароль должен содержать минимум 8 символов']}
          inputProps={{ 'data-testid': 'passwordInput' }}
        />
        <SignUpInput
          autoComplete="off"
          variant="standard"
          label="Повторите пароль"
          onChange={e => setRepeatPassword(e.target.value)}
          name="repeatPassword"
          type="password"
          value={repeatPasswordValue}
          validators={['required', 'isPasswordMatch', 'trim']}
          errorMessages={['Это поле обязательно', 'Пароль должен совпадать']}
          inputProps={{ 'data-testid': 'repeatPasswordInput' }}
        />
        <SignUpList>
          <ListItem>
            <ButtonStyled
              variant="contained"
              color="secondary"
              onClick={() => history.push('/login')}
            >
              Log in
            </ButtonStyled>
          </ListItem>
          <ListItem>
            <ButtonStyled type="submit" variant="contained" color="success">
              Sign up
            </ButtonStyled>
          </ListItem>
        </SignUpList>
      </SignUpForm>
    </SignUpWrapper>
  );
};

SignUp.propsTypes = {
  onSubmitHandler: PropTypes.func.isRequired,
  error: PropTypes.string,
  nameValue: PropTypes.string.isRequired,
  setNameValue: PropTypes.func.isRequired,
  emailValue: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  passwordValue: PropTypes.string.isRequired,
  repeatPasswordValue: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  setRepeatPassword: PropTypes.func.isRequired,
};

export default SignUp;
