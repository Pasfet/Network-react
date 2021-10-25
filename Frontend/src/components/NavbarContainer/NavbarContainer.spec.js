import { render, fireEvent } from '@testing-library/react';
import NavbarContainer from './NavbarContainer';

describe('<NavbarContainer />', () => {
  const renderComponent = props => {
    return render(<NavbarContainer {...props} />);
  };

  const mockProps = {
    auth: true,
    uid: '1',
    logOut: jest.fn(),
    navbarList: [
      { name: 'Item1', dynamic: false, href: '/' },
      { name: 'Item2', dynamic: false, href: '/' },
    ],
    userName: 'Name',
  };

  describe('If auth === true', () => {
    it('Render AppBar, if auth === true', () => {
      const { getByText } = renderComponent(mockProps);

      expect(getByText(mockProps.userName)).toBeInTheDocument();
    });

    it('Render navbar if auth === true', () => {
      const { getByText } = renderComponent(mockProps);

      expect(getByText(/item1/i)).toBeInTheDocument();
      expect(getByText(/item2/i)).toBeInTheDocument();
    });
    it('Render "Выйти"', () => {
      const { getByText } = renderComponent(mockProps);

      expect(getByText(/Выйти/i)).toBeInTheDocument();
    });
    it('Call logOut', () => {
      const { getByText } = renderComponent(mockProps);

      fireEvent.click(getByText(/Выйти/i));

      expect(mockProps.logOut).toHaveBeenCalled();
    });
  });

  describe('If auth === false', () => {
    it('Render AppBar, if auth === false', () => {
      const { getByText } = renderComponent(mockProps);

      expect(getByText('Social network')).toBeInTheDocument();
    });
  });
});
