import { render, fireEvent, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import LogIn from './LogIn';

describe('Login component', () => {
  let history;
  const renderComponent = props => {
    history = createMemoryHistory();
    history.push = jest.fn();

    return render(
      <Router history={history}>
        <LogIn {...props} />
      </Router>,
    );
  };

  const mockProps = {
    onSubmitHandler: jest.fn(),
    setEmail: jest.fn(),
    setPassword: jest.fn(),
    emailValue: '',
    passwordValue: '',
    error: '',
  };

  describe('Testing valid/invalid inputs', () => {
    it('Login component is render with label on input', () => {
      const { getByText } = renderComponent(mockProps);

      expect(getByText('LOG IN')).toBeInTheDocument();
      expect(getByText('Email')).toBeInTheDocument();
      expect(getByText('Password')).toBeInTheDocument();
      expect(getByText('Sign Up')).toBeInTheDocument();
      expect(getByText('Log in')).toBeInTheDocument();
    });

    it('Called setEmail function on change input Email', () => {
      const { getByTestId } = renderComponent(mockProps);

      const emailInput = getByTestId('emailInput');
      expect(emailInput.value).toBe('');

      fireEvent.change(emailInput, { target: { value: 'testemail' } });

      expect(mockProps.setEmail).toHaveBeenCalledWith('testemail');
    });

    it('Called setPassword function on change input Password', () => {
      const { getByTestId } = renderComponent(mockProps);

      const passwordInput = getByTestId('passwordInput');
      expect(passwordInput.value).toBe('');

      fireEvent.change(passwordInput, { target: { value: '123' } });

      expect(mockProps.setPassword).toHaveBeenCalledWith('123');
    });
    it('Render emailInput error: "Это поле обязательно", if emailValue is empty', async () => {
      const { findByText, getByText } = renderComponent(mockProps);

      fireEvent.click(getByText('Log in'));

      expect(await findByText('Это поле обязательно')).toBeInTheDocument();
    });

    it('Invalid input email, render email error: "Email введен не верно"', async () => {
      const invalidEmail = 'test';
      const { getByTestId, getByText, findByText } = renderComponent({
        ...mockProps,
        emailValue: invalidEmail,
      });

      const emailInput = getByTestId('emailInput');
      expect(emailInput.value).toBe(invalidEmail);
      fireEvent.click(getByText('Log in'));

      expect(await findByText('Email введен не верно')).toBeInTheDocument();
    });

    it('Render passwordInput error: "Это поле обязательно", if passwordInput is empty', async () => {
      const { findByText, getByText } = renderComponent(mockProps);

      fireEvent.click(getByText('Log in'));

      expect(await findByText('Это поле обязательно')).toBeInTheDocument();
    });

    it('Call onSubmitHandler', async () => {
      const mockEmail = 'test@example.com';
      const mockPass = '12345678';
      const { getByText } = renderComponent({
        ...mockProps,
        emailValue: mockEmail,
        passwordValue: mockPass,
      });

      fireEvent.submit(getByText('Log in'));

      await waitFor(() => {
        expect(mockProps.onSubmitHandler).toHaveBeenCalled();
      });
    });
  });

  describe('Testing route', () => {
    it('Click on Sign up, history push "/signup"', () => {
      const { getByText } = renderComponent(mockProps);

      fireEvent.click(getByText('Sign Up'));

      expect(history.push).toHaveBeenCalledWith('/signup');
    });
  });

  describe('Error test', () => {
    it('Render error: "Неверный логин или пароль", if props error to be true', () => {
      const { getByText } = renderComponent({ ...mockProps, error: 'Неверный логин или пароль' });

      expect(getByText('Неверный логин или пароль')).toBeInTheDocument();
    });
  });
});
