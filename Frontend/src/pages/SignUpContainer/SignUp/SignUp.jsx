import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Alert, Button, List, ListItem } from '@mui/material';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import style from './SignUp.module.scss';
import { useEffect } from 'react';

const SignUp = ({
  onSubmitHandler,
  error,
  nameValue,
  setNameValue,
  emailValue,
  setEmail,
  passwordValue,
  repeatPasswordValue,
  setPassword,
  setRepeatPassword,
}) => {
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
    <div className={style.signUpWrapper}>
      <ValidatorForm onSubmit={onSubmitHandler} className={style.signupForm}>
        <h2>SIGN UP</h2>
        {error && (
          <Alert severity="error" className={style.error}>
            {error}
          </Alert>
        )}
        <TextValidator
          className={style.signupInput}
          variant="standard"
          label="Введите Имя"
          onChange={e => setNameValue(e.target.value)}
          name="name"
          type="text"
          value={nameValue}
          validators={['required', 'isString', 'trim']}
          errorMessages={['Это поле обязательно', 'Имя должно быть строкой']}
        />
        <TextValidator
          className={style.signupInput}
          sx={{ margin: '20px 0' }}
          variant="standard"
          label="Введите Email"
          onChange={e => setEmail(e.target.value)}
          name="email"
          type="email"
          value={emailValue}
          validators={['required', 'isEmail', 'trim']}
          errorMessages={['Это поле обязательно', 'Email введен не верно']}
        />
        <TextValidator
          className={style.signupInput}
          sx={{ marginBottom: '20px' }}
          variant="standard"
          label="Введите пароль"
          onChange={e => setPassword(e.target.value)}
          name="password"
          type="password"
          value={passwordValue}
          validators={['required', 'minStringLength:8', 'trim']}
          errorMessages={['Это поле обязательно', 'Пароль должен содержать минимум 8 символов']}
        />
        <TextValidator
          className={style.signupInput}
          sx={{ marginBottom: '20px' }}
          variant="standard"
          label="Повторите пароль"
          onChange={e => setRepeatPassword(e.target.value)}
          name="repeatPassword"
          type="password"
          value={repeatPasswordValue}
          validators={['required', 'isPasswordMatch', 'trim']}
          errorMessages={['Это поле обязательно', 'Пароль должен совпадать']}
        />
        <List className={style.signupActions}>
          <ListItem className={style.signupActionsLink}>
            <Link to="/login">
              <Button variant="contained" color="secondary">
                Log in
              </Button>
            </Link>
          </ListItem>
          <ListItem className={style.loginButton} sx={{ justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained" color="success">
              Sign up
            </Button>
          </ListItem>
        </List>
      </ValidatorForm>
    </div>
  );
};

SignUp.propsTypes = {
  onSubmitHandler: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
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
