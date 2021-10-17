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
    user: { name: 'MyName', about: {}, status: '' },
    uid: '',
    userUid: '',
    error: '',
    openStatus: false,
    setOpenStatus: jest.fn(),
    statusInput: '',
    setStatusInput: jest.fn(),
    sendStatus: jest.fn(),
  };

  it('Render userName', () => {
    const { getByText } = renderComponent(mockProps);

    expect(getByText(mockProps.user.name)).toBeInTheDocument();
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
    const { getByText } = renderComponent({ ...mockProps, error: 'Error' });

    expect(getByText(/Error/i)).toBeInTheDocument();
  });
});
