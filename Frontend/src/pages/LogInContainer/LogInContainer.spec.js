import { render, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import LogInContainer from './LogInContainer';

describe('<LogInContainer />', () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const mockEmail = 'test@example.com';
  const mockPass = '12345678';
  let store;

  const renderComponent = () => {
    const history = createMemoryHistory();
    store = mockStore(() => ({
      error: {
        error: null,
      },
    }));
    return render(
      <Router history={history}>
        <Provider store={store}>
          <LogInContainer />
        </Provider>
      </Router>,
    );
  };

  it('Input email', () => {
    const { getByTestId } = renderComponent();

    fireEvent.change(getByTestId('emailInput'), { target: { value: mockEmail } });

    expect(getByTestId('emailInput').value).toBe(mockEmail);
    expect(getByTestId('passwordInput').value).toBe('');
  });

  it('Input password', () => {
    const { getByTestId } = renderComponent();

    fireEvent.change(getByTestId('passwordInput'), { target: { value: mockPass } });

    expect(getByTestId('passwordInput').value).toBe(mockPass);
    expect(getByTestId('emailInput').value).toBe('');
  });

  it('Input email and password', () => {
    const { getByTestId } = renderComponent();

    fireEvent.change(getByTestId('emailInput'), { target: { value: mockEmail } });
    fireEvent.change(getByTestId('passwordInput'), { target: { value: mockPass } });

    expect(getByTestId('emailInput').value).toBe(mockEmail);
    expect(getByTestId('passwordInput').value).toBe(mockPass);
  });
});
