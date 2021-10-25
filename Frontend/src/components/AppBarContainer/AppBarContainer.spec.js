import { render, fireEvent } from '@testing-library/react';
import AppBarContainer from './AppBarContainer';

describe('<AppBarContainer />', () => {
  const renderComponent = props => {
    return render(<AppBarContainer {...props} />);
  };

  const mockProps = {
    open: false,
    setOpen: jest.fn(),
    userName: 'Name',
    auth: true,
  };

  it('Render component', () => {
    const { getByText } = renderComponent(mockProps);

    expect(getByText(/Social network/i)).toBeInTheDocument();
  });

  it('Render name if auth === true', () => {
    const { getByText } = renderComponent(mockProps);

    expect(getByText(/Name/i)).toBeInTheDocument();
  });

  it('Call setOpen', () => {
    const { getByTestId } = renderComponent(mockProps);

    fireEvent.click(getByTestId('openBarButton'));

    expect(mockProps.setOpen).toHaveBeenCalled();
  });
});
