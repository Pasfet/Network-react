import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import SignUp from './SignUp';

describe('<SignUp />', () => {
  let history;

  const renderComponent = props => {
    history = createMemoryHistory();
    history.push = jest.fn();

    return render(
      <Router history={history}>
        <SignUp {...props} />
      </Router>,
    );
  };

  const mockProps = {
    onSubmitHandler: jest.fn(),
    error: '',
    nameValue: '',
    setNameValue: jest.fn(),
    emailValue: '',
    setEmail: jest.fn(),
    passwordValue: '',
    repeatPasswordValue: '',
    setPassword: jest.fn(),
    setRepeatPassword: jest.fn(),
  };

  const mockName = 'MyName';
  const mockValidEmail = 'my@example.com';
  const mockInvalidEmail = 'mymail.ru';
  const mockValidPassword = '12345678';
  const mockInvalidPassword = '123';

  describe('Test <Sign up /> with empty props', () => {
    it('Render error nameInput: "Это поле обязательно"', async () => {
      const { getByText, getByTestId, findByText } = renderComponent(mockProps);

      fireEvent.click(getByText('Sign up'));

      expect(getByTestId('nameInput').value).toBe('');
      expect(await findByText('Это поле обязательно')).toBeInTheDocument();
    });

    it('Render error emailInput: "Это поле обязательно"', async () => {
      const { getByText, getByTestId, findByText } = renderComponent({
        ...mockProps,
        nameValue: mockName,
      });

      fireEvent.click(getByText('Sign up'));

      expect(getByTestId('nameInput').value).toBe(mockName);
      expect(getByTestId('emailInput').value).toBe('');
      expect(await findByText('Это поле обязательно')).toBeInTheDocument();
    });

    it('Render error emailInput: "Email введен не верно"', async () => {
      const { getByText, getByTestId, findByText } = renderComponent({
        ...mockProps,
        nameValue: mockName,
        emailValue: mockInvalidEmail,
      });

      fireEvent.click(getByText('Sign up'));

      expect(getByTestId('nameInput').value).toBe(mockName);
      expect(getByTestId('emailInput').value).toBe(mockInvalidEmail);
      expect(await findByText('Email введен не верно')).toBeInTheDocument();
    });

    it('Render error passwordInput: "Это поле обязательно"', async () => {
      const { getByText, getByTestId, findByText } = renderComponent({
        ...mockProps,
        nameValue: mockName,
        emailValue: mockValidEmail,
      });

      fireEvent.click(getByText('Sign up'));

      expect(getByTestId('passwordInput').value).toBe('');
      expect(await findByText('Это поле обязательно')).toBeInTheDocument();
    });

    it('Render error passwordInput: "Пароль должен содержать минимум 8 символов"', async () => {
      const { getByText, getByTestId, findByText } = renderComponent({
        ...mockProps,
        nameValue: mockName,
        emailValue: mockInvalidEmail,
        passwordValue: mockInvalidPassword,
      });

      fireEvent.click(getByText('Sign up'));

      expect(getByTestId('passwordInput').value).toBe(mockInvalidPassword);
      expect(await findByText('Пароль должен содержать минимум 8 символов')).toBeInTheDocument();
    });

    it('Render error repeatPasswordInput: "Это поле обязательно"', async () => {
      const { getByText, getByTestId, findByText } = renderComponent({
        ...mockProps,
        nameValue: mockName,
        emailValue: mockInvalidEmail,
        passwordValue: mockValidPassword,
      });

      fireEvent.click(getByText('Sign up'));

      expect(getByTestId('repeatPasswordInput').value).toBe('');
      expect(await findByText('Это поле обязательно')).toBeInTheDocument();
    });

    it('Render error repeatPasswordInput: "Пароль должен совпадать"', async () => {
      const { getByText, getByTestId, findByText } = renderComponent({
        ...mockProps,
        nameValue: mockName,
        emailValue: mockInvalidEmail,
        passwordValue: mockValidPassword,
        repeatPasswordValue: mockInvalidPassword,
      });

      fireEvent.click(getByText('Sign up'));

      expect(getByTestId('repeatPasswordInput').value).toBe(mockInvalidPassword);
      expect(await findByText('Пароль должен совпадать')).toBeInTheDocument();
    });
  });

  describe('Test <Sign up /> call function', () => {
    it('Call setNameValue', () => {
      const { getByTestId } = renderComponent(mockProps);

      fireEvent.change(getByTestId('nameInput'), { target: { value: mockName } });
      expect(getByTestId('nameInput').value).toBe('');

      expect(mockProps.setNameValue).toHaveBeenCalledWith(mockName);
    });

    it('Call setEmail', () => {
      const { getByTestId } = renderComponent(mockProps);

      fireEvent.change(getByTestId('emailInput'), { target: { value: mockValidEmail } });
      expect(getByTestId('emailInput').value).toBe('');

      expect(mockProps.setEmail).toHaveBeenCalledWith(mockValidEmail);
    });

    it('Call setPassword', () => {
      const { getByTestId } = renderComponent(mockProps);

      fireEvent.change(getByTestId('passwordInput'), { target: { value: mockValidPassword } });
      expect(getByTestId('passwordInput').value).toBe('');

      expect(mockProps.setPassword).toHaveBeenCalledWith(mockValidPassword);
    });

    it('Call setRepeatPassword', () => {
      const { getByTestId } = renderComponent(mockProps);

      fireEvent.change(getByTestId('repeatPasswordInput'), {
        target: { value: mockValidPassword },
      });
      expect(getByTestId('repeatPasswordInput').value).toBe('');

      expect(mockProps.setRepeatPassword).toHaveBeenCalledWith(mockValidPassword);
    });

    it('Redirect to login page when click on "Log in" link', () => {
      const { getByText } = renderComponent(mockProps);

      fireEvent.click(getByText('Log in'));

      expect(history.push).toHaveBeenCalledWith('/login');
    });
  });

  describe('Test error message', () => {
    it('Render error', () => {
      const { getByText } = renderComponent({ ...mockProps, error: 'Ошибка' });

      expect(getByText('Ошибка')).toBeInTheDocument();
    });
    it('Does not render error', () => {
      renderComponent(mockProps);

      expect(mockProps.error).toBe('');
    });
  });
});
