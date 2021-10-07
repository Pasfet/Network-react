import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Alert, Button, List, ListItem } from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import style from './Login.module.scss';

const LogIn = ({ onSubmitHandler, setEmail, emailValue, setPassword, passwordValue, error }) => {
  return (
    <div className={style.loginWrapper}>
      <ValidatorForm onSubmit={onSubmitHandler} className={style.loginForm}>
        <h2>LOG IN</h2>
        {error && (
          <Alert severity="error" className={style.error}>
            {error}
          </Alert>
        )}
        <TextValidator
          className={style.loginInput}
          sx={{ margin: '20px 0' }}
          variant="standard"
          label="Email"
          onChange={e => setEmail(e.target.value)}
          name="email"
          type="email"
          value={emailValue}
          validators={['required', 'isEmail']}
          errorMessages={['Это поле обязательно', 'Email введен не верно']}
        />
        <TextValidator
          autoComplete="off"
          className={style.loginInput}
          sx={{ marginBottom: '20px' }}
          variant="standard"
          label="Password"
          onChange={e => setPassword(e.target.value)}
          name="password"
          type="password"
          value={passwordValue}
          validators={['required']}
          errorMessages={['Это поле обязательно', 'Пароль введен не верно']}
        />
        <List className={style.loginActions}>
          <ListItem className={style.loginActionsLink}>
            <Link to="/signup">
              <Button variant="contained" color="secondary">
                Sign Up
              </Button>
            </Link>
          </ListItem>
          <ListItem className={style.loginButton} sx={{ justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained">
              Login
            </Button>
          </ListItem>
        </List>
      </ValidatorForm>
    </div>
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
