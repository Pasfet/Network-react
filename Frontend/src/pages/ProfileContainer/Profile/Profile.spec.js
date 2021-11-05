import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import Profile from './Profile';

describe('<Profile />', () => {
  let history;

  const renderComponent = props => {
    history = createMemoryHistory();
    history.push = jest.fn();
    return render(
      <Router history={history}>
        <Profile {...props} />
      </Router>,
    );
  };

  const mockProps = {
    user: { user_name: 'MyName', about: {}, status: '' },
    uid: '',
    myUid: '',
    error: {},
    openDialog: false,
    openStatus: false,
    setOpenStatus: jest.fn(),
    statusInput: '',
    setStatusInput: jest.fn(),
    sendStatus: jest.fn(),
    myFriends: {},
    addToFriendsList: jest.fn(),
    deleteFriend: jest.fn(),
    rejectFriendRequestHandler: jest.fn(),
  };

  it('Render userName', () => {
    const { getByText } = renderComponent(mockProps);

    expect(getByText(mockProps.user.user_name)).toBeInTheDocument();
  });

  it('Render status', () => {
    const { getByText } = renderComponent({ ...mockProps, statusInput: 'My status' });

    expect(getByText(/My status/i)).toBeInTheDocument();
  });

  it('Render "Установить статус"', () => {
    const { getByText } = renderComponent(mockProps);

    expect(getByText(/Установить статус/i)).toBeInTheDocument();
  });

  it('Call setOpenStatus', () => {
    const { getByText } = renderComponent(mockProps);

    fireEvent.click(getByText(/Установить статус/i));

    expect(mockProps.setOpenStatus).toHaveBeenCalled();
  });

  it('Call setStatusInput', () => {
    const { getByTestId } = renderComponent({ ...mockProps, statusInput: 'st', openStatus: true });

    fireEvent.change(getByTestId('inputStatus'), { target: { value: 'str' } });
    expect(getByTestId('inputStatus').value).toBe('st');

    expect(mockProps.setStatusInput).toHaveBeenCalled();
  });

  it('Call sendStatus', () => {
    const { getByTestId } = renderComponent({ ...mockProps, statusInput: 'st', openStatus: true });

    fireEvent.blur(getByTestId('inputStatus'));

    expect(mockProps.sendStatus).toHaveBeenCalled();
  });

  it('Render aboutUser', () => {
    const { getByText } = renderComponent({
      ...mockProps,
      user: { ...mockProps.user, about: { site: { text: 'Сайт', payload: 'site.com' } } },
    });

    expect(getByText(/site\.com/i)).toBeInTheDocument();
    expect(getByText(/Сайт/i)).toBeInTheDocument();
  });

  it('Render error', () => {
    const { getByText } = renderComponent({
      ...mockProps,
      error: { message: 'Error', type: 'error' },
    });

    expect(getByText(/Error/i)).toBeInTheDocument();
  });
});
