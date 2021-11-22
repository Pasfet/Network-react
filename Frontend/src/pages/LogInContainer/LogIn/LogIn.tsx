import { FC, ChangeEvent, ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import { ILogInProps } from '../../../types/components';
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
  label: string,
  changeHandler: (value: string) => void,
  name: string,
  type: string,
  value: string,
  validators: Array<string>,
  errorMsg: Array<string>,
  inputProps: Object,
) : ReactNode => (
  <LoginInputStyled
    variant="standard"
    label={label}
    onChange={(e: ChangeEvent<HTMLInputElement>) => changeHandler(e.target.value)}
    name={name}
    type={type}
    value={value}
    validators={validators}
    errorMessages={errorMsg}
    inputProps={inputProps}
  />
);

const LogIn: FC<ILogInProps> = ({
  onSubmitHandler,
  setEmail,
  emailValue,
  setPassword,
  passwordValue,
  error,
}) => {
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

export default LogIn;
