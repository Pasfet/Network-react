import { render, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import SignUpContainer from './SignUpContainer';

describe('<SignUpContainer />', () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const mockEmail = 'test@example.com';
  const mockPass = '12345678';
  const mockName = 'MyName';
  let store;
  let history;

  const renderComponent = () => {
    history = createMemoryHistory();
    history.push = jest.fn();
    store = mockStore(() => ({
      error: {
        error: null,
      },
    }));
    return render(
      <Router history={history}>
        <Provider store={store}>
          <SignUpContainer />
        </Provider>
      </Router>,
    );
  };

  it('Input name', () => {
    const { getByTestId } = renderComponent();

    fireEvent.change(getByTestId('nameInput'), { target: { value: mockName } });

    expect(getByTestId('nameInput').value).toBe(mockName);
  });
  it('Input email', () => {
    const { getByTestId } = renderComponent();

    fireEvent.change(getByTestId('emailInput'), { target: { value: mockEmail } });

    expect(getByTestId('emailInput').value).toBe(mockEmail);
  });
  it('Input password', () => {
    const { getByTestId } = renderComponent();

    fireEvent.change(getByTestId('passwordInput'), { target: { value: mockPass } });

    expect(getByTestId('passwordInput').value).toBe(mockPass);
  });
  it('Input repeatPassword', () => {
    const { getByTestId } = renderComponent();

    fireEvent.change(getByTestId('repeatPasswordInput'), { target: { value: mockPass } });

    expect(getByTestId('repeatPasswordInput').value).toBe(mockPass);
  });
  it('Push to "/login"', () => {
    const { getByText } = renderComponent();

    fireEvent.click(getByText(/Log in/i));

    expect(history.push).toHaveBeenCalledWith('/login');
  });
});
