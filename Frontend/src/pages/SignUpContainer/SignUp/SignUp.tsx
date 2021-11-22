import { useHistory } from 'react-router-dom';
import { useEffect, FC, ChangeEvent, ReactNode } from 'react';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { ListItem } from '@mui/material';
import {
  ButtonStyled,
  ErrorStyled,
  SignUpForm,
  SignUpInput,
  SignUpList,
  SignUpWrapper,
} from './SignUpStyle';
import { ISignUpProps } from '../../../types/components';

const createInputs = (
  label: string,
  changeHandler: (value: string) => void,
  name: string,
  type: string,
  value: string,
  validators: Array<string>,
  errorMsg: Array<string>,
  inputProps: Object,
): ReactNode => (
  <SignUpInput
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

const SignUp: FC<ISignUpProps> = ({
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
        {createInputs(
          'Введите Имя',
          setNameValue,
          'name',
          'text',
          nameValue,
          ['required', 'isString', 'trim'],
          ['Это поле обязательно'],
          { 'data-testid': 'nameInput' },
        )}
        {createInputs(
          'Введите Email',
          setEmail,
          'email',
          'email',
          emailValue,
          ['required', 'isEmail', 'trim'],
          ['Это поле обязательно', 'Email введен не верно'],
          { 'data-testid': 'emailInput' },
        )}
        {createInputs(
          'Введите пароль',
          setPassword,
          'password',
          'password',
          passwordValue,
          ['required', 'minStringLength:8', 'trim'],
          ['Это поле обязательно', 'Пароль должен содержать минимум 8 символов'],
          { 'data-testid': 'passwordInput' },
        )}
        {createInputs(
          'Повторите пароль',
          setRepeatPassword,
          'repeatPassword',
          'password',
          repeatPasswordValue,
          ['required', 'isPasswordMatch', 'trim'],
          ['Это поле обязательно', 'Пароль должен совпадать'],
          { 'data-testid': 'repeatPasswordInput' },
        )}
        <SignUpList>
          <ListItem>
            <ButtonStyled type="submit" variant="contained" color="success">
              Sign up
            </ButtonStyled>
          </ListItem>
          <ListItem>
            <ButtonStyled
              variant="contained"
              color="secondary"
              onClick={() => history.push('/login')}
            >
              Log in
            </ButtonStyled>
          </ListItem>
        </SignUpList>
      </SignUpForm>
    </SignUpWrapper>
  );
};

export default SignUp;