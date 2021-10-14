import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import NavbarItems from './NavbarItems';

describe('<NavbarItems />', () => {
  let history;
  const renderComponent = props => {
    history = createMemoryHistory();
    history.push = jest.fn();

    return render(
      <Router history={history}>
        <NavbarItems {...props} />
      </Router>,
    );
  };

  const mockProps = {
    uid: '1',
    navbarList: [
      { name: 'Item1', dynamic: false, href: '/home' },
      { name: 'Item2', dynamic: true, href: '/profile' },
    ],
  };

  it('Render items', () => {
    const { getByText } = renderComponent(mockProps);

    expect(getByText(/item1/i)).toBeInTheDocument();
    expect(getByText(/item2/i)).toBeInTheDocument();
  });

  it('Redirect to /home', () => {
    const { getByText } = renderComponent(mockProps);

    fireEvent.click(getByText(/item1/i));

    expect(history.push).toHaveBeenCalledWith('/home');
    expect(history.push).not.toHaveBeenCalledWith('/profile/1');
  });
  it('Redirect to /1', () => {
    const { getByText } = renderComponent(mockProps);

    fireEvent.click(getByText(/item2/i));

    expect(history.push).toHaveBeenCalledWith('/profile/1');
    expect(history.push).not.toHaveBeenCalledWith('/home');
  });
});
